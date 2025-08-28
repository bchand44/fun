const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const net = require('net');
const { Client } = require('@elastic/elasticsearch');

const app = express();
app.use(express.json());
app.use(cors());

const config = {
  user: 'sa',
  password: 'Bivek123$$', // <-- Replace with your actual password
  server: 'localhost',
  database: 'GSM',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const esClient = new Client({ node: 'http://localhost:9200' });

function sendLogToLogstash(logObj) {
  const client = new net.Socket();
  client.connect(5050, 'localhost', () => {
    client.write(JSON.stringify(logObj) + '\n');
    client.end();
  });
  client.on('error', () => {}); // Ignore connection errors for now
}

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO Users (name, email, password)
      VALUES (${name}, ${email}, ${password})
    `;
    sendLogToLogstash({ event: 'register', email, status: 'success', timestamp: new Date() });
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    sendLogToLogstash({ event: 'register', email, status: 'error', error: err.message, timestamp: new Date() });
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT * FROM Users WHERE email = ${email}
    `;
    const user = result.recordset[0];
    if (!user) {
      sendLogToLogstash({ event: 'login', email, status: 'user_not_found', timestamp: new Date() });
      return res.status(401).json({ error: 'User not found' });
    }
    if (user.password !== password) {
      sendLogToLogstash({ event: 'login', email, status: 'incorrect_password', timestamp: new Date() });
      return res.status(401).json({ error: 'Incorrect password' });
    }
    sendLogToLogstash({ event: 'login', email, status: 'success', timestamp: new Date() });
    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    sendLogToLogstash({ event: 'login', email, status: 'error', error: err.message, timestamp: new Date() });
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/generate-apl', (req, res) => {
  // Generate a random 10-digit number
  const aplNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  res.json({ aplNumber });
});

app.post('/api/save-apl', async (req, res) => {
  const { aplNumber, site, rows } = req.body;
  const siteId = site === 'Florida' ? 1 : 56;
  try {
    await sql.connect(config);
    for (const row of rows) {
      await sql.query`
        INSERT INTO APLItems (aplNumber, siteId, itemId, startDate, endDate)
        VALUES (${aplNumber}, ${siteId}, ${row.itemId}, ${row.startDate}, ${row.endDate})
      `;
    }
    sendLogToLogstash({ event: 'save_apl', aplNumber, site, rowCount: rows.length, status: 'success', timestamp: new Date() });
    res.status(200).json({ message: 'APL data saved successfully' });
  } catch (err) {
    sendLogToLogstash({ event: 'save_apl', aplNumber, site, status: 'error', error: err.message, timestamp: new Date() });
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/apls', async (req, res) => {
  const siteId = req.query.site === '1' ? 1 : 56;
  try {
    await sql.connect(config);
    let linkTable = siteId === 1 ? 'FloridaLink' : 'TexasLink';
    // Log all APLs for the site
    const allApls = await sql.query`SELECT DISTINCT aplNumber FROM APLItems WHERE siteId = ${siteId}`;
    console.log('All APLs for site', siteId, allApls.recordset);
    // Log already linked APLs
    const linkedApls = await sql.query(`SELECT DISTINCT aplNumber FROM ${linkTable}`);
    console.log('Linked APLs for site', siteId, linkedApls.recordset);
    // Get APLs not already linked
    const unlinkedApls = allApls.recordset.filter(apl => !linkedApls.recordset.some(linked => linked.aplNumber === apl.aplNumber));
    console.log('Unlinked APLs for site', siteId, unlinkedApls);
    res.json(unlinkedApls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/link-apl', async (req, res) => {
  const { programName, site, aplNumber } = req.body;
  const siteId = site === '1' ? 1 : 56;
  let linkTable = siteId === 1 ? 'FloridaLink' : 'TexasLink';
  try {
    await sql.connect(config);
    // Get items to link
    const items = await sql.query`
      SELECT * FROM APLItems WHERE aplNumber = ${aplNumber} AND siteId = ${siteId}
    `;
    for (const item of items.recordset) {
      // Build SQL string for dynamic table name
      const insertSql = `
        INSERT INTO ${linkTable} (programName, aplNumber, siteId, itemId, startDate, endDate)
        VALUES (@programName, @aplNumber, @siteId, @itemId, @startDate, @endDate)
      `;
      await new sql.Request()
        .input('programName', sql.NVarChar(100), programName)
        .input('aplNumber', sql.NVarChar(20), aplNumber)
        .input('siteId', sql.Int, siteId)
        .input('itemId', sql.NVarChar(50), item.itemId)
        .input('startDate', sql.Date, item.startDate)
        .input('endDate', sql.Date, item.endDate)
        .query(insertSql);
    }
    sendLogToLogstash({ event: 'link_apl', programName, site, aplNumber, itemCount: items.recordset.length, status: 'success', timestamp: new Date() });
    res.json({ message: 'APL has been linked successfully!' });
  } catch (err) {
    sendLogToLogstash({ event: 'link_apl', programName, site, aplNumber, status: 'error', error: err.message, timestamp: new Date() });
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const { body } = await esClient.search({
      index: 'users',
      body: { query: { match_all: {} } }
    });
    res.json(body.hits.hits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

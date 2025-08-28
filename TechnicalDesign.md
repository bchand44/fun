# Technical Design Document

## Overview
This document describes the technical architecture and implementation details for the UI Automation Learning Website.

## Architecture
- **Frontend:** React (Vite), React Router, Bootstrap, Animate.css
- **Backend:** Node.js (Express), mssql, cors
- **Database:** Microsoft SQL Server (GSM)

## Main Components
- **Registration Page:**
  - Collects name, email, password
  - Sends POST request to `/api/register` (backend)
  - Displays success/error messages
- **Login Page:**
  - Collects email, password
  - Sends POST request to `/api/login` (backend)
  - Redirects to dashboard on success
  - Displays error messages on failure
- **Dashboard Page:**
  - Shown after successful login
  - Includes logout button
  - Future features will be added here
- **APL Page:**
  - Allows site selection
  - Generates APL number via API
  - Provides grid for item entry
  - Includes calendar pickers
  - Auto-fills APL number
  - Saves data to database with site ID logic (writes to APLItems table: aplNumber, siteId, itemId, startDate, endDate)
- **Program Page:**
  - Textbox for program name
  - Dropdown for site (Florida=1, Texas=56)
  - Dropdown for APL numbers, filtered by site and not already linked
  - Link button to transfer APL details to FloridaLink or TexasLink table
  - Dropdown refreshes after linking

## Backend API Endpoints
- `POST /api/register`: Stores new user in SQL Server
- `POST /api/login`: Authenticates user against SQL Server
- `GET /api/generate-apl`: Generates APL number
- `POST /api/save-apl`: Saves APL data to SQL Server
- `GET /api/apls?site=1|56`: Returns unlinked APLs for selected site
- `POST /api/link-apl`: Links APL to program and transfers details to correct table

## Security
- Passwords are stored as plain text (for demo; should be hashed in production)
- CORS enabled for frontend-backend communication
- Parameterized queries used for all database writes

## Deployment
- Frontend and backend run together using `npm run dev` (concurrently)
- Backend runs on port 5001, frontend on port 5173

## Future Technical Enhancements
- Password hashing and validation
- JWT-based authentication and session management
- Role-based access control
- API rate limiting and logging
- Audit logging for user actions via stored procedures

## ELK Stack Integration (Log Management & Analytics)

### Architecture Addition
- **Log Management:** ELK stack (Elasticsearch, Logstash, Kibana) via Docker Compose
- **Log Forwarding:** Node.js backend streams structured logs to Logstash (TCP port 5000)
- **Indexing & Visualization:** Logstash indexes logs in Elasticsearch; Kibana provides dashboards and search

### Implementation Details
- Logging utility added to backend (`server/index.js`) for key API events (register, login, save-apl, link-apl)
- Log format: JSON objects with event type, status, user/email, and timestamp
- Logstash pipeline configured to receive logs and index to `sample-logs`

### Setup Instructions
1. Start ELK stack: `docker compose up -d`
2. Run backend as usual; logs are sent automatically
3. Access Kibana at http://localhost:5601
4. Search and visualize logs in the `sample-logs` index

### Future Enhancements
- Expand logging to frontend events and errors
- Add custom Kibana dashboards for instructors/admins

---
*This document will be updated as technical changes are made.*

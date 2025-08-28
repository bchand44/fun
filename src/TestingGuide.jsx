import React, { useState } from 'react';

const foundations = [
  {
    title: 'Why Test? The Strategic Imperative',
    content:
      'Neglecting software testing can lead to catastrophic failures, financial loss, and damaged reputation. From aviation disasters to massive data breaches, history shows that thorough testing is a vital mechanism for enterprise risk management and protecting a brand\'s most valuable assets.'
  },
  {
    title: 'Fault vs. Failure',
    content:
      'A Fault (or Bug) is a hidden mistake in the code. A Failure is the observable result of that fault, where the software deviates from expected behavior. Testing aims to find faults before they cause failures for the end-user.'
  },
  {
    title: 'Core Testing Principles',
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Testing shows the presence of defects, not their absence.</li>
        <li>Exhaustive testing is impossible.</li>
        <li>Early testing saves time and money.</li>
        <li>Testing is context-dependent.</li>
      </ul>
    )
  }
];

const stlcStages = [
  {
    title: 'Requirement Analysis',
    content: 'Review software requirements to understand functionalities and identify ambiguities. Define the scope of testing.'
  },
  {
    title: 'Test Planning',
    content: 'Draft a comprehensive test plan outlining strategy, objectives, tools, and estimated effort/cost.'
  },
  {
    title: 'Test Case Development',
    content: 'Design detailed test cases and prepare necessary test data.'
  },
  {
    title: 'Environment Setup',
    content: 'Configure hardware, software, and network settings required to execute the tests.'
  },
  {
    title: 'Test Execution',
    content: 'Run prepared test cases, log and report any defects.'
  },
  {
    title: 'STLC Closure',
    content: 'Document test results and formally sign off on application quality.'
  }
];

const methodologyTabs = [
  {
    id: 'waterfall',
    label: 'Waterfall',
    content: (
      <div>
        <h5 className="fw-bold mb-2">The Waterfall Model</h5>
        <ul className="list-disc ms-4 mb-2">
          <li>Linear, sequential approach; each phase completed before the next.</li>
          <li>Testing is a distinct phase after development.</li>
          <li>Best for stable, well-defined requirements.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'agile',
    label: 'Agile',
    content: (
      <div>
        <h5 className="fw-bold mb-2">The Agile Model</h5>
        <ul className="list-disc ms-4 mb-2">
          <li>Iterative, flexible, and collaborative.</li>
          <li>Testing is integrated and ongoing throughout each sprint.</li>
          <li>Best for complex, evolving requirements.</li>
        </ul>
      </div>
    )
  }
];

const levels = [
  { num: 1, title: 'Unit Testing', desc: 'Testing individual components in isolation.' },
  { num: 2, title: 'Integration Testing', desc: 'Verifying interactions between combined components.' },
  { num: 3, title: 'System Testing', desc: 'Evaluating the complete, integrated system.' },
  { num: 4, title: 'Acceptance Testing', desc: 'Final validation to ensure software meets user needs.' }
];

// Quiz questions and component
const quizQuestions = [
  {
    question: 'What is the main goal of software testing?',
    options: [
      'To prove there are no bugs',
      'To find defects before users do',
      'To write code faster',
      'To improve hardware performance'
    ],
    answer: 1
  },
  {
    question: 'Which testing level focuses on individual components?',
    options: [
      'System Testing',
      'Integration Testing',
      'Unit Testing',
      'Acceptance Testing'
    ],
    answer: 2
  },
  {
    question: 'In Agile, when does testing occur?',
    options: [
      'Only after development',
      'At the end of the project',
      'Continuously throughout each sprint',
      'Never'
    ],
    answer: 2
  }
];
function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const handleOption = idx => {
    setSelected(idx);
    setShowAnswer(true);
    if (idx === quizQuestions[current].answer) setScore(score + 1);
  };
  const next = () => {
    setCurrent(current + 1);
    setSelected(null);
    setShowAnswer(false);
  };
  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: 500 }}>
      <div className="card-body">
        {current < quizQuestions.length ? (
          <>
            <h5 className="mb-3">{quizQuestions[current].question}</h5>
            <ul className="list-group mb-3">
              {quizQuestions[current].options.map((opt, idx) => (
                <li
                  key={idx}
                  className={`list-group-item ${selected === idx ? 'active' : ''}`}
                  style={{ cursor: showAnswer ? 'default' : 'pointer' }}
                  onClick={() => !showAnswer && handleOption(idx)}
                >
                  {opt}
                </li>
              ))}
            </ul>
            {showAnswer && (
              <div className={`alert ${selected === quizQuestions[current].answer ? 'alert-success' : 'alert-danger'}`}>
                {selected === quizQuestions[current].answer ? 'Correct!' : `Incorrect. Correct answer: ${quizQuestions[current].options[quizQuestions[current].answer]}`}
              </div>
            )}
            {showAnswer && (
              <button className="btn btn-primary mt-2" onClick={next} disabled={current === quizQuestions.length - 1}>Next</button>
            )}
          </>
        ) : (
          <div className="text-center">
            <h5 className="mb-3">Quiz Complete!</h5>
            <div className="alert alert-info">Your score: {score} / {quizQuestions.length}</div>
            <button className="btn btn-outline-primary" onClick={() => { setCurrent(0); setScore(0); }}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TestingGuide() {
  const [active, setActive] = useState(null);
  const [activeStage, setActiveStage] = useState(null);
  const [activeTab, setActiveTab] = useState('waterfall');
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold" style={{ color: '#2a5298' }}>Software Testing Guide</h2>
      <nav className="mb-5 d-flex justify-content-center gap-4">
        <a href="#foundations" className="btn btn-outline-primary">Foundations</a>
        <a href="#process" className="btn btn-outline-primary">Process</a>
        <a href="#framework" className="btn btn-outline-primary">Framework</a>
        <a href="#toolkit" className="btn btn-outline-primary">Toolkit</a>
        <a href="#career" className="btn btn-outline-primary">Career Roadmap</a>
      </nav>
      {/* Foundations Section */}
      <section id="foundations" className="mb-5">
        <h3 className="mb-3 text-center">The Foundations of Quality</h3>
        <div className="row g-4 justify-content-center">
          {foundations.map((item, idx) => (
            <div key={idx} className="col-md-4">
              <div className="card shadow-sm h-100" onClick={() => setActive(idx)} style={{ cursor: 'pointer', border: active === idx ? '2px solid #2a5298' : 'none' }}>
                <div className="card-body">
                  <h5 className="card-title text-primary">{item.title}</h5>
                  <div className="card-text">
                    {active === idx ? item.content : <span className="text-muted">Click to reveal</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Process Section */}
      <section id="process" className="mb-5">
        <h3 className="mb-3 text-center">The Development & Testing Process</h3>
        <div className="mb-4">
          <h5 className="fw-bold mb-2 text-center">Software Testing Life Cycle (STLC)</h5>
          <div className="row g-3 justify-content-center">
            {stlcStages.map((stage, idx) => (
              <div key={idx} className="col-md-4">
                <div className={`card shadow-sm h-100 ${activeStage === idx ? 'border-primary' : ''}`} onClick={() => setActiveStage(idx)} style={{ cursor: 'pointer' }}>
                  <div className="card-body">
                    <h6 className="card-title fw-bold text-primary">{stage.title}</h6>
                    <div className="card-text">
                      {activeStage === idx ? stage.content : <span className="text-muted">Click to reveal</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h5 className="fw-bold mb-2 text-center">Methodologies: Waterfall vs. Agile</h5>
          <div className="d-flex justify-content-center mb-3 gap-2">
            {methodologyTabs.map(tab => (
              <button key={tab.id} className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
            ))}
          </div>
          <div className="bg-white p-4 rounded shadow-sm mx-auto" style={{ maxWidth: 600 }}>
            {methodologyTabs.find(tab => tab.id === activeTab).content}
          </div>
        </div>
      </section>
      {/* Framework Section */}
      <section id="framework" className="mb-5">
        <h3 className="mb-3 text-center">The Framework of Testing</h3>
        <div className="row g-4 mb-4 justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Functional Testing</h5>
                <p>Verifies what a system does, ensuring features work as specified.</p>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Non-Functional Testing</h5>
                <p>Assesses how a system performs, focusing on performance, security, and usability.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h5 className="fw-bold mb-2 text-center">Four Levels of Testing</h5>
          <div className="row g-3 justify-content-center">
            {levels.map(lvl => (
              <div key={lvl.num} className="col-md-3">
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="display-6 mb-2">{lvl.num}</div>
                    <h6 className="fw-bold mb-2">{lvl.title}</h6>
                    <p className="text-muted mb-0">{lvl.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Toolkit Section */}
      <section id="toolkit" className="mb-5">
        <h3 className="mb-3 text-center">The Tester's Practical Toolkit</h3>
        <div className="row g-4 justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Anatomy of a Test Case</h5>
                <ul className="list-unstyled ms-2">
                  <li><strong className="text-primary">Test Case ID:</strong> TC-LOGIN-001</li>
                  <li><strong className="text-primary">Test Name:</strong> Verify successful login</li>
                  <li><strong className="text-primary">Preconditions:</strong> User account exists</li>
                  <li><strong className="text-primary">Test Steps:</strong> Navigate to login, enter credentials, click login</li>
                  <li><strong className="text-primary">Expected Result:</strong> User is redirected to dashboard</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Anatomy of a Bug Report</h5>
                <ul className="list-unstyled ms-2">
                  <li><strong className="text-primary">Title:</strong> [Login] User not redirected on success</li>
                  <li><strong className="text-primary">Environment:</strong> Chrome 123, Windows 11</li>
                  <li><strong className="text-primary">Steps to Reproduce:</strong> Go to login, enter credentials, click login</li>
                  <li><strong className="text-primary">Expected vs. Actual:</strong> Expected: Redirect; Actual: Remains on login</li>
                  <li><strong className="text-primary">Severity/Priority:</strong> High / Medium</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Interactive Quiz Section */}
      <section id="quiz" className="mb-5">
        <h3 className="mb-3 text-center">Quick Quiz: Test Your Knowledge</h3>
        <Quiz />
      </section>
      {/* Career Roadmap Section */}
      <section id="career" className="mb-5">
        <h3 className="mb-3 text-center">Your Career Roadmap</h3>
        <div className="row g-4 justify-content-center">
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h6 className="fw-bold mb-2">Junior QA Tester</h6>
                <p className="text-muted mb-0">Executes test cases, reports defects, learns fundamentals.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h6 className="fw-bold mb-2">QA Tester / Analyst</h6>
                <p className="text-muted mb-0">Designs test cases, analyzes requirements, deeper system understanding.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h6 className="fw-bold mb-2">Senior QA / Specialist</h6>
                <p className="text-muted mb-0">Mentors, specializes in automation, performance, or security.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h6 className="fw-bold mb-2">Test Lead / QA Manager</h6>
                <p className="text-muted mb-0">Leads teams, defines strategies, manages resources.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="alert alert-primary d-inline-block">
            <strong>Key Certification:</strong> ISTQB Certified Tester Foundation Level (CTFL)
          </div>
        </div>
      </section>
    </div>
  );
}

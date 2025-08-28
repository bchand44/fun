# Business Requirements Document (BRD)

## Project Title
UI Automation Learning Website

## Purpose
To provide students with a modern, interactive platform for learning and practicing UI automation concepts, including registration, login, dashboard, and advanced program linking features.

## Stakeholders
- Students
- Instructors
- Administrators

## Functional Requirements
1. **User Registration**
   - Users can register with name, email, and password.
   - Registration data is stored in a SQL Server database.
   - After registration, users can navigate to the login page.

2. **User Login**
   - Users can log in with email and password.
   - Credentials are validated against the database.
   - Successful login redirects to the dashboard.
   - Failed login shows error messages.

3. **Dashboard**
   - Displays a welcome message and future features.
   - Includes a logout button to return to the login page.

4. **Logout**
   - Users can log out from the dashboard.
   - Logout returns users to the login page.

5. **Add APL**
   - Users can generate and save APLs for Florida or Texas.
   - Calendar picker for start/end dates.
   - Data saved to APLItems table with site ID logic.

6. **Program Page**
   - Users enter a program name, select site, and choose an unlinked APL number.
   - Linking an APL updates the dropdown to remove the linked value and transfers details to FloridaLink or TexasLink table.
   - Success message shown after linking.

## Non-Functional Requirements
- Responsive and visually appealing UI (Bootstrap, Animate.css)
- Secure handling of user credentials
- Fast and reliable performance
- Easy navigation between pages

## Future Enhancements
- Add lessons and sandbox for UI automation practice
- Instructor/admin features
- User profile management
- Progress tracking
- Audit logging for user actions via stored procedures

## ELK Stack Integration (Log Management & Analytics)

### Overview
The application now integrates the ELK stack (Elasticsearch, Logstash, Kibana) for real-time log management and analytics. Key backend events (registration, login, APL save, APL link) are logged and streamed to Logstash, then indexed in Elasticsearch and visualized in Kibana.

### Functional Requirements (Added)
- Log all major backend events to Logstash for analysis and troubleshooting.
- Enable instructors/admins to review user activity and errors via Kibana dashboards.

### Non-Functional Requirements (Added)
- Centralized log management and search
- Real-time monitoring and troubleshooting
- Scalable log storage and visualization

### Setup Instructions
1. Run `docker compose up -d` to start Elasticsearch, Logstash, and Kibana.
2. Backend logs are sent to Logstash on port 5050.
3. Access Kibana at http://localhost:5601 to view and analyze logs.

---
*This document will be updated as new features are added.*

# BEE PROPERTY RWA Application
## Product Requirements Document (PRD)

**Product Name:** BEE PROPERTY RWA  
**Product Type:** Resident Welfare Association Management Web Application  
**Frontend Technology:** React.js  
**Document Version:** 1.0

---

## 1. Project Overview

BEE PROPERTY RWA is a web application designed to manage the daily activities of a residential community containing three apartment complexes:

- Golden Apartment
- Silver Apartment
- Diamond Apartment

The application helps RWA management handle resident registrations, common-area complaints, apartment facilities, announcements, maintenance information, and financial records through a single dashboard.

The frontend must provide a clear, responsive, role-based interface for both management and residents.

**Current development scope:** React.js frontend only. Use mock data and local state where necessary. Backend integration, authentication services, and database operations are outside the current scope.

## 2. Project Objectives

1. Manage flat owners and tenant registrations.
2. Allow the President to approve or reject resident access requests.
3. Track complaints about lifts, water, electricity, cleanliness, parks, and other common areas.
4. Manage shared facilities, including the gym, parks, and indoor sports areas.
5. Display facility availability and provide a booking interface.
6. Display maintenance dues, payments, expenses, and financial summaries.
7. Publish announcements and community notifications.
8. Provide separate dashboards and navigation based on user roles.

## 3. User Roles and Permissions

### 3.1 President

The President has the highest level of application access.

Features:
- View the overall community dashboard.
- View information across all three apartment complexes.
- Approve or reject flat-owner and tenant registration requests.
- View residents and apartment/flat details.
- Manage resident access and role assignments in the interface.
- View and monitor complaints.
- View facilities and booking activity.
- Publish community announcements.
- View financial summaries and reports.
- Review important activity and notifications.

### 3.2 Vice President

The Vice President manages daily operational activities.

Features:
- View assigned and outstanding complaints.
- Review and update complaint statuses.
- Assign complaints to maintenance staff or responsible persons using mock data.
- View complaint history.
- Monitor gym, park, and indoor sports facilities.
- View facility bookings and maintenance closures.
- View announcements and operational notifications.

Resident records continue to distinguish flat owners and tenants, but they are not selectable demo roles. Financial management tools are available to the President.

## 4. Apartment Management

The application must support these three apartment complexes:

1. Golden Apartment
2. Silver Apartment
3. Diamond Apartment

Requirements:
- Display apartment names and basic details.
- Display flat numbers and occupancy information.
- Show a separate President and Vice President for each apartment and for each of its Block A, Block B, and Block C.
- Display leadership details without adding apartment or block leaders to the global demo role switcher.
- Show flat owners and tenant information according to permissions.
- Filter residents, complaints, and relevant reports by apartment.
- Support an all-apartments view for authorized management users.
- Use configurable mock data rather than hardcoding apartment-specific logic throughout the UI.

## 5. Resident Registration and Approval

Create a registration interface for flat owners and tenants.

Suggested fields:
- Full name
- Email address
- Phone number
- Resident type: Flat Owner or Tenant
- Apartment selection
- Flat number
- Owner details, where applicable
- Supporting document status, represented with mock data if document upload is not implemented

Registration status:
- Pending
- Approved
- Rejected

Workflow:
1. A resident submits the registration form.
2. The request appears in the President's pending approval list.
3. The President reviews the details.
4. The President selects Approve or Reject.
5. The request status updates in the frontend.
6. Approved and rejected records appear in their respective filtered views.

For the frontend demo, use a role switcher or demo login to simulate approved users and different roles. Clearly distinguish this from real authentication.

## 6. Complaint Management

Residents must be able to submit and track complaints concerning shared areas.

### Complaint categories
- Lift / Elevator
- Water Supply
- Plumbing
- Electricity and Lighting
- Park and Garden
- Gym Equipment
- Indoor Sports
- Cleanliness
- Security
- Other

### Complaint form fields
- Complaint title
- Category
- Apartment
- Location or affected area
- Description
- Priority
- Optional image attachment UI

### Complaint statuses
- Submitted
- Acknowledged
- Assigned
- In Progress
- Resolved
- Closed
- Reopened

Features:
- Complaint list with search, filters, and sorting.
- Complaint detail view.
- Status badges.
- Complaint history and timeline.
- Assigned person display.
- Created date and last-updated date.
- Role-appropriate actions.
- Resident view limited to their own submitted complaints and permitted community information.

Use sample complaints to demonstrate different categories, priorities, and statuses.

## 7. Facility Management and Bookings

The application must display and manage these facilities:

### Gym
- Opening hours
- Availability
- Maintenance status
- Booking interface
- Booking history

### Parks
- Park details
- Opening hours
- Availability and maintenance announcements

### Indoor Sports
- Facility details
- Available time slots
- Booking requests
- Booking history

### Booking requirements
- Select a facility.
- Select a date.
- Choose an available time slot.
- Display booking status.
- Allow users to view or cancel their eligible bookings in the demo.
- Display unavailable slots and maintenance closures.
- Prevent overlapping confirmed bookings for the same facility in the frontend mock state.
- Allow different facilities to have bookings at the same time.

Booking statuses:
- Pending
- Confirmed
- Cancelled
- Rejected

The frontend availability check is for demonstration only. Final conflict prevention must eventually be enforced by the backend and database.

## 8. Finance and Maintenance Management

The President's finance dashboard must display:

- Total maintenance collected
- Pending maintenance dues
- Total recorded income
- Total recorded expenses
- Current available balance
- Recent transactions
- Monthly financial overview

### Financial records

Each transaction should display:
- Transaction description
- Transaction type: Income or Expense
- Amount in INR
- Apartment, where applicable
- Date
- Payment method or reference, when applicable
- Status

### Maintenance dues
- Resident or flat reference
- Apartment
- Billing period
- Amount due
- Amount paid
- Outstanding amount
- Payment status

Use the following calculation for the displayed balance:

**Available Balance = Opening Balance + Total Income − Total Expenses**

All amounts must be displayed in Indian Rupees (₹). Use mock financial records and do not simulate a real payment gateway.

## 9. Announcements and Notifications

Authorized management users can create announcements.

Announcement fields:
- Title
- Description
- Category
- Published date
- Target audience
- Apartment scope
- Priority

Example announcements:
- Water supply maintenance
- Lift repair schedule
- Park maintenance
- Gym closure
- Indoor sports event
- RWA meeting
- Maintenance payment reminder

Notifications should display unread/read states, timestamps, and relevant navigation links within the frontend.

## 10. Dashboards

### President Dashboard
Display:
- Total apartments
- Total flats and residents
- Pending registration approvals
- Open complaints
- Facility booking overview
- Maintenance and financial summary
- Recent announcements
- Recent activity

### Vice President Dashboard
Display:
- Open complaints
- High-priority complaints
- Complaints in progress
- Recently updated complaints
- Facility maintenance status
- Upcoming bookings

### President Finance Dashboard
Display:
- Total collections
- Outstanding dues
- Total expenses
- Available balance
- Recent transactions
- Monthly income-versus-expense chart

- Latest announcements
- Outstanding maintenance dues
- Notifications

## 11. Required Pages

1. Login / Demo Role Selection
2. Resident Registration
3. Dashboard
4. Apartment Management
5. Resident Directory
6. Registration Approvals
7. Complaint List
8. Submit Complaint
9. Complaint Details
10. Facility Overview
11. Facility Details and Booking
12. My Bookings
13. Finance Dashboard
14. Maintenance Dues
15. Transactions and Expenses
16. Announcements
17. Notifications
18. User Profile
19. Settings

Pages must be shown or hidden according to the selected demo role.

## 12. UI and Design Requirements

Use the supplied ZIVION-inspired color palette.

### Colors
- Primary Navy: `#0B1220`
- Electric Blue: `#3B82F6`
- Cyan Blue: `#22D3EE`
- Light Background: `#F8FAFC`
- Dark Background: `#060B14`
- Primary Text: `#111827`
- Secondary Text: `#64748B`
- Success: `#10B981`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Border: `#E2E8F0`
- White: `#FFFFFF`
- Light Blue: `#DBEAFE`
- Dark Blue: `#1E3A8A`
- Slate Gray: `#94A3B8`
- Dark Slate: `#1E293B`
- Light Cyan: `#CFFAFE`
- Indigo: `#6366F1`

### Design guidelines
- Professional residential-community management interface.
- Clean dashboard with summary cards, charts, tables, and status badges.
- Sidebar navigation on desktop.
- Responsive navigation on mobile.
- Clear typography and consistent spacing.
- Reusable buttons, inputs, modals, cards, and tables.
- Accessible form labels, focus indicators, and readable contrast.
- Search, filters, empty states, loading states, and validation messages.
- Use gradients sparingly for emphasis.
- Support a consistent visual language across all roles.
- Do not use unnecessary animations or cluttered layouts.

## 13. Frontend Technical Requirements

- Use React.js.
- Use the existing project structure and conventions.
- Reuse existing dependencies and components where suitable.
- Use React Router if routing is needed and is compatible with the existing project.
- Create reusable UI components.
- Separate page components, shared components, data, and styles in a way that fits the existing repository.
- Use local mock data and React state for demo interactions.
- Persist demo state in localStorage only where useful and appropriate.
- Keep role-specific navigation and UI permissions centralized.
- Validate required fields.
- Use consistent date, currency, and status formatting.
- Avoid duplicated components and repeated business logic.
- Do not expose secrets or add backend credentials to frontend files.

## 14. Non-Functional Requirements

- Responsive across desktop, tablet, and mobile.
- Clear and maintainable component structure.
- Consistent error and empty-state handling.
- Accessible navigation and form interactions.
- Good performance with realistic sample data.
- No dead buttons or unexplained placeholder pages.
- No false claims that frontend role switching provides production security.

## 15. MVP Acceptance Criteria

The frontend MVP is complete when:

1. The President and Vice President can be previewed through a demo role selector.
2. Each management role has suitable navigation and dashboard content.
3. The three apartment complexes are represented in the UI.
4. The President can approve or reject mock registration requests.
5. Residents can submit complaints and view their statuses.
6. Management can update mock complaint statuses.
7. Users can view gym, park, and indoor sports details.
8. Users can request bookings and see availability changes.
9. Overlapping bookings for the same facility are prevented in the demo state.
10. Finance pages display consistent mock income, expense, balance, and dues data.
11. Announcements and notifications can be viewed.
12. Core forms validate required fields.
13. Search and filters work where provided.
14. The application is responsive.
15. Existing project functionality is preserved.
16. The frontend runs using the existing project's documented commands.

## 16. Out of Scope for This Phase

- Backend API implementation
- Database schema and migrations
- Production authentication
- Real authorization enforcement
- Real payment processing
- Email or SMS delivery
- Actual document storage
- Server-side booking conflict prevention
- Production deployment

These can be integrated in later phases without redesigning the entire frontend.
Visual Design

Create a premium, modern residential-community management interface.

Use this color palette:

Primary Navy: #0B1220

Electric Blue: #3B82F6

Cyan Blue: #22D3EE

Light Background: #F8FAFC

Dark Background: #060B14

Card/Glass: #FFFFFFCC

Primary Text: #111827

Secondary Text: #64748B

Success: #10B981

Warning: #F59E0B

Error: #EF4444

Border: #E2E8F0

White: #FFFFFF

Light Blue: #DBEAFE

Dark Blue: #1E3A8A

Slate Gray: #94A3B8

Dark Slate: #1E293B

Light Cyan: #CFFAFE

Indigo: #6366F1

Use gradients sparingly:

#3B82F6 to #22D3EE

#6366F1 to #22D3EE

#060B14 to #0B1220

#1D4ED8 to #3B82F6
---

**End of PRD**

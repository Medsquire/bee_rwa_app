# BEE PROPERTY RWA - Resident Welfare Association Management Web Application

A modern, responsive, role-based Resident Welfare Association (RWA) management platform designed for the **BEE PROPERTY Enclave**, encompassing three apartment complexes:

- 🏢 **Golden Apartment** (Tower A — 12 floors, 120 units, central gym & banquet)
- 🏢 **Silver Apartment** (Tower B — 10 floors, 90 units, indoor badminton arena & solar backup)
- 🏢 **Diamond Apartment** (Tower C — 8 floors, 75 units, emerald central park view & TT lounge)

Built with **React 19**, **Vite**, **Vanilla CSS Design Tokens**, and **Lucide React Icons**, styled using the modern **ZIVION-inspired navy & electric blue palette**.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Running the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://127.0.0.1:5173/
```

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## 👥 Five Role Personas & Demo Role Switcher

You can test the application from any perspective using the **Demo Role Switcher** located in the top navigation bar or settings:

| Role | Persona | Permissions & Scope |
| :--- | :--- | :--- |
| **President** | Dr. Arvind Subramanian (C-801) | Highest authority; review & approve/reject resident applications; oversee complaints across all 3 towers; monitor facilities and treasury balances. |
| **Vice President** | Priya Sundaram (A-604) | Operational commander; assign complaints to technicians; track field milestones; manage facility uptime and schedule maintenance closures. |
| **Finance Manager** | Rajeshwar Rao (B-302) | Financial custodian; track maintenance dues collections; monitor ₹3.85L pending dues; log operational expenses; verify available treasury balance. |
| **Flat Owner** | Ananya Deshmukh (C-402) | Resident owner; submit common-area maintenance tickets; reserve gym and sports slots; view personal dues receipts; access AGM notices. |
| **Tenant** | Vikramaditya Sharma (A-205) | Resident tenant; report common-area issues; book amenities; view community circulars (restricted from financial reports & administrative approvals). |

---

## 📋 Comprehensive Feature Modules (19 Views)

1. **Dashboard (Role-Tailored)**:
   - **President View**: 3 complexes overview, occupancy metrics, approvals queue alert, complaint escalation tracker, available treasury.
   - **Vice President View**: Operations command, technician dispatch desk, facility operating uptime, booking traffic.
   - **Finance Manager View**: Formula reconciliation card (`Available Balance = Opening Balance + Total Income − Total Expenses`), collections vs dues, monthly chart.
   - **Resident View (Owner & Tenant)**: Personal flat specifications, active ticket tracking progress, upcoming reservations, notice board.
2. **Resident Registration**: Public onboarding portal for flat owners and tenants with field validations, document upload simulation, and submission to the President's approval desk.
3. **Registration Approvals**: President-only verification desk with applicant dossier, sale deed/lease proof audit, and Approve/Reject workflows with reviewer notes.
4. **Apartment Management**: Detailed infrastructure breakdown of Golden, Silver, and Diamond apartments including tower heights, elevator banks, reservoir storage, and flat directories.
5. **Resident Directory**: Full enclave resident registry with search, apartment filters, resident type classification, contact info, parking bays, and vehicle numbers.
6. **Complaints & Maintenance Register**:
   - 10 categories: Lift/Elevator, Water Supply, Plumbing, Electricity/Lighting, Park/Garden, Gym, Indoor Sports, Cleanliness, Security, Other.
   - Status transitions: *Submitted ➔ Acknowledged ➔ Assigned ➔ In Progress ➔ Resolved ➔ Closed ➔ Reopened*.
   - Filter by apartment, category, priority, and status.
7. **Submit Complaint Form**: Comprehensive form with title, category, priority, affected location, description, and optional photo attachment simulation.
8. **Complaint Details & Dispatch Modal**: Interactive drawer showing resolution history timeline, VP technician assignment dropdown, and progress notes.
9. **Facility Overview**: Central Fitness Gym, Emerald Central Park, Badminton & Squash Arena, and Table Tennis Lounge with live occupancy and VP maintenance mode toggling.
10. **Facility Booking Console**: Calendar date picker, interactive time slot chips, live conflict detection (prevents double-booking same facility on same slot), and instant booking confirmation.
11. **My Bookings**: Resident reservation log with active passes and 1-click booking cancellation.
12. **Finance Dashboard**: Treasury formula calculation, collection efficiency metrics, expense category breakdown, and monthly comparison charts.
13. **Maintenance Dues Register**: Flat-by-flat assessment table, overdue defaulters highlighting, and "Record Payment" modal with automated digital receipt generation.
14. **Transactions Ledger**: Complete income & expense audit register with voucher codes, payment instruments, and "Record Transaction" modal.
15. **Community Notice Board**: Priority-tagged announcements (Urgent, High, Medium, Low), apartment scoping (Golden, Silver, Diamond, or Enclave-wide), and management publish modal.
16. **Notifications Center**: Real-time alerts for approvals, complaints, facility bookings, and maintenance dues with mark-as-read controls.
17. **User Profile**: Personal resident ID card, flat specs, allocated parking bay, registered vehicle tags, and committee credentials.
18. **System Settings**: Dark Navy / Light Crisp theme toggle, notification preferences, and "Reset Demo Data" factory restore.

---

## 🎨 Color Palette & Design System

The application strictly adheres to the supplied **ZIVION Color Palette**:
- **Primary Navy**: `#0B1220`
- **Electric Blue**: `#3B82F6`
- **Cyan Blue**: `#22D3EE`
- **Dark Background**: `#060B14`
- **Light Background**: `#F8FAFC`
- **Primary Text**: `#111827` / `#F8FAFC`
- **Secondary Text**: `#64748B` / `#94A3B8`
- **Success**: `#10B981` | **Warning**: `#F59E0B` | **Error**: `#EF4444` | **Indigo**: `#6366F1`
- **Gradients**: Electric Cyan (`#3B82F6` ➔ `#22D3EE`), Indigo Cyan (`#6366F1` ➔ `#22D3EE`), Dark Navy (`#060B14` ➔ `#0B1220`)

---

## 💾 State Persistence & Demo Reset

All user modifications (new complaints, status updates, registrations, facility slot bookings, recorded payments, and announcements) are persisted interactively in `localStorage`. 

To reset all state back to initial sample defaults at any time, click the **Reset Icon** in the top navigation bar or go to **System Settings ➔ Reset Demo Data**.
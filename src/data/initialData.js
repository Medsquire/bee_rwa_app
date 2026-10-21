// BEE PROPERTY RWA - Initial Mock Dataset
// Supports: Golden Apartment, Silver Apartment, Diamond Apartment
// Roles: President, Vice President, Finance Manager, Flat Owner, Tenant

export const INITIAL_APARTMENTS = [
  {
    id: 'apt-golden',
    name: 'Golden Apartment',
    towerCode: 'Tower A',
    totalFlats: 120,
    occupiedFlats: 114,
    floors: 12,
    lifts: 4,
    reservoirCapacity: '100,000 Litres (88% Full)',
    monthlyPool: 342000,
    address: 'Block A, Bee Property Enclave, Outer Ring Road, Bangalore 560103',
    amenities: ['Central Gymnasium', 'Rooftop Banquet Hall', 'EV Charging Bays', 'Children Play Zone'],
    blocks: ['A-Wing (Flats 101-1204)', 'B-Wing (Flats 105-1208)'],
    securityContact: '+91 80 4123 7701',
    caretaker: 'Mr. Raghavan Pillai (+91 98451 22334)',
    color: '#F59E0B'
  },
  {
    id: 'apt-silver',
    name: 'Silver Apartment',
    towerCode: 'Tower B',
    totalFlats: 90,
    occupiedFlats: 86,
    floors: 10,
    lifts: 3,
    reservoirCapacity: '80,000 Litres (92% Full)',
    monthlyPool: 258000,
    address: 'Block B, Bee Property Enclave, Outer Ring Road, Bangalore 560103',
    amenities: ['Indoor Badminton & Squash', 'Yoga Studio', 'Solar Power Backup', 'Amphitheatre'],
    blocks: ['North Wing (Flats 101-1005)', 'South Wing (Flats 106-1009)'],
    securityContact: '+91 80 4123 7702',
    caretaker: 'Mr. Mahendra Joshi (+91 98452 33445)',
    color: '#94A3B8'
  },
  {
    id: 'apt-diamond',
    name: 'Diamond Apartment',
    towerCode: 'Tower C',
    totalFlats: 75,
    occupiedFlats: 71,
    floors: 8,
    lifts: 2,
    reservoirCapacity: '65,000 Litres (95% Full)',
    monthlyPool: 225000,
    address: 'Block C, Bee Property Enclave, Outer Ring Road, Bangalore 560103',
    amenities: ['Emerald Central Park View', 'Table Tennis Lounge', 'Rainwater Harvesting', 'Senior Citizen Pavilion'],
    blocks: ['East Wing (Flats 101-805)', 'West Wing (Flats 106-810)'],
    securityContact: '+91 80 4123 7703',
    caretaker: 'Mr. Suresh Nayak (+91 98453 44556)',
    color: '#22D3EE'
  }
];

export const INITIAL_ROLES = {
  president: {
    id: 'user-pres',
    roleKey: 'president',
    roleTitle: 'President (RWA Executive)',
    name: 'Dr. Arvind Subramanian',
    email: 'president@beeproperty.org',
    phone: '+91 98450 11223',
    apartment: 'Diamond Apartment',
    flatNumber: 'C-801 (Penthouse)',
    residentType: 'Flat Owner',
    avatar: 'AS',
    term: '2025 - 2027',
    permissions: ['all_apartments', 'approve_registrations', 'manage_complaints', 'facilities_oversight', 'publish_announcements', 'financial_reports', 'user_management']
  },
  vice_president: {
    id: 'user-vp',
    roleKey: 'vice_president',
    roleTitle: 'Vice President (Operations & Facilities)',
    name: 'Priya Sundaram',
    email: 'vp.operations@beeproperty.org',
    phone: '+91 98765 43210',
    apartment: 'Golden Apartment',
    flatNumber: 'A-604',
    residentType: 'Flat Owner',
    avatar: 'PS',
    term: '2025 - 2027',
    permissions: ['assign_complaints', 'update_complaints', 'manage_facilities', 'facility_closures', 'publish_announcements', 'view_residents']
  },
  finance_manager: {
    id: 'user-finance',
    roleKey: 'finance_manager',
    roleTitle: 'Finance Manager (Treasurer)',
    name: 'Rajeshwar Rao',
    email: 'finance@beeproperty.org',
    phone: '+91 97654 32109',
    apartment: 'Silver Apartment',
    flatNumber: 'B-302',
    residentType: 'Flat Owner',
    avatar: 'RR',
    term: '2025 - 2027',
    permissions: ['maintenance_collections', 'pending_dues', 'record_expenses', 'financial_dashboard', 'ledger_transactions', 'generate_receipts']
  },
  flat_owner: {
    id: 'user-owner',
    roleKey: 'flat_owner',
    roleTitle: 'Flat Owner (Resident)',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@gmail.com',
    phone: '+91 98112 33445',
    apartment: 'Diamond Apartment',
    flatNumber: 'C-402',
    residentType: 'Flat Owner',
    flatSize: '3 BHK (1,850 sq.ft)',
    parkingSlot: 'P2 - Bay 44',
    maintenanceStatus: 'Paid Up-to-date',
    duesBalance: 0,
    avatar: 'AD',
    permissions: ['submit_complaint', 'view_my_complaints', 'book_facilities', 'view_my_bookings', 'view_dues', 'view_announcements']
  },
  tenant: {
    id: 'user-tenant',
    roleKey: 'tenant',
    roleTitle: 'Tenant (Resident)',
    name: 'Vikramaditya Sharma',
    email: 'vikram.sharma@techcorp.in',
    phone: '+91 99223 44556',
    apartment: 'Golden Apartment',
    flatNumber: 'A-205',
    residentType: 'Tenant',
    flatSize: '2 BHK (1,250 sq.ft)',
    parkingSlot: 'P1 - Bay 19',
    landlordName: 'Mr. K. Ramesh (A-205 Owner)',
    leaseExpiry: '31 Dec 2027',
    avatar: 'VS',
    permissions: ['submit_complaint', 'view_my_complaints', 'book_facilities', 'view_my_bookings', 'view_announcements']
  }
};

export const INITIAL_REGISTRATION_REQUESTS = [
  {
    id: 'REG-2026-101',
    applicantName: 'Siddharth Varma',
    email: 'siddharth.varma@outlook.com',
    phone: '+91 98450 77881',
    residentType: 'Flat Owner',
    apartment: 'Diamond Apartment',
    flatNumber: 'C-603',
    ownerName: '',
    documentStatus: 'Sale Deed & Aadhar Uploaded',
    submittedAt: '2026-10-19 14:30',
    status: 'Pending',
    notes: 'Primary purchaser of newly transferred unit C-603. Verification pending.'
  },
  {
    id: 'REG-2026-102',
    applicantName: 'Tanvi Mukherjee',
    email: 'tanvi.m@gmail.com',
    phone: '+91 98860 12345',
    residentType: 'Tenant',
    apartment: 'Golden Apartment',
    flatNumber: 'A-502',
    ownerName: 'Sunil Gavaskar (Owner A-502)',
    documentStatus: 'Rental Agreement (11 Mos) & Police Verification Verified',
    submittedAt: '2026-10-18 10:15',
    status: 'Pending',
    notes: 'Moved in on Oct 15th. Landlord NOC attached.'
  },
  {
    id: 'REG-2026-103',
    applicantName: 'Karthik Narayanan',
    email: 'karthik.n@infonet.com',
    phone: '+91 97410 99882',
    residentType: 'Tenant',
    apartment: 'Silver Apartment',
    flatNumber: 'B-704',
    ownerName: 'G. Sundaram (Owner B-704)',
    documentStatus: 'Rental Agreement Uploaded',
    submittedAt: '2026-10-15 16:45',
    status: 'Approved',
    approvedBy: 'Dr. Arvind Subramanian (President)',
    approvedAt: '2026-10-16 11:20',
    notes: 'Verified with owner via phone call. Access granted.'
  },
  {
    id: 'REG-2026-104',
    applicantName: 'Gaurav Khandelwal',
    email: 'gaurav.k@yahoo.com',
    phone: '+91 99001 22334',
    residentType: 'Flat Owner',
    apartment: 'Golden Apartment',
    flatNumber: 'A-1102',
    ownerName: '',
    documentStatus: 'Incomplete Title Deed',
    submittedAt: '2026-10-12 09:30',
    status: 'Rejected',
    rejectedBy: 'Dr. Arvind Subramanian (President)',
    rejectedAt: '2026-10-13 14:10',
    notes: 'Owner name mismatch on sale deed. Requested re-submission with updated stamp certificate.'
  },
  {
    id: 'REG-2026-105',
    applicantName: 'Meera & Rohan Sen',
    email: 'meera.sen@gmail.com',
    phone: '+91 98300 44556',
    residentType: 'Flat Owner',
    apartment: 'Silver Apartment',
    flatNumber: 'B-405',
    ownerName: '',
    documentStatus: 'Possession Letter & Electricity Bill Uploaded',
    submittedAt: '2026-10-20 18:20',
    status: 'Pending',
    notes: 'Purchased flat from resale. All clearance certificates submitted.'
  }
];

export const INITIAL_RESIDENTS_DIRECTORY = [
  { id: 'res-1', name: 'Dr. Arvind Subramanian', apartment: 'Diamond Apartment', flat: 'C-801', type: 'Flat Owner', phone: '+91 98450 11223', email: 'president@beeproperty.org', status: 'Active', vehicles: 'KA-01-MJ-2020 (BMW 330i)', parking: 'P2-01' },
  { id: 'res-2', name: 'Priya Sundaram', apartment: 'Golden Apartment', flat: 'A-604', type: 'Flat Owner', phone: '+91 98765 43210', email: 'priya.sundaram@gmail.com', status: 'Active', vehicles: 'KA-03-NB-4512 (Honda City)', parking: 'P1-42' },
  { id: 'res-3', name: 'Rajeshwar Rao', apartment: 'Silver Apartment', flat: 'B-302', type: 'Flat Owner', phone: '+91 97654 32109', email: 'rajeshwar.rao@finance.com', status: 'Active', vehicles: 'KA-04-MK-8877 (Hyundai Creta)', parking: 'P2-18' },
  { id: 'res-4', name: 'Ananya Deshmukh', apartment: 'Diamond Apartment', flat: 'C-402', type: 'Flat Owner', phone: '+91 98112 33445', email: 'ananya.deshmukh@gmail.com', status: 'Active', vehicles: 'KA-05-NN-1090 (Tata Nexon EV)', parking: 'P2-44' },
  { id: 'res-5', name: 'Vikramaditya Sharma', apartment: 'Golden Apartment', flat: 'A-205', type: 'Tenant', phone: '+91 99223 44556', email: 'vikram.sharma@techcorp.in', status: 'Active', vehicles: 'KA-51-EF-3321 (Kia Seltos)', parking: 'P1-19' },
  { id: 'res-6', name: 'Amitabh & Jaya Roy', apartment: 'Silver Apartment', flat: 'B-501', type: 'Flat Owner', phone: '+91 98201 66778', email: 'amitabh.roy@royconsulting.com', status: 'Active', vehicles: 'KA-01-AA-9900 (Audi A4)', parking: 'P2-22' },
  { id: 'res-7', name: 'Neha Singhania', apartment: 'Golden Apartment', flat: 'A-803', type: 'Tenant', phone: '+91 98455 77665', email: 'neha.singhania@designhub.co', status: 'Active', vehicles: 'KA-03-XX-1122 (Vespa Scooter)', parking: 'P1-08' },
  { id: 'res-8', name: 'Col. Ranjit Verma (Retd.)', apartment: 'Diamond Apartment', flat: 'C-201', type: 'Flat Owner', phone: '+91 94480 33221', email: 'col.ranjit@gmail.com', status: 'Active', vehicles: 'KA-02-ZZ-4400 (Toyota Fortuner)', parking: 'P2-09' },
  { id: 'res-9', name: 'Harpreet Singh Chadha', apartment: 'Silver Apartment', flat: 'B-802', type: 'Flat Owner', phone: '+91 98102 55443', email: 'harpreet.chadha@logistics.in', status: 'Active', vehicles: 'KA-04-MM-6677 (Mahindra XUV700)', parking: 'P2-35' },
  { id: 'res-10', name: 'Deepa & Senthil Nathan', apartment: 'Golden Apartment', flat: 'A-1001', type: 'Flat Owner', phone: '+91 98401 88990', email: 'senthil.nathan@biopharma.org', status: 'Active', vehicles: 'KA-05-PQ-5544 (MG ZS EV)', parking: 'P1-50' },
  { id: 'res-11', name: 'Karthik Narayanan', apartment: 'Silver Apartment', flat: 'B-704', type: 'Tenant', phone: '+91 97410 99882', email: 'karthik.n@infonet.com', status: 'Active', vehicles: 'KA-03-JJ-9988 (Swift)', parking: 'P2-14' }
];

export const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-2026-081',
    title: 'Passenger Lift #2 Making Jerking Sound & Stalling at 7th Floor',
    category: 'Lift / Elevator',
    apartment: 'Golden Apartment',
    location: 'Tower A - Central Passenger Lift #2 (Floor 6-8)',
    description: 'During morning peak hours, the elevator violently shakes between 6th and 7th floor and displays sensor door error E-44. Otis technician emergency callout needed.',
    priority: 'Urgent',
    status: 'In Progress',
    submittedBy: 'Vikramaditya Sharma (A-205)',
    submittedByRole: 'Tenant',
    assignedTo: 'Sanjay Kumar (Otis AMC Lead Engineer)',
    assignedDate: '2026-10-21 09:15',
    createdAt: '2026-10-21 08:30',
    updatedAt: '2026-10-21 11:45',
    hasAttachment: true,
    history: [
      { timestamp: '2026-10-21 08:30', text: 'Complaint submitted by Vikramaditya Sharma (A-205)', author: 'Resident' },
      { timestamp: '2026-10-21 08:45', text: 'Acknowledged by Vice President Priya Sundaram', author: 'Vice President' },
      { timestamp: '2026-10-21 09:15', text: 'Assigned to Otis AMC Lead Sanjay Kumar. Service ticket #OTIS-8829 generated.', author: 'Vice President' },
      { timestamp: '2026-10-21 11:45', text: 'Technician on site. Guide rail realignment in progress. ETA 3 PM.', author: 'Operations' }
    ]
  },
  {
    id: 'CMP-2026-082',
    title: 'Low Water Pressure in Master Restroom & Kitchen Line',
    category: 'Water Supply',
    apartment: 'Diamond Apartment',
    location: 'Tower C - West Wing 4th & 5th Floor Line',
    description: 'Since yesterday evening overhead pneumatic pressure pump is cycling rapidly, causing trickling flow in bathrooms.',
    priority: 'High',
    status: 'Assigned',
    submittedBy: 'Ananya Deshmukh (C-402)',
    submittedByRole: 'Flat Owner',
    assignedTo: 'Ramesh Babu (Chief Plumbing Contractor)',
    assignedDate: '2026-10-20 17:30',
    createdAt: '2026-10-20 16:00',
    updatedAt: '2026-10-20 17:30',
    hasAttachment: false,
    history: [
      { timestamp: '2026-10-20 16:00', text: 'Complaint logged by Ananya Deshmukh', author: 'Resident' },
      { timestamp: '2026-10-20 17:30', text: 'Assigned to Ramesh Babu to inspect booster pump pressure valve.', author: 'Vice President' }
    ]
  },
  {
    id: 'CMP-2026-083',
    title: 'Jogging Track Pathway Lighting Broken Near North Gazebo',
    category: 'Electricity and Lighting',
    apartment: 'Diamond Apartment',
    location: 'Emerald Central Park - North Walking Loop',
    description: '3 consecutive bollard LED solar lights are completely dark, creating a tripping hazard for evening walkers.',
    priority: 'Medium',
    status: 'Resolved',
    submittedBy: 'Col. Ranjit Verma (C-201)',
    submittedByRole: 'Flat Owner',
    assignedTo: 'Rajesh Verma (Senior Electrician)',
    assignedDate: '2026-10-18 10:00',
    createdAt: '2026-10-17 19:20',
    updatedAt: '2026-10-19 14:10',
    hasAttachment: true,
    history: [
      { timestamp: '2026-10-17 19:20', text: 'Complaint submitted by Col. Ranjit Verma', author: 'Resident' },
      { timestamp: '2026-10-18 10:00', text: 'Assigned to Rajesh Verma (Electrician)', author: 'Vice President' },
      { timestamp: '2026-10-19 14:10', text: 'New waterproof LED drivers installed and dusk-to-dawn sensors tested. Resolved.', author: 'Rajesh Verma' }
    ]
  },
  {
    id: 'CMP-2026-084',
    title: 'Gym Treadmill #3 Belt Slipping & Incline Calibration Error',
    category: 'Gym Equipment',
    apartment: 'Golden Apartment',
    location: 'Central Gymnasium - Cardio Section',
    description: 'LifeFitness Treadmill 3 displays error ERR-02 whenever incline exceeds 4%. Belt slippage observed.',
    priority: 'Medium',
    status: 'Submitted',
    submittedBy: 'Vikramaditya Sharma (A-205)',
    submittedByRole: 'Tenant',
    assignedTo: 'Unassigned',
    assignedDate: '',
    createdAt: '2026-10-21 07:10',
    updatedAt: '2026-10-21 07:10',
    hasAttachment: false,
    history: [
      { timestamp: '2026-10-21 07:10', text: 'Complaint submitted by Vikramaditya Sharma', author: 'Resident' }
    ]
  },
  {
    id: 'CMP-2026-085',
    title: 'Seepage in Basement P2 Near Pillar 34 Adjacent to Sump Tank',
    category: 'Plumbing',
    apartment: 'Silver Apartment',
    location: 'Silver Tower - Basement P2 (Pillars 34-36)',
    description: 'Minor continuous seepage pooling near parking slot B-18. Smells like raw treated water from overflow channel.',
    priority: 'High',
    status: 'In Progress',
    submittedBy: 'Rajeshwar Rao (B-302)',
    submittedByRole: 'Flat Owner',
    assignedTo: 'Ramesh Babu (Plumbing Team)',
    assignedDate: '2026-10-19 11:00',
    createdAt: '2026-10-19 08:45',
    updatedAt: '2026-10-20 15:30',
    hasAttachment: true,
    history: [
      { timestamp: '2026-10-19 08:45', text: 'Complaint submitted by Rajeshwar Rao', author: 'Resident' },
      { timestamp: '2026-10-19 11:00', text: 'Assigned to Ramesh Babu', author: 'Vice President' },
      { timestamp: '2026-10-20 15:30', text: 'Overflow float valve adjusted; waterproofing chemical coat applied on sump outer wall.', author: 'Ramesh Babu' }
    ]
  },
  {
    id: 'CMP-2026-086',
    title: 'Badminton Court Net Post Tension Wire Broken',
    category: 'Indoor Sports',
    apartment: 'Silver Apartment',
    location: 'Sports Annex Court #1',
    description: 'The tension crank mechanism on Court 1 net has snapped. Net is drooping 4 inches below ITTF height standards.',
    priority: 'Low',
    status: 'Acknowledged',
    submittedBy: 'Karthik Narayanan (B-704)',
    submittedByRole: 'Tenant',
    assignedTo: 'Mahendra Joshi (Sports Caretaker)',
    assignedDate: '2026-10-21 10:00',
    createdAt: '2026-10-20 21:00',
    updatedAt: '2026-10-21 10:00',
    hasAttachment: false,
    history: [
      { timestamp: '2026-10-20 21:00', text: 'Complaint submitted by Karthik Narayanan', author: 'Resident' },
      { timestamp: '2026-10-21 10:00', text: 'Acknowledged by VP Priya Sundaram; replacement wire ordered from Yonex vendor.', author: 'Vice President' }
    ]
  },
  {
    id: 'CMP-2026-087',
    title: 'Garbage Chute Blockage at 9th Floor A-Wing',
    category: 'Cleanliness',
    apartment: 'Golden Apartment',
    location: 'Tower A - 9th Floor Chute Hopper',
    description: 'Cardboard box jammed into the chute intake door. Debris backing up and producing odor.',
    priority: 'High',
    status: 'Closed',
    submittedBy: 'Neha Singhania (A-803)',
    submittedByRole: 'Tenant',
    assignedTo: 'Sunita Devi (Housekeeping Lead)',
    assignedDate: '2026-10-16 11:00',
    createdAt: '2026-10-16 10:15',
    updatedAt: '2026-10-16 15:20',
    hasAttachment: false,
    history: [
      { timestamp: '2026-10-16 10:15', text: 'Complaint registered', author: 'Resident' },
      { timestamp: '2026-10-16 11:00', text: 'Assigned to Housekeeping', author: 'Vice President' },
      { timestamp: '2026-10-16 13:40', text: 'Obstruction cleared with hydraulic snake rod; chute sanitized with chlorine wash.', author: 'Sunita Devi' },
      { timestamp: '2026-10-16 15:20', text: 'Verified by resident and closed.', author: 'Resident' }
    ]
  },
  {
    id: 'CMP-2026-088',
    title: 'Visitor Boom Barrier Sensor Sluggish at Main Gate',
    category: 'Security',
    apartment: 'Golden Apartment',
    location: 'Main Entry Gate 1',
    description: 'RFID sensor takes up to 20 seconds to read FASTag/Sticker for incoming resident vehicles, causing road congestion.',
    priority: 'Medium',
    status: 'Assigned',
    submittedBy: 'Dr. Arvind Subramanian (C-801)',
    submittedByRole: 'President',
    assignedTo: 'Vikram Singh (Security Chief)',
    assignedDate: '2026-10-20 18:00',
    createdAt: '2026-10-20 17:00',
    updatedAt: '2026-10-20 18:00',
    hasAttachment: false,
    history: [
      { timestamp: '2026-10-20 17:00', text: 'Complaint submitted by Dr. Arvind Subramanian', author: 'President' },
      { timestamp: '2026-10-20 18:00', text: 'Assigned to Security Chief for RFID scanner lens recalibration.', author: 'Vice President' }
    ]
  }
];

export const INITIAL_FACILITIES = [
  {
    id: 'fac-gym',
    name: 'Central Fitness Gymnasium',
    category: 'Gym',
    apartment: 'Golden Apartment',
    location: 'Golden Tower Ground Floor Annex',
    hours: '06:00 AM – 10:00 PM (Daily)',
    capacity: 25,
    currentOccupancy: 8,
    status: 'Available', // 'Available' | 'Maintenance' | 'Closed'
    maintenanceNotes: 'All 8 cardio machines and 14 strength stations functional. Sanitized every 3 hours.',
    rules: [
      'Proper gym attire and clean sports footwear mandatory.',
      'Wipe down machines after use with provided sanitizing wipes.',
      'Maximum 60 minutes session duration during peak hours (06:30-08:30 & 18:30-20:30).',
      'Personal trainers from outside require prior RWA desk pass.'
    ],
    amenities: ['Air Conditioned', 'Cardio Treadmills & Ellipticals', 'Free Weights Zone', 'Shower & Locker Room', 'First Aid Box'],
    slots: [
      '06:00 - 07:00', '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00',
      '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'
    ]
  },
  {
    id: 'fac-park',
    name: 'Emerald Central Park & Walking Loop',
    category: 'Parks',
    apartment: 'Diamond Apartment',
    location: 'Central Enclave (Bordering Diamond & Silver Towers)',
    hours: '05:00 AM – 09:30 PM (Daily)',
    capacity: 100,
    currentOccupancy: 18,
    status: 'Available',
    maintenanceNotes: 'Lawn trimmed on 18th Oct. Sprinklers run automatically 04:30 AM and 09:45 PM.',
    rules: [
      'Pets must be kept on short leashes at all times. Please scoop poop.',
      'No cycling or skateboards on synthetic jogging loop.',
      'Children under 8 must be accompanied by parents in the play area.',
      'Plucking flowers or walking on decorative grass beds strictly prohibited.'
    ],
    amenities: ['Synthetic Tartan Jogging Track (600m)', 'Children Sensory Play Park', 'Senior Citizen Bamboo Pavilion', 'Aroma Herbal Garden', 'Bollard Solar Lighting'],
    slots: [
      '06:00 - 08:00 (Morning Yoga & Walk)',
      '17:00 - 19:00 (Evening Stroll)',
      '19:00 - 21:00 (Night Walk)'
    ]
  },
  {
    id: 'fac-badminton',
    name: 'Badminton & Squash Sports Arena',
    category: 'Indoor Sports',
    apartment: 'Silver Apartment',
    location: 'Silver Tower Sports Annex 1st Floor',
    hours: '06:00 AM – 09:00 PM (Daily)',
    capacity: 8,
    currentOccupancy: 4,
    status: 'Available',
    maintenanceNotes: 'Court 1 operational; Court 2 net wire tension being tuned today.',
    rules: [
      'Strictly non-marking gum sole shoes only. Barefoot or street shoes strictly disallowed.',
      'Court booking maximum 1 hour per flat per day.',
      'Please switch off arena floodlights and AC if leaving last.',
      'Guests must be accompanied by registered resident.'
    ],
    amenities: ['2 International BWF Approved Synthetic Courts', 'Squash Court with Glass Wall', 'LED 500 Lux Glare-Free Arena Lights', 'Drinking Water Dispenser'],
    slots: [
      '06:00 - 07:00', '07:00 - 08:00', '08:00 - 09:00',
      '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'
    ]
  },
  {
    id: 'fac-tt',
    name: 'Table Tennis & Billiards Lounge',
    category: 'Indoor Sports',
    apartment: 'Diamond Apartment',
    location: 'Diamond Tower Club Floor',
    hours: '08:00 AM – 10:00 PM (Daily)',
    capacity: 12,
    currentOccupancy: 2,
    status: 'Available',
    maintenanceNotes: '2 Stiga Pro TT tables and 1 English Slate Snooker table in mint condition.',
    rules: [
      'Return racquets, cues, and balls to the equipment locker after play.',
      'Food and soft drinks not permitted near billiard cloth table.',
      'Maximum 45 minutes table tenure if other residents are queued.'
    ],
    amenities: ['2 Competition Table Tennis Tables', '1 Championship Snooker Table', 'Resident Scoreboard', 'Lounge Seating'],
    slots: [
      '09:00 - 10:00', '10:00 - 11:00', '15:00 - 16:00',
      '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'
    ]
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'BK-2026-401',
    facilityId: 'fac-badminton',
    facilityName: 'Badminton & Squash Sports Arena',
    date: '2026-10-22',
    timeSlot: '07:00 - 08:00',
    bookedBy: 'Ananya Deshmukh',
    apartment: 'Diamond Apartment',
    flatNumber: 'C-402',
    status: 'Confirmed',
    purpose: 'Daily doubles badminton practice with neighbor',
    participants: 4,
    bookedAt: '2026-10-20 18:40'
  },
  {
    id: 'BK-2026-402',
    facilityId: 'fac-gym',
    facilityName: 'Central Fitness Gymnasium',
    date: '2026-10-22',
    timeSlot: '06:00 - 07:00',
    bookedBy: 'Vikramaditya Sharma',
    apartment: 'Golden Apartment',
    flatNumber: 'A-205',
    status: 'Confirmed',
    purpose: 'Early morning cardio workout session',
    participants: 1,
    bookedAt: '2026-10-21 07:45'
  },
  {
    id: 'BK-2026-403',
    facilityId: 'fac-tt',
    facilityName: 'Table Tennis & Billiards Lounge',
    date: '2026-10-22',
    timeSlot: '18:00 - 19:00',
    bookedBy: 'Rajeshwar Rao',
    apartment: 'Silver Apartment',
    flatNumber: 'B-302',
    status: 'Confirmed',
    purpose: 'Billiards game with guest',
    participants: 2,
    bookedAt: '2026-10-20 12:10'
  },
  {
    id: 'BK-2026-404',
    facilityId: 'fac-badminton',
    facilityName: 'Badminton & Squash Sports Arena',
    date: '2026-10-22',
    timeSlot: '19:00 - 20:00',
    bookedBy: 'Amitabh Roy',
    apartment: 'Silver Apartment',
    flatNumber: 'B-501',
    status: 'Confirmed',
    purpose: 'Squash evening match',
    participants: 2,
    bookedAt: '2026-10-21 09:00'
  },
  {
    id: 'BK-2026-405',
    facilityId: 'fac-gym',
    facilityName: 'Central Fitness Gymnasium',
    date: '2026-10-23',
    timeSlot: '18:00 - 19:00',
    bookedBy: 'Ananya Deshmukh',
    apartment: 'Diamond Apartment',
    flatNumber: 'C-402',
    status: 'Confirmed',
    purpose: 'Strength training',
    participants: 1,
    bookedAt: '2026-10-21 11:00'
  }
];

export const INITIAL_FINANCE_SUMMARY = {
  openingBalance: 1250000, // ₹ 12,50,000 opening corpus
  totalIncome: 2840000,    // ₹ 28,40,000 total recorded collections & revenues
  totalExpenses: 1675400,  // ₹ 16,75,400 total verified expenses
  // PRD calculation: Available Balance = Opening Balance + Total Income − Total Expenses
  // 1250000 + 2840000 - 1675400 = 2414600
  totalDuesPending: 385000,
  currentMonthCollectionRate: '89.4%',
  fiscalYear: 'FY 2026-27'
};

export const INITIAL_MAINTENANCE_DUES = [
  { id: 'DUE-101', flat: 'A-101', residentName: 'V. Krishna Murthy', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3500, amountPaid: 3500, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-05', mode: 'UPI' },
  { id: 'DUE-102', flat: 'A-205', residentName: 'Vikramaditya Sharma / K. Ramesh', apartment: 'Golden Apartment', type: 'Tenant', billingPeriod: 'October 2026', amountDue: 3000, amountPaid: 3000, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-07', mode: 'NEFT' },
  { id: 'DUE-103', flat: 'A-502', residentName: 'Sunil Gavaskar', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3500, amountPaid: 0, outstanding: 3500, status: 'Overdue', dueDate: '2026-10-10', paidDate: null, mode: '-' },
  { id: 'DUE-104', flat: 'A-604', residentName: 'Priya Sundaram', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 4000, amountPaid: 4000, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-02', mode: 'NetBanking' },
  { id: 'DUE-105', flat: 'A-803', residentName: 'Neha Singhania', apartment: 'Golden Apartment', type: 'Tenant', billingPeriod: 'October 2026', amountDue: 3500, amountPaid: 3500, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-08', mode: 'UPI' },
  { id: 'DUE-106', flat: 'A-1102', residentName: 'Gaurav Khandelwal', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 4000, amountPaid: 2000, outstanding: 2000, status: 'Partial', dueDate: '2026-10-10', paidDate: '2026-10-09', mode: 'Cheque' },
  { id: 'DUE-107', flat: 'B-201', residentName: 'Harish Chandra', apartment: 'Silver Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3200, amountPaid: 3200, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-04', mode: 'UPI' },
  { id: 'DUE-108', flat: 'B-302', residentName: 'Rajeshwar Rao', apartment: 'Silver Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3200, amountPaid: 3200, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-01', mode: 'UPI' },
  { id: 'DUE-109', flat: 'B-501', residentName: 'Amitabh Roy', apartment: 'Silver Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3500, amountPaid: 3500, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-06', mode: 'NEFT' },
  { id: 'DUE-110', flat: 'B-704', residentName: 'G. Sundaram / Karthik N.', apartment: 'Silver Apartment', type: 'Tenant', billingPeriod: 'October 2026', amountDue: 3200, amountPaid: 0, outstanding: 3200, status: 'Overdue', dueDate: '2026-10-10', paidDate: null, mode: '-' },
  { id: 'DUE-111', flat: 'B-802', residentName: 'Harpreet Singh Chadha', apartment: 'Silver Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3800, amountPaid: 3800, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-03', mode: 'UPI' },
  { id: 'DUE-112', flat: 'C-201', residentName: 'Col. Ranjit Verma', apartment: 'Diamond Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3800, amountPaid: 3800, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-02', mode: 'NEFT' },
  { id: 'DUE-113', flat: 'C-402', residentName: 'Ananya Deshmukh', apartment: 'Diamond Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3800, amountPaid: 3800, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-04', mode: 'UPI' },
  { id: 'DUE-114', flat: 'C-603', residentName: 'Siddharth Varma', apartment: 'Diamond Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 4200, amountPaid: 0, outstanding: 4200, status: 'Overdue', dueDate: '2026-10-10', paidDate: null, mode: '-' },
  { id: 'DUE-115', flat: 'C-801', residentName: 'Dr. Arvind Subramanian', apartment: 'Diamond Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 4500, amountPaid: 4500, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-01', mode: 'NetBanking' }
];

export const INITIAL_TRANSACTIONS = [
  { id: 'TXN-901', description: 'October Maintenance Collections (Golden Tower)', type: 'Income', category: 'Maintenance Fees', amount: 310000, apartment: 'Golden Apartment', date: '2026-10-10', method: 'Payment Gateway / ECS', status: 'Completed', ref: 'COLL-GLD-1026' },
  { id: 'TXN-902', description: 'October Maintenance Collections (Silver Tower)', type: 'Income', category: 'Maintenance Fees', amount: 242000, apartment: 'Silver Apartment', date: '2026-10-10', method: 'Payment Gateway / ECS', status: 'Completed', ref: 'COLL-SLV-1026' },
  { id: 'TXN-903', description: 'October Maintenance Collections (Diamond Tower)', type: 'Income', category: 'Maintenance Fees', amount: 215000, apartment: 'Diamond Apartment', date: '2026-10-10', method: 'Payment Gateway / ECS', status: 'Completed', ref: 'COLL-DMD-1026' },
  { id: 'TXN-904', description: 'Otis Elevator Comprehensive AMC - Q3 Installment', type: 'Expense', category: 'Lifts AMC', amount: 185000, apartment: 'All Apartments', date: '2026-10-14', method: 'RTGS Transfer', status: 'Completed', ref: 'EXP-OTIS-771' },
  { id: 'TXN-905', description: 'BESCOM Common Area Electricity (Towers A, B & C)', type: 'Expense', category: 'Electricity / Utilities', amount: 245600, apartment: 'All Apartments', date: '2026-10-15', method: 'Online Auto-Debit', status: 'Completed', ref: 'BESCOM-99201' },
  { id: 'TXN-906', description: 'BWSSB & Emergency Water Tanker Supplies (14 Loads)', type: 'Expense', category: 'Water Supply', amount: 98000, apartment: 'All Apartments', date: '2026-10-16', method: 'NEFT', status: 'Completed', ref: 'H2O-BLR-441' },
  { id: 'TXN-907', description: 'Tiger Security Agency - 18 Security Personnel Staffing', type: 'Expense', category: 'Security Services', amount: 288000, apartment: 'All Apartments', date: '2026-10-05', method: 'Direct Bank Transfer', status: 'Completed', ref: 'SEC-TIGER-1002' },
  { id: 'TXN-908', description: 'CleanPro Facility Management - Housekeeping & Sanitization', type: 'Expense', category: 'Housekeeping', amount: 165000, apartment: 'All Apartments', date: '2026-10-05', method: 'Direct Bank Transfer', status: 'Completed', ref: 'CLN-PRO-881' },
  { id: 'TXN-909', description: 'Rooftop Banquet Hall Booking Charge (Diwali Pre-Event)', type: 'Income', category: 'Facility Rental', amount: 15000, apartment: 'Golden Apartment', date: '2026-10-17', method: 'UPI Pay', status: 'Completed', ref: 'HALL-RENT-55' },
  { id: 'TXN-910', description: 'Diesel Generator Fuel (800 Litres Ultra Low Sulfur)', type: 'Expense', category: 'Generator & Power', amount: 76800, apartment: 'All Apartments', date: '2026-10-18', method: 'Fleet Card', status: 'Completed', ref: 'DG-FUEL-1026' },
  { id: 'TXN-911', description: 'Landscape & Green Belt Garden Maintenance - Emerald Park', type: 'Expense', category: 'Park & Gardens', amount: 45000, apartment: 'Diamond Apartment', date: '2026-10-19', method: 'Cheque #88120', status: 'Completed', ref: 'GRN-EMR-310' },
  { id: 'TXN-912', description: 'E-Waste & Dry Cardboard Scrap Vendor Auction Revenue', type: 'Income', category: 'Miscellaneous Income', amount: 8400, apartment: 'All Apartments', date: '2026-10-20', method: 'Cash / Bank Deposit', status: 'Completed', ref: 'SCRAP-REV-09' }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ANN-301',
    title: 'Water Supply Interruption & Overhead Tank Deep Cleaning Drive',
    description: 'Please note that main overhead reservoir cleaning and chlorination for Golden & Silver towers will take place on Saturday, 25th October from 10:00 AM to 03:00 PM. Residents are requested to store adequate water for morning usage. Booster pumps will resume full pressure by 4:00 PM.',
    category: 'Water Supply',
    apartmentScope: 'Golden & Silver Apartments',
    targetAudience: 'All Residents',
    priority: 'Urgent',
    publishedBy: 'Priya Sundaram (Vice President)',
    publishedDate: '2026-10-21 09:00',
    pinned: true
  },
  {
    id: 'ANN-302',
    title: 'Annual General Body Meeting (AGM) 2026 & Financial Presentation',
    description: 'The RWA Management Committee cordially invites all flat owners and residents to the Annual General Body Meeting on Sunday, 8th November 2026 at 10:30 AM at the Rooftop Banquet Hall. The audited balance sheet and capital expenditure plans for solar roof expansion will be voted on. High tea provided.',
    category: 'RWA Meeting',
    apartmentScope: 'All Apartments',
    targetAudience: 'Flat Owners & Tenants',
    priority: 'High',
    publishedBy: 'Dr. Arvind Subramanian (President)',
    publishedDate: '2026-10-20 17:30',
    pinned: true
  },
  {
    id: 'ANN-303',
    title: 'Diwali Grand Festivities, Cultural Night & Food Stalls in Central Park',
    description: 'Celebrate Diwali with our community on Saturday, 31st October at Emerald Central Park! Cultural performances by resident children, musical night, eco-friendly diya lighting, and food stalls. Register your stall with the cultural subcommittee by 26th October.',
    category: 'Community Event',
    apartmentScope: 'All Apartments',
    targetAudience: 'All Residents',
    priority: 'Medium',
    publishedBy: 'Dr. Arvind Subramanian (President)',
    publishedDate: '2026-10-19 14:00',
    pinned: false
  },
  {
    id: 'ANN-304',
    title: 'Gymnasium Routine Equipment Maintenance - Sunday 02 PM to 05 PM',
    description: 'Routine quarterly servicing of treadmills, cross-trainers, and cable crossover systems is scheduled for Sunday, 26th October between 02:00 PM and 05:00 PM. Gymnasium will remain closed during this window for resident safety.',
    category: 'Facility Maintenance',
    apartmentScope: 'Golden Apartment',
    targetAudience: 'All Residents',
    priority: 'Low',
    publishedBy: 'Priya Sundaram (Vice President)',
    publishedDate: '2026-10-18 11:20',
    pinned: false
  },
  {
    id: 'ANN-305',
    title: 'Reminder: October Maintenance Dues Final Grace Period Ends Oct 25th',
    description: 'Dear Residents, maintenance dues for October 2026 were payable by October 10th. Flats with pending dues are requested to clear payments via the resident portal before October 25th to avoid a 2% per month late levy.',
    category: 'Finance Reminder',
    apartmentScope: 'All Apartments',
    targetAudience: 'Flat Owners & Tenants',
    priority: 'High',
    publishedBy: 'Rajeshwar Rao (Finance Manager)',
    publishedDate: '2026-10-17 10:00',
    pinned: false
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    roleTarget: 'president',
    title: 'New Resident Registration Pending Review',
    message: 'Siddharth Varma has applied for ownership verification in Diamond Apartment Flat C-603.',
    timestamp: '15 mins ago',
    read: false,
    type: 'approval',
    actionTab: 'approvals'
  },
  {
    id: 'notif-2',
    roleTarget: 'vice_president',
    title: 'Urgent Complaint Logged: Lift #2 Shaking',
    message: 'Passenger Lift #2 in Golden Apartment reported stalling at 7th floor. Technician Sanjay Kumar assigned.',
    timestamp: '1 hour ago',
    read: false,
    type: 'complaint',
    actionTab: 'complaints'
  },
  {
    id: 'notif-3',
    roleTarget: 'finance_manager',
    title: 'Maintenance Dues Update',
    message: '89.4% maintenance collected for October. ₹3,85,000 remains pending across 14 units.',
    timestamp: '3 hours ago',
    read: false,
    type: 'finance',
    actionTab: 'maintenance'
  },
  {
    id: 'notif-4',
    roleTarget: 'flat_owner',
    title: 'Facility Booking Confirmed',
    message: 'Your badminton court booking for tomorrow 07:00 AM - 08:00 AM is confirmed.',
    timestamp: 'Yesterday',
    read: true,
    type: 'facility',
    actionTab: 'my-bookings'
  },
  {
    id: 'notif-5',
    roleTarget: 'tenant',
    title: 'Complaint In-Progress Update',
    message: 'Technician is actively working on elevator guide rail at Tower A.',
    timestamp: '2 hours ago',
    read: false,
    type: 'complaint',
    actionTab: 'complaints'
  }
];

// BEE PROPERTY RWA - Initial Mock Dataset
// Supports: Golden Apartment (3 Towers: Golden Tower 1, Golden Tower 2, Golden Tower 3)
// Demo roles: President (Sujana) and Vice President (Kavaya)

export const INITIAL_APARTMENTS = [
  {
    id: 'apt-golden',
    name: 'Golden Apartment',
    towerCode: '3 Towers (GT-1, GT-2, GT-3)',
    totalFlats: 136,
    occupiedFlats: 128,
    floors: 12,
    lifts: 6,
    reservoirCapacity: '100,000 Litres (88% Full)',
    monthlyPool: 342000,
    address: 'Bee Property Enclave, Outer Ring Road, Bangalore 560103',
    amenities: ['Central Gymnasium', 'Rooftop Banquet Hall', 'EV Charging Bays', 'Children Play Zone', 'Otis Smart Elevators'],
    leadership: {
      president: 'Sujana',
      presidentTower: 'Golden Tower 1',
      presidentFlat: 'GT1-801 (Penthouse)',
      presidentPhone: '+91 98450 11223',
      vicePresident: 'Kavaya',
      vicePresidentTower: 'Golden Tower 2',
      vicePresidentFlat: 'GT2-604',
      vicePresidentPhone: '+91 98765 43210'
    },
    towers: [
      { id: 'gt-1', name: 'Golden Tower 1', code: 'Golden Tower 1', shortCode: 'GT-1', prefix: 'GT1', floors: 38, unitsPerFloor: 8, flats: 296, occupied: 275, lifts: 4, head: 'Sujana (President)', color: '#F59E0B' },
      { id: 'gt-2', name: 'Golden Tower 2', code: 'Golden Tower 2', shortCode: 'GT-2', prefix: 'GT2', floors: 35, unitsPerFloor: 8, flats: 270, occupied: 250, lifts: 4, head: 'Kavaya (Vice President)', color: '#EAB308' },
      { id: 'gt-3', name: 'Golden Tower 3', code: 'Golden Tower 3', shortCode: 'GT-3', prefix: 'GT3', floors: 32, unitsPerFloor: 8, flats: 256, occupied: 238, lifts: 4, head: 'RWA Service Desk', color: '#D97706' }
    ],
    blocks: [
      { id: 'golden-t1', name: 'Golden Tower 1', president: 'Sujana', flats: 48, lifts: 2 },
      { id: 'golden-t2', name: 'Golden Tower 2', president: 'Sujana', flats: 48, lifts: 2 },
      { id: 'golden-t3', name: 'Golden Tower 3', president: 'Sujana', flats: 40, lifts: 2 }
    ],
    securityContact: '+91 80 4123 7701',
    caretaker: 'Mr. Raghavan Pillai (+91 98451 22334)',
    color: '#F59E0B'
  }
];

export const INITIAL_ROLES = {
  president: {
    id: 'user-pres',
    roleKey: 'president',
    roleTitle: 'President (RWA Executive)',
    name: 'Sujana',
    username: 'sujana',
    email: 'sujana.president@beeproperty.org',
    phone: '+91 98450 11223',
    apartment: 'Golden Apartment',
    tower: 'Golden Tower 1',
    flatNumber: 'GT1-801 (Penthouse)',
    residentType: 'Flat Owner',
    avatar: 'SJ',
    term: '2025 - 2027',
    permissions: ['all_apartments', 'approve_registrations', 'manage_complaints', 'facilities_oversight', 'publish_announcements', 'financial_reports', 'user_management']
  },
  vice_president: {
    id: 'user-vp',
    roleKey: 'vice_president',
    roleTitle: 'Vice President (Operations & Facilities)',
    name: 'Kavaya',
    username: 'kavaya',
    email: 'kavaya.vp@beeproperty.org',
    phone: '+91 98765 43210',
    apartment: 'Golden Apartment',
    tower: 'Golden Tower 2',
    flatNumber: 'GT2-604',
    residentType: 'Flat Owner',
    avatar: 'KV',
    term: '2025 - 2027',
    permissions: ['assign_complaints', 'update_complaints', 'manage_facilities', 'facility_closures', 'publish_announcements', 'view_residents']
  },
};


export const INITIAL_REGISTRATION_REQUESTS = [
  {
    id: 'REG-2026-101',
    applicantName: 'Siddharth Varma',
    email: 'siddharth.varma@outlook.com',
    phone: '+91 98450 77881',
    residentType: 'Flat Owner',
    apartment: 'Golden Apartment',
    tower: 'Golden Tower 1',
    flatNumber: 'GT1-303',
    ownerName: '',
    documentStatus: 'Sale Deed & Aadhar Uploaded',
    submittedAt: '2026-10-19 14:30',
    status: 'Pending',
    notes: 'Primary purchaser of newly transferred unit GT1-303. Verification pending.'
  },
  {
    id: 'REG-2026-102',
    applicantName: 'Tanvi Mukherjee',
    email: 'tanvi.m@gmail.com',
    phone: '+91 98860 12345',
    residentType: 'Tenant',
    apartment: 'Golden Apartment',
    tower: 'Golden Tower 2',
    flatNumber: 'GT2-502',
    ownerName: 'Sunil Gavaskar (Owner GT2-502)',
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
    apartment: 'Golden Apartment',
    tower: 'Golden Tower 3',
    flatNumber: 'GT3-704',
    ownerName: 'G. Sundaram (Owner GT3-704)',
    documentStatus: 'Rental Agreement Uploaded',
    submittedAt: '2026-10-15 16:45',
    status: 'Approved',
    approvedBy: 'Sujana (President)',
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
    tower: 'Golden Tower 3',
    flatNumber: 'GT3-402',
    ownerName: '',
    documentStatus: 'Incomplete Title Deed',
    submittedAt: '2026-10-12 09:30',
    status: 'Rejected',
    rejectedBy: 'Sujana (President)',
    rejectedAt: '2026-10-13 14:10',
    notes: 'Owner name mismatch on sale deed. Requested re-submission with updated stamp certificate.'
  },
  {
    id: 'REG-2026-105',
    applicantName: 'Meera & Rohan Sen',
    email: 'meera.sen@gmail.com',
    phone: '+91 98300 44556',
    residentType: 'Flat Owner',
    apartment: 'Golden Apartment',
    tower: 'Golden Tower 1',
    flatNumber: 'GT1-405',
    ownerName: '',
    documentStatus: 'Possession Letter & Electricity Bill Uploaded',
    submittedAt: '2026-10-20 18:20',
    status: 'Pending',
    notes: 'Purchased flat from resale. All clearance certificates submitted.'
  }
];

// Base seed residents (including leadership and existing key entries)
const SEED_RESIDENTS = [
  { id: 'res-pres', name: 'Sujana', apartment: 'Golden Apartment', tower: 'Golden Tower 1', flat: 'GT1-801', type: 'Flat Owner', designation: 'President (RWA Executive)', phone: '+91 98450 11223', email: 'sujana.president@beeproperty.org', status: 'Active', vehicles: 'KA-01-MJ-2020 (BMW 330i)', parking: 'P1-0801' },
  { id: 'res-vp', name: 'Kavaya', apartment: 'Golden Apartment', tower: 'Golden Tower 2', flat: 'GT2-604', type: 'Flat Owner', designation: 'Vice President (Operations)', phone: '+91 98765 43210', email: 'kavaya.vp@beeproperty.org', status: 'Active', vehicles: 'KA-03-NB-4512 (Honda City)', parking: 'P2-0604' },
  { id: 'res-sec', name: 'Dr. Arvind Subramanian', apartment: 'Golden Apartment', tower: 'Golden Tower 1', flat: 'GT1-901', type: 'Flat Owner', designation: 'General Secretary', phone: '+91 98450 99999', email: 'arvind.subramanian@univ.org', status: 'Active', vehicles: 'KA-01-MJ-5566 (Mercedes C200)', parking: 'P1-0901' },
  { id: 'res-treas', name: 'Rajeshwar Rao', apartment: 'Golden Apartment', tower: 'Golden Tower 2', flat: 'GT2-302', type: 'Flat Owner', designation: 'Joint Treasurer', phone: '+91 97654 32109', email: 'rajeshwar.rao@finance.com', status: 'Active', vehicles: 'KA-04-MK-8877 (Hyundai Creta)', parking: 'P2-0302' },
  { id: 'res-cult', name: 'Monika Banerjee', apartment: 'Golden Apartment', tower: 'Golden Tower 3', flat: 'GT3-3001', type: 'Flat Owner', designation: 'Cultural Committee Head', phone: '+91 98311 22445', email: 'monika.b@iimr.ac.in', status: 'Active', vehicles: 'KA-02-MN-8844 (BMW X1)', parking: 'P3-3001' },
  { id: 'res-maint', name: 'Priya Sundaram', apartment: 'Golden Apartment', tower: 'Golden Tower 1', flat: 'GT1-604', type: 'Flat Owner', designation: 'Maintenance Committee', phone: '+91 98765 43211', email: 'priya.sundaram@gmail.com', status: 'Active', vehicles: 'KA-03-NB-9900 (Hyundai i20)', parking: 'P1-0604' },
  { id: 'res-secu', name: 'Col. Ranjit Verma (Retd.)', apartment: 'Golden Apartment', tower: 'Golden Tower 1', flat: 'GT1-201', type: 'Flat Owner', designation: 'Security Liaison', phone: '+91 94480 33221', email: 'col.ranjit@gmail.com', status: 'Active', vehicles: 'KA-02-ZZ-4400 (Toyota Fortuner)', parking: 'P1-0201' },
  { id: 'res-2', name: 'Vikramaditya Sharma', apartment: 'Golden Apartment', tower: 'Golden Tower 1', flat: 'GT1-205', type: 'Tenant', phone: '+91 99223 44556', email: 'vikram.sharma@techcorp.in', status: 'Active', vehicles: 'KA-51-EF-3321 (Kia Seltos)', parking: 'P1-0205' },
  { id: 'res-3', name: 'Neha Singhania', apartment: 'Golden Apartment', tower: 'Golden Tower 2', flat: 'GT2-803', type: 'Tenant', phone: '+91 98455 77665', email: 'neha.singhania@designhub.co', status: 'Active', vehicles: 'KA-03-XX-1122 (Vespa Scooter)', parking: 'P2-0803' },
  { id: 'res-4', name: 'Deepa & Senthil Nathan', apartment: 'Golden Apartment', tower: 'Golden Tower 3', flat: 'GT3-1001', type: 'Flat Owner', phone: '+91 98401 88990', email: 'senthil.nathan@biopharma.org', status: 'Active', vehicles: 'KA-05-PQ-5544 (MG ZS EV)', parking: 'P3-1001' },
  { id: 'res-5', name: 'Gaurav Khandelwal', apartment: 'Golden Apartment', tower: 'Golden Tower 3', flat: 'GT3-402', type: 'Flat Owner', phone: '+91 99001 22334', email: 'gaurav.k@yahoo.com', status: 'Active', vehicles: 'KA-04-AB-1234 (Tata Harrier)', parking: 'P3-0402' },
  { id: 'res-7', name: 'Amitabh & Jaya Roy', apartment: 'Golden Apartment', tower: 'Golden Tower 2', flat: 'GT2-501', type: 'Flat Owner', phone: '+91 98201 66778', email: 'amitabh.roy@royconsulting.com', status: 'Active', vehicles: 'KA-01-AA-9900 (Audi A4)', parking: 'P2-0501' },
  { id: 'res-8', name: 'Harpreet Singh Chadha', apartment: 'Golden Apartment', tower: 'Golden Tower 3', flat: 'GT3-802', type: 'Flat Owner', phone: '+91 98102 55443', email: 'harpreet.chadha@logistics.in', status: 'Active', vehicles: 'KA-04-MM-6677 (Mahindra XUV700)', parking: 'P3-0802' },
  { id: 'res-9', name: 'Karthik Narayanan', apartment: 'Golden Apartment', tower: 'Golden Tower 3', flat: 'GT3-704', type: 'Tenant', phone: '+91 97410 99882', email: 'karthik.n@infonet.com', status: 'Active', vehicles: 'KA-03-JJ-9988 (Swift)', parking: 'P3-0704' },
  { id: 'res-11', name: 'Ananya Deshmukh', apartment: 'Golden Apartment', tower: 'Golden Tower 1', flat: 'GT1-402', type: 'Flat Owner', phone: '+91 98112 33445', email: 'ananya.deshmukh@gmail.com', status: 'Active', vehicles: 'KA-05-NN-1090 (Tata Nexon EV)', parking: 'P1-0402' },
  { id: 'res-13', name: 'Vivek & Shalini Agrawal', apartment: 'Golden Apartment', tower: 'Golden Tower 1', flat: 'GT1-1504', type: 'Flat Owner', phone: '+91 98451 33442', email: 'vivek.agrawal@gmail.com', status: 'Active', vehicles: 'KA-01-EQ-1829 (Skoda Octavia)', parking: 'P1-1504' },
  { id: 'res-14', name: 'Naveen Chandran', apartment: 'Golden Apartment', tower: 'Golden Tower 1', flat: 'GT1-2202', type: 'Tenant', phone: '+91 98862 44551', email: 'naveen.c@fintech.io', status: 'Active', vehicles: 'KA-03-PL-7721 (Volkswagen Taigun)', parking: 'P1-2202' },
  { id: 'res-15', name: 'Rashmi Nambiar', apartment: 'Golden Apartment', tower: 'Golden Tower 1', flat: 'GT1-3505', type: 'Flat Owner', phone: '+91 97415 88992', email: 'rashmi.n@skyline.org', status: 'Active', vehicles: 'KA-04-MK-1100 (Volvo XC60)', parking: 'P1-3505' },
  { id: 'res-16', name: 'Rohan & Dia Sen', apartment: 'Golden Apartment', tower: 'Golden Tower 2', flat: 'GT2-1803', type: 'Flat Owner', phone: '+91 98205 99001', email: 'rohan.sen@cloudscale.com', status: 'Active', vehicles: 'KA-05-AB-4455 (Tesla Model 3)', parking: 'P2-1803' },
  { id: 'res-17', name: 'Sameer Sheikh', apartment: 'Golden Apartment', tower: 'Golden Tower 2', flat: 'GT2-3204', type: 'Tenant', phone: '+91 99009 11224', email: 'sameer.sheikh@aerospace.in', status: 'Active', vehicles: 'KA-01-ZZ-9911 (Audi Q3)', parking: 'P2-3204' },
  { id: 'res-18', name: 'Suresh & Preeti Namboodiri', apartment: 'Golden Apartment', tower: 'Golden Tower 3', flat: 'GT3-2005', type: 'Flat Owner', phone: '+91 98402 77112', email: 'suresh.namboodiri@biogen.com', status: 'Active', vehicles: 'KA-03-JK-6677 (Hyundai Tucson)', parking: 'P3-2005' }
];

// Unoccupied flats set (only 7 to 8 flats per tower, matching the 5-10 unoccupied criteria with 90%+ occupancy)
export const UN_OCCUPIED_FLATS_SET = new Set([
  // Golden Tower 1 (8 unoccupied flats out of 296 = 97.3% occupied)
  'GT1-204', 'GT1-605', 'GT1-1103', 'GT1-1706', 'GT1-2302', 'GT1-2805', 'GT1-3302', 'GT1-3704',
  // Golden Tower 2 (7 unoccupied flats out of 272 = 97.4% occupied)
  'GT2-304', 'GT2-806', 'GT2-1403', 'GT2-2005', 'GT2-2602', 'GT2-3004', 'GT2-3402',
  // Golden Tower 3 (8 unoccupied flats out of 254 = 96.9% occupied)
  'GT3-206', 'GT3-605', 'GT3-1204', 'GT3-1802', 'GT3-2206', 'GT3-2703', 'GT3-3004', 'GT3-3205'
]);

const FIRST_NAMES = [
  'Aarav', 'Priya', 'Rohan', 'Ananya', 'Vikram', 'Sneha', 'Aditya', 'Pooja',
  'Karthik', 'Divya', 'Sanjay', 'Meera', 'Rajesh', 'Neha', 'Arun', 'Swati',
  'Gaurav', 'Kavita', 'Naveen', 'Deepika', 'Manish', 'Shalini', 'Ashish', 'Radhika',
  'Amit', 'Sunita', 'Nitin', 'Rashmi', 'Pradeep', 'Tanvi', 'Abhishek', 'Shruti',
  'Chetan', 'Geetha', 'Dinesh', 'Lavanya', 'Venkatesh', 'Aparna', 'Sachin', 'Usha',
  'Santosh', 'Anjali', 'Kishore', 'Bhavna', 'Girish', 'Pallavi', 'Hemant', 'Sarita',
  'Tarun', 'Madhavi', 'Varun', 'Sandhya', 'Alok', 'Namrata', 'Raghav', 'Meenakshi'
];

const LAST_NAMES = [
  'Sharma', 'Verma', 'Patel', 'Iyer', 'Reddy', 'Nair', 'Kulkarni', 'Joshi',
  'Gupta', 'Chatterjee', 'Mukherjee', 'Menon', 'Bhatt', 'Deshmukh', 'Singhania',
  'Chopra', 'Malhotra', 'Agarwal', 'Saxena', 'Mehta', 'Pillai', 'Rao', 'Shetty',
  'Bansal', 'Thakur', 'Kapoor', 'Mishra', 'Pandey', 'Nambiar', 'Bose', 'Das',
  'Roy', 'Hegde', 'Gowda', 'Chavan', 'Kaur', 'Sethi', 'Garg', 'Choudhury', 'Sen'
];

const VEHICLE_MODELS = [
  'Hyundai Creta', 'Honda City', 'Kia Seltos', 'Tata Nexon EV', 'Maruti Baleno',
  'Toyota Hyryder', 'Skoda Kushaq', 'Volkswagen Taigun', 'Mahindra XUV700', 'MG Hector',
  'BMW X1', 'Audi A4', 'Toyota Innova Crysta', 'Tata Safari', 'Mercedes GLA',
  'Ather 450X', 'Ola S1 Pro', 'Royal Enfield Classic 350', 'TVS iQube', 'Honda Activa 6G',
  'Maruti Grand Vitara', 'Skoda Slavia', 'Hyundai Verna', 'Kia Carens', 'MG ZS EV'
];

const EMAIL_DOMAINS = ['gmail.com', 'outlook.com', 'yahoo.com', 'techcorp.in', 'infonet.com', 'cloudscale.com'];

export const TOWERS_CONFIG = [
  { id: 'gt-1', code: 'Golden Tower 1', name: 'Golden Tower 1', shortCode: 'GT-1', prefix: 'GT1', floors: 38, unitsPerFloor: 8, getUnits: (f) => (f >= 35 ? 6 : 8), towerNum: 1 },
  { id: 'gt-2', code: 'Golden Tower 2', name: 'Golden Tower 2', shortCode: 'GT-2', prefix: 'GT2', floors: 35, unitsPerFloor: 8, getUnits: (f) => (f >= 32 ? 6 : 8), towerNum: 2 },
  { id: 'gt-3', code: 'Golden Tower 3', name: 'Golden Tower 3', shortCode: 'GT-3', prefix: 'GT3', floors: 32, unitsPerFloor: 8, getUnits: (f) => (f <= 4 ? 10 : f >= 28 ? 6 : 8), towerNum: 3 }
];

export const getFlatsForTower = (towerIdentifier) => {
  const getFlatsForSingleTower = (tower) => {
    const flats = [];
    for (let f = 1; f <= tower.floors; f++) {
      const unitsCount = tower.getUnits ? tower.getUnits(f) : tower.unitsPerFloor;
      for (let u = 1; u <= unitsCount; u++) {
        flats.push({
          flat: `${tower.prefix}-${f}${u < 10 ? '0' + u : u}`,
          floor: f,
          unit: u,
          tower: tower.code,
          prefix: tower.prefix
        });
      }
    }
    return flats;
  };

  if (!towerIdentifier || towerIdentifier.toLowerCase().includes('all')) {
    return TOWERS_CONFIG.flatMap(t => getFlatsForSingleTower(t));
  }

  const tower = TOWERS_CONFIG.find(t => 
    t.prefix.toLowerCase() === towerIdentifier?.toLowerCase() ||
    t.code.toLowerCase() === towerIdentifier?.toLowerCase() ||
    towerIdentifier?.toLowerCase()?.includes(t.prefix.toLowerCase()) ||
    towerIdentifier?.toLowerCase()?.includes(`tower-${t.towerNum}`) ||
    towerIdentifier?.toLowerCase()?.includes(`tower ${t.towerNum}`)
  ) || TOWERS_CONFIG[0];

  return getFlatsForSingleTower(tower);
};

// Helper to deterministically generate realistic residents for all occupied flats across all 3 towers
const generateFullResidentsDirectory = () => {
  const seedMap = new Map();
  SEED_RESIDENTS.forEach(r => seedMap.set(r.flat, r));

  const list = [];
  const towersConfig = TOWERS_CONFIG;

  let counter = 100;
  towersConfig.forEach(tow => {
    for (let f = 1; f <= tow.floors; f++) {
      const unitsCount = tow.getUnits ? tow.getUnits(f) : tow.unitsPerFloor;
      for (let u = 1; u <= unitsCount; u++) {
        const flatNo = `${tow.prefix}-${f}${u < 10 ? '0' + u : u}`;

        // Skip unoccupied flats (only 5-10 per tower)
        if (UN_OCCUPIED_FLATS_SET.has(flatNo)) {
          continue;
        }

        // If seeded, use seed
        if (seedMap.has(flatNo)) {
          list.push(seedMap.get(flatNo));
          continue;
        }

        // Deterministic generation
        counter++;
        const hash = (tow.towerNum * 10000) + (f * 100) + u;
        const firstName = FIRST_NAMES[(hash + f * 3) % FIRST_NAMES.length];
        const lastName = LAST_NAMES[(hash * 7 + u) % LAST_NAMES.length];
        const isTenant = (hash % 3 === 0); // ~33% tenants, ~67% flat owners
        const model = VEHICLE_MODELS[(hash + u) % VEHICLE_MODELS.length];
        const rtoNum = (hash % 5 === 0) ? '01' : (hash % 5 === 1) ? '03' : (hash % 5 === 2) ? '04' : (hash % 5 === 3) ? '05' : '51';
        const series = String.fromCharCode(65 + (hash % 26)) + String.fromCharCode(65 + ((hash * 3) % 26));
        const plateNum = 1000 + (hash * 13) % 9000;
        const domain = EMAIL_DOMAINS[hash % EMAIL_DOMAINS.length];
        const phoneMiddle = 98000 + (hash % 1900);
        const phoneLast = 10000 + ((hash * 31) % 89999);
        const parkingSlot = `P${tow.towerNum}-${f < 10 ? '0' + f : f}${u < 10 ? '0' + u : u}`;

        list.push({
          id: `res-${tow.prefix}-${f}-${u}`,
          name: `${firstName} ${lastName}`,
          apartment: 'Golden Apartment',
          tower: tow.code,
          floor: f,
          flat: flatNo,
          type: isTenant ? 'Tenant' : 'Flat Owner',
          phone: `+91 ${phoneMiddle} ${phoneLast}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
          status: 'Active',
          vehicles: `KA-${rtoNum}-${series}-${plateNum} (${model})`,
          parking: parkingSlot
        });
      }
    }
  });

  return list;
};

export const INITIAL_RESIDENTS_DIRECTORY = generateFullResidentsDirectory();

export const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-2026-092',
    title: 'Swimming Pool Deck Tiles Cracked & Slipping Near Kids Splash Pool',
    category: 'Civil & Structural',
    issueType: 'Swimming Pool Deck Tiles Loose',
    apartment: 'Golden Apartment',
    location: 'Swimming Pool • Pool Deck (Ground Level) • Kids Splash Pool Skimmer',
    placeName: 'Swimming Pool',
    floor: 'Pool Deck (Ground Level)',
    asset: 'Kids Splash Pool Skimmer',
    description: 'Several border tiles along the kids splash zone have cracked and loosened. Poses a serious cut risk for barefoot children. Immediate replacement and sealant needed.',
    priority: 'Urgent',
    status: 'Pending Approval',
    complaintScope: 'Common Area',
    requiresApproval: true,
    dispatchedToAgentApp: false,
    submittedBy: 'Neha Singhania (GT2-803)',
    submittedByRole: 'Tenant',
    assignedTo: 'Unassigned',
    assignedDate: '',
    createdAt: '2026-10-26 09:15',
    updatedAt: '2026-10-26 09:15',
    hasAttachment: true,
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    history: [
      { timestamp: '2026-10-26 09:15', text: 'Common area complaint raised by resident Neha Singhania. Awaiting RWA Approval before moving to Agent App.', author: 'Resident' }
    ]
  },
  {
    id: 'CMP-2026-081',
    title: 'Passenger Lift #2 Making Jerking Sound & Stalling at 7th Floor',
    category: 'Lift / Elevator',
    apartment: 'Golden Apartment',
    location: 'Golden Tower 1 - Central Passenger Lift #2 (Floor 6-8)',
    placeName: 'Golden Tower 1',
    floor: '7th Floor',
    asset: 'Passenger Lift #2',
    description: 'During morning peak hours, the elevator violently shakes between 6th and 7th floor and displays sensor door error E-44. Otis technician emergency callout needed.',
    priority: 'Urgent',
    status: 'In Progress',
    complaintScope: 'Common Area',
    requiresApproval: false,
    dispatchedToAgentApp: true,
    submittedBy: 'Vikramaditya Sharma (GT1-205)',
    submittedByRole: 'Tenant',
    assignedTo: 'Sanjay Kumar (Otis AMC Lead Engineer)',
    assignedDate: '2026-10-21 09:15',
    createdAt: '2026-10-21 08:30',
    updatedAt: '2026-10-21 11:45',
    hasAttachment: true,
    photoUrl: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80',
    history: [
      { timestamp: '2026-10-21 08:30', text: 'Complaint submitted by Vikramaditya Sharma (GT1-205)', author: 'Resident' },
      { timestamp: '2026-10-21 08:45', text: 'Acknowledged by President Sujana & VP Kavaya', author: 'RWA Executive' },
      { timestamp: '2026-10-21 09:15', text: 'Assigned to Otis AMC Lead Sanjay Kumar. Service ticket #OTIS-8829 generated.', author: 'Vice President' },
      { timestamp: '2026-10-21 11:45', text: 'Technician on site at Golden Tower 1. Guide rail realignment in progress.', author: 'Operations' }
    ]
  },
  {
    id: 'CMP-2026-082',
    title: 'Low Water Pressure in Master Restroom & Kitchen Line',
    category: 'Water Supply',
    apartment: 'Golden Apartment',
    location: 'Golden Tower 1 - West Wing 4th & 5th Floor Line',
    description: 'Since yesterday evening overhead pneumatic pressure pump is cycling rapidly, causing trickling flow in bathrooms.',
    priority: 'High',
    status: 'Approved',
    submittedBy: 'Ananya Deshmukh (GT1-402)',
    submittedByRole: 'Flat Owner',
    assignedTo: 'Ramesh Babu (Chief Plumbing Contractor)',
    assignedDate: '2026-10-20 17:30',
    createdAt: '2026-10-20 16:00',
    updatedAt: '2026-10-20 17:30',
    hasAttachment: false,
    history: [
      { timestamp: '2026-10-20 16:00', text: 'Complaint logged by Ananya Deshmukh (GT1-402)', author: 'Resident' },
      { timestamp: '2026-10-20 17:30', text: 'Assigned to Ramesh Babu to inspect booster pump pressure valve.', author: 'Vice President' }
    ]
  },
  {
    id: 'CMP-2026-083',
    title: 'Jogging Track Pathway Lighting Broken Near North Gazebo',
    category: 'Electricity and Lighting',
    apartment: 'Golden Apartment',
    location: 'Golden Apartment - Central Park North Walking Loop',
    description: '3 consecutive bollard LED solar lights are completely dark, creating a tripping hazard for evening walkers.',
    priority: 'Medium',
    status: 'Resolved',
    submittedBy: 'Col. Ranjit Verma (GT1-201)',
    submittedByRole: 'Flat Owner',
    assignedTo: 'Rajesh Verma (Senior Electrician)',
    assignedDate: '2026-10-18 10:00',
    createdAt: '2026-10-17 19:20',
    updatedAt: '2026-10-19 14:10',
    hasAttachment: true,
    history: [
      { timestamp: '2026-10-17 19:20', text: 'Complaint submitted by Col. Ranjit Verma (GT1-201)', author: 'Resident' },
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
    status: 'Pending Approval',
    submittedBy: 'Vikramaditya Sharma (GT1-205)',
    submittedByRole: 'Tenant',
    assignedTo: 'Unassigned',
    assignedDate: '',
    createdAt: '2026-10-21 07:10',
    updatedAt: '2026-10-21 07:10',
    hasAttachment: false,
    history: [
      { timestamp: '2026-10-21 07:10', text: 'Complaint submitted by Vikramaditya Sharma (GT1-205)', author: 'Resident' }
    ]
  },
  {
    id: 'CMP-2026-085',
    title: 'Seepage in Basement P2 Near Pillar 34 Adjacent to Sump Tank',
    category: 'Plumbing',
    apartment: 'Golden Apartment',
    location: 'Golden Tower 2 - Basement P2 (Pillars 34-36)',
    description: 'Minor continuous seepage pooling near parking slot GT2-18. Smells like raw treated water from overflow channel.',
    priority: 'High',
    status: 'In Progress',
    submittedBy: 'Rajeshwar Rao (GT2-302)',
    submittedByRole: 'Flat Owner',
    assignedTo: 'Ramesh Babu (Plumbing Team)',
    assignedDate: '2026-10-19 11:00',
    createdAt: '2026-10-19 08:45',
    updatedAt: '2026-10-20 15:30',
    hasAttachment: true,
    history: [
      { timestamp: '2026-10-19 08:45', text: 'Complaint submitted by Rajeshwar Rao (GT2-302)', author: 'Resident' },
      { timestamp: '2026-10-19 11:00', text: 'Assigned to Ramesh Babu', author: 'Vice President' },
      { timestamp: '2026-10-20 15:30', text: 'Overflow float valve adjusted; waterproofing chemical coat applied on sump outer wall.', author: 'Ramesh Babu' }
    ]
  },
  {
    id: 'CMP-2026-086',
    title: 'Badminton Court Net Post Tension Wire Broken',
    category: 'Indoor Sports',
    apartment: 'Golden Apartment',
    location: 'Golden Tower 2 - Sports Annex Court #1',
    description: 'The tension crank mechanism on Court 1 net has snapped. Net is drooping 4 inches below ITTF height standards.',
    priority: 'Low',
    status: 'Approved',
    submittedBy: 'Karthik Narayanan (GT3-704)',
    submittedByRole: 'Tenant',
    assignedTo: 'Mahendra Joshi (Sports Caretaker)',
    assignedDate: '2026-10-21 10:00',
    createdAt: '2026-10-20 21:00',
    updatedAt: '2026-10-21 10:00',
    hasAttachment: false,
    history: [
      { timestamp: '2026-10-20 21:00', text: 'Complaint submitted by Karthik Narayanan (GT3-704)', author: 'Resident' },
      { timestamp: '2026-10-21 10:00', text: 'Acknowledged by VP Kavaya; replacement wire ordered from Yonex vendor.', author: 'Vice President' }
    ]
  },
  {
    id: 'CMP-2026-087',
    title: 'Garbage Chute Blockage at 9th Floor Hopper',
    category: 'Cleanliness',
    apartment: 'Golden Apartment',
    location: 'Golden Tower 2 - 9th Floor Chute Hopper',
    description: 'Cardboard box jammed into the chute intake door. Debris backing up and producing odor.',
    priority: 'High',
    status: 'Closed',
    submittedBy: 'Neha Singhania (GT2-803)',
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
    location: 'Main Entry Gate 1 (Near Golden Tower 1)',
    description: 'RFID sensor takes up to 20 seconds to read FASTag/Sticker for incoming resident vehicles, causing road congestion.',
    priority: 'Medium',
    status: 'Approved',
    submittedBy: 'Sujana (President - GT1-801)',
    submittedByRole: 'President',
    assignedTo: 'Vikram Singh (Security Chief)',
    assignedDate: '2026-10-20 18:00',
    createdAt: '2026-10-20 17:00',
    updatedAt: '2026-10-20 18:00',
    hasAttachment: false,
    history: [
      { timestamp: '2026-10-20 17:00', text: 'Complaint submitted by President Sujana', author: 'President' },
      { timestamp: '2026-10-20 18:00', text: 'Assigned to Security Chief for RFID scanner lens recalibration.', author: 'Vice President' }
    ]
  },
  {
    id: 'CMP-2026-089',
    title: 'Fire Hose Reel Pressure Valve Weeping on 14th Floor',
    category: 'Water Supply',
    apartment: 'Golden Apartment',
    location: 'Golden Tower 3 - 14th Floor Fire Hose Cabinet',
    description: 'Slow drip observed from the brass isolation valve behind the hose reel drum. Minor water pooling in the fire shaft.',
    priority: 'High',
    status: 'In Progress',
    submittedBy: 'Harpreet Singh Chadha (GT3-802)',
    submittedByRole: 'Flat Owner',
    assignedTo: 'Ramesh Babu (Plumbing Lead)',
    assignedDate: '2026-10-22 10:15',
    createdAt: '2026-10-22 09:30',
    updatedAt: '2026-10-22 11:00',
    hasAttachment: true,
    history: [
      { timestamp: '2026-10-22 09:30', text: 'Complaint submitted by Harpreet Singh Chadha (GT3-802)', author: 'Resident' },
      { timestamp: '2026-10-22 10:15', text: 'Assigned to Ramesh Babu to replace high-pressure gasket.', author: 'Operations' }
    ]
  },
  {
    id: 'CMP-2026-090',
    title: 'Corridor Casement Window Latch Broken Causing Wind Vibration',
    category: 'Cleanliness',
    apartment: 'Golden Apartment',
    location: 'Golden Tower 3 - 20th Floor East Lobby',
    description: 'Aluminum friction stay arm sheared off during gusty winds. Window sash vibrates against the frame.',
    priority: 'Low',
    status: 'Pending Approval',
    submittedBy: 'Suresh Namboodiri (GT3-2005)',
    submittedByRole: 'Flat Owner',
    assignedTo: 'Unassigned',
    assignedDate: '',
    createdAt: '2026-10-23 14:20',
    updatedAt: '2026-10-23 14:20',
    hasAttachment: false,
    history: [
      { timestamp: '2026-10-23 14:20', text: 'Complaint registered by Suresh Namboodiri (GT3-2005)', author: 'Resident' }
    ]
  },
  {
    id: 'CMP-2026-091',
    title: 'Function Hall Sound System & Projector HDMI Link Failure',
    category: 'Function Hall',
    apartment: 'Golden Apartment',
    location: 'Golden Apartment - Rooftop Banquet & Function Hall',
    description: 'Ceiling projector HDMI input 2 has intermittent signal loss and microphone audio feedback buzzing through house PA speakers.',
    priority: 'Medium',
    status: 'In Progress',
    submittedBy: 'Kavaya (VP Operations - GT2-501)',
    submittedByRole: 'Vice President',
    assignedTo: 'Rajesh Verma (Senior Electrician & AV)',
    assignedDate: '2026-10-23 11:00',
    createdAt: '2026-10-23 10:15',
    updatedAt: '2026-10-23 14:00',
    hasAttachment: false,
    history: [
      { timestamp: '2026-10-23 10:15', text: 'Issue logged by VP Kavaya ahead of weekend society function', author: 'Vice President' },
      { timestamp: '2026-10-23 11:00', text: 'Assigned to Rajesh Verma for AV receiver testing and HDMI cable run replacement.', author: 'Operations' }
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
    status: 'Available',
    maintenanceNotes: 'All 8 cardio machines and 14 strength stations functional. Sanitized every 3 hours.',
    rules: [
      'Proper gym attire and clean sports footwear mandatory.',
      'Wipe down machines after use with provided sanitizing wipes.',
      'Maximum 60 minutes session duration during peak hours.',
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
    apartment: 'Golden Apartment',
    location: 'Golden Apartment Central Enclave',
    hours: '05:00 AM – 09:30 PM (Daily)',
    capacity: 100,
    currentOccupancy: 18,
    status: 'Available',
    maintenanceNotes: 'Lawn trimmed on 18th Oct. Sprinklers run automatically 04:30 AM and 09:45 PM.',
    rules: [
      'Pets must be kept on short leashes at all times. Please scoop poop.',
      'No cycling or skateboards on synthetic jogging loop.',
      'Children under 8 must be accompanied by parents in the play area.'
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
    apartment: 'Golden Apartment',
    location: 'Golden Tower 2 Sports Annex 1st Floor',
    hours: '06:00 AM – 09:00 PM (Daily)',
    capacity: 8,
    currentOccupancy: 4,
    status: 'Available',
    maintenanceNotes: 'Court 1 operational; Court 2 net wire tension being tuned today.',
    rules: [
      'Strictly non-marking gum sole shoes only.',
      'Court booking maximum 1 hour per flat per day.',
      'Please switch off arena floodlights and AC if leaving last.'
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
    apartment: 'Golden Apartment',
    location: 'Golden Tower 3 Club Floor',
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
    apartment: 'Golden Apartment',
    flatNumber: 'GT1-402',
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
    apartment: 'Golden Apartment',
    flatNumber: 'GT2-302',
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
    apartment: 'Golden Apartment',
    flatNumber: 'GT2-501',
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
    apartment: 'Golden Apartment',
    flatNumber: 'GT3-402',
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
  { id: 'DUE-101', flat: 'GT1-101', residentName: 'V. Krishna Murthy', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3500, amountPaid: 3500, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-05', mode: 'UPI' },
  { id: 'DUE-102', flat: 'GT1-204', residentName: 'Vikramaditya Sharma / K. Ramesh', apartment: 'Golden Apartment', type: 'Tenant', billingPeriod: 'October 2026', amountDue: 3000, amountPaid: 3000, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-07', mode: 'NEFT' },
  { id: 'DUE-103', flat: 'GT1-502', residentName: 'Sunil Gavaskar', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3500, amountPaid: 0, outstanding: 3500, status: 'Overdue', dueDate: '2026-10-10', paidDate: null, mode: '-' },
  { id: 'DUE-104', flat: 'GT1-604', residentName: 'Priya Sundaram', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 4000, amountPaid: 4000, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-02', mode: 'NetBanking' },
  { id: 'DUE-105', flat: 'GT2-803', residentName: 'Neha Singhania', apartment: 'Golden Apartment', type: 'Tenant', billingPeriod: 'October 2026', amountDue: 3500, amountPaid: 3500, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-08', mode: 'UPI' },
  { id: 'DUE-106', flat: 'GT2-1102', residentName: 'Gaurav Khandelwal', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 4000, amountPaid: 2000, outstanding: 2000, status: 'Partial', dueDate: '2026-10-10', paidDate: '2026-10-09', mode: 'Cheque' },
  { id: 'DUE-107', flat: 'GT2-201', residentName: 'Harish Chandra', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3200, amountPaid: 3200, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-04', mode: 'UPI' },
  { id: 'DUE-108', flat: 'GT2-302', residentName: 'Rajeshwar Rao', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3200, amountPaid: 3200, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-01', mode: 'UPI' },
  { id: 'DUE-109', flat: 'GT2-501', residentName: 'Amitabh Roy', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3500, amountPaid: 3500, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-06', mode: 'NEFT' },
  { id: 'DUE-110', flat: 'GT2-704', residentName: 'G. Sundaram / Karthik N.', apartment: 'Golden Apartment', type: 'Tenant', billingPeriod: 'October 2026', amountDue: 3200, amountPaid: 0, outstanding: 3200, status: 'Overdue', dueDate: '2026-10-10', paidDate: null, mode: '-' },
  { id: 'DUE-111', flat: 'GT2-802', residentName: 'Harpreet Singh Chadha', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3800, amountPaid: 3800, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-03', mode: 'UPI' },
  { id: 'DUE-112', flat: 'GT3-201', residentName: 'Col. Ranjit Verma', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3800, amountPaid: 3800, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-02', mode: 'NEFT' },
  { id: 'DUE-113', flat: 'GT3-402', residentName: 'Ananya Deshmukh', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 3800, amountPaid: 3800, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-04', mode: 'UPI' },
  { id: 'DUE-114', flat: 'GT3-603', residentName: 'Siddharth Varma', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 4200, amountPaid: 0, outstanding: 4200, status: 'Overdue', dueDate: '2026-10-10', paidDate: null, mode: '-' },
  { id: 'DUE-115', flat: 'GT3-801', residentName: 'Dr. Arvind Subramanian', apartment: 'Golden Apartment', type: 'Flat Owner', billingPeriod: 'October 2026', amountDue: 4500, amountPaid: 4500, outstanding: 0, status: 'Paid', dueDate: '2026-10-10', paidDate: '2026-10-01', mode: 'NetBanking' }
];

export const INITIAL_TRANSACTIONS = [
  { id: 'TXN-901', description: 'October Maintenance Collections (Golden Tower 1)', type: 'Income', category: 'Maintenance Fees', amount: 310000, apartment: 'Golden Apartment', date: '2026-10-10', method: 'Payment Gateway / ECS', status: 'Completed', ref: 'COLL-GT1-1026' },
  { id: 'TXN-902', description: 'October Maintenance Collections (Golden Tower 2)', type: 'Income', category: 'Maintenance Fees', amount: 242000, apartment: 'Golden Apartment', date: '2026-10-10', method: 'Payment Gateway / ECS', status: 'Completed', ref: 'COLL-GT2-1026' },
  { id: 'TXN-903', description: 'October Maintenance Collections (Golden Tower 3)', type: 'Income', category: 'Maintenance Fees', amount: 215000, apartment: 'Golden Apartment', date: '2026-10-10', method: 'Payment Gateway / ECS', status: 'Completed', ref: 'COLL-GT3-1026' },
  { id: 'TXN-904', description: 'Otis Elevator Comprehensive AMC - Q3 Installment', type: 'Expense', category: 'Lifts AMC', amount: 185000, apartment: 'Golden Apartment', date: '2026-10-14', method: 'RTGS Transfer', status: 'Completed', ref: 'EXP-OTIS-771' },
  { id: 'TXN-905', description: 'BESCOM Common Area Electricity (Golden Towers 1, 2 & 3)', type: 'Expense', category: 'Electricity / Utilities', amount: 245600, apartment: 'Golden Apartment', date: '2026-10-15', method: 'Online Auto-Debit', status: 'Completed', ref: 'BESCOM-99201' },
  { id: 'TXN-906', description: 'BWSSB & Emergency Water Tanker Supplies (14 Loads)', type: 'Expense', category: 'Water Supply', amount: 98000, apartment: 'Golden Apartment', date: '2026-10-16', method: 'NEFT', status: 'Completed', ref: 'H2O-BLR-441' },
  { id: 'TXN-907', description: 'Tiger Security Agency - 18 Security Personnel Staffing', type: 'Expense', category: 'Security Services', amount: 288000, apartment: 'Golden Apartment', date: '2026-10-05', method: 'Direct Bank Transfer', status: 'Completed', ref: 'SEC-TIGER-1002' },
  { id: 'TXN-908', description: 'CleanPro Facility Management - Housekeeping & Sanitization', type: 'Expense', category: 'Housekeeping', amount: 165000, apartment: 'Golden Apartment', date: '2026-10-05', method: 'Direct Bank Transfer', status: 'Completed', ref: 'CLN-PRO-881' },
  { id: 'TXN-909', description: 'Rooftop Banquet Hall Booking Charge (Diwali Pre-Event)', type: 'Income', category: 'Facility Rental', amount: 15000, apartment: 'Golden Apartment', date: '2026-10-17', method: 'UPI Pay', status: 'Completed', ref: 'HALL-RENT-55' },
  { id: 'TXN-910', description: 'Diesel Generator Fuel (800 Litres Ultra Low Sulfur)', type: 'Expense', category: 'Generator & Power', amount: 76800, apartment: 'Golden Apartment', date: '2026-10-18', method: 'Fleet Card', status: 'Completed', ref: 'DG-FUEL-1026' },
  { id: 'TXN-911', description: 'Landscape & Green Belt Garden Maintenance - Emerald Park', type: 'Expense', category: 'Park & Gardens', amount: 45000, apartment: 'Golden Apartment', date: '2026-10-19', method: 'Cheque #88120', status: 'Completed', ref: 'GRN-EMR-310' },
  { id: 'TXN-912', description: 'E-Waste & Dry Cardboard Scrap Vendor Auction Revenue', type: 'Income', category: 'Miscellaneous Income', amount: 8400, apartment: 'Golden Apartment', date: '2026-10-20', method: 'Cash / Bank Deposit', status: 'Completed', ref: 'SCRAP-REV-09' }
];

export const INITIAL_ANNOUNCEMENTS = [
  // November 2026 Announcements
  {
    id: 'ANN-308',
    title: 'Emergency Booster Pump Line Pressure Testing – Tower 2',
    description: 'Hydrostatic pressure testing on the secondary booster riser between floors 15 and 25. Minor fluctuations in kitchen water pressure between 11:00 AM and 01:00 PM. Overhead tanks are fully topped up.',
    category: 'Water Supply',
    apartmentScope: 'Golden Tower 2',
    targetAudience: 'All Residents',
    priority: 'Urgent',
    publishedBy: 'Ramesh Babu (Chief Plumbing Contractor)',
    publishedDate: '2026-11-10 09:30',
    pinned: true
  },
  {
    id: 'ANN-315',
    title: 'Passenger Lift #1 Annual Wire Rope Lubrication – Tower 1',
    description: 'Scheduled preventive wire rope lubrication and hoistway sensor calibration for Passenger Lift #1 in Golden Tower 1. Lift #2 and Service Lift will remain fully operational.',
    category: 'Facility Maintenance',
    apartmentScope: 'Golden Tower 1',
    targetAudience: 'All Residents',
    priority: 'High',
    publishedBy: 'Sanjay Kumar (Lift Maintenance Lead)',
    publishedDate: '2026-11-10 11:00',
    pinned: false
  },
  {
    id: 'ANN-316',
    title: 'Terrace Rainwater Harvesting Filter Bed Desilting – Tower 3',
    description: 'Routine maintenance of secondary sand and gravel filtration chambers on Tower 3 terrace. Domestic water supply will remain completely unaffected.',
    category: 'Water Supply',
    apartmentScope: 'Golden Tower 3',
    targetAudience: 'All Residents',
    priority: 'Medium',
    publishedBy: 'Sunita Sharma (Housekeeping Lead)',
    publishedDate: '2026-11-10 14:00',
    pinned: false
  },
  {
    id: 'ANN-306',
    title: 'Annual General Body Meeting (AGM) 2026 – Final Voting & Budget Approval',
    description: 'The RWA Annual General Body Meeting will be held at the Rooftop Banquet Hall. Key voting on solar net-metering capital expenditure, audited society accounts, and intercom AMC renewal. High tea served for all attendees.',
    category: 'RWA Meeting',
    apartmentScope: 'Golden Apartment (All Towers)',
    targetAudience: 'Flat Owners & Tenants',
    priority: 'High',
    publishedBy: 'Sujana (President)',
    publishedDate: '2026-11-08 10:30',
    pinned: true
  },
  {
    id: 'ANN-307',
    title: 'Rooftop Solar PV Net-Metering Commissioning & Grid Sync',
    description: 'BESCOM officials will complete final grid synchronization for our 120kW rooftop solar system. Expected reduction in common area energy charges by 42% starting this billing cycle.',
    category: 'Facility Maintenance',
    apartmentScope: 'Golden Apartment (All Towers)',
    targetAudience: 'All Residents',
    priority: 'Medium',
    publishedBy: 'Kavaya (Vice President)',
    publishedDate: '2026-11-04 14:00',
    pinned: false
  },
  {
    id: 'ANN-309',
    title: 'Children Play Zone & Sandpit Rubber Flooring Upgradation',
    description: 'New anti-skid EPDM shock-absorbing safety tiles being laid in the toddler play section. Play area will partially reopen on Wednesday morning.',
    category: 'Community Event',
    apartmentScope: 'Golden Apartment (All Towers)',
    targetAudience: 'All Residents',
    priority: 'Low',
    publishedBy: 'Raghavan Pillai (Estate Caretaker)',
    publishedDate: '2026-11-16 11:00',
    pinned: false
  },

  // October 2026 Announcements
  {
    id: 'ANN-301',
    title: 'Water Supply Interruption & Overhead Tank Deep Cleaning Drive',
    description: 'Please note that main overhead reservoir cleaning and chlorination for Golden Towers 1, 2 & 3 will take place on Saturday, 25th October from 10:00 AM to 03:00 PM. Residents are requested to store adequate water for morning usage. Booster pumps will resume full pressure by 4:00 PM.',
    category: 'Water Supply',
    apartmentScope: 'Golden Apartment (All Towers)',
    targetAudience: 'All Residents',
    priority: 'Urgent',
    publishedBy: 'Kavaya (Vice President)',
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
    pinned: false
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
  },

  // September 2026 Announcements
  {
    id: 'ANN-310',
    title: 'Quarterly Fire Drill & Fire Hydrant Pressure Inspection',
    description: 'Mandatory mock evacuation drill conducted in coordination with the local Fire Station. Audible fire alarm sirens sounded for 3 minutes. All hose reels and wet risers inspected.',
    category: 'Security Notice',
    apartmentScope: 'Golden Apartment (All Towers)',
    targetAudience: 'All Residents',
    priority: 'High',
    publishedBy: 'Vikram Singh (Security Chief)',
    publishedDate: '2026-09-15 10:00',
    pinned: false
  },
  {
    id: 'ANN-311',
    title: 'Ganesh Chaturthi Eco-Friendly Immersion Guidelines',
    description: 'Dedicated artificial immersion tanks set up near Central Park gate 2. Clay Ganesha idols only; no synthetic colors allowed into the society swimming pool or natural drainage lines.',
    category: 'Community Event',
    apartmentScope: 'All Apartments',
    targetAudience: 'All Residents',
    priority: 'Medium',
    publishedBy: 'Dr. Arvind Subramanian (President)',
    publishedDate: '2026-09-07 16:30',
    pinned: false
  },
  {
    id: 'ANN-312',
    title: 'Bi-Annual Underground Sump Desilting & Chlorination',
    description: 'Deep mechanical desilting and UV chlorination of 2,50,000 litre central reservoir completed. Water quality certified compliant with IS 10500 standards.',
    category: 'Water Supply',
    apartmentScope: 'Golden Apartment (All Towers)',
    targetAudience: 'All Residents',
    priority: 'Urgent',
    publishedBy: 'Kavaya (Vice President)',
    publishedDate: '2026-09-24 08:30',
    pinned: false
  },

  // December 2026 Announcements
  {
    id: 'ANN-313',
    title: 'Christmas Carol & New Year Gala Night Pre-Registration',
    description: 'Join us for Christmas carol singing by resident children, live orchestra, and New Year welcome dinner at Central Park Clubhouse lawn. Food coupons registration opens Dec 1st.',
    category: 'Community Event',
    apartmentScope: 'Golden Apartment (All Towers)',
    targetAudience: 'All Residents',
    priority: 'Medium',
    publishedBy: 'Sujana (President)',
    publishedDate: '2026-12-24 18:00',
    pinned: false
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    roleTarget: 'president',
    title: 'New Resident Registration Pending Review',
    message: 'Siddharth Varma has applied for ownership verification in Golden Apartment Flat GT3-603.',
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
    roleTarget: 'president',
    title: 'Maintenance Dues Update',
    message: '89.4% maintenance collected for October. ₹3,85,000 remains pending across 14 units.',
    timestamp: '3 hours ago',
    read: false,
    type: 'finance',
    actionTab: 'maintenance'
  }
];

export const INITIAL_COUNCIL_USERS = [
  {
    id: 'USR-001',
    name: 'Anita Sharma',
    role: 'President',
    hierarchyRank: 1,
    phone: '+91 98765 43210',
    email: 'anita.sharma@example.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80',
    tower: 'Golden Tower 1',
    flat: 'GT1-801',
    term: '2025 - 2027',
    status: 'Active'
  },
  {
    id: 'USR-002',
    name: 'Rohit Mehta',
    role: 'Vice President',
    hierarchyRank: 2,
    phone: '+91 98765 43211',
    email: 'rohit.mehta@example.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
    tower: 'Golden Tower 2',
    flat: 'GT2-604',
    term: '2025 - 2027',
    status: 'Active'
  },
  {
    id: 'USR-003',
    name: 'Sneha Patel',
    role: 'Executive',
    hierarchyRank: 3,
    phone: '+91 98765 43212',
    email: 'sneha.patel@example.com',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
    tower: 'Golden Tower 1',
    flat: 'GT1-201',
    term: '2025 - 2027',
    status: 'Active'
  },
  {
    id: 'USR-004',
    name: 'Vikram Singh',
    role: 'Secretary',
    hierarchyRank: 4,
    phone: '+91 98765 43213',
    email: 'vikram.singh@example.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80',
    tower: 'Golden Tower 2',
    flat: 'GT2-305',
    term: '2025 - 2027',
    status: 'Active'
  },
  {
    id: 'USR-005',
    name: 'Divya Reddy',
    role: 'Treasurer',
    hierarchyRank: 5,
    phone: '+91 98765 43214',
    email: 'divya.reddy@example.com',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80',
    tower: 'Golden Tower 3',
    flat: 'GT3-402',
    term: '2025 - 2027',
    status: 'Active'
  }
];

export const INITIAL_usersS = [
  {
    id: 'EMP-101',
    name: 'Sanjay Kumar',
    designation: 'Otis AMC Lead Engineer',
    department: 'Elevator & Electrical',
    complex: 'Golden Apartment',
    tower: 'Golden Tower 1',
    phone: '+91 98451 99001',
    email: 'sanjay.otis@beeproperty.org',
    shift: 'General (09:00 AM - 06:00 PM)',
    status: 'On Duty',
    rating: 4.9,
    experience: '8 Years',
    policeVerified: true,
    verificationCode: 'BLR-PV-88912',
    avatar: 'SK'
  },
  {
    id: 'EMP-102',
    name: 'Ramesh Babu',
    designation: 'Chief Plumbing Contractor',
    department: 'Water Supply & Plumbing',
    complex: 'Golden Apartment',
    tower: 'Golden Tower 3',
    phone: '+91 98452 88112',
    email: 'ramesh.plumb@beeproperty.org',
    shift: 'Morning (07:00 AM - 04:00 PM)',
    status: 'On Duty',
    rating: 4.8,
    experience: '11 Years',
    policeVerified: true,
    verificationCode: 'BLR-PV-77219',
    avatar: 'RB'
  },
  {
    id: 'EMP-103',
    name: 'Raghavan Pillai',
    designation: 'Senior Estate Caretaker',
    department: 'Facility Operations',
    complex: 'Golden Apartment',
    tower: 'Golden Tower 1',
    phone: '+91 98451 22334',
    email: 'raghavan.p@beeproperty.org',
    shift: 'Day (08:00 AM - 05:00 PM)',
    status: 'On Duty',
    rating: 4.9,
    experience: '14 Years',
    policeVerified: true,
    verificationCode: 'BLR-PV-61102',
    avatar: 'RP'
  },
  {
    id: 'EMP-104',
    name: 'Mahendra Joshi',
    designation: 'Senior Estate Caretaker',
    department: 'Facility Operations',
    complex: 'Golden Apartment',
    tower: 'Golden Tower 2',
    phone: '+91 98452 33445',
    email: 'mahendra.j@beeproperty.org',
    shift: 'Day (08:00 AM - 05:00 PM)',
    status: 'Available',
    rating: 4.7,
    experience: '9 Years',
    policeVerified: true,
    verificationCode: 'BLR-PV-50341',
    avatar: 'MJ'
  },
  {
    id: 'EMP-105',
    name: 'Suresh Nayak',
    designation: 'Senior Estate Caretaker',
    department: 'Facility Operations',
    complex: 'Golden Apartment',
    tower: 'Golden Tower 3',
    phone: '+91 98453 44556',
    email: 'suresh.n@beeproperty.org',
    shift: 'Day (08:00 AM - 05:00 PM)',
    status: 'On Duty',
    rating: 4.9,
    experience: '12 Years',
    policeVerified: true,
    verificationCode: 'BLR-PV-44912',
    avatar: 'SN'
  },
  {
    id: 'EMP-106',
    name: 'Inspector Bhaskar Rao (Retd.)',
    designation: 'Chief Security Officer',
    department: 'Security & Surveillance',
    complex: 'All Complexes',
    tower: 'Central Gatehouse',
    phone: '+91 98800 11990',
    email: 'security.head@beeproperty.org',
    shift: 'Rotational (24/7 Command)',
    status: 'On Duty',
    rating: 5.0,
    experience: '22 Years',
    policeVerified: true,
    verificationCode: 'BLR-PV-00109',
    avatar: 'BR'
  },
  {
    id: 'EMP-107',
    name: 'Sunita Sharma',
    designation: 'Housekeeping Supervisor',
    department: 'Sanitation & Hygiene',
    complex: 'Golden Apartment',
    tower: 'Golden Tower 1',
    phone: '+91 99112 44331',
    email: 'sunita.hk@beeproperty.org',
    shift: 'Morning (06:30 AM - 03:30 PM)',
    status: 'Available',
    rating: 4.6,
    experience: '6 Years',
    policeVerified: true,
    verificationCode: 'BLR-PV-99321',
    avatar: 'SS'
  },
  {
    id: 'EMP-108',
    name: 'Arvind Murthy',
    designation: 'HV Electrician & DG Specialist',
    department: 'Power & Generators',
    complex: 'Golden Apartment',
    tower: 'Golden Tower 2',
    phone: '+91 97411 66554',
    email: 'arvind.power@beeproperty.org',
    shift: 'Afternoon (01:00 PM - 10:00 PM)',
    status: 'On Duty',
    rating: 4.8,
    experience: '10 Years',
    policeVerified: true,
    verificationCode: 'BLR-PV-33210',
    avatar: 'AM'
  },
  {
    id: 'EMP-109',
    name: 'Deepak Verma',
    designation: 'STP & Rainwater Plant Operator',
    department: 'Environment & STP',
    complex: 'Golden Apartment',
    tower: 'Golden Tower 3',
    phone: '+91 96322 88771',
    email: 'deepak.stp@beeproperty.org',
    shift: 'Night (10:00 PM - 07:00 AM)',
    status: 'Available',
    rating: 4.7,
    experience: '7 Years',
    policeVerified: true,
    verificationCode: 'BLR-PV-11982',
    avatar: 'DV'
  },
  {
    id: 'EMP-110',
    name: 'Munuswamy K.',
    designation: 'Head Horticulturist & Landscaper',
    department: 'Parks & Landscaping',
    complex: 'Golden Apartment',
    tower: 'Golden Central Park',
    phone: '+91 98440 77332',
    email: 'garden.bee@beeproperty.org',
    shift: 'Morning (06:00 AM - 02:00 PM)',
    status: 'On Duty',
    rating: 4.9,
    experience: '15 Years',
    policeVerified: true,
    verificationCode: 'BLR-PV-22019',
    avatar: 'MK'
  }
];

export const INITIAL_AGENCIES = [
  {
    id: 'AGY-101',
    name: 'CleanPro & GreenCare Facility Services',
    shortName: 'CleanPro & GreenCare',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    category: 'Cleaning & Gardening',
    serviceType: 'Common Area Housekeeping, Waste Management & Landscaping',
    status: 'Active',
    employeeCount: 18,
    services: [
      'Daily Corridor, Lobby & Staircase Mopping',
      'Solid Waste Segregation & Garbage Chute Care',
      'Landscape Lawn Mowing & Plant Pruning',
      'Garden Watering & Organic Composting',
      'Basement & Terrace Floor Power Washing'
    ],
    primaryRoles: ['Cleaning', 'Gardening', 'Waste Management'],
    leadEngineer: 'Sunita Sharma & Munuswamy K.',
    leadTitle: 'Housekeeping & Horticulture Lead',
    phone: '+91 99112 44331',
    emergencyHotline: '+91 80 4123 7708',
    email: 'operations@cleanprogreencare.in',
    rating: 4.9,
    openTicketsCount: 1,
    activeTicketIds: ['CMP-2026-087'],
    assignedComplexes: [
      {
        complex: 'Golden Apartment',
        towers: ['Golden Tower 1', 'Golden Tower 2', 'Golden Tower 3'],
        unitsAssigned: 'Daily Cleaning, Landscaping & Garbage Management',
        isPrimary: true
      }
    ]
  },
  {
    id: 'AGY-102',
    name: 'AquaFlow Plumbing & Sanitation Tech',
    shortName: 'AquaFlow Plumbing',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    category: 'Plumbing & Water Systems',
    serviceType: 'Emergency Plumbing, Water Sump Maintenance & STP Operations',
    status: 'Active',
    employeeCount: 14,
    services: [
      '24/7 Emergency Plumbing & Pipe Leak Fixes',
      'Overhead & Underground Sump Pump Maintenance',
      'STP Wastewater Treatment & Filtration Checks',
      'Dual Booster Water Pressure Pump Operations',
      'Drainage Line Desilting & Clog Clearing'
    ],
    primaryRoles: ['Plumbing', 'Water Supply', 'STP Plant'],
    leadEngineer: 'Ramesh Babu',
    leadTitle: 'Chief Plumbing & Hydraulics Engineer',
    phone: '+91 98451 44556',
    emergencyHotline: '+91 80 4123 7799',
    email: 'service@aquaflowplumbing.in',
    rating: 4.8,
    openTicketsCount: 2,
    activeTicketIds: ['CMP-2026-082', 'CMP-2026-085'],
    assignedComplexes: [
      {
        complex: 'Golden Apartment',
        towers: ['Golden Tower 1', 'Golden Tower 2', 'Golden Tower 3'],
        unitsAssigned: '100,000L Underground Sump, Booster Pumps & Plumbing Network',
        isPrimary: true
      }
    ]
  },
  {
    id: 'AGY-103',
    name: 'ShieldGuard Elite Security & Surveillance',
    shortName: 'ShieldGuard Security',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    category: 'Security & Access Control',
    serviceType: 'Manned Guarding, Gate Access Control & 24/7 Surveillance',
    status: 'Active',
    employeeCount: 20,
    services: [
      '24/7 Guarded Gate Entry & Visitor Access Control',
      'RFID Boom Barrier Vehicle Verification',
      'Night Foot Patrol across All Towers & Perimeter',
      'CCTV Control Room 24/7 Video Surveillance',
      'Emergency First Responder & Fire Safety'
    ],
    primaryRoles: ['Security', 'Surveillance', 'Gate Access'],
    leadEngineer: 'Inspector Bhaskar Rao (Retd.)',
    leadTitle: 'Chief Security Liaison Officer',
    phone: '+91 98800 11990',
    emergencyHotline: '+91 80 4123 7700',
    email: 'command@shieldguardsecurity.in',
    rating: 5.0,
    openTicketsCount: 1,
    activeTicketIds: ['CMP-2026-088'],
    assignedComplexes: [
      {
        complex: 'Golden Apartment',
        towers: ['Golden Tower 1', 'Golden Tower 2', 'Golden Tower 3'],
        unitsAssigned: 'Gates 1 & 2, Boom Barriers, 32 CCTV Cameras & Night Guarding',
        isPrimary: true
      }
    ]
  },
  {
    id: 'AGY-104',
    name: 'Apex Elevators & Lift AMC Solutions',
    shortName: 'Apex Lift AMC',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f156f?auto=format&fit=crop&w=800&q=80',
    category: 'Lift & Elevator Maintenance',
    serviceType: 'Passenger Lift Maintenance, ARD Emergency Rescue & Annual AMC',
    status: 'Inactive',
    employeeCount: 6,
    services: [
      'Bi-Monthly Passenger Lift AMC Servicing',
      'Automatic Rescue Device (ARD) Battery Diagnostics',
      'Emergency Lift Phone & Intercom Wiring Checks',
      'Overhead Traction Motor & Cable Inspections'
    ],
    primaryRoles: ['Lift AMC', 'Elevator Repair'],
    leadEngineer: 'Sanjay Kumar (Lift Tech)',
    leadTitle: 'Senior Elevator AMC Specialist',
    phone: '+91 98400 33221',
    emergencyHotline: '+91 80 4123 7755',
    email: 'support@apexelevators.in',
    rating: 4.2,
    openTicketsCount: 1,
    activeTicketIds: ['CMP-2026-081'],
    assignedComplexes: [
      {
        complex: 'Golden Apartment',
        towers: ['Golden Tower 1', 'Golden Tower 2'],
        unitsAssigned: 'Passenger Lifts 1 & 2',
        isPrimary: false
      }
    ]
  }
];

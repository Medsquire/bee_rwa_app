import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRwa } from '../context/RwaContext';
import { Modal, StatusPill, PriorityBadge, ApartmentBadge } from '../components/CommonUI';
import { 
  AlertTriangle, 
  Clock, 
  User, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Send, 
  Wrench,
  ShieldCheck,
  ShieldAlert,
  RotateCcw,
  Search,
  ChevronDown,
  Layers,
  Building,
  Tag,
  Crosshair,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Camera,
  FileText,
  Image as ImageIcon,
  Check,
  Upload,
  History,
  X,
  ExternalLink,
  Smartphone,
  Lock
} from 'lucide-react';

export const SAMPLE_ISSUE_PHOTOS = {
  'Lift & Elevator': 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80',
  'Lift / Elevator': 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80',
  'Water & Pump': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  'Water Supply': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  'Electrical': 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1200&q=80',
  'Electricity and Lighting': 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1200&q=80',
  'Plumbing': 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
  'Security': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
  'Housekeeping': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
  'Cleanliness': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
  'Parking': 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
  'Civil & Structural': 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
  'Fire Safety': 'https://images.unsplash.com/photo-1583306346647-79a022512f49?auto=format&fit=crop&w=1200&q=80',
  'Internet & CCTV': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
  'Waste Management': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
  'Garden & Common Areas': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
  'Park and Garden': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
  'Gym Equipment': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  'Indoor Sports': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
  'Function Hall': 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
  'Other': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
};

// 1. Issue Categories as specified
export const ISSUE_CATEGORIES = [
  'Lift & Elevator',
  'Water & Pump',
  'Electrical',
  'Plumbing',
  'Security',
  'Housekeeping',
  'Parking',
  'Civil & Structural',
  'Fire Safety',
  'Internet & CCTV',
  'Waste Management',
  'Garden & Common Areas',
  'Gym Equipment',
  'Indoor Sports',
  'Other'
];

// Dependent Issue Types by Category
export const ISSUE_TYPES_BY_CATEGORY = {
  'Lift & Elevator': [
    'Passenger Lift Jerking / Stalling',
    'Lift Doors Not Closing / Opening',
    'ARD / Emergency Battery Failure',
    'Lift Indicator / Call Button Failure',
    'Abnormal Vibration / Noise',
    'Overload Sensor Alarm Glitch',
    'Routine Preventive Servicing',
    'Other'
  ],
  'Water & Pump': [
    'Low Water Pressure in Lines',
    'Overhead Storage Tank Overflow',
    'Booster Pressure Pump Tripping',
    'Submersible Sump Pump Stalled',
    'Borewell Yield Interruption',
    'Water Discoloration / Odor',
    'Other'
  ],
  'Electrical': [
    'Corridor / Lobby Light Failure',
    'Main DG Auto-Start Failure',
    'MCB / Distribution Board Tripping',
    'Street / Perimeter Lighting Outage',
    'Voltage Fluctuation / Phase Cut',
    'Other'
  ],
  'Plumbing': [
    'Main Sewage Pipe Leakage',
    'Basement P2 Seepage Pooling',
    'Fire Hydrant Valve Drip',
    'Rainwater Harvesting Drain Block',
    'Clubhouse Restroom Flush Leak',
    'Other'
  ],
  'Security': [
    'Boom Barrier RFID Scanner Glitch',
    'Visitor Gate Turnstile Stalled',
    'Guard Patrol Device Non-Sync',
    'Perimeter Fence Motion Sensor False Alarm',
    'Other'
  ],
  'Housekeeping': [
    'Garbage Chute Blockage',
    'Stairwell Waste Accumulation',
    'Clubhouse Restroom Deep Clean Due',
    'Basement Floor Dusting & Sweeping Due',
    'Other'
  ],
  'Parking': [
    'Unauthorized Vehicle in Assigned Slot',
    'EV Charger Gun Not Releasing',
    'Basement Parking Slot Water Drip',
    'Speed Bump / Convex Mirror Damaged',
    'Other'
  ],
  'Civil & Structural': [
    'Plaster / Paint Peeling in Common Corridor',
    'Driveway Paver Block Settling / Crack',
    'Swimming Pool Deck Tiles Loose',
    'Boundary Wall Crack',
    'Other'
  ],
  'Fire Safety': [
    'Fire Hose Cabinet Glass Cracked',
    'Smoke Detector Low Battery Beep',
    'Fire Sprinkler Valve Pressure Low',
    'Emergency Exit Door Push Bar Jammed',
    'Other'
  ],
  'Internet & CCTV': [
    'Common Area Wi-Fi Router Down',
    'Tower Lobby CCTV Offline / Blurred',
    'Intercom System Static / Ring Failure',
    'NVR Storage Drive Error',
    'Other'
  ],
  'Waste Management': [
    'Wet Waste Composting Unit Overflow',
    'Recyclable Bins Full',
    'Bio-Medical Bin Clearance Required',
    'Other'
  ],
  'Garden & Common Areas': [
    'Automated Lawn Sprinkler Malfunction',
    'Children Playground Swing Chain Broken',
    'Tree Branch Trimming Required Near Cable',
    'Jogging Track Synthetic Mat Tear',
    'Other'
  ],
  'Gym Equipment': [
    'LifeFitness Treadmill Belt Slipping / Calibration Error',
    'Multi-Station Cable Weight Snapped',
    'Elliptical Display Monitor Blank',
    'Gym AC Not Cooling Below 25C',
    'Other'
  ],
  'Indoor Sports': [
    'Badminton Court Net Post Tension Wire Broken',
    'TT Table Surface Damaged',
    'Squash Court Glass Wall Scratched',
    'Billiards Cue Stick & Ball Replacement',
    'Other'
  ],
  'Other': [
    'Other'
  ]
};

// 2. Structured Places
export const PLACE_NAMES = [
  'Golden Tower 1',
  'Golden Tower 2',
  'Golden Tower 3',
  'Clubhouse',
  'Gym',
  'Swimming Pool',
  'Main Gate',
  'Security Office',
  'Basement Parking',
  'Pump Room',
  'Garden / Common Area',
  'Other'
];

const getOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

const generateTowerFloors = (towerName) => {
  const floors = ['Basement P2', 'Basement P1', 'Ground Floor'];
  for (let i = 1; i <= 32; i++) {
    floors.push(`${i}${getOrdinal(i)} Floor`);
  }
  floors.push('Rooftop / Terrace');
  return floors;
};

export const FLOORS_BY_PLACE = {
  'Golden Tower 1': generateTowerFloors('Golden Tower 1'),
  'Golden Tower 2': generateTowerFloors('Golden Tower 2'),
  'Golden Tower 3': generateTowerFloors('Golden Tower 3'),
  'Clubhouse': ['Ground Floor (Banquet & Lounge)', '1st Floor (Indoor Games & Library)', 'Rooftop (Gazebo Deck)'],
  'Gym': ['Ground Floor (Cardio & Weights Area)', 'Mezzanine (Yoga & Aerobics Studio)'],
  'Swimming Pool': ['Pool Deck (Ground Level)', 'Kids Splash Zone', 'Pump & Filtration Room (Underground)'],
  'Basement Parking': ['Basement P1 (Slots 001 - 250)', 'Basement P2 (Slots 251 - 500)', 'Basement P3 (Mechanical Stacker)'],
  'Pump Room': ['Underground Sump & Booster Pump Bay', 'Hydro-pneumatic Tank Level'],
  'Main Gate': [],
  'Security Office': [],
  'Garden / Common Area': [],
  'Other': []
};

export const ASSETS_BY_PLACE = {
  'Golden Tower 1': [
    'Passenger Lift #1',
    'Passenger Lift #2',
    'Service Lift',
    'Floor Corridor Lighting Panel',
    'Floor Garbage Chute Hopper',
    'Fire Hose Cabinet & Hydrant',
    'Electrical Distribution Board (DB)',
    'East Wing Staircase',
    'West Wing Staircase',
    'Other'
  ],
  'Golden Tower 2': [
    'Passenger Lift #1',
    'Passenger Lift #2',
    'Service Lift',
    'Floor Corridor Lighting Panel',
    'Floor Garbage Chute Hopper',
    'Fire Hose Cabinet & Hydrant',
    'Electrical Distribution Board (DB)',
    'East Wing Staircase',
    'West Wing Staircase',
    'Other'
  ],
  'Golden Tower 3': [
    'Passenger Lift #1',
    'Passenger Lift #2',
    'Service Lift',
    'Floor Corridor Lighting Panel',
    'Floor Garbage Chute Hopper',
    'Fire Hose Cabinet & Hydrant',
    'Electrical Distribution Board (DB)',
    'East Wing Staircase',
    'West Wing Staircase',
    'Other'
  ],
  'Clubhouse': [
    'Function Hall Split AC Units',
    'Banquet Stage & Audio Console',
    'Ceiling HD Projector & Motorized Screen',
    'TT & Billiards Lounge Equipment',
    'Guest Restroom Plumbing',
    'Other'
  ],
  'Gym': [
    'LifeFitness Treadmill #1',
    'LifeFitness Treadmill #2',
    'LifeFitness Treadmill #3',
    'Elliptical Cross Trainer',
    'Multi-Station Weight Rig',
    'Central 3-Ton Air Conditioner',
    'Locker & Shower Plumbing',
    'Other'
  ],
  'Swimming Pool': [
    'Main Pool Filtration Pump',
    'Kids Splash Pool Skimmer',
    'Poolside Deck Recliners',
    'Underwater LED Lighting Set',
    'Pool Chemical Dosing Unit',
    'Other'
  ],
  'Main Gate': [
    'Boom Barrier RFID Sensor #1',
    'Boom Barrier RFID Sensor #2',
    'Visitor Entry Turnstile Gate',
    'Main Security CCTV PTZ Camera',
    'Intercom Master Console',
    'Other'
  ],
  'Security Office': [
    'CCTV Monitoring Station & 32-ch NVR',
    'Fire Alarm Control Panel (FACP)',
    'Emergency PA Amplifier System',
    'Guard Key Deposit Locker',
    'Other'
  ],
  'Basement Parking': [
    'EV Fast Charging Station #1',
    'EV Fast Charging Station #2',
    'Submersible Dewatering Pump P1',
    'Submersible Dewatering Pump P2',
    'Basement Jet Ventilation Fan #1',
    'Fire Sprinkler Main Control Valve',
    'Other'
  ],
  'Pump Room': [
    'Hydro-pneumatic Booster Pump Motor #1',
    'Hydro-pneumatic Booster Pump Motor #2',
    'Sump Tank Inflow Float Valve',
    'Water Softener Resin Column',
    'Main Electrical Control Panel (MCC)',
    'Raw Water Chlorination Doser',
    'Other'
  ],
  'Garden / Common Area': [
    'Central Jogging Loop (Synthetic Track)',
    'Solar Pathway Bollard Light',
    'Children Play Multi-Play Station',
    'Automated Sprinkler Solenoid Valve #1',
    'North Gazebo Seating Pavilion',
    'Other'
  ],
  'Other': [
    'Other'
  ]
};

// Helper parsers to safely seed fields from existing complaint
const parseInitialCategory = (cat) => {
  if (!cat) return 'Lift & Elevator';
  if (ISSUE_CATEGORIES.includes(cat)) return cat;
  const c = cat.toLowerCase();
  if (c.includes('lift') || c.includes('elevator')) return 'Lift & Elevator';
  if (c.includes('water') || c.includes('pump')) return 'Water & Pump';
  if (c.includes('elect') || c.includes('light') || c.includes('power')) return 'Electrical';
  if (c.includes('plumb')) return 'Plumbing';
  if (c.includes('secur')) return 'Security';
  if (c.includes('clean') || c.includes('housekeep') || c.includes('chute')) return 'Housekeeping';
  if (c.includes('park') && !c.includes('garden')) return 'Parking';
  if (c.includes('civil') || c.includes('structur') || c.includes('seepage') || c.includes('wall') || c.includes('tile')) return 'Civil & Structural';
  if (c.includes('fire')) return 'Fire Safety';
  if (c.includes('cctv') || c.includes('internet') || c.includes('wifi') || c.includes('cable')) return 'Internet & CCTV';
  if (c.includes('waste') || c.includes('garbage')) return 'Waste Management';
  if (c.includes('garden') || c.includes('park') || c.includes('ground')) return 'Garden & Common Areas';
  if (c.includes('gym')) return 'Gym Equipment';
  if (c.includes('sport') || c.includes('court') || c.includes('table')) return 'Indoor Sports';
  return 'Other';
};

const parseInitialPlace = (loc = '', title = '') => {
  const l = (loc + ' ' + title).toLowerCase();
  if (l.includes('tower 1') || l.includes('gt1') || l.includes('gt-1')) return 'Golden Tower 1';
  if (l.includes('tower 2') || l.includes('gt2') || l.includes('gt-2')) return 'Golden Tower 2';
  if (l.includes('tower 3') || l.includes('gt3') || l.includes('gt-3')) return 'Golden Tower 3';
  if (l.includes('clubhouse') || l.includes('banquet') || l.includes('function hall')) return 'Clubhouse';
  if (l.includes('pool') || l.includes('swimming')) return 'Swimming Pool';
  if (l.includes('gym') || l.includes('fitness')) return 'Gym';
  if (l.includes('gate')) return 'Main Gate';
  if (l.includes('security')) return 'Security Office';
  if (l.includes('basement') || l.includes('parking')) return 'Basement Parking';
  if (l.includes('pump')) return 'Pump Room';
  if (l.includes('garden') || l.includes('central park')) return 'Garden / Common Area';
  return 'Golden Tower 1';
};

const parseInitialFloor = (loc = '', availableFloors = []) => {
  if (!availableFloors || availableFloors.length === 0) return '';
  const l = loc.toLowerCase();
  if (l.includes('rooftop') || l.includes('terrace')) {
    return availableFloors.find(f => f.toLowerCase().includes('rooftop')) || availableFloors[0];
  }
  if (l.includes('basement p2') || l.includes('p2')) {
    return availableFloors.find(f => f.toLowerCase().includes('p2')) || availableFloors[0];
  }
  if (l.includes('basement p1') || l.includes('p1')) {
    return availableFloors.find(f => f.toLowerCase().includes('p1')) || availableFloors[0];
  }
  if (l.includes('ground')) {
    return availableFloors.find(f => f.toLowerCase().includes('ground')) || availableFloors[0];
  }
  const match = loc.match(/(\d+)(?:st|nd|rd|th)?\s*floor/i);
  if (match) {
    const num = parseInt(match[1], 10);
    const target = `${num}${getOrdinal(num)} Floor`.toLowerCase();
    const found = availableFloors.find(f => f.toLowerCase().startsWith(target));
    if (found) return found;
  }
  const rangeMatch = loc.match(/floor\s*(\d+(?:-\d+)?)/i);
  if (rangeMatch) {
    const found = availableFloors.find(f => f.toLowerCase().includes(rangeMatch[1]));
    if (found) return found;
  }
  return availableFloors[0] || '';
};

const parseInitialAsset = (loc = '', title = '', availableAssets = []) => {
  const combined = (loc + ' ' + title).toLowerCase();
  for (const asset of availableAssets) {
    if (asset !== 'Other' && combined.includes(asset.toLowerCase())) {
      return asset;
    }
  }
  if (combined.includes('lift #2') || combined.includes('lift 2')) return 'Passenger Lift #2';
  if (combined.includes('lift #1') || combined.includes('lift 1')) return 'Passenger Lift #1';
  if (combined.includes('service lift')) return 'Service Lift';
  if (combined.includes('treadmill')) return 'LifeFitness Treadmill #3';
  if (combined.includes('boom barrier') || combined.includes('rfid')) return 'Boom Barrier RFID Sensor #1';
  if (combined.includes('fire hose')) return 'Fire Hose Cabinet & Hydrant';
  if (combined.includes('chute')) return 'Floor Garbage Chute Hopper';
  if (combined.includes('pump')) return 'Hydro-pneumatic Booster Pump Motor #1';
  return availableAssets[0] || 'Other';
};

export const isComplaintApproved = (complaint) => {
  if (!complaint) return false;
  if (typeof complaint === 'string') {
    return complaint.trim().toLowerCase() === 'approved';
  }
  return Boolean(
    complaint.approvedByRwa ||
    complaint.dispatchedToAgentApp ||
    complaint.status === 'Approved'
  );
};

export const ComplaintDetailsModal = ({ complaint, isOpen, onClose }) => {
  const { 
    currentRoleKey, 
    currentUser, 
    updateComplaintStatus, 
    assignComplaint,
    updateComplaintDetails,
    approveAndDispatchToAgentApp,
    sendDirectlyToAgentApp
  } = useRwa();

  if (!complaint) return null;

  const isManagement = ['president', 'vice_president', 'admin'].includes(currentRoleKey);
  const isCommonArea = complaint.complaintScope === 'Common Area' || !complaint.complaintScope;
  const isAwaitingRwaApproval = complaint.status === 'Pending Approval' || complaint.requiresApproval;

  // Category & Dependent Issue Type State
  const initialCategory = parseInitialCategory(complaint.category);
  const [category, setCategory] = useState(initialCategory);
  const [customCategory, setCustomCategory] = useState(
    initialCategory === 'Other' && !ISSUE_CATEGORIES.includes(complaint.category) ? complaint.category : ''
  );

  const availableIssueTypes = useMemo(() => {
    return ISSUE_TYPES_BY_CATEGORY[category] || ['Other'];
  }, [category]);

  const [issueType, setIssueType] = useState(() => {
    if (complaint.issueType && availableIssueTypes.includes(complaint.issueType)) {
      return complaint.issueType;
    }
    return availableIssueTypes[0] || 'Other';
  });
  const [customIssueType, setCustomIssueType] = useState(complaint.customIssueType || '');

  // Location Selection State (Field 1 to Field 4)
  const initialPlace = complaint.placeName || parseInitialPlace(complaint.location, complaint.title);
  const [placeName, setPlaceName] = useState(initialPlace);
  const [customPlaceName, setCustomPlaceName] = useState(complaint.customPlaceName || '');

  // Searchable Place dropdown state
  const [isPlaceDropdownOpen, setIsPlaceDropdownOpen] = useState(false);
  const [placeSearchText, setPlaceSearchText] = useState('');
  const placeDropdownRef = useRef(null);

  // Field 2: Relevant Floors based on selected place
  const relevantFloors = useMemo(() => {
    return FLOORS_BY_PLACE[placeName] || [];
  }, [placeName]);
  const hasFloors = relevantFloors.length > 0;

  const [floor, setFloor] = useState(() => {
    if (complaint.floor && relevantFloors.includes(complaint.floor)) return complaint.floor;
    return parseInitialFloor(complaint.location, relevantFloors);
  });

  // Field 3: Exact Location / Asset based on selected place
  const relevantAssets = useMemo(() => {
    return ASSETS_BY_PLACE[placeName] || ['Other'];
  }, [placeName]);

  const [asset, setAsset] = useState(() => {
    if (complaint.asset && relevantAssets.includes(complaint.asset)) return complaint.asset;
    return parseInitialAsset(complaint.location, complaint.title, relevantAssets);
  });
  const [customAsset, setCustomAsset] = useState(complaint.customAsset || '');

  // Field 4: Additional Location Details
  const [additionalLocation, setAdditionalLocation] = useState(complaint.additionalLocation || '');

  // Management controls state
  const [selectedStatus, setSelectedStatus] = useState(complaint.status || 'Submitted');
  const [selectedTech, setSelectedTech] = useState(complaint.assignedTo || 'Unassigned');
  const [timelineNote, setTimelineNote] = useState('');

  // Photo & Zoom State
  const defaultPhoto = complaint.photoUrl || SAMPLE_ISSUE_PHOTOS[category] || SAMPLE_ISSUE_PHOTOS['Lift & Elevator'];
  const [currentPhoto, setCurrentPhoto] = useState(defaultPhoto);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Audit Details Modal State
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditNoteInput, setAuditNoteInput] = useState('');

  // Complaint Tracking Modal State
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  // Approval state: first show only pending approval, then show approved after clicking "Send directly to the agency app"
  const [isApprovedLocally, setIsApprovedLocally] = useState(() => {
    return isComplaintApproved(complaint);
  });

  const isApproved = isApprovedLocally || isComplaintApproved(complaint) || selectedStatus === 'Approved';

  // Close searchable dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (placeDropdownRef.current && !placeDropdownRef.current.contains(event.target)) {
        setIsPlaceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update photo when category changes if user hasn't uploaded custom photo
  useEffect(() => {
    if (!complaint.photoUrl && SAMPLE_ISSUE_PHOTOS[category]) {
      setCurrentPhoto(SAMPLE_ISSUE_PHOTOS[category]);
    }
  }, [category, complaint.photoUrl]);

  // Reset dependent selections when Category changes
  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    if (newCat !== 'Other') {
      setCustomCategory('');
    }
    const newTypes = ISSUE_TYPES_BY_CATEGORY[newCat] || ['Other'];
    if (!newTypes.includes(issueType)) {
      setIssueType(newTypes[0] || 'Other');
    }
  };

  // Reset dependent selections when Place changes
  const handlePlaceChange = (newPlace) => {
    setPlaceName(newPlace);
    setIsPlaceDropdownOpen(false);
    setPlaceSearchText('');

    if (newPlace !== 'Other') {
      setCustomPlaceName('');
    }

    // Reset floor based on new place
    const newFloors = FLOORS_BY_PLACE[newPlace] || [];
    if (newFloors.length === 0) {
      setFloor('');
    } else if (!newFloors.includes(floor)) {
      setFloor(newFloors[0] || '');
    }

    // Reset asset based on new place
    const newAssets = ASSETS_BY_PLACE[newPlace] || ['Other'];
    if (!newAssets.includes(asset)) {
      setAsset(newAssets[0] || 'Other');
    }
    if (newPlace !== 'Other' && asset !== 'Other') {
      setCustomAsset('');
    }
  };

  // Filtered places for searchable dropdown
  const filteredPlaces = useMemo(() => {
    if (!placeSearchText.trim()) return PLACE_NAMES;
    return PLACE_NAMES.filter(p => 
      p.toLowerCase().includes(placeSearchText.toLowerCase())
    );
  }, [placeSearchText]);

  // Dynamic Full Location String
  const completeLocationString = useMemo(() => {
    const effectivePlace = placeName === 'Other' ? (customPlaceName.trim() || 'Custom Place') : placeName;
    const parts = [effectivePlace];
    if (hasFloors && floor) parts.push(floor);
    const effectiveAsset = asset === 'Other' ? customAsset.trim() : asset;
    if (effectiveAsset) parts.push(effectiveAsset);
    if (additionalLocation.trim()) parts.push(`(${additionalLocation.trim()})`);
    return parts.join(' • ');
  }, [placeName, customPlaceName, hasFloors, floor, asset, customAsset, additionalLocation]);

  const techniciansList = [
    'Sanjay Kumar (Otis AMC Lead Engineer)',
    'Ramesh Babu (Chief Plumbing Contractor)',
    'Rajesh Verma (Senior Electrician)',
    'Sunita Devi (CleanPro Housekeeping Supervisor)',
    'Vikram Singh (Security Chief)',
    'Mahendra Joshi (Sports Annex Caretaker)',
    'Raghavan Pillai (Golden Tower 1 Supervisor)',
    'Suresh Nayak (Golden Tower 3 Supervisor)'
  ];

  const allStatuses = [
    'Pending Approval',
    'Approved',
    'In Progress',
    'Resolved',
    'Closed'
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCurrentPhoto(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const finalCategory = category === 'Other' ? (customCategory.trim() || 'Other') : category;
    const finalIssueType = issueType === 'Other' ? (customIssueType.trim() || 'Other') : issueType;
    const finalPlace = placeName === 'Other' ? (customPlaceName.trim() || 'Other') : placeName;
    const finalAsset = asset === 'Other' ? (customAsset.trim() || 'Other') : asset;

    const updates = {
      category: finalCategory,
      issueType: finalIssueType,
      placeName: finalPlace,
      customPlaceName: placeName === 'Other' ? customPlaceName : '',
      floor: hasFloors ? floor : '',
      asset: finalAsset,
      customAsset: asset === 'Other' ? customAsset : '',
      additionalLocation: additionalLocation.trim(),
      location: completeLocationString,
      status: selectedStatus,
      assignedTo: selectedTech,
      photoUrl: currentPhoto
    };

    const noteText = timelineNote.trim() || `Work order details updated by ${currentUser?.name || 'Management'}`;

    if (updateComplaintDetails) {
      updateComplaintDetails(complaint.id, updates, noteText);
    } else {
      if (selectedStatus !== complaint.status) {
        updateComplaintStatus(complaint.id, selectedStatus, noteText);
      }
      if (selectedTech !== complaint.assignedTo && selectedTech !== 'Unassigned') {
        assignComplaint(complaint.id, selectedTech);
      }
    }

    setTimelineNote('');
    onClose();
  };

  const handleApproveCommonArea = () => {
    const chosenTech = selectedTech !== 'Unassigned' ? selectedTech : 'Sanjay Kumar (Otis AMC Lead Engineer)';
    const note = timelineNote.trim() || `Approved by RWA (${currentUser?.name || 'Office'}) & dispatched to Agent App.`;
    if (approveAndDispatchToAgentApp) {
      approveAndDispatchToAgentApp(complaint.id, chosenTech, note);
    } else {
      updateComplaintStatus(complaint.id, 'Assigned', note);
    }
    onClose();
  };

  const handleDirectDispatch = () => {
    const chosenTech = selectedTech !== 'Unassigned' ? selectedTech : 'Sanjay Kumar (Otis AMC Lead Engineer)';
    const note = timelineNote.trim() || `Directly sent to Agency App by RWA User (${currentUser?.name || 'Office'}) with zero approvals.`;
    
    setIsApprovedLocally(true);
    setSelectedStatus('Approved');

    if (sendDirectlyToAgentApp) {
      sendDirectlyToAgentApp(complaint.id, chosenTech, note);
    } else {
      updateComplaintStatus(complaint.id, 'Approved', note);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={category === 'Other' && customCategory ? customCategory : category}
        subtitle={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            <Clock size={13} style={{ color: 'var(--electric-blue)' }} />
            <span>Time: <strong>{complaint.createdAt}</strong></span>
            <span>•</span>
            <span>Ticket #{complaint.id}</span>
          </div>
        }
        maxWidth="740px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Action Buttons Below Title Bar: Pending Approval, Approved, Audit, and Complaint Tracking */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            padding: '10px 14px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {/* First show only Pending Approval status. After clicking "Send directly to the agency app", then show Approved */}
              {!isApproved ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    border: '1.5px solid #F59E0B'
                  }}
                  title="Status: Pending Approval"
                >
                  <Clock size={14} style={{ color: '#D97706' }} />
                  <span>Pending Approval</span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D97706' }} />
                </div>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    backgroundColor: '#ECFDF5',
                    color: '#065F46',
                    border: '1.5px solid #10B981'
                  }}
                  title="Status: Approved & Dispatched"
                >
                  <CheckCircle2 size={14} style={{ color: '#059669' }} />
                  <span>Approved</span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#059669' }} />
                </div>
              )}

              {/* Audit Button */}
              <button
                type="button"
                onClick={() => setIsAuditModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: '#F8FAFC',
                  color: '#1E293B',
                  border: '1px solid #CBD5E1',
                  transition: 'all 0.15s ease'
                }}
                title="Check full audit log and history"
              >
                <History size={14} style={{ color: 'var(--electric-blue)' }} />
                <span>Audit ({complaint.history?.length || 0})</span>
              </button>
            </div>

            {/* Complaint Tracking Button */}
            <button
              type="button"
              onClick={() => setIsTrackingModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: 'var(--electric-blue)',
                color: '#FFFFFF',
                border: 'none',
                boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
                transition: 'all 0.15s ease'
              }}
              title="Open Live Complaint Tracking"
            >
              <Crosshair size={14} />
              <span>Complaint Tracking</span>
            </button>
          </div>

          {/* =========================================================================
              REQ 2 ORDER: 1. PHOTO -> 2. DESCRIPTION -> 3. LOCATION -> 4. CATEGORY
              ========================================================================= */}

          {/* 1. PHOTO (Visible clearly with Zoom, NO PDF format) */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Camera size={15} style={{ color: 'var(--electric-blue)' }} />
                <h5 style={{ fontSize: '0.8125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  1. Issue Photo & Visual Evidence
                </h5>
              </div>

              {/* Zoom & Upload Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsLightboxOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    padding: '3px 8px',
                    borderRadius: '5px'
                  }}
                  title="Open high-res zoom lightbox"
                >
                  <Maximize2 size={12} />
                  <span>Click to Zoom</span>
                </button>

                {!isApproved ? (
                  <label
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.72rem',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      margin: 0
                    }}
                    title="Upload a new photo"
                  >
                    <Upload size={12} />
                    <span>Change Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handlePhotoUpload}
                    />
                  </label>
                ) : (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.72rem',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      backgroundColor: '#F1F5F9',
                      color: '#64748B',
                      fontWeight: 600
                    }}
                    title="Photo cannot be changed after dispatch"
                  >
                    <Lock size={11} />
                    <span>Photo Locked</span>
                  </span>
                )}
              </div>
            </div>

            {/* Clear Image Frame with Hover Zoom Effect */}
            <div 
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#0F172A',
                height: '240px',
                cursor: 'zoom-in',
                border: '1px solid #CBD5E1'
              }}
              onClick={() => setIsLightboxOpen(true)}
            >
              <img 
                src={currentPhoto} 
                alt={complaint.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.25s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
              />

              {/* Overlay pill */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(4px)',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <ZoomIn size={12} />
                <span>Verified Evidence Photo • High Resolution</span>
              </div>
            </div>
          </div>

          {/* 2. DESCRIPTION */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={15} style={{ color: 'var(--electric-blue)' }} />
                <h5 style={{ fontSize: '0.8125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  2. Description & Problem Details
                </h5>
              </div>
              {complaint.priority?.toLowerCase() === 'urgent' && (
                <PriorityBadge priority={complaint.priority} />
              )}
            </div>

            <div style={{
              padding: '12px 14px',
              borderRadius: '6px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              fontSize: '0.84rem',
              lineHeight: 1.55,
              color: '#1E293B'
            }}>
              {complaint.description}
            </div>

            {/* Reporter & Metadata Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '8px', 
              fontSize: '0.78rem',
              backgroundColor: 'var(--bg-hover)',
              padding: '10px 12px',
              borderRadius: '6px'
            }}>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Reported By:</span>{' '}
                <strong style={{ color: '#0F172A' }}>{complaint.submittedBy}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Registered:</span>{' '}
                <strong style={{ color: '#0F172A' }}>{complaint.createdAt}</strong>
              </div>
             
            </div>
          </div>

          {/* 3. LOCATION (Place, Floor, Asset, Additional details) */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} style={{ color: 'var(--electric-blue)' }} />
                <h5 style={{ fontSize: '0.8125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  3. Location Selection & Asset Mapping
                </h5>
              </div>
              {isApproved && (
                <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                  <Lock size={11} /> Locked
                </span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: hasFloors ? '1.2fr 1fr 1.2fr' : '1.5fr 1.5fr', gap: '12px' }}>
              
              {/* Field 1: Place Name * (Searchable Dropdown) */}
              <div className="form-group" style={{ marginBottom: 0, position: 'relative' }} ref={placeDropdownRef}>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Field 1: Place Name *
                </label>
                <button
                  type="button"
                  disabled={isApproved}
                  onClick={() => !isApproved && setIsPlaceDropdownOpen(prev => !prev)}
                  className="form-control"
                  style={{
                    height: '36px',
                    fontSize: '0.8125rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: isApproved ? '#F8FAFC' : '#FFFFFF',
                    cursor: isApproved ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    borderRadius: '6px',
                    borderColor: isPlaceDropdownOpen ? 'var(--electric-blue)' : undefined,
                    opacity: isApproved ? 0.9 : 1
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {placeName}
                  </span>
                  {!isApproved ? (
                    <ChevronDown size={14} style={{ color: '#64748B', flexShrink: 0, transform: isPlaceDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }} />
                  ) : (
                    <Lock size={12} style={{ color: '#94A3B8', flexShrink: 0 }} />
                  )}
                </button>

                {/* Searchable dropdown menu */}
                {isPlaceDropdownOpen && !isApproved && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    marginTop: '4px',
                    maxHeight: '230px',
                    overflowY: 'auto',
                    padding: '6px'
                  }}>
                    <div style={{ position: 'relative', marginBottom: '6px' }}>
                      <Search size={13} style={{ position: 'absolute', left: '8px', top: '8px', color: '#94A3B8' }} />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search place name..."
                        value={placeSearchText}
                        onChange={e => setPlaceSearchText(e.target.value)}
                        style={{ height: '28px', fontSize: '0.75rem', paddingLeft: '26px' }}
                        autoFocus
                      />
                    </div>
                    {filteredPlaces.length === 0 ? (
                      <div style={{ padding: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                        No matching place found
                      </div>
                    ) : (
                      filteredPlaces.map(p => (
                        <div
                          key={p}
                          onClick={() => handlePlaceChange(p)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '5px',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            backgroundColor: placeName === p ? 'var(--bg-hover)' : 'transparent',
                            color: placeName === p ? 'var(--electric-blue)' : 'var(--text-primary)',
                            fontWeight: placeName === p ? 700 : 500
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = placeName === p ? 'var(--bg-hover)' : 'transparent'}
                        >
                          {p}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Field 2: Floor */}
              {hasFloors && (
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Field 2: Floor
                  </label>
                  <select
                    className="form-control"
                    value={floor}
                    disabled={isApproved}
                    onChange={e => setFloor(e.target.value)}
                    style={{
                      height: '36px',
                      fontSize: '0.8125rem',
                      borderRadius: '6px',
                      backgroundColor: isApproved ? '#F8FAFC' : undefined,
                      cursor: isApproved ? 'not-allowed' : undefined
                    }}
                  >
                    <option value="">-- Select Floor --</option>
                    {relevantFloors.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Field 3: Exact Location / Asset */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Field 3: Exact Location / Asset
                </label>
                {relevantAssets.length > 0 && relevantAssets[0] !== 'Other' ? (
                  <select
                    className="form-control"
                    value={asset}
                    disabled={isApproved}
                    onChange={e => setAsset(e.target.value)}
                    style={{
                      height: '36px',
                      fontSize: '0.8125rem',
                      borderRadius: '6px',
                      backgroundColor: isApproved ? '#F8FAFC' : undefined,
                      cursor: isApproved ? 'not-allowed' : undefined
                    }}
                  >
                    {relevantAssets.map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Passenger Lift #1, Pump Motor #1..."
                    value={customAsset}
                    disabled={isApproved}
                    readOnly={isApproved}
                    onChange={e => setCustomAsset(e.target.value)}
                    style={{
                      height: '36px',
                      fontSize: '0.8125rem',
                      borderRadius: '6px',
                      backgroundColor: isApproved ? '#F8FAFC' : undefined,
                      cursor: isApproved ? 'not-allowed' : undefined
                    }}
                  />
                )}
              </div>
            </div>

            {/* Custom Place Input if 'Other' selected */}
            {placeName === 'Other' && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  Custom Place Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter custom place name (e.g. Tennis Court Pavilion, Gate 2 Guardhouse)..."
                  value={customPlaceName}
                  disabled={isApproved}
                  readOnly={isApproved}
                  onChange={e => setCustomPlaceName(e.target.value)}
                  style={{
                    height: '36px',
                    fontSize: '0.8125rem',
                    backgroundColor: isApproved ? '#F8FAFC' : undefined,
                    cursor: isApproved ? 'not-allowed' : undefined
                  }}
                />
              </div>
            )}

            {/* Custom Asset Input if 'Other' selected */}
            {asset === 'Other' && relevantAssets.length > 0 && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  Custom Exact Asset Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Specify exact asset or fixture (e.g. Passenger Lift #2, Motor #1)..."
                  value={customAsset}
                  disabled={isApproved}
                  readOnly={isApproved}
                  onChange={e => setCustomAsset(e.target.value)}
                  style={{
                    height: '36px',
                    fontSize: '0.8125rem',
                    backgroundColor: isApproved ? '#F8FAFC' : undefined,
                    cursor: isApproved ? 'not-allowed' : undefined
                  }}
                />
              </div>
            )}

            {/* Field 4: Additional Location Details */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Field 4: Additional Location Details (Optional)
              </label>
              <textarea
                className="form-control"
                rows={2}
                placeholder="Enter a nearby landmark or additional location details."
                value={additionalLocation}
                disabled={isApproved}
                readOnly={isApproved}
                onChange={e => setAdditionalLocation(e.target.value)}
                style={{
                  fontSize: '0.8125rem',
                  resize: isApproved ? 'none' : 'vertical',
                  backgroundColor: isApproved ? '#F8FAFC' : undefined,
                  cursor: isApproved ? 'not-allowed' : undefined
                }}
              />
            </div>

         
          </div>

          {/* 4. CATEGORY (Category & Dependent Issue Type) */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Tag size={15} style={{ color: 'var(--electric-blue)' }} />
                <h5 style={{ fontSize: '0.8125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  4. Issue Category & Classification
                </h5>
              </div>
              {isApproved && (
                <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                  <Lock size={11} /> Locked
                </span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {/* Category Dropdown */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Issue Category *
                </label>
                <select
                  className="form-control"
                  value={category}
                  disabled={isApproved}
                  onChange={e => handleCategoryChange(e.target.value)}
                  style={{
                    height: '36px',
                    fontSize: '0.8125rem',
                    borderRadius: '6px',
                    backgroundColor: isApproved ? '#F8FAFC' : undefined,
                    cursor: isApproved ? 'not-allowed' : undefined
                  }}
                >
                  {ISSUE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Dependent Issue Type Dropdown */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Issue Type *
                </label>
                <select
                  className="form-control"
                  value={issueType}
                  disabled={isApproved}
                  onChange={e => setIssueType(e.target.value)}
                  style={{
                    height: '36px',
                    fontSize: '0.8125rem',
                    borderRadius: '6px',
                    backgroundColor: isApproved ? '#F8FAFC' : undefined,
                    cursor: isApproved ? 'not-allowed' : undefined
                  }}
                >
                  {availableIssueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Category Input if Other selected */}
            {category === 'Other' && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  Custom Category Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter custom category name..."
                  value={customCategory}
                  disabled={isApproved}
                  readOnly={isApproved}
                  onChange={e => setCustomCategory(e.target.value)}
                  style={{
                    height: '36px',
                    fontSize: '0.8125rem',
                    backgroundColor: isApproved ? '#F8FAFC' : undefined,
                    cursor: isApproved ? 'not-allowed' : undefined
                  }}
                />
              </div>
            )}

            {/* Custom Issue Type Input if Other selected */}
            {issueType === 'Other' && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  Custom Issue Type Details *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Specify the exact issue type..."
                  value={customIssueType}
                  disabled={isApproved}
                  readOnly={isApproved}
                  onChange={e => setCustomIssueType(e.target.value)}
                  style={{
                    height: '36px',
                    fontSize: '0.8125rem',
                    backgroundColor: isApproved ? '#F8FAFC' : undefined,
                    cursor: isApproved ? 'not-allowed' : undefined
                  }}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isManagement && !isApproved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', paddingTop: '4px' }}>
              {/* Send directly to the agency app button */}
              <button 
                type="button"
                className="btn btn-primary"
                onClick={handleDirectDispatch}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
              >
                <Smartphone size={15} />
                <span>Send Directly to the Agency App</span>
              </button>

              {/* Save Work Order Updates button (only available before agency dispatch) */}
              <button 
                type="button"
                className="btn btn-secondary"
                onClick={handleSave}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
              >
                <Check size={15} />
                <span>Save Work Order Updates</span>
              </button>
            </div>
          )}

          {/* Resident Actions (e.g. Reopen or Close if resolved) */}
          {!isManagement && complaint.status === 'Resolved' && (
            <div style={{ display: 'flex', gap: '10px', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-hover)' }}>
              <button 
                className="btn btn-success btn-sm" 
                style={{ flex: 1 }}
                onClick={() => {
                  updateComplaintStatus(complaint.id, 'Closed', 'Resident verified resolution and closed ticket.');
                  onClose();
                }}
              >
                <CheckCircle2 size={14} /> Confirm & Close Ticket
              </button>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  updateComplaintStatus(complaint.id, 'Reopened', 'Resident reported issue recurring. Reopened.');
                  onClose();
                }}
              >
                <RotateCcw size={14} /> Reopen Ticket
              </button>
            </div>
          )}

        </div>
      </Modal>

      {/* =========================================================================
          REQ 3: PHOTO ZOOM LIGHTBOX (High clarity, interactive zoom, no PDF)
          ========================================================================= */}
      {isLightboxOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => {
            setIsLightboxOpen(false);
            setZoomLevel(1);
          }}
        >
          {/* Top Control Bar */}
          <div 
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#FFFFFF'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
                {complaint.title}
              </h4>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#94A3B8' }}>
                Ticket #{complaint.id} • Category: {category} • Zoom: {Math.round(zoomLevel * 100)}%
              </p>
            </div>

            {/* Zoom Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.3, 3))}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderColor: 'transparent' }}
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.3, 0.7))}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderColor: 'transparent' }}
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setZoomLevel(1)}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderColor: 'transparent', fontSize: '0.75rem' }}
                title="Reset Zoom"
              >
                Reset (100%)
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-icon"
                onClick={() => {
                  setIsLightboxOpen(false);
                  setZoomLevel(1);
                }}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', borderColor: 'transparent' }}
                title="Close Lightbox"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Zoomable Image Container */}
          <div 
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              overflow: 'auto',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={currentPhoto} 
              alt="High resolution issue zoom view"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
                maxWidth: '85vw',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '6px'
              }}
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          REQ 4: AUDIT DETAILS MODAL (Separate popup keeps main page clean & compact)
          ========================================================================= */}
      {isAuditModalOpen && (
        <Modal
          isOpen={isAuditModalOpen}
          onClose={() => setIsAuditModalOpen(false)}
          title="Resolution Timeline & Audit Trail"
          subtitle={`Ticket #${complaint.id} • ${complaint.history?.length || 0} Audit Log Events`}
          maxWidth="560px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Quick Summary Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem'
            }}>
              <div>
                <span style={{ color: '#64748B' }}>Ticket Status:</span>{' '}
                <StatusPill status={selectedStatus || complaint.status} />
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Registered:</span>{' '}
                <strong style={{ color: '#0F172A' }}>{complaint.createdAt}</strong>
              </div>
            </div>

            {/* Audit History Timeline */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              borderLeft: '2px solid var(--electric-blue)',
              paddingLeft: '16px',
              marginLeft: '8px',
              maxHeight: '340px',
              overflowY: 'auto'
            }}>
              {complaint.history?.map((h, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-23px',
                    top: '4px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--electric-blue)',
                    boxShadow: '0 0 0 3px #FFFFFF'
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>{h.timestamp}</span>
                    <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>{h.author}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#1E293B', margin: '3px 0 0', lineHeight: 1.45 }}>
                    {h.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Audit Note Input (for RWA Users) */}
            {isManagement && (
              <div style={{
                borderTop: '1px solid #E2E8F0',
                paddingTop: '12px',
                display: 'flex',
                gap: '8px'
              }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add timestamped audit note..."
                  value={auditNoteInput}
                  onChange={e => setAuditNoteInput(e.target.value)}
                  style={{ fontSize: '0.8125rem', height: '36px' }}
                />
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    if (auditNoteInput.trim()) {
                      const noteText = auditNoteInput.trim();
                      if (updateComplaintStatus) {
                        updateComplaintStatus(complaint.id, selectedStatus || complaint.status, noteText);
                      }
                      setAuditNoteInput('');
                    }
                  }}
                  style={{ flexShrink: 0 }}
                >
                  <Send size={13} />
                  <span>Log</span>
                </button>
              </div>
            )}

            <button 
              type="button"
              className="btn btn-secondary" 
              onClick={() => setIsAuditModalOpen(false)}
              style={{ alignSelf: 'flex-end', fontSize: '0.8125rem' }}
            >
              Close Audit Trail
            </button>
          </div>
        </Modal>
      )}

      {/* =========================================================================
          REQ 3: COMPLAINT TRACKING MODAL POPUP
          ========================================================================= */}
      {isTrackingModalOpen && (
        <ComplaintTrackingModal
          complaint={complaint}
          isOpen={isTrackingModalOpen}
          onClose={() => setIsTrackingModalOpen(false)}
          category={category === 'Other' && customCategory ? customCategory : category}
        />
      )}
    </>
  );
};

export const ComplaintTrackingModal = ({ complaint, isOpen, onClose, category }) => {
  if (!isOpen || !complaint) return null;

  const currentCat = category || complaint.category || 'General Issue';
  const status = complaint.status || 'Pending Approval';
  const isClosed = status === 'Closed';
  const isResolved = status === 'Resolved';
  const isInProgress = status === 'In Progress' || status === 'Reopened';
  const isApproved = status === 'Approved' || status === 'Assigned' || status === 'Acknowledged' || isInProgress || isResolved || isClosed || !!complaint.approvedByRwa || !!complaint.dispatchedToAgentApp;
  
  // Current stage: 1 = Pending Approval, 2 = Approved, 3 = In Progress, 4 = Resolved, 5 = Closed
  let currentStage = 1;
  if (isClosed) {
    currentStage = 5;
  } else if (isResolved) {
    currentStage = 4;
  } else if (isInProgress) {
    currentStage = 3;
  } else if (isApproved) {
    currentStage = 2;
  } else {
    currentStage = 1;
  }

  const steps = [
    {
      title: 'Pending Approval',
      desc: currentStage === 1
        ? `Submitted by ${complaint.submittedBy || 'Resident'} (${complaint.submittedByRole || 'Resident'}). Awaiting RWA review.`
        : `Submitted by ${complaint.submittedBy || 'Resident'} (${complaint.submittedByRole || 'Resident'})`,
      time: complaint.createdAt || 'Registered',
      done: currentStage > 1,
      active: currentStage === 1
    },
    {
      title: 'Approved',
      desc: currentStage >= 2 
        ? 'Approved by RWA Management & sent to Agency App'
        : 'Waiting for RWA Management review & dispatch',
      time: currentStage >= 2 ? (complaint.updatedAt || 'Approved') : 'Pending',
      done: currentStage > 2,
      active: currentStage === 2
    },
    {
      title: 'In Progress',
      desc: currentStage >= 3 
        ? `${complaint.assignedTo && complaint.assignedTo !== 'Unassigned' ? complaint.assignedTo.split('(')[0].trim() : 'Technician'} working on-site` 
        : 'Pending technician on-site deployment',
      time: currentStage === 3 ? 'Active On-Site' : (currentStage > 3 ? 'Completed' : 'Scheduled'),
      done: currentStage > 3,
      active: currentStage === 3
    },
    {
      title: 'Resolved',
      desc: currentStage >= 4 
        ? 'Work completed, tested, and marked resolved' 
        : 'Pending inspection & sign-off',
      time: currentStage >= 4 ? (complaint.updatedAt || 'Resolved') : 'Pending',
      done: currentStage > 4,
      active: currentStage === 4
    },
    {
      title: 'Closed',
      desc: currentStage === 5 
        ? 'Resident verified resolution and ticket permanently closed' 
        : 'Pending resident verification & final closure',
      time: currentStage === 5 ? (complaint.updatedAt || 'Closed') : 'Pending Verification',
      done: currentStage === 5,
      active: false
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Crosshair size={20} style={{ color: 'var(--electric-blue)' }} />
          <span>Complaint Tracking</span>
        </div>
      }
      subtitle={`Ticket #${complaint.id} • ${currentCat} • Registered: ${complaint.createdAt}`}
      maxWidth="620px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* SLA & Live Status Banner */}
        <div style={{
          backgroundColor: '#F8FAFC',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
              Current Status
            </div>
            <div style={{ marginTop: '2px' }}>
              <StatusPill status={complaint.status} />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
              Guaranteed SLA
            </div>
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
              ⚡ 4-Hour Response SLA (On Schedule)
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
              Location
            </div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginTop: '2px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {complaint.placeName || complaint.location}
            </div>
          </div>
        </div>

        {/* Tracking Milestones Stepper */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '6px 0 6px 12px' }}>
          {steps.map((st, index) => {
            const isLast = index === steps.length - 1;
            return (
              <div key={index} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                {!isLast && (
                  <div style={{
                    position: 'absolute',
                    top: '24px',
                    left: '11px',
                    bottom: '-16px',
                    width: '2px',
                    backgroundColor: st.done ? '#10B981' : '#E2E8F0'
                  }} />
                )}

                {/* Marker */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: st.done ? '#10B981' : st.active ? '#F59E0B' : '#E2E8F0',
                  color: st.done || st.active ? '#FFFFFF' : '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                  boxShadow: st.active ? '0 0 0 4px rgba(245, 158, 11, 0.2)' : 'none'
                }}>
                  {st.done ? (
                    <Check size={14} />
                  ) : st.active ? (
                    <Clock size={13} />
                  ) : (
                    <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>{index + 1}</span>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: isLast ? 0 : '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: st.done ? '#0F172A' : st.active ? '#B45309' : '#64748B'
                    }}>
                      {st.title}
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: st.done ? '#059669' : st.active ? '#D97706' : '#94A3B8',
                      backgroundColor: st.done ? '#ECFDF5' : st.active ? '#FFFBEB' : '#F1F5F9',
                      padding: '2px 7px',
                      borderRadius: '4px'
                    }}>
                      {st.time}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px', lineHeight: 1.4 }}>
                    {st.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Assigned Technician Card */}
        {complaint.assignedTo && complaint.assignedTo !== 'Unassigned' && (
          <div style={{
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: '8px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--electric-blue)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.875rem'
              }}>
                <Wrench size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1E40AF' }}>
                  {complaint.assignedTo}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#3B82F6' }}>
                  Lead Service Engineer • Dedicated AMC Agency
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #BFDBFE',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#1E40AF'
            }}>
              📞 +91 98450 11990
            </div>
          </div>
        )}

        {/* Footer Close */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
          style={{ alignSelf: 'flex-end', fontSize: '0.8125rem' }}
        >
          Close Tracking
        </button>
      </div>
    </Modal>
  );
};

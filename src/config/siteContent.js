export const treatments = [
  {
    id: 'root-canal-treatment',
    name: 'Root Canal Treatment',
    image: '/services/Rootcanal.png',
    video: '/treatment-videos/Rootcanal.mp4',
    duration: '75 min diagnosis',
    blurb: 'Relieve tooth pain and save infected teeth with precise root canal care.',
    highlight: 'Pain relief',
    details:
      'A focused endodontic visit for tooth infection, deep decay, and sensitivity, planned to preserve your natural tooth comfortably.',
  },
  {
    id: 'wisdom-tooth-removal',
    name: 'Wisdom Tooth Removal',
    image: '/services/Wisdom Tooth.png',
    gif: '/treatment-gifs/wisdom-teeth.gif',
    duration: '45 min surgical consult',
    blurb: 'Careful evaluation and removal for painful, impacted, or crowded wisdom teeth.',
    highlight: 'Oral surgery',
    details:
      'A surgical consultation for wisdom teeth, swelling, pain, and impacted teeth with clear aftercare guidance.',
  },
  {
    id: 'laser-dentistry',
    name: 'Laser Dentistry',
    image: '/services/Laser Dentistry.png',
    duration: '40 min consultation',
    blurb: 'Minimally invasive laser care for soft-tissue treatments and gum comfort.',
    highlight: 'Modern care',
    details:
      'Laser-assisted dental treatment for selected gum, soft-tissue, and comfort-focused procedures with precise planning.',
  },
  {
    id: 'teeth-whitening',
    name: 'Teeth Whitening',
    image: '/services/Teeth Whitening.png',
    video: '/treatment-videos/Teeth%20Whitening.mp4',
    duration: '45 min cosmetic consult',
    blurb: 'Brighten stains and refresh your smile with dentist-guided whitening care.',
    highlight: 'Smile brightening',
    details:
      'A cosmetic dental visit for surface stains, dullness, and smile brightness with guidance on safe whitening options.',
  },
  {
    id: 'dental-fillings',
    name: 'Dental Fillings',
    image: '/services/Dental Fillings.png',
    video: '/treatment-videos/Dental%20Fillings.mp4',
    duration: '35 min visit',
    blurb: 'Repair cavities and minor tooth damage with natural-looking dental fillings.',
    highlight: 'Tooth repair',
    details:
      'A restorative visit for cavities, chipped teeth, and tooth-colored fillings designed to protect healthy structure.',
  },
  {
    id: 'dental-crown',
    name: 'Dental Crown',
    image: '/services/Dental Crown.png',
    gif: '/treatment-gifs/dental%20crown.gif',
    duration: '60 min restorative visit',
    blurb: 'Restore weakened or broken teeth with durable, shade-matched crowns.',
    highlight: 'Restorative care',
    details:
      'A crown consultation for cracked, root-canal-treated, or worn teeth needing long-term strength and natural appearance.',
  },
  {
    id: 'dental-implants',
    name: 'Dental Implants',
    image: '/services/Dental implants.png',
    video: '/treatment-videos/Dental%20Implants.mp4',
    duration: '120 min implant assessment',
    blurb: 'Replace missing teeth with stable, natural-looking implant treatment planning.',
    highlight: 'Implant care',
    details:
      'An implant consultation for single or multiple missing teeth with digital planning, bite assessment, and long-term restoration options.',
  },
  {
    id: 'dental-braces',
    name: 'Dental Braces',
    image: '/services/Dental Braces.png',
    gif: '/treatment-gifs/Dental%20braces.gif',
    duration: '60 min orthodontic consult',
    blurb: 'Plan reliable teeth alignment with braces for crowding, spacing, and bite correction.',
    highlight: 'Orthodontics',
    details:
      'An orthodontic consultation to assess alignment, bite, jaw growth, and treatment options with fixed braces.',
  },
  {
    id: 'clear-aligners',
    name: 'Clear Aligners',
    image: '/services/Clear Aligners.png',
    video: '/treatment-videos/Clear%20Aligners.mp4',
    duration: '60 min scan',
    blurb: 'Straighten teeth discreetly with scan-led clear aligner treatment planning.',
    highlight: 'Invisible braces',
    details:
      'A clear aligner assessment for mild to moderate crowding, spacing, and bite refinement with removable trays.',
  },
  {
    id: 'advanced-gum-treatment',
    name: 'Advanced Gum Treatment',
    image: '/services/Advanced Gum Treatment.png',
    duration: '50 min periodontal exam',
    blurb: 'Treat bleeding gums, inflammation, and periodontal concerns with focused care.',
    highlight: 'Gum health',
    details:
      'A periodontal visit for gum bleeding, deep cleaning needs, gum infection, and long-term tooth stability.',
  },
  {
    id: 'kids-dentistry',
    name: 'Kids Dentistry',
    image: '/services/Kids Dentistry.png',
    duration: '45 min visit',
    blurb: 'Gentle checkups, preventive care, sealants, and friendly guidance for children.',
    highlight: 'Child dental care',
    details:
      'A child-friendly dental visit for checkups, cavities, habits, preventive care, and parent guidance.',
  },
  {
    id: 'dentures',
    name: 'Dentures',
    image: '/services/Dentures.png',
    gif: '/treatment-gifs/Dentures.gif',
    duration: '70 min prosthetic consult',
    blurb: 'Restore missing teeth with comfortable full or partial denture planning.',
    highlight: 'Smile restoration',
    details:
      'A prosthetic consultation for removable full or partial dentures designed around fit, bite, and appearance.',
  },
  {
    id: 'mouth-ulcers',
    name: 'Mouth Ulcers',
    image: '/services/mouth ulcers.png',
    duration: '30 min oral exam',
    blurb: 'Get recurring or painful mouth ulcers checked with careful oral examination.',
    highlight: 'Oral medicine',
    details:
      'An oral health consultation for painful, recurring, or non-healing ulcers with diagnosis and treatment guidance.',
  },
]

export const treatmentInsights = {
  'root-canal-treatment': {
    benefits: ['Relieves deep tooth pain', 'Helps save the natural tooth', 'Stops infection from spreading'],
    whoNeedsIt: ['Patients with severe sensitivity', 'Deep cavities or tooth infection', 'Pain while chewing'],
  },
  'wisdom-tooth-removal': {
    benefits: ['Reduces pain and swelling', 'Prevents crowding and infection', 'Protects nearby teeth'],
    whoNeedsIt: ['Impacted wisdom teeth', 'Jaw pain or gum swelling', 'Repeated food trapping at the back teeth'],
  },
  'laser-dentistry': {
    benefits: ['Precise soft-tissue care', 'Less bleeding in suitable cases', 'Comfort-focused treatment'],
    whoNeedsIt: ['Gum reshaping needs', 'Selected soft-tissue concerns', 'Patients looking for minimally invasive care'],
  },
  'teeth-whitening': {
    benefits: ['Refreshes smile brightness', 'Targets common surface stains', 'Guided by dental professionals'],
    whoNeedsIt: ['Tea, coffee, or food staining', 'Dull-looking teeth', 'Patients preparing for events or photos'],
  },
  'dental-fillings': {
    benefits: ['Repairs cavities early', 'Restores bite comfort', 'Uses natural-looking tooth repair'],
    whoNeedsIt: ['Small to moderate cavities', 'Chipped teeth', 'Food lodgement or sensitivity'],
  },
  'dental-crown': {
    benefits: ['Strengthens weak teeth', 'Restores shape and chewing', 'Improves long-term protection'],
    whoNeedsIt: ['Cracked or worn teeth', 'Root-canal-treated teeth', 'Large fillings needing coverage'],
  },
  'dental-implants': {
    benefits: ['Stable missing-tooth replacement', 'Natural chewing support', 'Preserves smile confidence'],
    whoNeedsIt: ['Single missing tooth', 'Multiple missing teeth', 'Patients seeking fixed replacement options'],
  },
  'dental-braces': {
    benefits: ['Corrects alignment and bite', 'Improves smile balance', 'Supports long-term oral hygiene'],
    whoNeedsIt: ['Crowded teeth', 'Spacing between teeth', 'Bite correction needs'],
  },
  'clear-aligners': {
    benefits: ['Discreet teeth straightening', 'Removable trays', 'Scan-led treatment planning'],
    whoNeedsIt: ['Mild to moderate crowding', 'Spacing concerns', 'Adults and teens wanting subtle orthodontics'],
  },
  'advanced-gum-treatment': {
    benefits: ['Controls gum inflammation', 'Supports tooth stability', 'Reduces bleeding and infection risk'],
    whoNeedsIt: ['Bleeding gums', 'Loose teeth concerns', 'Deep cleaning or periodontal care needs'],
  },
  'kids-dentistry': {
    benefits: ['Gentle child-friendly visits', 'Early cavity prevention', 'Healthy habit guidance for parents'],
    whoNeedsIt: ['Children needing checkups', 'Cavities or tooth pain', 'Preventive sealants and fluoride care'],
  },
  dentures: {
    benefits: ['Restores missing teeth', 'Improves speech and chewing', 'Supports facial appearance'],
    whoNeedsIt: ['Full or partial tooth loss', 'Loose old dentures', 'Patients needing removable replacement options'],
  },
  'mouth-ulcers': {
    benefits: ['Checks recurring ulcers', 'Identifies possible triggers', 'Guides treatment and relief'],
    whoNeedsIt: ['Painful mouth ulcers', 'Ulcers lasting more than two weeks', 'Repeated oral sores'],
  },
}

export const clinicBranches = [
  {
    branch: 'Apple International Dental, Ongole',
    area: 'Ongole',
    address:
      '32-54-645, Opp Aravind Super specialty Hospital, Below Vijaya Sri blood bank, Beside Aaha Kitchen, 1st Cross, 7th Cross Rd, Ongole, Andhra Pradesh 523002',
    phone: '7386080969',
    email: 'appledentalvij@gmail.com',
    image: '/branches/ongole.jpg',
  },
  {
    branch: 'Apple International Dental, Nellore',
    area: 'Nellore',
    address:
      '2nd Floor, Pabolu Plaza, D. No.16-4-140, behind Venkataramana Hotel, Pogathota, Nellore, Andhra Pradesh 524001',
    phone: '7382379710',
    email: 'appledentalvij@gmail.com',
    image: '/branches/nellore.jpg',
  },
  {
    branch: 'Apple International Dental, Gajuwaka, Visakhapatnam',
    area: 'Gajuwaka, Visakhapatnam',
    address:
      'Main Rd, opp. laxmikanth theatre, New Gajuwaka, Pedagantyada, Visakhapatnam, Gajuwaka, Andhra Pradesh 530026',
    phone: '6300722549',
    email: 'appledentalvij@gmail.com',
    image: '/branches/gajuwaka-visakhapatnam.jpg',
  },
  {
    branch: 'Apple International Dental, Madanapalle',
    area: 'Madanapalle',
    address:
      '153-1, BHAVANI AGRO AGENCIES BUILDING, DOOR No. 111, CTM Rd, opp. GANESH HOTEL, Madanapalle, Andhra Pradesh 517325',
    phone: '9988163456',
    email: 'appledentalmpl@gmail.com',
    image: '/branches/madanapalle.jpg',
  },
  {
    branch: 'Apple International Dental, Nakkal Road, Vijayawada',
    area: 'Nakkal Road, Vijayawada',
    address: '29-6-24/1, Nakkala Rd, opp. DBS Bank, Near Vijaya Talkies, Suryaraopeta, Governor Peta',
    phone: '8058059879',
    email: 'appledentalvij@gmail.com',
    image: '/branches/nakkal-road-vijayawada.jpg',
  },
  {
    branch: 'Apple International Dental, One Town (Panja), Vijayawada',
    area: 'One Town (Panja), Vijayawada',
    address:
      '1st floor, D, : 11-1-18, Babu Rajendra Prasad Rd, beside Amma Hotel, 1 Town, Vijayawada, Andhra Pradesh 520001',
    phone: '9281094967',
    email: 'appledentalvij@gmail.com',
    image: '/branches/one-town-panja-vijayawada.jpg',
  },
  {
    branch: 'Apple International Dental, Srikakulam',
    area: 'Srikakulam',
    address:
      'Below A Convention Hotel, Government Arts College Rd, near R.T.C COMPLEX, Shanti Nagar Colony, Balaga, Srikakulam, Andhra Pradesh 532001',
    phone: '9390406989',
    email: 'appledentalvij@gmail.com',
    image: '/branches/srikakulam.jpg',
  },
  {
    branch: 'Apple International Dental, Guntur',
    area: 'Guntur',
    address: '13-7-72 2/6 Lane Opp.RTC Busstand, Gunturvari Thota, Guntur, Andhra Pradesh 522001',
    phone: '7382787569',
    email: 'appledentalvij@gmail.com',
    image: '/branches/guntur.jpg',
  },
  {
    branch: 'Apple International Dental, Dwaraka Nagar, Visakhapatnam',
    area: 'Dwaraka Nagar, Visakhapatnam',
    address:
      '47, 9-26, 3rd Ln, opp. Bajaj Capital, Sagar Nagar, Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530016',
    phone: '8179142424',
    email: 'appledentalvij@gmail.com',
    image: '/branches/dwaraka-nagar-visakhapatnam.jpg',
  },
  {
    branch: 'Apple International Dental, Tirupati',
    area: 'Tirupati',
    address:
      "10-1-756, Tilak Rd, beside Keerthy Medical Stores, Reddy & Reddy's Colony, Reddy and Reddy's Colony, Tirupati, Andhra Pradesh 517501",
    phone: '8019994774',
    email: 'appledentalvij@gmail.com',
    image: '/branches/tirupati.jpg',
  },
  {
    branch: 'Apple International Dental, Anantapur',
    area: 'Anantapur',
    address:
      "Syed Jaffer Hussain's House, Revenue Ward, 13, Rtc Bus Stand Rd, beside Kavya Regency, opp. to Yatri Nivas, Anantapur, Andhra Pradesh 515005",
    phone: '7013891670',
    email: 'appledentalvij@gmail.com',
    image: '/branches/anantapur.jpg',
  },
  {
    branch: 'Apple International Dental, Rajamundry',
    area: 'Rajamundry',
    address:
      '46-20-1/10, FIRST FLOOR, Alankar Residency, near CHINA ANJANEYASWAMY TEMPLE, Danavai Peta, Rajamahendravaram, Andhra Pradesh 533103',
    phone: '9059556059',
    email: 'appledentalvij@gmail.com',
    image: '/branches/rajamundry.jpg',
  },
  {
    branch: 'Apple International Dental, Mangalagiri',
    area: 'Mangalagiri',
    address: 'above Jawed Habib Hair & Beauty Salon, Mangalagiri, Andhra Pradesh 522503',
    phone: '9493346026',
    email: 'appledentalvij@gmail.com',
    image: '/branches/mangalagiri.jpg',
  },
  {
    branch: 'Apple International Dental, Krishna Lanka, Vijayawada',
    area: 'Krishna Lanka, Vijayawada',
    address:
      '41-2-70, Old Post Office Rd, Biyyam Kotla Bazar, Krishnalanka, Vijayawada, Andhra Pradesh 520013',
    phone: '7997593891',
    email: 'appledentalvij@gmail.com',
    image: '/branches/krishna-lanka-vijayawada.jpg',
  },
  {
    branch: 'Apple International Dental, Gachibowli, Hyderabad',
    area: 'Gachibowli, Hyderabad',
    address:
      'Survey No 93, Plot No 3, Third Floor, MMN Plaza, beside Himagiri Hospital, Gachibowli, Hyderabad, Telangana',
    phone: '8639945819',
    email: 'appledentalgachibowli@gmail.com',
    image: '/branches/gachibowli-hyderabad.jpg',
  },
  {
    branch: 'Apple International Dental, Habsiguda, Hyderabad',
    area: 'Habsiguda, Hyderabad',
    address:
      'Second Floor, 1-4-56/2, Captain Veera Raja Reddy Marg, Vijayanagar Colony, Margh, Habsiguda, Hyderabad, Telangana',
    phone: '9705540005',
    email: 'appledentalhabsiguda@gmail.com',
    image: '/branches/habsiguda-hyderabad.jpg',
  },
  {
    branch: 'Apple International Dental, Vanasthalipuram, Hyderabad',
    area: 'Vanasthalipuram, Hyderabad',
    address:
      'Plot no 72, 3rd Floor, septa Heights, Beisde Subbaya Gari Hotel, Hakeemabad Colony, Vanasthalipuram, Hyderabad, Telangana',
    phone: '8688657477',
    email: 'appledentalvanasthalipuram@gmail.com',
    image: '/branches/vanasthalipuram-hyderabad.jpg',
  },
  {
    branch: 'Apple International Dental, Kondapur, Hyderabad',
    area: 'Kondapur, Hyderabad',
    address:
      'Plot number 51&54, Kondapur, New Hafeezpet, Gopal Reddy Nagar, Gachibowli, Hyderabad, Telangana',
    phone: '9281094975',
    email: 'appledentalkondapur@gmail.com',
    image: '/branches/kondapur-hyderabad.jpg',
  },
  {
    branch: 'Apple International Dental, Champapet, Hyderabad',
    area: 'Champapet, Hyderabad',
    address:
      'Door number:- 9, 6 - 1/2, 3RD Floor, Rohini Hospital, Sagar Road, beside HP petrol bunk, Champapet, Hyderabad, Telangana',
    phone: '9676669695',
    email: 'appleinternationaldentalhyd@gmail.com',
    image: '/branches/champapet-hyderabad.jpg',
  },
  {
    branch: 'Apple International Dental, HSR Layout, Bengaluru',
    area: 'HSR Layout, Bengaluru',
    address: '2 nd floor, 14th Main Rd, opposite BDA Complex, Sector 4, HSR Layout, Bengaluru, Karnataka',
    phone: '9611042424',
    email: '',
    image: '/branches/hsr-layout-bengaluru.jpg',
  },
]

export const branches = clinicBranches.map((branch) => branch.branch)

export const clinicPhoneDisplay = '1800 309 2334'
export const clinicPhoneHref = '18003092334'
export const getBranchArea = (branch) =>
  clinicBranches.find((clinicBranch) => clinicBranch.branch === branch)?.area ??
  branch.replace(/^Apple International Dental,\s*/, '')

export const branchContacts = clinicBranches.map((branch) => ({
  branch: branch.branch,
  area: branch.area,
  whatsappNumber: `91${branch.phone}`,
}))

export const schemePrograms = [
  {
    shortName: 'CGHS',
    name: 'Central Government Health Scheme',
    logo: '/schemes/cghs.jpg',
    audience: 'Central Government employees, pensioners, and eligible dependents.',
    carePath:
      'Patients usually visit with a valid CGHS card and any referral or permission required for planned dental treatment.',
    dentalFocus: 'Dental consultation, restorative care, gum treatment, root canal evaluation, and approved specialist procedures.',
    documents: ['CGHS card', 'Government ID', 'Referral or permission slip if applicable', 'Previous prescriptions or x-rays'],
    accent: 'Central government',
  },
  {
    shortName: 'ECHS',
    name: 'Ex-Servicemen Contributory Health Scheme',
    logo: '/schemes/echs.jpg',
    audience: 'Ex-servicemen pensioners and eligible dependents.',
    carePath:
      'ECHS members can be guided through consultation, documentation, and referral-based treatment planning.',
    dentalFocus: 'Dental assessment, pain relief, oral surgery evaluation, prosthetic planning, and approved follow-up care.',
    documents: ['ECHS card', 'Service or pensioner ID', 'Referral from ECHS polyclinic if needed', 'Existing reports'],
    accent: 'Defence families',
  },
  {
    shortName: 'EHS',
    name: 'Employees Health Scheme',
    logo: '/schemes/ehs.png',
    audience: 'Eligible Andhra Pradesh state government employees, pensioners, and dependent family members.',
    carePath:
      'The front desk can help verify scheme documents and guide patients on whether the planned dental care needs approval.',
    dentalFocus: 'Cashless or approval-based dental treatment guidance for eligible employees and pensioners.',
    documents: ['EHS health card', 'Aadhaar or government ID', 'Employee or pensioner details', 'Dental records'],
    accent: 'AP employees',
  },
  {
    shortName: 'CAPF',
    name: 'Central Armed Police Forces',
    logo: '/schemes/capf.jpg',
    audience: 'Eligible personnel and dependents from central armed police forces.',
    carePath:
      'Patients can visit with force ID and scheme papers so the branch team can guide the correct approval route.',
    dentalFocus: 'Dental consultation, pain management, gum care, root canal evaluation, and oral surgery assessment.',
    documents: ['CAPF or force ID', 'Health card or entitlement papers', 'Referral note if issued', 'Prior treatment file'],
    accent: 'Armed police',
  },
  {
    shortName: 'CRPF',
    name: 'Central Reserve Police Force',
    logo: '/schemes/crpf.png',
    audience: 'Eligible CRPF personnel, families, and dependents under applicable cashless or referral systems.',
    carePath:
      'CRPF patients should carry identity and entitlement documents for branch-level verification before treatment planning.',
    dentalFocus: 'Treatment planning for dental pain, infection, gum concerns, trauma, and approved specialist procedures.',
    documents: ['CRPF ID', 'Health card or authorization', 'Referral or approval note', 'Previous reports'],
    accent: 'CRPF care',
  },
  {
    shortName: 'SCR',
    name: 'South Central Railway',
    logo: '/schemes/south-central-railway.jpg',
    audience: 'Railway employees, retired employees, and eligible railway beneficiaries.',
    carePath:
      'Railway beneficiaries can bring entitlement documents for guidance on approved dental care and referral requirements.',
    dentalFocus: 'Extraction, scaling and gum treatment, root canal treatment, fillings, and major dental care when approved.',
    documents: ['Railway medical card', 'Employee or pensioner ID', 'Referral note if applicable', 'Previous dental file'],
    accent: 'Railway families',
  },
  {
    shortName: 'ESIC',
    name: "Employees' State Insurance Corporation",
    logo: '/schemes/esic.png',
    audience: 'Insured employees and eligible family members covered under ESIC.',
    carePath:
      'ESIC patients can bring insurance documents so the team can help confirm the correct care and authorization pathway.',
    dentalFocus: 'General dental evaluation, urgent dental concerns, specialist referral guidance, and treatment documentation.',
    documents: ['ESIC card or Pehchan card', 'Aadhaar or ID proof', 'Employer or insurance details', 'Existing reports'],
    accent: 'Insured employees',
  },
  {
    shortName: 'ABS',
    name: 'Aarogya Bhadratha Scheme',
    logo: '/schemes/aarogya-bhadratha.jpg',
    audience: 'Eligible police personnel and dependent family members in Andhra Pradesh and Telangana.',
    carePath:
      'Police families can visit with scheme documents for help with dental consultation and cashless approval guidance.',
    dentalFocus: 'Dental treatment planning, oral surgery assessment, trauma care guidance, and approved specialist treatment.',
    documents: ['Aarogya Bhadratha card', 'Police ID', 'Dependency certificate if needed', 'Essentiality or referral certificate'],
    accent: 'Police families',
  },
]

export const clinicBrands = [
  {
    name: 'Dentsply Sirona',
    logo: '/brands/dentsply-sirona.png',
    category: 'Digital dentistry',
  },
  {
    name: 'Pioon Laser',
    logo: '/brands/pioon-laser.png',
    category: 'Laser dentistry',
  },
  {
    name: 'Nobel Biocare',
    logo: '/brands/nobel-biocare.png',
    category: 'Implant systems',
  },
  {
    name: '3M',
    logo: '/brands/3m.png',
    category: 'Restorative materials',
  },
  {
    name: 'Carestream Dental',
    logo: '/brands/carestream-dental.png',
    category: 'Digital imaging',
  },
  {
    name: 'Straumann',
    logo: '/brands/straumann.png',
    category: 'Premium implants',
  },
  {
    name: 'Osstem Implant',
    logo: '/brands/osstem-implant.png',
    category: 'Implant dentistry',
  },
  {
    name: 'Toothsi',
    logo: '/brands/toothsi.jpg',
    category: 'Aligners',
    featured: true,
  },
]

export const videoTestimonials = [
  {
    id: 'testimonial-1',
    video: '/testimonials/testimonial-1.mp4',
    label: 'Patient testimonial 1',
  },
  {
    id: 'testimonial-2',
    video: '/testimonials/testimonial-2.mp4',
    label: 'Patient testimonial 2',
  },
  {
    id: 'testimonial-3',
    video: '/testimonials/testimonial-3.mp4',
    label: 'Patient testimonial 3',
  },
  {
    id: 'testimonial-4',
    video: '/testimonials/testimonial-4.mp4',
    label: 'Patient testimonial 4',
  },
  {
    id: 'testimonial-5',
    video: '/testimonials/testimonial-5.mp4',
    label: 'Patient testimonial 5',
  },
]

export const siteNavGroups = [
  {
    label: 'General Dentistry',
    items: [
      'Tooth Colored Fillings',
      'Cleaning and polishing',
      'Clips and Braces Treatment',
      'Aligners',
      'Crowns and Bridges',
      'Root Canal Treatment',
      'Complete Dentures',
      'Tooth Extractions',
      'Wisdom Molar Extraction',
      'Gingival Flap Surgery',
      'Frenectomy',
      'Night Guard',
      'Pit and Fissure Sealants',
      'Partial Dentures',
      'Over dentures',
      'Kids Dentistry',
    ],
  },
  {
    label: 'Cosmetic Dentistry',
    items: [
      'Dental Veneers',
      'Gingival Depigmentation',
      'Teeth Whitening',
      '3D Smile Designing',
      'Smile Correction',
    ],
  },
  {
    label: 'Dental Implant Solutions',
    items: [
      'Single Tooth Implant',
      'Multiple Implants',
      'All on 4 implants',
      'Full mouth Implants',
      'Basal implants',
      'Keyhole implants',
      'Bone Grafting',
      'Soft Tissue Grafting',
    ],
  },
  {
    label: 'Digital Dentistry',
    items: [
      'CAD CAM Solutions',
      'Intra-Oral Scanning',
      'Digital Smile Design',
      'Digital Dental Implants',
      'Digital OPG and CBCT',
      'Central Digital Lab',
    ],
  },
  {
    label: 'Specialist Dentistry',
    items: [
      'Endodontics',
      'Full mouth Rehabilitation',
      'Periodontics',
      'Orthodontics',
      'Oral Surgery',
      'Pedodontics',
    ],
  },
]

export const formatPhoneDisplay = (phone) =>
  phone ? `+91 ${phone.slice(0, 5)} ${phone.slice(5)}` : clinicPhoneDisplay

export const getGoogleMapsUrl = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

export const appointmentSlots = [
  '09:30 AM',
  '10:30 AM',
  '11:30 AM',
  '12:30 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
]

export const adminStatuses = [
  'Booked',
  'Confirmed',
  'Walk-in',
  'Website',
  'In Treatment',
  'Treatment Completed',
  'Cancelled',
  'No Show',
]

export const branchAvailability = Object.fromEntries(
  branches.map((branch) => [
    branch,
    {
      closedWeekdays: [],
    },
  ]),
)

export const kpis = [
  { value: '22 years+', label: 'serving patients' },
  { value: '33 lakh+', label: 'patients treated across routine and advanced care' },
  { value: '7 days', label: 'consultations and emergency visits available' },
  { value: '13', label: 'core treatments under one roof' },
]

export const services = [
  {
    title: 'Preventive Dentistry',
    image: '/service-gifs/Preventive Dentistry.gif',
    text:
      'Routine checkups, digital x-rays, ultrasonic scaling, fluoride care, and gum-health reviews for long-term prevention.',
  },
  {
    title: 'Cosmetic Dentistry',
    image: '/service-gifs/Cosemtic Dentistry.gif',
    text:
      'Smile design, veneers, whitening, and enamel reshaping for patients looking for a brighter, more balanced smile.',
  },
  {
    title: 'Restorative Dentistry',
    image: '/service-gifs/Restorative Dentistry.gif',
    text:
      'Tooth-colored fillings, crowns, bridges, implants, and root canal care that restore strength, comfort, and function.',
  },
  {
    title: 'Children & Orthodontic Care',
    image: '/service-gifs/Children and Orthodontic Care.gif',
    text:
      'Kids checkups, habit guidance, sealants, and clear aligner treatment planned around comfort and predictable results.',
  },
]

export const dentists = [
  {
    name: 'Dr. Ananya Reddy',
    role: 'Cosmetic & Family Dentist',
    bio: 'Known for smile design, veneers, and conservative aesthetic treatment plans for working professionals and families.',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Dr. Rohit Varma',
    role: 'Implant & Restorative Dentist',
    bio: 'Handles implants, crowns, full-mouth rehabilitation, and complex bite restoration with digital planning workflows.',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Dr. Meera Iyer',
    role: 'Pediatric & Preventive Dentist',
    bio: 'Supports child-friendly visits, preventive care, and parent guidance to help children build healthy dental habits early.',
    image:
      'https://images.unsplash.com/photo-1594824388853-d0cfe3f19b1c?auto=format&fit=crop&w=900&q=80',
  },
]

export const instagramPosts = [
  {
    image:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80',
    title: 'Smile makeover reveal',
    caption: 'Natural shade, cleaner contours, and a confidence-first finish.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1588776814546-bc4c6c4b5f2f?auto=format&fit=crop&w=900&q=80',
    title: 'Clinic moments',
    caption: 'A calm treatment room designed for comfort, hygiene, and clarity.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=900&q=80',
    title: 'Aligner journey',
    caption: 'Digital scans, structured check-ins, and predictable smile progress.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80',
    title: 'Patient education',
    caption: 'Every appointment includes simple next steps and transparent guidance.',
  },
]

export const instagramProfileUrl = 'https://www.instagram.com/appleinternational_dental/'
export const instagramFeedEndpoint = import.meta.env.VITE_INSTAGRAM_FEED_ENDPOINT
export const bookingEndpoint = import.meta.env.VITE_BOOKING_ENDPOINT

export const heroImage = '/hero/dental-hero-smile-exam.jpg'
export const heroImages = [
  heroImage,
  '/hero/hero-crown-decay-check.png',
  '/hero/hero-dental-treatment.webp',
]
export const heroCarouselImages = [...heroImages, heroImages[0]]

export const whyChooseUs = [
  {
    title: 'World Class Treatment',
    icon: '🌐',
    points: [
      'Only Asian member of the Royal Society of Medicine, UK',
      'Globally certified partners',
      'Premium materials and cutting-edge tools',
      'Advanced tech: laser dentistry and 3D intraoral scanning',
    ],
  },
  {
    title: 'Doctor-Led Patient Care',
    icon: '⚕',
    points: [
      'Helpline managed by 50+ dentists',
      '1300+ doctors delivering consistent care',
      'Treatments reviewed for quality assurance',
      'Structured post-treatment follow-up plans',
    ],
  },
  {
    title: '22 Years Of Experience',
    icon: '✹',
    points: [
      '1300+ experienced dental specialists',
      '31 lakh+ successful root canal treatments',
      '50,000+ implants placed with precision',
      '20,000+ completed orthodontic treatments',
    ],
  },
  {
    title: 'Unmatched Safety Standards',
    icon: '⬟',
    points: [
      '10X safety protocols across all clinics',
      'AI-powered sterilization (AIPS from USA)',
      '4-step process ensuring deep sterilization',
      'Spotless, safe, and hygienic environment',
    ],
  },
]

export const faqs = [
  {
    question: 'Will my dental treatment be painful?',
    answer:
      'Most treatments are planned with comfort in mind. The dentist will explain the procedure, use suitable numbing where needed, and guide you through aftercare before you leave.',
  },
  {
    question: 'Can I get a cost estimate before starting treatment?',
    answer:
      'Yes. After examining your concern, the team will explain the recommended treatment options, expected visits, and an estimated cost before you decide.',
  },
  {
    question: 'How quickly can I get an appointment?',
    answer:
      'You can request a consultation through the form, and the reception team will contact you to confirm the nearest available slot. Urgent pain or swelling can be prioritized when possible.',
  },
  {
    question: 'Do you treat children?',
    answer:
      'Yes. Kids Dentistry includes checkups, cavity care, preventive guidance, fluoride or sealant advice, and a gentle approach for nervous children.',
  },
  {
    question: 'Should I choose braces or clear aligners?',
    answer:
      'That depends on your teeth alignment, bite, lifestyle, and treatment goals. The orthodontic consultation helps decide whether braces or clear aligners are more suitable.',
  },
  {
    question: 'I am scared of root canal treatment. What should I expect?',
    answer:
      'Root canal treatment is meant to relieve infection-related pain and save the tooth. The doctor will numb the area, explain each step, and share recovery instructions after the visit.',
  },
]

export const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
export const bookingLockKey = 'appleInternationalDentalBookingRequest'
export const adminSessionKey = 'appleInternationalDentalAdminSession'
export const bookingLockDuration = 24 * 60 * 60 * 1000
export const bookingLockSubmissionLimit = 4
export const consultationFeeAmount = 350
export const consultationFeeSubunits = consultationFeeAmount * 100
export const loaderMinimumDuration = 1400
export const loaderMaximumDuration = 5200
export const concernWordLimit = 100
export const availabilityRefreshMs = 30 * 1000
export const onlinePaymentMethod = 'Online payment'
export const cashPaymentMethod = 'Cash received'

export const initialFormState = {
  treatment: treatments[0].id,
  branch: branches[0],
  name: '',
  phone: '',
  email: '',
  referredBy: '',
  date: '',
  timeSlot: '',
  concern: '',
  paymentMethod: onlinePaymentMethod,
  paymentStatus: '',
  paymentAmount: consultationFeeAmount,
  paymentId: '',
  paymentOrderId: '',
  paymentSignature: '',
}

export const getWords = (value) => value.trim().split(/\s+/).filter(Boolean)

export const getWhatsappLink = (branch) => {
  const branchContact =
    branchContacts.find((contact) => contact.branch === branch) ?? branchContacts[0]
  const message = `Hello Apple International Dental, I would like to enquire about an appointment at ${branch}.`

  return `https://wa.me/${branchContact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const limitWords = (value, wordLimit) => {
  const words = getWords(value)

  if (words.length <= wordLimit) {
    return value
  }

  return words.slice(0, wordLimit).join(' ')
}

export const preloadImage = (src) =>
  new Promise((resolve) => {
    const image = new Image()
    const timeout = window.setTimeout(resolve, loaderMaximumDuration)

    image.onload = () => {
      window.clearTimeout(timeout)
      resolve()
    }

    image.onerror = () => {
      window.clearTimeout(timeout)
      resolve()
    }

    image.src = src
  })

export const getPreloadImages = () =>
  [
    '/logo.png',
    '/loading/dentistry.gif',
    ...heroImages,
    ...treatments.map((treatment) => treatment.image),
    ...services.map((service) => service.image),
    ...dentists.map((dentist) => dentist.image),
    ...instagramPosts.map((post) => post.image),
  ].filter(Boolean)

export const getActiveBookingLock = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const savedRequest = window.localStorage.getItem(bookingLockKey)

  if (!savedRequest) {
    return null
  }

  try {
    const bookingLock = JSON.parse(savedRequest)
    const submittedAt = Number(bookingLock.submittedAt)
    const submissionCount = Number(bookingLock.submissionCount || 1)

    if (!submittedAt || Date.now() - submittedAt > bookingLockDuration) {
      window.localStorage.removeItem(bookingLockKey)
      return null
    }

    if (submissionCount < bookingLockSubmissionLimit) {
      return null
    }

    return {
      ...bookingLock,
      submissionCount,
    }
  } catch {
    window.localStorage.removeItem(bookingLockKey)
    return null
  }
}

export const recordBookingSubmission = ({ treatmentName, branchName }) => {
  if (typeof window === 'undefined') {
    return null
  }

  const currentRequest = (() => {
    try {
      return JSON.parse(window.localStorage.getItem(bookingLockKey)) || {}
    } catch {
      return {}
    }
  })()
  const submittedAt = Number(currentRequest.submittedAt)
  const isWithinLockWindow = submittedAt && Date.now() - submittedAt <= bookingLockDuration
  const submissionCount = isWithinLockWindow
    ? Number(currentRequest.submissionCount || 1) + 1
    : 1
  const nextBookingLock = {
    treatmentName,
    branchName,
    submittedAt: Date.now(),
    submissionCount,
  }

  window.localStorage.setItem(bookingLockKey, JSON.stringify(nextBookingLock))

  return submissionCount >= bookingLockSubmissionLimit ? nextBookingLock : null
}

export const formatBookingCooldown = (submittedAt) => {
  const remainingMs = bookingLockDuration - (Date.now() - submittedAt)
  const remainingHours = Math.max(1, Math.ceil(remainingMs / (60 * 60 * 1000)))

  return `${remainingHours} hour${remainingHours === 1 ? '' : 's'}`
}

export const formatDateValue = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const getTodayDateValue = () => formatDateValue(new Date())

export const parseDateValue = (dateValue) => {
  if (!dateValue) {
    return null
  }

  const [year, month, day] = dateValue.split('-').map(Number)

  return new Date(year, month - 1, day)
}

export const isPastDate = (dateValue) => {
  const selectedDate = parseDateValue(dateValue)
  const today = parseDateValue(getTodayDateValue())

  return Boolean(selectedDate && today && selectedDate < today)
}

export const getAvailabilityKey = (branch, dateValue) => `${branch}::${dateValue}`

export const normalizeBookedSlots = (slots) =>
  Array.isArray(slots) ? slots.filter((slot) => appointmentSlots.includes(slot)) : []

export const getRemoteAvailability = (availabilityByDate, branch, dateValue) =>
  availabilityByDate[getAvailabilityKey(branch, dateValue)]

export const getDateAvailability = (branch, dateValue, availabilityByDate = {}) => {
  const date = parseDateValue(dateValue)
  const rule = branchAvailability[branch]

  if (!date || !rule) {
    return {
      availableSlots: [],
      bookedSlots: appointmentSlots,
      isClosed: false,
      isFullyBooked: false,
      isPast: false,
    }
  }

  const weekday = date.getDay()
  const isClosed = rule.closedWeekdays.includes(weekday)
  const isPast = isPastDate(dateValue)
  const remoteAvailability = getRemoteAvailability(availabilityByDate, branch, dateValue)
  const remoteBookedSlots = normalizeBookedSlots(remoteAvailability?.bookedSlots)
  const bookedSlots = isClosed || isPast ? appointmentSlots : remoteBookedSlots
  const availableSlots = isClosed || isPast ? [] : appointmentSlots

  return {
    availableSlots,
    bookedSlots,
    isClosed,
    isFullyBooked: false,
    isPast,
  }
}

export const getDateSuggestions = (branch, availabilityByDate = {}) =>
  Array.from({ length: 8 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)

    const value = formatDateValue(date)
    const availability = getDateAvailability(branch, value, availabilityByDate)

    return {
      value,
      label: date.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
      isUnavailable: availability.isClosed || availability.isFullyBooked || availability.isPast,
    }
  })

export const fetchBookingAvailability = async ({ branch, date }) => {
  if (!bookingEndpoint || !branch || !date) {
    return null
  }

  const url = new URL(bookingEndpoint)
  url.searchParams.set('action', 'availability')
  url.searchParams.set('branch', branch)
  url.searchParams.set('date', date)

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Unable to refresh appointment slots right now.')
  }

  const result = await response.json()

  return {
    bookedSlots: normalizeBookedSlots(result.bookedSlots),
    updatedAt: Date.now(),
  }
}

export const fetchBookingAvailabilityRange = async ({ branch, startDate, days }) => {
  if (!bookingEndpoint || !branch || !startDate) {
    return []
  }

  const url = new URL(bookingEndpoint)
  url.searchParams.set('action', 'availability-range')
  url.searchParams.set('branch', branch)
  url.searchParams.set('startDate', startDate)
  url.searchParams.set('days', String(days))

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Unable to refresh appointment slots right now.')
  }

  const result = await response.json()
  const daysAvailability = Array.isArray(result.days) ? result.days : []

  return daysAvailability.map((day) => ({
    date: day.date,
    bookedSlots: normalizeBookedSlots(day.bookedSlots),
    updatedAt: Date.now(),
  }))
}

export const submitFormToFormspree = async ({ form, formName, metadata = {} }) => {
  if (!formspreeEndpoint) {
    throw new Error('Formspree endpoint is not configured.')
  }

  const formData = new FormData(form)

  formData.set('form_name', formName)

  Object.entries(metadata).forEach(([key, value]) => {
    formData.set(key, value)
  })

  const response = await fetch(formspreeEndpoint, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const result = await response.json().catch(() => null)
    const message =
      result?.errors?.map((error) => error.message).join(' ') ??
      'Unable to submit the form right now.'

    throw new Error(message)
  }
}

export const submitBookingToSheets = async ({ formState, treatmentName, branchName }) => {
  if (!bookingEndpoint) {
    throw new Error('Booking endpoint is not configured.')
  }

  const response = await fetch(bookingEndpoint, {
    method: 'POST',
    body: JSON.stringify({
      action: 'create-booking',
      source: 'Apple International Dental website',
      treatment: formState.treatment,
      treatmentName,
      branch: branchName,
      name: formState.name,
      phone: formState.phone,
      email: formState.email,
      referredBy: formState.referredBy,
      date: formState.date,
      timeSlot: formState.timeSlot,
      concern: formState.concern,
      paymentMethod: formState.paymentMethod || onlinePaymentMethod,
      paymentStatus: formState.paymentStatus,
      paymentAmount: formState.paymentAmount,
      paymentId: formState.paymentId,
      paymentOrderId: formState.paymentOrderId,
      paymentSignature: formState.paymentSignature,
    }),
  })

  const result = await response.json().catch(() => null)

  if (!response.ok || result?.ok === false) {
    throw new Error(result?.message ?? 'Unable to submit the booking right now.')
  }

  return result
}

export const postBookingEndpoint = async (payload) => {
  if (!bookingEndpoint) {
    throw new Error('Booking endpoint is not configured.')
  }

  const response = await fetch(bookingEndpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  const result = await response.json().catch(() => null)

  if (!response.ok || result?.ok === false) {
    throw new Error(result?.message ?? 'Unable to reach the booking system.')
  }

  return result
}

export const createSupportChat = ({ name, phone, email, branch, message }) =>
  postBookingEndpoint({
    action: 'support-create-chat',
    name,
    phone,
    email,
    branch,
    message,
  })

export const sendSupportMessage = ({ chatId, sender, message }) =>
  postBookingEndpoint({
    action: 'support-send-message',
    chatId,
    sender,
    message,
  })

export const fetchSupportChat = ({ chatId }) =>
  postBookingEndpoint({
    action: 'support-get-chat',
    chatId,
  })

export const fetchAdminSupportChats = ({ token }) =>
  postBookingEndpoint({
    action: 'admin-support-chats',
    token,
  })

export const loadRazorpayCheckout = () =>
  new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Payment checkout is unavailable in this browser.'))
      return
    }

    if (window.Razorpay) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = resolve
    script.onerror = () => reject(new Error('Unable to load the payment gateway. Please try again.'))
    document.body.appendChild(script)
  })

export const createConsultationPaymentOrder = async ({ name, phone, email, branch, source }) =>
  postBookingEndpoint({
    action: 'create-payment-order',
    amount: consultationFeeSubunits,
    currency: 'INR',
    name,
    phone,
    email,
    branch,
    source,
  })

export const verifyConsultationPayment = async ({ orderId, paymentId, signature }) =>
  postBookingEndpoint({
    action: 'verify-payment',
    orderId,
    paymentId,
    signature,
  })

export const collectConsultationPayment = async ({ name, phone, email, branch, source }) => {
  const order = await createConsultationPaymentOrder({
    name,
    phone,
    email,
    branch,
    source,
  })

  if (!order?.orderId || !order?.keyId) {
    throw new Error('Payment gateway is not configured yet.')
  }

  await loadRazorpayCheckout()

  const payment = await new Promise((resolve, reject) => {
    const checkout = new window.Razorpay({
      key: order.keyId,
      amount: order.amount || consultationFeeSubunits,
      currency: order.currency || 'INR',
      name: 'Apple International Dental',
      description: 'Consultation fee',
      order_id: order.orderId,
      prefill: {
        name,
        email,
        contact: phone,
      },
      notes: {
        branch,
        source,
      },
      theme: {
        color: '#FF0201',
      },
      handler: resolve,
      modal: {
        ondismiss: () => reject(new Error('Payment was cancelled before the consultation request was sent.')),
      },
    })

    checkout.open()
  })

  await verifyConsultationPayment({
    orderId: payment.razorpay_order_id,
    paymentId: payment.razorpay_payment_id,
    signature: payment.razorpay_signature,
  })

  return {
    paymentMethod: onlinePaymentMethod,
    paymentStatus: 'Paid',
    paymentAmount: consultationFeeAmount,
    paymentId: payment.razorpay_payment_id,
    paymentOrderId: payment.razorpay_order_id,
    paymentSignature: payment.razorpay_signature,
  }
}

export const getStoredAdminSession = () => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const savedSession = JSON.parse(window.localStorage.getItem(adminSessionKey))

    if (!savedSession?.token || !savedSession?.branch || Number(savedSession.expiresAt) <= Date.now()) {
      window.localStorage.removeItem(adminSessionKey)
      return null
    }

    return savedSession
  } catch {
    window.localStorage.removeItem(adminSessionKey)
    return null
  }
}

export const getDefaultAdminFilters = () => {
  const today = getTodayDateValue()
  const endDate = new Date()

  endDate.setDate(endDate.getDate() + 14)

  return {
    startDate: today,
    endDate: formatDateValue(endDate),
    branch: '',
    treatment: '',
    status: '',
  }
}

export const formatTimeWithMeridiem = (value) => {
  if (!value) {
    return ''
  }

  const normalizedValue = String(value).trim()
  const match = normalizedValue.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/)

  if (!match) {
    return normalizedValue
  }

  const hours = Number(match[1])

  if (Number.isNaN(hours) || hours > 23) {
    return normalizedValue
  }

  const meridiem = hours >= 12 ? 'PM' : 'AM'
  const hour12 = hours % 12 || 12
  const seconds = match[3] ? `:${match[3]}` : ''

  return `${hour12}:${match[2]}${seconds} ${meridiem}`
}

export const getCompletedDateParts = (value) => {
  if (!value) {
    return { date: '-', time: '' }
  }

  const normalizedValue = String(value).trim()
  const match = normalizedValue.match(/^(\d{4}-\d{2}-\d{2})[ T]?(.+)?$/)

  if (!match) {
    return { date: normalizedValue, time: '' }
  }

  return {
    date: match[1],
    time: formatTimeWithMeridiem(match[2]),
  }
}

export const initialAdminBookingForm = {
  treatment: treatments[0].name,
  branch: '',
  name: '',
  phone: '',
  email: '',
  referredBy: '',
  date: getTodayDateValue(),
  timeSlot: appointmentSlots[0],
  concern: '',
  status: 'Booked',
  source: 'Manual Walkin',
  paymentMethod: cashPaymentMethod,
  paymentStatus: 'Paid',
  paymentAmount: consultationFeeAmount,
  paymentId: '',
  paymentOrderId: '',
  paymentSignature: '',
}

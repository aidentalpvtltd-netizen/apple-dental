import { useEffect, useState } from 'react'
import './App.css'

const treatments = [
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

const treatmentInsights = {
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

const clinicBranches = [
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

const branches = clinicBranches.map((branch) => branch.branch)

const clinicPhoneDisplay = '+91 98490 24567'
const clinicPhoneHref = '+919849024567'
const getBranchArea = (branch) =>
  clinicBranches.find((clinicBranch) => clinicBranch.branch === branch)?.area ??
  branch.replace(/^Apple International Dental,\s*/, '')

const branchContacts = clinicBranches.map((branch) => ({
  branch: branch.branch,
  area: branch.area,
  whatsappNumber: `91${branch.phone}`,
}))

const schemePrograms = [
  {
    shortName: 'CGHS',
    name: 'Central Government Health Scheme',
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
    audience: 'Eligible police personnel and dependent family members in Andhra Pradesh and Telangana.',
    carePath:
      'Police families can visit with scheme documents for help with dental consultation and cashless approval guidance.',
    dentalFocus: 'Dental treatment planning, oral surgery assessment, trauma care guidance, and approved specialist treatment.',
    documents: ['Aarogya Bhadratha card', 'Police ID', 'Dependency certificate if needed', 'Essentiality or referral certificate'],
    accent: 'Police families',
  },
]

const formatPhoneDisplay = (phone) =>
  phone ? `+91 ${phone.slice(0, 5)} ${phone.slice(5)}` : clinicPhoneDisplay

const getGoogleMapsUrl = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

const appointmentSlots = [
  '09:30 AM',
  '10:30 AM',
  '11:30 AM',
  '12:30 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
]

const adminStatuses = [
  'Booked',
  'Confirmed',
  'Walk-in',
  'Website',
  'In Treatment',
  'Treatment Completed',
  'Cancelled',
  'No Show',
]

const branchAvailability = Object.fromEntries(
  branches.map((branch) => [
    branch,
    {
      closedWeekdays: [0],
    },
  ]),
)

const kpis = [
  { value: '22 years+', label: 'serving patients' },
  { value: '33 lakh+', label: 'patients treated across routine and advanced care' },
  { value: '7 days', label: 'consultations and emergency visits available' },
  { value: '13', label: 'core treatments under one roof' },
]

const services = [
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

const dentists = [
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

const instagramPosts = [
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

const instagramProfileUrl = 'https://www.instagram.com/appleinternational_dental/'
const instagramFeedEndpoint = import.meta.env.VITE_INSTAGRAM_FEED_ENDPOINT
const bookingEndpoint = import.meta.env.VITE_BOOKING_ENDPOINT

const heroImage = '/hero/dental-hero-smile-exam.jpg'

const whyChooseUs = [
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

const faqs = [
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

const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
const bookingLockKey = 'appleInternationalDentalBookingRequest'
const adminSessionKey = 'appleInternationalDentalAdminSession'
const bookingLockDuration = 24 * 60 * 60 * 1000
const bookingLockSubmissionLimit = 4
const consultationFeeAmount = 300
const consultationFeeSubunits = consultationFeeAmount * 100
const loaderMinimumDuration = 1400
const loaderMaximumDuration = 5200
const concernWordLimit = 100
const availabilityRefreshMs = 30 * 1000
const onlinePaymentMethod = 'Online payment'
const cashPaymentMethod = 'Cash received'

const initialFormState = {
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

const getWords = (value) => value.trim().split(/\s+/).filter(Boolean)

const getWhatsappLink = (branch) => {
  const branchContact =
    branchContacts.find((contact) => contact.branch === branch) ?? branchContacts[0]
  const message = `Hello Apple International Dental, I would like to enquire about an appointment at ${branch}.`

  return `https://wa.me/${branchContact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

const limitWords = (value, wordLimit) => {
  const words = getWords(value)

  if (words.length <= wordLimit) {
    return value
  }

  return words.slice(0, wordLimit).join(' ')
}

const preloadImage = (src) =>
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

const getPreloadImages = () =>
  [
    '/logo.png',
    '/loading/dentistry.gif',
    heroImage,
    ...treatments.map((treatment) => treatment.image),
    ...services.map((service) => service.image),
    ...dentists.map((dentist) => dentist.image),
    ...instagramPosts.map((post) => post.image),
  ].filter(Boolean)

const getActiveBookingLock = () => {
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

const recordBookingSubmission = ({ treatmentName, branchName }) => {
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

const formatBookingCooldown = (submittedAt) => {
  const remainingMs = bookingLockDuration - (Date.now() - submittedAt)
  const remainingHours = Math.max(1, Math.ceil(remainingMs / (60 * 60 * 1000)))

  return `${remainingHours} hour${remainingHours === 1 ? '' : 's'}`
}

const formatDateValue = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getTodayDateValue = () => formatDateValue(new Date())

const parseDateValue = (dateValue) => {
  if (!dateValue) {
    return null
  }

  const [year, month, day] = dateValue.split('-').map(Number)

  return new Date(year, month - 1, day)
}

const isPastDate = (dateValue) => {
  const selectedDate = parseDateValue(dateValue)
  const today = parseDateValue(getTodayDateValue())

  return Boolean(selectedDate && today && selectedDate < today)
}

const getAvailabilityKey = (branch, dateValue) => `${branch}::${dateValue}`

const normalizeBookedSlots = (slots) =>
  Array.isArray(slots) ? slots.filter((slot) => appointmentSlots.includes(slot)) : []

const getRemoteAvailability = (availabilityByDate, branch, dateValue) =>
  availabilityByDate[getAvailabilityKey(branch, dateValue)]

const getDateAvailability = (branch, dateValue, availabilityByDate = {}) => {
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

const getDateSuggestions = (branch, availabilityByDate = {}) =>
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

const fetchBookingAvailability = async ({ branch, date }) => {
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

const fetchBookingAvailabilityRange = async ({ branch, startDate, days }) => {
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

const submitFormToFormspree = async ({ form, formName, metadata = {} }) => {
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

const submitBookingToSheets = async ({ formState, treatmentName, branchName }) => {
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

const postBookingEndpoint = async (payload) => {
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

const loadRazorpayCheckout = () =>
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

const createConsultationPaymentOrder = async ({ name, phone, email, branch, source }) =>
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

const verifyConsultationPayment = async ({ orderId, paymentId, signature }) =>
  postBookingEndpoint({
    action: 'verify-payment',
    orderId,
    paymentId,
    signature,
  })

const collectConsultationPayment = async ({ name, phone, email, branch, source }) => {
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

const getStoredAdminSession = () => {
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

const getDefaultAdminFilters = () => {
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

const formatTimeWithMeridiem = (value) => {
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

const getCompletedDateParts = (value) => {
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

const initialAdminBookingForm = {
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

function AdminDashboard() {
  const [session, setSession] = useState(getStoredAdminSession)
  const [selectedAdminBranch, setSelectedAdminBranch] = useState(
    () => getStoredAdminSession()?.branch || branches[0],
  )
  const [password, setPassword] = useState('')
  const [activeAdminTab, setActiveAdminTab] = useState('bookings')
  const [filters, setFilters] = useState(getDefaultAdminFilters)
  const [adminBookingForm, setAdminBookingForm] = useState(initialAdminBookingForm)
  const [bookings, setBookings] = useState([])
  const [patients, setPatients] = useState([])
  const [history, setHistory] = useState([])
  const [adminSearch, setAdminSearch] = useState({
    bookings: '',
    patients: '',
    history: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [adminNotice, setAdminNotice] = useState('')
  const sessionBranch = session?.branch || selectedAdminBranch

  const activeBookings = bookings.filter((booking) =>
    ['', 'booked', 'confirmed', 'walk-in', 'website', 'in treatment'].includes(
      booking.status.toLowerCase(),
    ),
  )
  const todayBookings = activeBookings.filter((booking) => booking.date === getTodayDateValue())
  const websiteBookings = bookings.filter((booking) =>
    booking.source.toLowerCase().includes('website'),
  )
  const manualBookings = bookings.filter((booking) => !booking.source.toLowerCase().includes('website'))
  const bookingSearchTerm = adminSearch.bookings.trim().toLowerCase()
  const patientSearchTerm = adminSearch.patients.trim().toLowerCase()
  const historySearchTerm = adminSearch.history.trim().toLowerCase()
  const visibleBookings = bookingSearchTerm
    ? bookings.filter((booking) =>
        [booking.patientName, booking.phone, booking.email, booking.bookingId, booking.patientId]
          .join(' ')
          .toLowerCase()
          .includes(bookingSearchTerm),
      )
    : bookings
  const visiblePatients = patientSearchTerm
    ? patients.filter((patient) =>
        [patient.patientName, patient.phone, patient.email, patient.patientId]
          .join(' ')
          .toLowerCase()
          .includes(patientSearchTerm),
      )
    : patients
  const visibleHistory = historySearchTerm
    ? history.filter((item) =>
        [item.patientName, item.phone, item.patientId, item.bookingId, item.historyId]
          .join(' ')
          .toLowerCase()
          .includes(historySearchTerm),
      )
    : history

  const fetchAdminBookings = async (adminSession = session, nextFilters = filters) => {
    if (!adminSession?.token) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await postBookingEndpoint({
        action: 'admin-bookings',
        token: adminSession.token,
        ...nextFilters,
        branch: adminSession.branch,
      })

      setBookings(Array.isArray(result.bookings) ? result.bookings : [])
    } catch (fetchError) {
      setError(fetchError.message)

      if (fetchError.message.toLowerCase().includes('session')) {
        window.localStorage.removeItem(adminSessionKey)
        setSession(null)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAdminPatients = async (adminSession = session) => {
    if (!adminSession?.token) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await postBookingEndpoint({
        action: 'admin-patients',
        token: adminSession.token,
        branch: adminSession.branch,
      })

      setPatients(Array.isArray(result.patients) ? result.patients : [])
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAdminHistory = async (adminSession = session) => {
    if (!adminSession?.token) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await postBookingEndpoint({
        action: 'admin-history',
        token: adminSession.token,
        branch: adminSession.branch,
      })

      setHistory(Array.isArray(result.history) ? result.history : [])
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const refreshTimeout = window.setTimeout(() => {
      fetchAdminBookings()
    }, 0)

    return () => window.clearTimeout(refreshTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const handleLogin = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await postBookingEndpoint({
        action: 'admin-login',
        password,
        branch: selectedAdminBranch,
      })
      const nextSession = {
        token: result.token,
        expiresAt: result.expiresAt,
        branch: result.branch || selectedAdminBranch,
      }

      window.localStorage.setItem(adminSessionKey, JSON.stringify(nextSession))
      setFilters((current) => ({
        ...current,
        branch: nextSession.branch,
      }))
      setAdminBookingForm((current) => ({
        ...current,
        branch: nextSession.branch,
      }))
      setSession(nextSession)
      setPassword('')
      await fetchAdminBookings(nextSession)
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleFilterSubmit = (event) => {
    event.preventDefault()
    fetchAdminBookings(session, filters)
  }

  const handleAdminTabChange = (tab) => {
    setActiveAdminTab(tab)
    setError('')
    setAdminNotice('')

    if (tab === 'patients') {
      fetchAdminPatients()
    }

    if (tab === 'history') {
      fetchAdminHistory()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(adminSessionKey)
    setSession(null)
    setBookings([])
    setPatients([])
    setHistory([])
    setPassword('')
  }

  const handleAdminBookingChange = ({ target: { name, value } }) => {
    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value

    setAdminBookingForm((current) => ({
      ...current,
      [name]: nextValue,
      ...(name === 'paymentMethod'
        ? {
            paymentStatus: value === cashPaymentMethod ? 'Paid' : '',
            paymentId: '',
            paymentOrderId: '',
            paymentSignature: '',
          }
        : {}),
    }))
    setError('')
    setAdminNotice('')
  }

  const handleAdminSearchChange = (tab, value) => {
    setAdminSearch((current) => ({
      ...current,
      [tab]: value,
    }))
  }

  const handleAdminCreateBooking = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setAdminNotice('')

    try {
      const paymentDetails =
        adminBookingForm.paymentMethod === onlinePaymentMethod
          ? await collectConsultationPayment({
              name: adminBookingForm.name,
              phone: adminBookingForm.phone,
              email: adminBookingForm.email,
              branch: sessionBranch,
              source: 'Admin walk-in',
            })
          : {
              paymentMethod: cashPaymentMethod,
              paymentStatus: 'Paid',
              paymentAmount: consultationFeeAmount,
            }
      const result = await postBookingEndpoint({
        action: 'admin-create-booking',
        token: session.token,
        ...adminBookingForm,
        ...paymentDetails,
        branch: sessionBranch,
        treatmentName: adminBookingForm.treatment,
      })

      setAdminNotice(`Booking created: ${result.bookingId}. Consultation fee ${paymentDetails.paymentStatus.toLowerCase()} via ${paymentDetails.paymentMethod}.`)
      setAdminBookingForm((current) => ({
        ...initialAdminBookingForm,
        branch: sessionBranch,
        date: current.date,
        treatment: current.treatment,
      }))
      await fetchAdminBookings(session, filters)
      await fetchAdminPatients(session)
    } catch (createError) {
      setError(createError.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookingStatusChange = async (booking, status) => {
    setIsLoading(true)
    setError('')

    try {
      await postBookingEndpoint({
        action: 'admin-update-booking',
        token: session.token,
        bookingId: booking.bookingId,
        status,
        branch: sessionBranch,
      })
      await fetchAdminBookings(session, filters)
      await fetchAdminPatients(session)
      await fetchAdminHistory(session)
    } catch (statusError) {
      setError(statusError.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    return (
      <main className="admin-page">
        <section className="admin-login-card">
          <img src="/logo.png" alt="Apple International Dental" />
          <p className="eyebrow">Admin login</p>
          <h1>Choose branch dashboard</h1>
          <p>Select the clinic branch first, then sign in to open only that branch dashboard.</p>
          <form onSubmit={handleLogin}>
            <label>
              Branch
              <select
                required
                value={selectedAdminBranch}
                onChange={(event) => setSelectedAdminBranch(event.target.value)}
              >
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Password
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
              />
            </label>
            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Checking...' : 'Open branch dashboard'}
            </button>
          </form>
          {error && <p className="admin-error">{error}</p>}
        </section>
      </main>
    )
  }

  return (
    <main className="admin-page admin-dashboard">
      <header className="admin-topbar">
        <div className="admin-brand-heading">
          <div>
            <strong>Apple International Dental</strong>
            <p className="eyebrow">Admin dashboard</p>
            <h1>{getBranchArea(sessionBranch)} bookings</h1>
          </div>
        </div>
        <div className="admin-topbar-actions">
          <a href="/">View website</a>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <aside className="doctor-login-card" aria-label="Doctor login preview">
        <div className="doctor-login-symbol" aria-hidden="true">
          <img src="/logo.png" alt="" />
        </div>
        <p className="eyebrow">Doctor portal</p>
        <strong>Doctor login</strong>
        <p>Quick access preview for assigned doctors and treatment follow-ups.</p>
        <label>
          Username
          <input type="text" placeholder="doctor ID" />
        </label>
        <label>
          Password
          <input type="password" placeholder="password" />
        </label>
        <button type="button">Sign in</button>
      </aside>

      <div className="admin-main-column">
      <section className="admin-summary-grid" aria-label="Booking summary">
        <article>
          <span>{activeBookings.length}</span>
          <p>active bookings</p>
        </article>
        <article>
          <span>{todayBookings.length}</span>
          <p>today</p>
        </article>
        <article>
          <span>{websiteBookings.length}</span>
          <p>website</p>
        </article>
        <article>
          <span>{manualBookings.length}</span>
          <p>manual / clinic</p>
        </article>
      </section>

      <nav className="admin-tabs" aria-label="Admin dashboard sections">
        {[
          ['new-booking', 'New Walk-in'],
          ['bookings', 'Bookings'],
          ['patients', 'Patients'],
          ['history', 'Treatment History'],
        ].map(([tab, label]) => (
          <button
            className={activeAdminTab === tab ? 'active' : ''}
            key={tab}
            type="button"
            onClick={() => handleAdminTabChange(tab)}
          >
            {label}
          </button>
        ))}
      </nav>

      {error && <p className="admin-error">{error}</p>}
      {adminNotice && <p className="admin-notice">{adminNotice}</p>}

      {activeAdminTab === 'bookings' && (
        <>
          <form className="admin-filters" onSubmit={handleFilterSubmit}>
            <label>
              From
              <input name="startDate" type="date" value={filters.startDate} onChange={handleFilterChange} />
            </label>
            <label>
              To
              <input name="endDate" type="date" value={filters.endDate} onChange={handleFilterChange} />
            </label>
            <div className="admin-branch-lock">
              <span>Branch</span>
              <strong>{getBranchArea(sessionBranch)}</strong>
            </div>
            <label>
              Treatment
              <select name="treatment" value={filters.treatment} onChange={handleFilterChange}>
                <option value="">All treatments</option>
                {treatments.map((treatment) => (
                  <option key={treatment.id} value={treatment.name}>
                    {treatment.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Status
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All statuses</option>
                {adminStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </form>

          <section className="admin-table-panel">
            <div className="admin-table-heading">
              <h2>Bookings</h2>
              <div className="admin-table-tools">
                <label>
                  <span>Search patient</span>
                  <input
                    value={adminSearch.bookings}
                    onChange={(event) => handleAdminSearchChange('bookings', event.target.value)}
                    placeholder="Name, phone, email, ID"
                  />
                </label>
                <span>{visibleBookings.length} rows</span>
              </div>
            </div>
            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Slot</th>
                    <th>Patient</th>
                    <th>Phone</th>
                    <th>Treatment</th>
                    <th>Branch</th>
                    <th>Status</th>
                    <th>Source</th>
                    <th>Patient ID</th>
                    <th>Booking ID</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleBookings.map((booking) => (
                    <tr key={`${booking.bookingId}-${booking.date}-${booking.timeSlot}`}>
                      <td>{booking.date}</td>
                      <td>{booking.timeSlot}</td>
                      <td>
                        <strong>{booking.patientName || 'Not added'}</strong>
                        {booking.email && <small>{booking.email}</small>}
                      </td>
                      <td>{booking.phone || '-'}</td>
                      <td>{booking.treatment || '-'}</td>
                      <td>{getBranchArea(booking.branch)}</td>
                      <td>
                        <select
                          className={`admin-status-select status-${booking.status
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                          value={booking.status}
                          onChange={(event) => handleBookingStatusChange(booking, event.target.value)}
                          disabled={isLoading || !booking.bookingId}
                        >
                          {adminStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{booking.source || '-'}</td>
                      <td>{booking.patientId || '-'}</td>
                      <td>{booking.bookingId || '-'}</td>
                    </tr>
                  ))}
                  {!visibleBookings.length && (
                    <tr>
                      <td colSpan="10">No bookings found for these filters or search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {activeAdminTab === 'new-booking' && (
        <section className="admin-form-panel">
          <div className="admin-table-heading">
            <h2>New walk-in / manual booking</h2>
            <span>Writes to Google Sheets</span>
          </div>
          <form className="admin-create-form" onSubmit={handleAdminCreateBooking}>
            <label>
              Patient name
              <input
                required
                name="name"
                value={adminBookingForm.name}
                onChange={handleAdminBookingChange}
                placeholder="Patient full name"
              />
            </label>
            <label>
              Phone
              <input
                required
                name="phone"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength="10"
                value={adminBookingForm.phone}
                onChange={handleAdminBookingChange}
                placeholder="10 digit phone"
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={adminBookingForm.email}
                onChange={handleAdminBookingChange}
                placeholder="Optional"
              />
            </label>
            <label>
              Referred by
              <input
                name="referredBy"
                value={adminBookingForm.referredBy}
                onChange={handleAdminBookingChange}
                placeholder="Optional"
              />
            </label>
            <label>
              Treatment
              <select name="treatment" value={adminBookingForm.treatment} onChange={handleAdminBookingChange}>
                {treatments.map((treatment) => (
                  <option key={treatment.id} value={treatment.name}>
                    {treatment.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Branch
              <input value={getBranchArea(sessionBranch)} readOnly />
            </label>
            <label>
              Date
              <input
                required
                name="date"
                type="date"
                value={adminBookingForm.date}
                onChange={handleAdminBookingChange}
              />
            </label>
            <label>
              Time slot
              <select name="timeSlot" value={adminBookingForm.timeSlot} onChange={handleAdminBookingChange}>
                {appointmentSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Source
              <select name="source" value={adminBookingForm.source} onChange={handleAdminBookingChange}>
                {['Manual Walkin', 'Phone Booking', 'Reception Booking'].map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Status
              <select name="status" value={adminBookingForm.status} onChange={handleAdminBookingChange}>
                {adminStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <div className="admin-payment-panel admin-form-wide">
              <div>
                <strong>Consultation fee</strong>
                <span>₹{consultationFeeAmount}</span>
              </div>
              <label>
                Payment mode
                <select
                  name="paymentMethod"
                  value={adminBookingForm.paymentMethod}
                  onChange={handleAdminBookingChange}
                >
                  <option value={cashPaymentMethod}>Received in cash</option>
                  <option value={onlinePaymentMethod}>Collect online payment</option>
                </select>
              </label>
              <p>
                {adminBookingForm.paymentMethod === cashPaymentMethod
                  ? 'Use this when the patient pays the consultation fee at reception.'
                  : 'The Razorpay checkout opens before the walk-in booking is saved.'}
              </p>
            </div>
            <label className="admin-form-wide">
              Notes / concern
              <textarea
                name="concern"
                rows="4"
                value={adminBookingForm.concern}
                onChange={handleAdminBookingChange}
                placeholder="Short clinical or reception note"
              />
            </label>
            <button className="submit-button admin-form-wide" type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Create booking'}
            </button>
          </form>
        </section>
      )}

      {activeAdminTab === 'patients' && (
        <section className="admin-table-panel">
          <div className="admin-table-heading">
            <h2>Patients</h2>
            <div className="admin-table-tools">
              <label>
                <span>Search patient</span>
                <input
                  value={adminSearch.patients}
                  onChange={(event) => handleAdminSearchChange('patients', event.target.value)}
                  placeholder="Name, phone, email, ID"
                />
              </label>
              <span>{visiblePatients.length} records</span>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>First visit</th>
                  <th>Last visit</th>
                  <th>Total visits</th>
                  <th>Active treatment</th>
                  <th>Status</th>
                  <th>Last branch</th>
                  <th>Patient ID</th>
                </tr>
              </thead>
              <tbody>
                {visiblePatients.map((patient) => (
                  <tr key={patient.patientId}>
                    <td>
                      <strong>{patient.patientName || 'Not added'}</strong>
                      {patient.notes && <small>{patient.notes}</small>}
                    </td>
                    <td>{patient.phone || '-'}</td>
                    <td>{patient.email || '-'}</td>
                    <td>{patient.firstVisitDate || '-'}</td>
                    <td>{patient.lastVisitDate || '-'}</td>
                    <td>{patient.totalVisits || 0}</td>
                    <td>{patient.activeTreatment || '-'}</td>
                    <td>{patient.currentStatus || '-'}</td>
                    <td>{patient.lastBranch ? getBranchArea(patient.lastBranch) : '-'}</td>
                    <td>{patient.patientId}</td>
                  </tr>
                ))}
                {!visiblePatients.length && (
                  <tr>
                    <td colSpan="10">No patient records found for this search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeAdminTab === 'history' && (
        <section className="admin-table-panel">
          <div className="admin-table-heading">
            <h2>Treatment history</h2>
            <div className="admin-table-tools">
              <label>
                <span>Search patient</span>
                <input
                  value={adminSearch.history}
                  onChange={(event) => handleAdminSearchChange('history', event.target.value)}
                  placeholder="Name, phone, patient ID"
                />
              </label>
              <span>{visibleHistory.length} completed</span>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-history-table">
              <thead>
                <tr>
                  <th>Completed</th>
                  <th>Patient</th>
                  <th>Phone</th>
                  <th>Treatment</th>
                  <th>Appointment</th>
                  <th>Branch</th>
                  <th>Notes</th>
                  <th>Patient ID</th>
                  <th>Booking ID</th>
                </tr>
              </thead>
              <tbody>
                {visibleHistory.map((item) => {
                  const completedDate = getCompletedDateParts(item.completedDate)

                  return (
                  <tr key={item.historyId}>
                    <td>
                      <strong>{completedDate.date}</strong>
                      {completedDate.time && <small>{completedDate.time}</small>}
                    </td>
                    <td>{item.patientName || '-'}</td>
                    <td>{item.phone || '-'}</td>
                    <td>{item.treatment || '-'}</td>
                    <td>
                      <strong>{item.date || '-'}</strong>
                      <small>{item.timeSlot || '-'}</small>
                    </td>
                    <td>{item.branch ? getBranchArea(item.branch) : '-'}</td>
                    <td>{item.finalNotes || '-'}</td>
                    <td>{item.patientId || '-'}</td>
                    <td>{item.bookingId || '-'}</td>
                  </tr>
                  )
                })}
                {!visibleHistory.length && (
                  <tr>
                    <td colSpan="9">No completed treatment history found for this search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
      </div>
    </main>
  )
}

function WebsiteApp() {
  const [isLoading, setIsLoading] = useState(true)
  const [formState, setFormState] = useState(initialFormState)
  const [submittedFor, setSubmittedFor] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingLock, setBookingLock] = useState(getActiveBookingLock)
  const [activeTreatmentId, setActiveTreatmentId] = useState('')
  const [liveInstagramPosts, setLiveInstagramPosts] = useState([])
  const [isWhatsappHintVisible, setIsWhatsappHintVisible] = useState(false)
  const [bookingAvailability, setBookingAvailability] = useState({})
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false)
  const [availabilityError, setAvailabilityError] = useState('')
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(0)

  const selectedTreatment =
    treatments.find((treatment) => treatment.id === formState.treatment) ?? treatments[0]
  const activeTreatment = treatments.find((treatment) => treatment.id === activeTreatmentId)
  const activeTreatmentInsight = activeTreatment ? treatmentInsights[activeTreatment.id] : null
  const selectedClinic = clinicBranches[selectedClinicIndex] ?? clinicBranches[0]
  const confirmationTreatment = submittedFor || bookingLock?.treatmentName
  const isBookingLocked = Boolean(bookingLock)
  const isFormDisabled = isSubmitting || isBookingLocked
  const bookingCooldown = bookingLock ? formatBookingCooldown(bookingLock.submittedAt) : ''
  const todayDateValue = getTodayDateValue()
  const selectedDateAvailability = getDateAvailability(
    formState.branch,
    formState.date,
    bookingAvailability,
  )
  const suggestedDates = getDateSuggestions(formState.branch, bookingAvailability)
  const hasAvailableSelectedDate =
    Boolean(formState.date) &&
    !selectedDateAvailability.isPast &&
    !selectedDateAvailability.isClosed &&
    !selectedDateAvailability.isFullyBooked
  const requiresSlotSelection = !isBookingLocked && (!hasAvailableSelectedDate || !formState.timeSlot)
  const appointmentStatusMessage = formState.date
    ? isAvailabilityLoading
      ? 'Checking the latest appointment slots...'
      : selectedDateAvailability.isPast
      ? 'Past dates are unavailable. Please choose today or a future date.'
      : selectedDateAvailability.isClosed
        ? 'This branch is closed on the selected date.'
        : 'All consultation slots are currently open for appointment requests.'
    : 'Select a date to view available time slots.'
  const displayedInstagramPosts = liveInstagramPosts.length ? liveInstagramPosts : instagramPosts

  const handleClinicChange = (direction) => {
    setSelectedClinicIndex((current) =>
      (current + direction + clinicBranches.length) % clinicBranches.length,
    )
  }

  useEffect(() => {
    let isMounted = true

    const minimumLoader = new Promise((resolve) => {
      window.setTimeout(resolve, loaderMinimumDuration)
    })

    const maximumLoader = new Promise((resolve) => {
      window.setTimeout(resolve, loaderMaximumDuration)
    })

    const imagePreload = Promise.allSettled(getPreloadImages().map(preloadImage))

    Promise.race([Promise.all([minimumLoader, imagePreload]), maximumLoader]).then(() => {
      if (isMounted) {
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!instagramFeedEndpoint) {
      return undefined
    }

    let isMounted = true

    fetch(instagramFeedEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Instagram feed unavailable.')
        }

        return response.json()
      })
      .then((posts) => {
        if (!isMounted || !Array.isArray(posts)) {
          return
        }

        setLiveInstagramPosts(
          posts
            .map((post) => ({
              image: post.image ?? post.media_url ?? post.thumbnail_url,
              title: post.title ?? 'Instagram post',
              caption: post.caption ?? '',
              permalink: post.permalink ?? instagramProfileUrl,
            }))
            .filter((post) => post.image)
            .slice(0, 8),
        )
      })
      .catch(() => {
        if (isMounted) {
          setLiveInstagramPosts([])
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!bookingEndpoint || !formState.branch) {
      return undefined
    }

    let isMounted = true

    const refreshAvailability = () => {
      setIsAvailabilityLoading(true)
      setAvailabilityError('')

      fetchBookingAvailabilityRange({
        branch: formState.branch,
        startDate: todayDateValue,
        days: 8,
      })
        .then((daysAvailability) => {
          if (!isMounted) {
            return
          }

          setBookingAvailability((current) => {
            const nextAvailability = { ...current }

            daysAvailability.forEach((day) => {
              if (day.date) {
                nextAvailability[getAvailabilityKey(formState.branch, day.date)] = day
              }
            })

            return nextAvailability
          })
        })
        .catch(() => {
          if (isMounted) {
            setAvailabilityError('Live slot sync is temporarily unavailable. Please try again.')
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsAvailabilityLoading(false)
          }
        })
    }

    refreshAvailability()
    const refreshInterval = window.setInterval(refreshAvailability, availabilityRefreshMs)

    return () => {
      isMounted = false
      window.clearInterval(refreshInterval)
    }
  }, [formState.branch, todayDateValue])

  useEffect(() => {
    if (!bookingEndpoint || !formState.branch || !formState.date) {
      return undefined
    }

    let isMounted = true

    const refreshSelectedDateAvailability = () => {
      setIsAvailabilityLoading(true)
      setAvailabilityError('')

      fetchBookingAvailability({
        branch: formState.branch,
        date: formState.date,
      })
        .then((dateAvailability) => {
          if (!isMounted || !dateAvailability) {
            return
          }

          setBookingAvailability((current) => ({
            ...current,
            [getAvailabilityKey(formState.branch, formState.date)]: dateAvailability,
          }))
        })
        .catch(() => {
          if (isMounted) {
            setAvailabilityError('Live slot sync is temporarily unavailable. Please try again.')
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsAvailabilityLoading(false)
          }
        })
    }

    refreshSelectedDateAvailability()

    return () => {
      isMounted = false
    }
  }, [formState.branch, formState.date])

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-section')

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!activeTreatmentId) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveTreatmentId('')
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [activeTreatmentId])

  useEffect(() => {
    if (isLoading) {
      return undefined
    }

    let hintTimeout
    const showHint = () => {
      const isWhatsappOpen = document.querySelector('.whatsapp-launcher')?.hasAttribute('open')

      if (!isWhatsappOpen) {
        setIsWhatsappHintVisible(true)
        window.setTimeout(() => setIsWhatsappHintVisible(false), 1500)
      }
    }

    hintTimeout = window.setTimeout(showHint, 6000)
    const hintInterval = window.setInterval(showHint, 6000)

    return () => {
      window.clearTimeout(hintTimeout)
      window.clearInterval(hintInterval)
    }
  }, [isLoading])

  const handleChange = ({ target: { name, value } }) => {
    const nextValue =
      name === 'phone'
        ? value.replace(/\D/g, '').slice(0, 10)
        : name === 'referredBy'
          ? value.replace(/[^A-Za-z ]/g, '')
          : name === 'email'
            ? value.trim()
          : name === 'concern'
            ? limitWords(value, concernWordLimit)
          : value

    setFormState((current) => ({
      ...current,
      [name]: nextValue,
      ...(name === 'branch' || name === 'date' ? { timeSlot: '' } : {}),
    }))
    setSubmitError('')
  }

  const handleDateSuggestion = (dateValue) => {
    setFormState((current) => ({
      ...current,
      date: dateValue,
      timeSlot: '',
    }))
    setSubmitError('')
  }

  const handleTimeSlotSelect = (timeSlot) => {
    setFormState((current) => ({
      ...current,
      timeSlot,
    }))
    setSubmitError('')
  }

  const handleBookTreatment = (treatmentId) => {
    if (!isBookingLocked) {
      setFormState((current) => ({
        ...current,
        treatment: treatmentId,
      }))
      setSubmittedFor('')
      setSubmitError('')
    }

    document.getElementById('booking-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleTreatmentKeyDown = (event, treatmentId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setActiveTreatmentId(treatmentId)
    }
  }

  const handleModalBooking = (treatmentId) => {
    setActiveTreatmentId('')
    setTimeout(() => handleBookTreatment(treatmentId), 0)
  }

  const handleDateFieldClick = (event) => {
    const dateInput = event.currentTarget.querySelector('input[type="date"]')

    dateInput?.focus()
    dateInput?.showPicker?.()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isBookingLocked) {
      return
    }

    const treatmentName = selectedTreatment.name
    const branchName = formState.branch

    if (requiresSlotSelection) {
      setSubmitError('Please choose an available date and time slot before sending the request.')
      return
    }

    setIsSubmitting(true)
    setSubmittedFor('')
    setSubmitError('')

    try {
      let paymentDetails = {
        paymentMethod: onlinePaymentMethod,
        paymentStatus: 'Pending',
        paymentAmount: consultationFeeAmount,
      }

      if (bookingEndpoint) {
        paymentDetails = await collectConsultationPayment({
          name: formState.name,
          phone: formState.phone,
          email: formState.email,
          branch: branchName,
          source: 'Website consultation',
        })

        await submitBookingToSheets({
          formState: {
            ...formState,
            ...paymentDetails,
          },
          treatmentName,
          branchName,
        })

        if (formspreeEndpoint) {
          submitFormToFormspree({
            form: event.currentTarget,
            formName: 'Consultation request',
            metadata: {
              treatment_name: treatmentName,
              branch_name: branchName,
              appointment_time: formState.timeSlot,
              source: 'Apple International Dental website',
              payment_status: paymentDetails.paymentStatus,
              payment_amount: String(paymentDetails.paymentAmount),
              payment_id: paymentDetails.paymentId || '',
            },
          }).catch(() => {})
        }
      } else {
        await submitFormToFormspree({
          form: event.currentTarget,
          formName: 'Consultation request',
          metadata: {
            treatment_name: treatmentName,
            branch_name: branchName,
            appointment_time: formState.timeSlot,
            source: 'Apple International Dental website',
            payment_status: paymentDetails.paymentStatus,
            payment_amount: String(paymentDetails.paymentAmount),
          },
        })
      }

      const nextBookingLock = recordBookingSubmission({
        treatmentName,
        branchName,
      })

      setBookingLock(nextBookingLock)
      setSubmittedFor(treatmentName)
      setFormState(initialFormState)
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page-shell" id="top">
      {isLoading && (
        <div className="site-loader" role="status" aria-live="polite">
          <div className="site-loader-card">
            <img className="site-loader-logo" src="/logo.png" alt="Apple International Dental" />
            <img
              className="site-loader-gif"
              src="/loading/dentistry.gif"
              alt=""
              aria-hidden="true"
            />
            <p>Preparing your smile care experience...</p>
          </div>
        </div>
      )}

      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="#top">
            <span className="site-brand-mark">
              <img src="/logo.png" alt="" aria-hidden="true" />
            </span>
            <span className="site-brand-copy">
              <strong>Apple International Dental</strong>
              <small>Family, cosmetic, implant, and preventive dentistry</small>
            </span>
          </a>

          <nav className="site-nav" aria-label="Site">
            <a href="#services">Services</a>
            <a href="#treatments">Treatments</a>
            <a href="/schemes">Schemes</a>
            <a href="#instagram">Gallery</a>
            <a href="#dentists">Doctors</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="site-actions">
            <a className="site-call" href={`tel:${clinicPhoneHref}`}>
              Call now
            </a>
            <a className="site-cta" href="#booking">
              Book now
            </a>
          </div>
        </div>
      </header>

      <section className="hero-section reveal-section">
        <div className="hero-image-card">
          <div className="hero-overlay">
            <div className="hero-copy">
              <p className="eyebrow">Apple International Dental</p>
              <h1>Trusted dental care in Vijayawada for healthy smiles and advanced treatment.</h1>
              <p className="hero-text">
                From routine cleanings and kids checkups to aligners, implants, and emergency
                dentistry, our Vijayawada dental clinic offers complete care in one comfortable setting.
              </p>

              <div className="hero-actions">
                <a className="primary-action" href="#booking">
                  Book appointment
                </a>
                <a className="secondary-action" href="#services">
                  Our services
                </a>
              </div>
            </div>

            <div className="hero-info-grid">
              <article className="hero-info-card">
                <span>Hours</span>
                <strong>Mon-Sat 9:00 AM - 8:00 PM</strong>
              </article>
              <article className="hero-info-card">
                <span>Consultations</span>
                <strong>Same-day and weekend appointments available</strong>
              </article>
              <article className="hero-info-card">
                <span>Technology</span>
                <strong>Digital x-rays, aligners, implants, and microscope-assisted care</strong>
              </article>
              <article className="hero-info-card accent">
                <span>New patients</span>
                <strong>Call, WhatsApp, or request a visit online in under a minute</strong>
              </article>
            </div>
          </div>

        </div>
      </section>

      <div className="content-shell">
        <section className="kpi-section reveal-section" aria-label="Clinic performance highlights">
          {kpis.map((item) => (
            <article className="kpi-card" key={item.label}>
              <strong>{item.value}</strong>
              <p>{item.label}</p>
            </article>
          ))}
        </section>

        <section className="services-overview reveal-section" id="services">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Complete dental care</p>
              <h2>Comprehensive dental services in Vijayawada</h2>
            </div>
            <p className="section-text">
              Explore preventive, cosmetic, restorative, implant, and orthodontic dental services
              tailored to children, adults, and long-term oral health needs.
            </p>
          </div>

          <div className="services-layout">
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-visual" aria-hidden="true">
                    <img src={service.image} alt="" loading="lazy" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>

            <div className="services-summary">
              <p className="eyebrow">Why families choose us</p>
              <h3>Comfortable visits, clear advice, and long-term dental care under one roof.</h3>
              <div className="services-summary-points">
                <article>
                  <strong>Experienced team</strong>
                  <p>General, cosmetic, restorative, and children&apos;s care planned by experienced dentists.</p>
                </article>
                <article>
                  <strong>Modern diagnosis</strong>
                  <p>Digital imaging, treatment planning, and practical guidance for confident decisions.</p>
                </article>
                <article>
                  <strong>Convenient scheduling</strong>
                  <p>Weekday and weekend consultations for families, working professionals, and urgent visits.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="treatment-section reveal-section" id="treatments">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Popular treatments</p>
              <h2>Explore our most requested dental treatments</h2>
            </div>
            <p className="section-text">
              Choose a treatment to request a consultation with the right focus from the
              very beginning.
            </p>
          </div>

          <div className="treatment-grid" role="list">
            {treatments.map((treatment) => {
              const isActive = treatment.id === formState.treatment

              return (
                <article
                  key={treatment.id}
                  className={`treatment-card${isActive ? ' active' : ''}`}
                  role="button"
                  tabIndex="0"
                  onClick={() => setActiveTreatmentId(treatment.id)}
                  onKeyDown={(event) => handleTreatmentKeyDown(event, treatment.id)}
                >
                  {treatment.image && (
                    <div className="treatment-image-wrap">
                      {treatment.isVideoPreview ? (
                        <video
                          className="treatment-image"
                          src={treatment.image}
                          muted
                          playsInline
                          autoPlay
                          loop
                          preload="metadata"
                          aria-label={`${treatment.name} preview`}
                        />
                      ) : (
                        <img
                          className="treatment-image"
                          src={treatment.image}
                          alt={treatment.name}
                          loading="lazy"
                        />
                      )}
                    </div>
                  )}
                  <div className="treatment-card-top">
                    <span className="treatment-icon treatment-icon-fallback" aria-hidden="true">
                      {treatment.name
                        .split(' ')
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join('')}
                    </span>
                    <span className="treatment-tag">{treatment.highlight}</span>
                  </div>
                  <h3>{treatment.name}</h3>
                  <p>{treatment.blurb}</p>
                  <div className="treatment-card-footer">
                    <span className="treatment-meta">{treatment.duration}</span>
                    <button
                      type="button"
                      className="treatment-book-button"
                      onClick={(event) => {
                        event.stopPropagation()
                        setActiveTreatmentId(treatment.id)
                      }}
                    >
                      Learn more
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="booking-section reveal-section" id="booking-form">
            <div className="section-heading compact">
            <div>
              <p className="eyebrow">Contact us</p>
              <h2>Schedule your dental consultation</h2>
            </div>
            <p className="section-text">
              Tell us what you need help with and our front desk team will confirm the
              right doctor, visit type, and available appointment slot.
            </p>
          </div>

          <aside className="booking-panel booking-panel-full" id="booking">
            <div className="booking-header">
              <p className="eyebrow">Consultation form</p>
              <h3>{selectedTreatment.name}</h3>
              <p>{selectedTreatment.details}</p>
            </div>

            <form
              className="booking-form booking-form-grid"
              name="consultation"
              action={formspreeEndpoint}
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form_type" value="consultation" />
              <input type="hidden" name="_subject" value="New dental consultation request" />
              <input type="hidden" name="treatment_name" value={selectedTreatment.name} />
              <input type="hidden" name="branch_name" value={formState.branch} />
              <input type="hidden" name="timeSlot" value={formState.timeSlot} />
              <input type="hidden" name="payment_amount" value={consultationFeeAmount} />
              <input type="hidden" name="payment_method" value={onlinePaymentMethod} />

              <fieldset disabled={isFormDisabled}>
                <label className="select-label">
                  Treatment
                  <span className="select-control">
                    <select
                      required
                      name="treatment"
                      value={formState.treatment}
                      onChange={handleChange}
                    >
                      {treatments.map((treatment) => (
                        <option key={treatment.id} value={treatment.id}>
                          {treatment.name}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>

                <label className="select-label">
                  Branch
                  <span className="select-control">
                    <select
                      required
                      name="branch"
                      value={formState.branch}
                      onChange={handleChange}
                    >
                      {branches.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>

                <label>
                  Full name
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Phone number
                  <input
                    required
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    title="Enter a 10 digit phone number"
                    placeholder="9876543210"
                    value={formState.phone}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Email address
                  <input
                    required
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    title="Enter a valid email address"
                    placeholder="yourname@gmail.com"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Reffered by
                  <input
                    name="referredBy"
                    type="text"
                    pattern="[A-Za-z ]*"
                    title="Use alphabets and spaces only"
                    placeholder="Doctor, friend, family, or online"
                    value={formState.referredBy}
                    onChange={handleChange}
                  />
                </label>

                <label onClick={handleDateFieldClick}>
                  Preferred date
                  <input
                    required
                    name="date"
                    type="date"
                    min={todayDateValue}
                    value={formState.date}
                    onChange={handleChange}
                  />
                </label>

                <div className="booking-availability booking-form-wide">
                  <div className="date-suggestions" aria-label="Available appointment dates">
                    {suggestedDates.map((date) => (
                      <button
                        className={`date-chip${formState.date === date.value ? ' selected' : ''}`}
                        disabled={date.isUnavailable}
                        key={date.value}
                        type="button"
                        onClick={() => handleDateSuggestion(date.value)}
                      >
                        <span>{date.label}</span>
                        <small>{date.isUnavailable ? 'Closed' : 'Open'}</small>
                      </button>
                    ))}
                  </div>

                  <p
                    className={`availability-note${
                      hasAvailableSelectedDate ? ' available' : formState.date ? ' unavailable' : ''
                    }`}
                  >
                    {appointmentStatusMessage}
                  </p>
                  {availabilityError && (
                    <p className="availability-note unavailable">{availabilityError}</p>
                  )}

                  {formState.date && (
                    <div className="time-slot-grid" aria-label="Available appointment time slots">
                      {appointmentSlots.map((slot) => (
                          <button
                            className={`time-slot${
                              formState.timeSlot === slot ? ' selected' : ''
                            }`}
                            disabled={!hasAvailableSelectedDate}
                            key={slot}
                            type="button"
                            onClick={() => handleTimeSlotSelect(slot)}
                          >
                            {slot}
                          </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="payment-summary booking-form-wide">
                  <div>
                    <strong>Consultation fee</strong>
                    <span>Paid securely before the appointment request is sent.</span>
                  </div>
                  <p>₹{consultationFeeAmount}</p>
                </div>

                <label className="booking-form-wide">
                  <span className="field-label-row">
                    <span>What would you like help with?</span>
                    <span>{getWords(formState.concern).length}/{concernWordLimit} words</span>
                  </span>
                  <textarea
                    required
                    name="concern"
                    rows="4"
                    placeholder="Tell us about your smile goals or dental concern."
                    value={formState.concern}
                    onChange={handleChange}
                  />
                </label>
              </fieldset>

              <button
                className={`submit-button booking-form-wide${isSubmitting ? ' submitting' : ''}`}
                type="submit"
                disabled={isFormDisabled || requiresSlotSelection}
              >
                {isSubmitting && <span className="submit-spinner" aria-hidden="true" />}
                <span>
                  {isSubmitting
                    ? 'Opening payment...'
                    : isBookingLocked
                    ? 'Request limit reached'
                    : requiresSlotSelection
                      ? 'Select date and time'
                    : `Pay ₹${consultationFeeAmount} & request appointment`}
                </span>
              </button>
            </form>

              <div
                className={`confirmation-card${
                  submitError ? ' visible error' : confirmationTreatment ? ' visible success' : ''
                }`}
                role="status"
                aria-live="polite"
              >
                {confirmationTreatment && !submitError && (
                  <span className="confirmation-icon" aria-hidden="true" />
                )}
                <strong>
                  {submitError
                    ? 'Request not sent'
                    : confirmationTreatment
                    ? 'Appointment request received'
                    : 'Consultation request ready'}
                </strong>
                <p>
                  {submitError
                    ? submitError
                    : confirmationTreatment
                    ? bookingLock
                      ? `Thank you. Your ${confirmationTreatment} request has been sent to our reception team. This device has reached four requests, so the form is paused for about ${bookingCooldown}.`
                      : `Thank you. Your ${confirmationTreatment} request and ₹${consultationFeeAmount} consultation fee have been received. We will contact you shortly to confirm your appointment.`
                    : 'Select a treatment from the dropdown or use the treatment cards above to begin.'}
                </p>
              </div>
          </aside>
        </section>

        {activeTreatment && activeTreatmentInsight && (
          <div
            className="treatment-modal-backdrop"
            role="presentation"
            onClick={() => setActiveTreatmentId('')}
          >
            <section
              className="treatment-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="treatment-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="treatment-modal-close"
                type="button"
                aria-label="Close treatment details"
                onClick={() => setActiveTreatmentId('')}
              >
                x
              </button>

              <div className="treatment-modal-media">
                {activeTreatment.video ? (
                  <video
                    src={activeTreatment.video}
                    muted
                    playsInline
                    preload="metadata"
                    autoPlay
                    loop
                    aria-label={`${activeTreatment.name} treatment video`}
                  />
                ) : activeTreatment.gif ? (
                  <img src={activeTreatment.gif} alt={`${activeTreatment.name} animated preview`} />
                ) : (
                  <img src={activeTreatment.image} alt={activeTreatment.name} />
                )}
              </div>

              <div className="treatment-modal-copy">
                <p className="eyebrow">{activeTreatment.highlight}</p>
                <h3 id="treatment-modal-title">{activeTreatment.name}</h3>
                <p>{activeTreatment.details}</p>

                <div className="treatment-modal-grid">
                  <div>
                    <strong>Benefits</strong>
                    <ul>
                      {activeTreatmentInsight.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong>Who needs it</strong>
                    <ul>
                      {activeTreatmentInsight.whoNeedsIt.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="treatment-modal-footer">
                  <span>
                    <small>Approx. duration</small>
                    <strong>{activeTreatment.duration}</strong>
                  </span>
                  <button
                    className="submit-button treatment-modal-cta"
                    type="button"
                    onClick={() => handleModalBooking(activeTreatment.id)}
                  >
                    Book this treatment
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        <section className="instagram-section reveal-section" id="instagram">
          <div className="instagram-heading">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">Instagram feed</p>
                <h2>@appleinternational_dental</h2>
              </div>
              <p className="section-text">
                Follow clinic updates, treatment moments, patient education, and smile care posts
                from Apple International Dental.
              </p>
            </div>

            <a className="instagram-follow-button" href={instagramProfileUrl} target="_blank" rel="noreferrer">
              <span aria-hidden="true">+</span>
              Follow
            </a>
          </div>

          <div className="instagram-grid">
            {displayedInstagramPosts.map((post) => (
              <a
                className="instagram-card"
                href={post.permalink ?? instagramProfileUrl}
                key={`${post.title}-${post.image}`}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className="instagram-image"
                  style={{ backgroundImage: `url(${post.image})` }}
                  aria-label={post.title}
                />
                <div className="instagram-copy">
                  <h3>{post.title}</h3>
                  <p>{post.caption}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="dentists-section reveal-section" id="dentists">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Meet the dentists</p>
              <h2>Meet the dentists behind your care</h2>
            </div>
            <p className="section-text">
              Add specialist bios, credentials, and areas of focus to build confidence.
            </p>
          </div>

          <div className="dentists-grid">
            {dentists.map((dentist) => (
              <article className="dentist-card" key={dentist.name}>
                <div
                  className="dentist-photo"
                  style={{ backgroundImage: `url(${dentist.image})` }}
                  aria-label={dentist.name}
                />
                <h3>{dentist.name}</h3>
                <span>{dentist.role}</span>
                <p>{dentist.bio}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="why-section reveal-section" id="why-apple-dental">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Why choose us</p>
              <h2>Why Apple International Dental</h2>
            </div>
            <p className="section-text">
              Comprehensive dental care backed by experienced doctors, advanced technology,
              international standards, and a strong safety-first clinic culture.
            </p>
          </div>

          <div className="why-grid">
            {whyChooseUs.map((item) => (
              <article className="why-card" key={item.title}>
                <span className="why-card-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <h3>{item.title}</h3>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section reveal-section" id="faq">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Questions patients ask</p>
              <h2>Helpful answers before your visit</h2>
            </div>
            <p className="section-text">
              Clear answers around comfort, costs, timing, kids visits, orthodontic choices,
              and root canal treatment.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section reveal-section" id="contact">
          <div className="contact-card">
            <div className="contact-copy">
              <p className="eyebrow">Visit the clinic</p>
              <h2>Find the Apple International Dental branch nearest to you.</h2>
              <p className="section-text">
                Use the left and right arrows on the branch image to change the clinic details,
                address, phone number, and email.
              </p>
            </div>

            <div className="clinic-carousel" aria-live="polite">
              <div className="clinic-image-frame">
                <img
                  src={selectedClinic.image}
                  alt={`${selectedClinic.area} branch`}
                  onError={(event) => {
                    event.currentTarget.src = heroImage
                  }}
                />
                <button
                  type="button"
                  className="clinic-arrow clinic-arrow-left"
                  aria-label="Show previous branch"
                  onClick={() => handleClinicChange(-1)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="clinic-arrow clinic-arrow-right"
                  aria-label="Show next branch"
                  onClick={() => handleClinicChange(1)}
                >
                  ›
                </button>
                <div className="clinic-image-caption">
                  <strong>{selectedClinic.area}</strong>
                </div>
              </div>
              <p className="clinic-carousel-help">Click the arrows to view another clinic branch.</p>
            </div>

            <div className="contact-grid">
              <article className="contact-item">
                <span>Address</span>
                <a href={getGoogleMapsUrl(selectedClinic.address)} target="_blank" rel="noreferrer">
                  <strong>{selectedClinic.address}</strong>
                  <small>Open in Google Maps</small>
                </a>
              </article>
              <article className="contact-item">
                <span>Phone</span>
                <a href={`tel:+91${selectedClinic.phone}`}>
                  <strong>{formatPhoneDisplay(selectedClinic.phone)}</strong>
                </a>
              </article>
              <article className="contact-item">
                <span>Email</span>
                {selectedClinic.email ? (
                  <a href={`mailto:${selectedClinic.email}`}>
                    <strong>{selectedClinic.email}</strong>
                  </a>
                ) : (
                  <strong>Email will be updated soon</strong>
                )}
              </article>
              <article className="contact-item">
                <span>Hours</span>
                <strong>Mon-Sat, 9:00 AM - 8:00 PM</strong>
              </article>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <strong>Apple International Dental</strong>
            <p>Serving patients across our clinic network with family dentistry, smile makeovers, implants, aligners, and emergency care.</p>
          </div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#booking">Booking</a>
            <a href="/schemes">Schemes</a>
            <a href="#dentists">Doctors</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social-links" aria-label="Social media links">
            <a href={instagramProfileUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M13.7 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6H17V4.1c-.3 0-1.4-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.5v3.2h2.8V22h3.4Z" />
              </svg>
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M13.9 10.6 21.3 2h-1.8l-6.4 7.4L8 2H2l7.8 11.3L2 22h1.8l6.8-7.8 5.4 7.8h6l-8.1-11.4Zm-2.4 2.8-.8-1.1L4.4 3.3h2.7l5 7.1.8 1.1 6.6 9.4h-2.7l-5.3-7.5Z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6.9 8.8H3.5V22h3.4V8.8ZM5.2 2.4a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1ZM22 14.4c0-3.5-1.9-5.8-4.9-5.8-2 0-3.1 1.1-3.6 1.9V8.8h-3.3V22h3.4v-6.5c0-1.7.3-3.4 2.5-3.4 2.1 0 2.1 2 2.1 3.5V22H22v-7.6Z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      <details className={`whatsapp-launcher${isWhatsappHintVisible ? ' hint-visible' : ''}`}>
        <summary aria-label="Open WhatsApp branch options">
          <span className="whatsapp-hint-arrow" aria-hidden="true">
            Chat with us
            <span>→</span>
          </span>
          <span className="whatsapp-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" focusable="false">
              <path d="M16.02 4.5C9.64 4.5 4.5 9.54 4.5 15.78c0 2.12.6 4.1 1.64 5.8L4.5 27.5l6.12-1.56a11.7 11.7 0 0 0 5.4 1.34c6.36 0 11.48-5.04 11.48-11.26S22.38 4.5 16.02 4.5Zm0 20.82c-1.78 0-3.44-.48-4.88-1.32l-.36-.22-3.62.92.96-3.42-.24-.36a9.22 9.22 0 0 1-1.44-4.94c0-5.14 4.3-9.34 9.58-9.34s9.56 4.2 9.56 9.34-4.28 9.34-9.56 9.34Zm5.24-6.98c-.28-.14-1.66-.8-1.92-.9-.26-.08-.44-.14-.64.14-.18.28-.74.9-.9 1.08-.16.18-.34.2-.62.06-.28-.14-1.2-.44-2.28-1.38-.84-.74-1.4-1.66-1.56-1.94-.16-.28-.02-.44.12-.58.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.04-.34-.02-.48-.08-.14-.64-1.5-.88-2.06-.22-.54-.46-.46-.64-.46h-.54c-.18 0-.48.06-.74.34-.26.28-.98.94-.98 2.3 0 1.36 1 2.68 1.14 2.86.14.18 1.98 2.96 4.78 4.14.66.28 1.18.46 1.58.58.66.2 1.28.18 1.76.1.54-.08 1.66-.66 1.9-1.3.24-.64.24-1.18.16-1.3-.08-.12-.26-.18-.54-.32Z" />
            </svg>
          </span>
        </summary>
        <div className="whatsapp-menu" aria-label="Choose a branch to message on WhatsApp">
          <div className="whatsapp-menu-header">
            <div>
              <span>Whatsapp us</span>
              <strong>Choose a branch</strong>
            </div>
            <button
              type="button"
              aria-label="Close WhatsApp branch options"
              onClick={(event) => {
                event.currentTarget.closest('details')?.removeAttribute('open')
              }}
            >
              x
            </button>
          </div>
          {branchContacts.map((contact) => (
            <a
              href={getWhatsappLink(contact.branch)}
              key={contact.branch}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <strong>{contact.area}</strong>
                <small>Apple International Dental</small>
              </span>
              <span aria-hidden="true">›</span>
            </a>
          ))}
        </div>
      </details>
    </main>
  )
}

function SchemesPage() {
  return (
    <main className="page-shell schemes-page" id="top">
      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/">
            <span className="site-brand-mark">
              <img src="/logo.png" alt="" aria-hidden="true" />
            </span>
            <span className="site-brand-copy">
              <strong>Apple International Dental</strong>
              <small>Scheme-based dental care guidance</small>
            </span>
          </a>

          <nav className="site-nav" aria-label="Site">
            <a href="/">Home</a>
            <a href="/#services">Services</a>
            <a href="/#booking">Booking</a>
            <a href="/#contact">Contact</a>
          </nav>

          <div className="site-actions">
            <a className="site-call" href={`tel:${clinicPhoneHref}`}>
              Call now
            </a>
            <a className="site-cta" href="/#booking">
              Book now
            </a>
          </div>
        </div>
      </header>

      <section className="scheme-hero">
        <div className="scheme-hero-copy">
          <p className="eyebrow">Government and employee schemes</p>
          <h1>Dental care support for eligible scheme card holders.</h1>
          <p>
            Apple International Dental helps patients understand the documents, approval route,
            and branch coordination needed for scheme-linked dental visits.
          </p>
          <div className="scheme-hero-actions">
            <a className="primary-action" href="#scheme-list">
              View schemes
            </a>
            <a className="secondary-action" href="/#booking">
              Request appointment
            </a>
          </div>
        </div>
        <div className="scheme-hero-media">
          <img src={heroImage} alt="Dental consultation at Apple International Dental" />
          <div>
            <strong>{schemePrograms.length}</strong>
            <span>scheme categories listed from the clinic sheet</span>
          </div>
        </div>
      </section>

      <section className="scheme-intro">
        <article>
          <span>Before visit</span>
          <strong>Bring your scheme card, ID proof, and any referral note.</strong>
        </article>
        <article>
          <span>At reception</span>
          <strong>The branch team checks documents and guides the approval path.</strong>
        </article>
        <article>
          <span>Treatment plan</span>
          <strong>The dentist explains what can proceed immediately and what needs approval.</strong>
        </article>
      </section>

      <section className="scheme-section" id="scheme-list">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Schemes accepted or guided</p>
            <h2>Choose your scheme and prepare for the branch visit.</h2>
          </div>
          <p className="section-text">
            Coverage can vary by card type, referral status, branch empanelment, and the exact
            dental procedure. Final approval is confirmed through the applicable scheme process.
          </p>
        </div>

        <div className="scheme-grid">
          {schemePrograms.map((scheme) => (
            <article className="scheme-card" key={scheme.shortName}>
              <div className="scheme-card-top">
                <span>{scheme.shortName}</span>
                <small>{scheme.accent}</small>
              </div>
              <h3>{scheme.name}</h3>
              <p>{scheme.audience}</p>
              <div className="scheme-card-detail">
                <strong>How we help</strong>
                <p>{scheme.carePath}</p>
              </div>
              <div className="scheme-card-detail">
                <strong>Dental focus</strong>
                <p>{scheme.dentalFocus}</p>
              </div>
              <div className="scheme-doc-list">
                {scheme.documents.map((document) => (
                  <span key={document}>{document}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="scheme-branch-cta">
        <div>
          <p className="eyebrow">Branch help desk</p>
          <h2>Speak to the nearest branch before visiting.</h2>
          <p>
            Share your scheme name, branch preference, and dental concern so the front desk can
            guide documents and appointment timing.
          </p>
        </div>
        <div className="scheme-branch-links">
          {branchContacts.slice(0, 6).map((contact) => (
            <a href={getWhatsappLink(contact.branch)} target="_blank" rel="noreferrer" key={contact.branch}>
              {contact.area}
            </a>
          ))}
          <a className="scheme-all-branches" href="/#contact">
            View all branches
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <strong>Apple International Dental</strong>
            <p>Scheme-linked dental visits are coordinated through branch teams and the applicable approval process.</p>
          </div>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/#booking">Booking</a>
            <a href="/#contact">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

function App() {
  const isAdminPath =
    typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/admin'
  const isSchemesPath =
    typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/schemes'

  if (isAdminPath) {
    return <AdminDashboard />
  }

  return isSchemesPath ? <SchemesPage /> : <WebsiteApp />
}

export default App

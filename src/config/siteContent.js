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
      {
        label: 'Tooth Colored Fillings',
        href: '/general-dentistry/tooth-colored-fillings',
      },
      {
        label: 'Cleaning and polishing',
        href: '/general-dentistry/cleaning-and-polishing',
      },
      {
        label: 'Clips and Braces Treatment',
        href: '/general-dentistry/clips-and-braces-treatment',
      },
      {
        label: 'Aligners',
        href: '/general-dentistry/aligners',
      },
      {
        label: 'Crowns and Bridges',
        href: '/general-dentistry/crowns-and-bridges',
      },
      {
        label: 'Root Canal Treatment',
        href: '/general-dentistry/root-canal-treatment',
      },
      {
        label: 'Complete Dentures',
        href: '/general-dentistry/complete-dentures',
      },
      {
        label: 'Tooth Extractions',
        href: '/general-dentistry/tooth-extractions',
      },
      {
        label: 'Wisdom Molar Extraction',
        href: '/general-dentistry/wisdom-molar-extraction',
      },
      {
        label: 'Gingival Flap Surgery',
        href: '/general-dentistry/gingival-flap-surgery',
      },
      {
        label: 'Frenectomy',
        href: '/general-dentistry/frenectomy',
      },
      {
        label: 'Night Guard',
        href: '/general-dentistry/night-guard',
      },
      {
        label: 'Pit and Fissure Sealants',
        href: '/general-dentistry/pit-and-fissure-sealants',
      },
      {
        label: 'Partial Dentures',
        href: '/general-dentistry/partial-dentures',
      },
      {
        label: 'Over dentures',
        href: '/general-dentistry/over-dentures',
      },
      {
        label: 'Kids Dentistry',
        href: '/general-dentistry/kids-dentistry',
      },
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

export const generalDentistryFaqs = [
  {
    question: 'What is general dentistry?',
    answer:
      'General dentistry focuses on maintaining overall oral health through regular checkups, cleaning, fillings, root canal treatments, extractions, and preventive care.',
  },
  {
    question: 'How often should I visit the dentist?',
    answer:
      'It is recommended to visit the dentist every 6 months for a routine dental checkup and cleaning.',
  },
  {
    question: 'Why are regular dental cleanings important?',
    answer:
      'Professional cleaning removes plaque and tartar buildup, helps prevent gum disease, cavities, bad breath, and keeps your teeth healthy.',
  },
  {
    question: 'What are tooth-colored fillings?',
    answer:
      'Tooth-colored fillings are cosmetic fillings made to match your natural tooth color and are used to repair cavities or damaged teeth.',
  },
  {
    question: 'What causes tooth sensitivity?',
    answer:
      'Sensitivity can occur due to enamel wear, cavities, gum recession, teeth grinding, or cracked teeth.',
  },
  {
    question: 'What is root canal treatment?',
    answer:
      'Root canal treatment removes infected pulp inside the tooth to save the natural tooth and relieve pain.',
  },
  {
    question: 'Is root canal treatment painful?',
    answer:
      'Modern root canal treatment is usually painless because it is performed under local anesthesia.',
  },
  {
    question: 'When is tooth extraction necessary?',
    answer:
      'Tooth extraction may be needed for severely damaged teeth, infections, overcrowding, or impacted wisdom teeth.',
  },
  {
    question: 'What is wisdom tooth extraction?',
    answer:
      'It is the removal of impacted or painful wisdom teeth that may cause swelling, pain, or infection.',
  },
  {
    question: 'What are dentures?',
    answer:
      'Dentures are removable artificial teeth used to replace missing teeth and restore chewing and appearance.',
  },
  {
    question: 'How can I prevent cavities?',
    answer:
      'Brush twice daily, floss regularly, avoid excess sugary foods, and attend regular dental checkups.',
  },
]

export const treatmentPages = {
  '/general-dentistry/tooth-colored-fillings': {
    category: 'General Dentistry',
    title: 'Tooth Coloured Fillings',
    variant: 'fillings-treatment',
    navLabel: 'Tooth Colored Fillings',
    eyebrow: 'Natural-looking cavity repair',
    image: '/services/Tooth Colored Fillings_2.png',
    imageAlt: 'Before and after view of metal fillings replaced with tooth-colored fillings',
    sectionImage: '/services/Tooth Colored Fillings.png',
    sectionImageAlt: 'Illustration showing tooth decay, decay removed, and dental filling stages',
    summary:
      'Tooth-colored fillings, also known as white fillings, are dental restorations designed to blend seamlessly with your natural teeth while repairing damage from cavities, chips, or fractures.',
    body:
      'Unlike traditional silver amalgam fillings, these are made from modern materials like composite resin, porcelain, or glass ionomer.',
    highlights: [
      'Repairs cavities while keeping the smile natural-looking',
      'Useful for minor chips, fractures, and small tooth defects',
      'Shade-matched materials help the filling blend with nearby teeth',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to tooth-colored fillings and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/cleaning-and-polishing': {
    category: 'General Dentistry',
    title: 'Cleaning and Polishing',
    navLabel: 'Cleaning and polishing',
    eyebrow: 'Professional plaque and tartar removal',
    image: '/services/TeethScaling_Polishing_2.webp',
    imageAlt: 'Dental scaling instrument removing plaque and tartar near the gumline',
    sectionImage: '/services/TeethScaling_Polishing.png',
    sectionImageAlt: 'Illustration explaining teeth scaling and polishing steps',
    sectionTitle: 'A cleaner, smoother smile with healthier gums.',
    summary:
      'Professional dental cleaning, often called scaling, removes plaque and tartar that brushing misses. Polishing is the final step using a gritty paste and a rotating brush to smooth the enamel.',
    body:
      'During scaling, the dentist or hygienist cleans hardened deposits from tooth surfaces and around the gumline. Polishing then removes surface stains and leaves teeth feeling smoother, which can make it harder for plaque to collect quickly after the visit.',
    highlights: [
      'Removes hard plaque and tartar from areas brushing cannot clean well',
      'Helps reduce bad breath, gum irritation, and surface staining',
      'Leaves tooth surfaces smoother and supports routine preventive care',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to cleaning and polishing and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/clips-and-braces-treatment': {
    category: 'General Dentistry',
    title: 'Clips and Braces Treatment',
    variant: 'braces-treatment',
    navLabel: 'Clips and Braces Treatment',
    eyebrow: 'Orthodontic bite and alignment care',
    image: '/services/Braces-Metal-Ceramic.png',
    imageAlt: 'Metal and ceramic braces shown on teeth',
    sectionImage: '/services/Clips and Braces Treatment.png',
    sectionImageAlt: 'Orthodontics illustration showing braces, retainer, and palate expander examples',
    sectionTitle: 'Correct misaligned, crowded, and rotated teeth.',
    summary:
      'Teeth clips, more commonly known as dental braces, are orthodontic devices used to correct misaligned, crooked, or crowded teeth and bite issues.',
    body:
      'Braces use brackets, bands, and archwires to apply continuous, gentle pressure that gradually shifts teeth into better positions over time. The orthodontist reviews the bite, crowding, spacing, jaw relationship, and oral hygiene needs before planning the treatment.',
    highlights: [
      'Helps correct crowding, spacing, rotated teeth, and bite imbalance',
      'Uses brackets and wires for controlled tooth movement over time',
      'Planned with regular adjustments, hygiene guidance, and retention after treatment',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to clips and braces treatment and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/aligners': {
    category: 'General Dentistry',
    title: 'Aligners',
    navLabel: 'Aligners',
    eyebrow: 'Removable clear orthodontic trays',
    image: '/services/Clear Aligners Page.png',
    imageAlt: 'Transparent clear aligner trays shown near teeth',
    sectionVideo: '/treatment-videos/Clear Aligners.mp4',
    sectionVideoLabel: 'Clear aligners treatment animation',
    sectionTitle: 'Discreet teeth straightening with removable trays.',
    summary:
      'Clear aligners are transparent, custom-made plastic trays used as a discreet alternative to traditional metal braces to straighten teeth.',
    body:
      'Aligners work by applying gentle, constant pressure to gradually shift teeth into the desired position. Unlike fixed braces, aligners are removable for eating, brushing, and flossing, but they must be worn for 20 to 22 hours a day to be effective.',
    highlights: [
      'Transparent trays designed for discreet orthodontic correction',
      'Removable for meals, brushing, and flossing',
      'Best results depend on wearing them 20 to 22 hours daily',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to aligners and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/crowns-and-bridges': {
    category: 'General Dentistry',
    title: 'Crowns and Bridges',
    variant: 'crowns-bridges-treatment',
    navLabel: 'Crowns and Bridges',
    eyebrow: 'Fixed tooth restoration',
    image: '/services/Dental_Bridges_2.png',
    imageAlt: 'Step-by-step dental bridge treatment replacing a missing tooth',
    sectionImage: '/services/Dental Bridges Page.png',
    sectionImageAlt: 'Dental bridge diagram showing crowns, pontic, jaw bone, and supporting structures',
    sectionTitle: 'Restore damaged or missing teeth with fixed prosthetic care.',
    summary:
      'Dental crowns and bridges are fixed prosthetic devices used to restore the function and appearance of damaged or missing teeth.',
    body:
      'Unlike removable dentures, crowns and bridges are cemented onto existing teeth or implants and can only be removed by a dentist. A crown covers and protects a weakened tooth, while a bridge replaces one or more missing teeth by anchoring an artificial tooth to natural teeth or implants on either side.',
    highlights: [
      'Restores chewing function and smile appearance after damage or tooth loss',
      'Crowns protect weakened, cracked, or heavily restored teeth',
      'Bridges replace missing teeth with a fixed option anchored by nearby support',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to crowns and bridges and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/root-canal-treatment': {
    category: 'General Dentistry',
    title: 'Root Canal Treatment',
    navLabel: 'Root Canal Treatment',
    eyebrow: 'Pain-relieving tooth-saving care',
    image: '/services/Root Canal Treatment_2.png',
    imageAlt: 'Dental model showing root canal files cleaning tooth canals',
    sectionImage: '/services/Root Canal Treatment Page.png',
    sectionImageAlt: 'Root canal treatment steps from infected tooth to new crown placement',
    sectionTitle: 'Save an infected tooth and restore comfortable chewing.',
    summary:
      'A root canal is a common, pain-relieving dental procedure used to save a tooth with severely infected or damaged pulp, usually caused by deep decay or cracks.',
    body:
      'An endodontist or dentist removes the damaged pulp, cleans and shapes the root canals, then fills and seals the space. A final crown is often recommended to restore full function and protect the tooth from future breakage.',
    highlights: [
      'Relieves infection-related tooth pain while preserving the natural tooth',
      'Cleans, shapes, fills, and seals the root canals to prevent reinfection',
      'Often completed with a crown to restore strength, function, and appearance',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to root canal treatment and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/complete-dentures': {
    category: 'General Dentistry',
    title: 'Complete Dentures',
    navLabel: 'Complete Dentures',
    eyebrow: 'Full-arch tooth replacement',
    image: '/services/Complete Dentures_2.png',
    imageAlt: 'Before and after view of implant-supported complete dentures',
    sectionImage: '/services/Complete Dentures Page.png',
    sectionImageAlt: 'Types of dentures including full, partial, immediate, flexible, flipper, and implant dentures',
    sectionTitle: 'Replace missing teeth and restore smile function.',
    summary:
      'A complete denture is a removable, tissue-supported prosthetic device that replaces all missing teeth in the upper or lower jaw, restoring chewing, speech, and facial aesthetics.',
    body:
      'Custom-made from acrylic resin, complete dentures are designed for patients who have lost all natural teeth. Depending on the patient’s oral condition and treatment plan, options may include conventional, immediate, or implant-supported dentures.',
    highlights: [
      'Replaces a full arch of missing teeth in the upper or lower jaw',
      'Supports chewing, speech, facial profile, and smile appearance',
      'Can be planned as conventional, immediate, or implant-supported dentures',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to complete dentures and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/partial-dentures': {
    category: 'General Dentistry',
    title: 'Partial Dentures',
    navLabel: 'Partial Dentures',
    eyebrow: 'Removable replacement for missing teeth',
    image: '/services/Partial Dentures Page.png',
    imageAlt: 'Before and after smile view showing missing teeth restored with partial dentures',
    sectionImage: '/services/Partial Dentures_2.jpg',
    sectionImageAlt: 'Partial denture appliance with gum-colored base, artificial teeth, and metal framework',
    sectionTitle: 'Replace missing teeth while supporting the remaining smile.',
    summary:
      'Partial dentures are removable dental appliances designed to replace one or more missing teeth, improving chewing, speech, and aesthetics while preventing remaining teeth from shifting.',
    body:
      'They consist of artificial teeth attached to a gum-colored plastic base, often supported by a metal framework or clasps. A partial denture is planned around the existing teeth, bite, gum support, and comfort so it can restore function while staying removable for cleaning.',
    highlights: [
      'Replaces one or more missing teeth without requiring a full denture',
      'Helps maintain chewing comfort, speech clarity, and smile appearance',
      'Supports the bite by reducing unwanted movement of remaining teeth',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to partial dentures and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/over-dentures': {
    category: 'General Dentistry',
    title: 'Over Dentures',
    navLabel: 'Over dentures',
    eyebrow: 'Implant-retained denture stability',
    image: '/services/Overdentures_2.png',
    imageAlt: 'Overdenture snapping onto dental implant attachments',
    sectionImage: '/services/Overdentures Page.png',
    sectionImageAlt: 'Overdenture diagram showing complete denture, implant abutments, dental implants, and attachments',
    sectionTitle: 'A steadier removable denture anchored by teeth, roots, or implants.',
    summary:
      'Overdentures are a type of removable dental prosthesis that snap or rest on top of existing natural teeth, tooth roots, or dental implants.',
    body:
      "Unlike traditional dentures that sit directly on the gums and often slide, overdentures use these underlying structures as anchors for significantly better stability and bone preservation. They are planned around available support, bite comfort, hygiene access, and the patient's need for a removable but more secure replacement option.",
    highlights: [
      'Provides better denture stability than many traditional gum-supported dentures',
      'Uses remaining roots, natural teeth, or implants as anchors when suitable',
      'Helps improve chewing confidence while supporting bone and gum health planning',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to over dentures and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/kids-dentistry': {
    category: 'General Dentistry',
    title: 'Kids Dentistry',
    navLabel: 'Kids Dentistry',
    eyebrow: 'Gentle dental care for children',
    image: '/services/Kids Dentistry Page.png',
    imageAlt: 'Smiling child in a dental chair during a pediatric dental visit',
    sectionTitle: 'Child-focused care from first visits through the teenage years.',
    summary:
      'Kids dentistry, or pediatric dentistry, is a specialised branch of dental care focused on the oral health of children from infancy through their teenage years.',
    body:
      "Pediatric dentists undergo 2 to 3 years of additional training after dental school to learn how to manage children's unique physical and emotional needs, including those with special healthcare requirements. Kids dentistry can include dental checkups, cavity-risk assessment, cleaning, fluoride guidance, sealants, tooth-colored fillings, space maintainers, habit counselling, dental trauma care, growth and bite monitoring, and child-friendly behavior guidance.",
    highlights: [
      'Supports regular checkups, cleanings, fluoride advice, and cavity prevention',
      'Includes sealants, fillings, space maintainers, and dental injury care when needed',
      'Focuses on gentle behavior guidance and care for children with special healthcare needs',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to kids dentistry and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/tooth-extractions': {
    category: 'General Dentistry',
    title: 'Tooth Extractions',
    navLabel: 'Tooth Extractions',
    eyebrow: 'Safe removal of damaged teeth',
    image: '/services/tooth_extraction_2.jpg',
    imageAlt: 'Extraction socket after permanent tooth removal',
    sectionImage: '/services/Tooth Extractions Page.png',
    sectionImageAlt: 'Tooth extraction diagram showing decay, socket, jawbone, gauze, and stitches',
    sectionTitle: 'Remove teeth that cannot be repaired safely.',
    summary:
      'A tooth extraction is the permanent removal of a tooth from its socket in the jawbone.',
    body:
      'While dentists aim to save natural teeth through fillings or crowns, an extraction becomes necessary when a tooth is too damaged by decay, trauma, or gum disease to be repaired. The dentist evaluates the tooth, surrounding bone, infection risk, and replacement options before planning the procedure.',
    highlights: [
      'Removes teeth that are severely decayed, broken, infected, or loose',
      'Helps protect surrounding teeth and gums when repair is no longer predictable',
      'Includes aftercare guidance for bleeding control, healing, and replacement planning',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to tooth extractions and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/wisdom-molar-extraction': {
    category: 'General Dentistry',
    title: 'Wisdom Molar Extraction',
    variant: 'wisdom-molar-treatment',
    navLabel: 'Wisdom Molar Extraction',
    eyebrow: 'Impacted third molar care',
    image: '/services/Wisdom_Tooth_Extraction.jpg',
    imageAlt: 'X-ray illustration showing an impacted wisdom tooth and third molar position',
    sectionImage: '/treatment-gifs/wisdom-teeth.gif',
    sectionImageAlt: 'Animated wisdom teeth extraction illustration',
    sectionTitle: 'Remove painful or impacted wisdom molars safely.',
    summary:
      'Wisdom molar extraction is a common surgical procedure to remove one or more of your third molars, the four permanent adult teeth located at the back corners of your mouth.',
    body:
      'This is typically done to resolve or prevent issues like pain, infection, or crowding caused by impacted teeth that do not have enough room to grow. The dentist evaluates the tooth position, surrounding bone, swelling, and nearby structures before planning the extraction and aftercare.',
    highlights: [
      'Helps manage pain, swelling, infection, and food trapping around wisdom teeth',
      'Recommended when third molars are impacted or do not have enough room to erupt',
      'Includes surgical planning and aftercare guidance for comfortable healing',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to wisdom molar extraction and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/gingival-flap-surgery': {
    category: 'General Dentistry',
    title: 'Gingival Flap Surgery',
    navLabel: 'Gingival Flap Surgery',
    eyebrow: 'Advanced gum disease treatment',
    image: '/services/Gingival Flap surgery_2.webp',
    imageAlt: 'Dental instrument cleaning tartar and bacteria below the gumline',
    sectionImage: '/services/Gingival Flap Surgery Page.png',
    sectionImageAlt: 'Gingival flap surgery steps for treating advanced gum disease',
    sectionTitle: 'Deep cleaning access for advanced gum pockets.',
    summary:
      'Gum flap surgery, also called periodontal flap surgery, is a common dental procedure used to treat advanced periodontitis by lifting the gums away from the teeth.',
    body:
      'This allows the dentist or periodontist to deeply clean roots, remove infected tissue, and reduce periodontal pockets. It is recommended when deep cleaning, also called scaling and root planing, cannot remove bacteria enough to save teeth and repair bone loss.',
    highlights: [
      'Provides access to deep periodontal pockets that trap plaque and bacteria',
      'Helps remove infected tissue and clean tooth roots more thoroughly',
      'Supports gum healing, pocket reduction, and long-term tooth stability',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to gingival flap surgery and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/frenectomy': {
    category: 'General Dentistry',
    title: 'Frenectomy',
    navLabel: 'Frenectomy',
    eyebrow: 'Minor soft-tissue release',
    image: '/services/frenectomy.jpg',
    imageAlt: 'Before and after view of upper lip frenum release between front teeth',
    sectionTitle: 'Release tight tissue bands that restrict movement.',
    summary:
      'A frenectomy is a simple, minor surgical procedure used to remove or modify a small band of connective tissue in the mouth called a frenum or frenulum.',
    body:
      'These bands connect your lips, cheeks, and tongue to your jawbone and gums. When a frenum is too short or thick, it can restrict movement or cause dental issues, leading doctors to recommend its release.',
    highlights: [
      'Helps improve lip, cheek, or tongue movement when a frenum is too tight',
      'May support speech, feeding, orthodontic, or gum-health treatment plans',
      'Usually planned as a minor soft-tissue procedure with clear healing guidance',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to frenectomy and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/night-guard': {
    category: 'General Dentistry',
    title: 'Night Guard',
    navLabel: 'Night Guard',
    eyebrow: 'Protection from teeth grinding',
    image: '/services/Night Guard Page.png',
    imageAlt: 'Transparent dental night guard appliance',
    sectionTitle: 'Protect your teeth while you sleep.',
    summary:
      'A night guard is a protective dental appliance worn during sleep to prevent damage caused by teeth grinding and clenching, a condition known as bruxism.',
    body:
      'A dentist-made night guard is designed to fit over the teeth and create a protective barrier between the upper and lower arches. It can help reduce enamel wear, tooth sensitivity, jaw strain, and damage to existing dental restorations caused by nighttime grinding.',
    highlights: [
      'Helps protect teeth from grinding, clenching, and enamel wear',
      'Can reduce stress on the jaw joints and chewing muscles',
      'Custom planning improves fit, comfort, and nightly use',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to night guards and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
  '/general-dentistry/pit-and-fissure-sealants': {
    category: 'General Dentistry',
    title: 'Pit and Fissure Sealants',
    navLabel: 'Pit and Fissure Sealants',
    eyebrow: 'Protective cavity prevention',
    image: '/services/dentalpit_fissure_sealant_2.webp',
    imageAlt: 'Before and after view of fissure sealant applied to molars',
    sectionImage: '/services/dentalpit_fissure_sealant.png',
    sectionImageAlt: 'Pit and fissure sealant process showing tooth without sealant, sealant applied, and final sealant',
    sectionTitle: 'Seal deep grooves before decay starts.',
    summary:
      'Pit and fissure sealants are thin, protective resin or glass ionomer coatings applied to the deep grooves of teeth, primarily molars, to create a physical barrier against decay.',
    body:
      'Sealants prevent food and bacteria from trapping in hard-to-clean pits and fissures. By covering these deep grooves, they can significantly reduce cavity risk in children and adults, especially on chewing surfaces that are difficult to clean thoroughly with brushing alone.',
    highlights: [
      'Creates a protective barrier over deep molar grooves and pits',
      'Helps prevent food and bacteria from collecting in hard-to-clean areas',
      'Supports cavity prevention for children, teens, and adults with deep fissures',
    ],
    faqIntro:
      'These General Dentistry FAQs apply to pit and fissure sealants and the other treatments in this category.',
    faqs: generalDentistryFaqs,
  },
}

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

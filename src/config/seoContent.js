export const siteBaseUrl = 'https://appleinternationaldental.com'

export const defaultSeo = {
  title: 'Apple International Dental | Dental Clinic in Hyderabad',
  description:
    'Apple International Dental in Hyderabad, Andhra Pradesh and Bangalore offers root canal treatment, dental implants, braces, clear aligners, kids dentistry, gum care, crowns, dentures, and emergency dental consultations.',
  image: `${siteBaseUrl}/logo.png`,
}

export const locationSeoPages = {
  '/dental-clinic-hyderabad': {
    city: 'Hyderabad',
    eyebrow: 'Dental Clinic in Hyderabad',
    title: 'Apple International Dental Clinic in Hyderabad',
    description:
      'Apple International Dental provides dental consultations in Hyderabad for root canal treatment, dental implants, braces, clear aligners, kids dentistry, gum care, crowns, dentures, and emergency dental care.',
    intro:
      'Patients in Hyderabad can visit Apple International Dental for preventive, restorative, cosmetic, orthodontic, implant, gum, kids, and emergency dental consultations across the clinic network.',
    highlights: [
      'Root canal treatment, crowns, dentures, and tooth restoration',
      'Dental implants, braces, and clear aligners for smile correction',
      'Kids dentistry, gum care, preventive cleaning, and emergency dental consultations',
    ],
  },
  '/dental-clinic-vijayawada': {
    city: 'Vijayawada',
    eyebrow: 'Dental Clinic in Vijayawada',
    title: 'Apple International Dental Clinic in Vijayawada',
    description:
      'Apple International Dental in Vijayawada offers root canal treatment, dental implants, braces, clear aligners, kids dentistry, gum care, crowns, dentures, and emergency dental consultations.',
    intro:
      'Apple International Dental supports patients in Vijayawada with family dentistry, smile makeovers, implant dentistry, orthodontic care, dentures, gum treatment, and emergency dental consultations.',
    highlights: [
      'General dentistry for tooth pain, cavities, cleaning, and restorations',
      'Cosmetic dentistry, clear aligners, braces, and smile correction',
      'Dental implant consultations, crowns, bridges, dentures, and gum care',
    ],
  },
  '/dental-clinic-bangalore': {
    city: 'Bangalore',
    eyebrow: 'Dental Clinic in Bangalore',
    title: 'Apple International Dental Clinic in Bangalore',
    description:
      'Apple International Dental in Bangalore offers consultations for root canal treatment, dental implants, braces, clear aligners, kids dentistry, crowns, dentures, gum care, and emergency dental needs.',
    intro:
      'Patients searching for dental care in Bangalore can use Apple International Dental for treatment guidance across general dentistry, implants, orthodontics, pediatric dentistry, gum care, and restorative care.',
    highlights: [
      'Root canal treatment, dental fillings, crowns, bridges, and dentures',
      'Dental implants, clear aligners, braces, and cosmetic smile care',
      'Children dentistry, gum care, preventive visits, and emergency dental support',
    ],
  },
  '/dental-clinic-bengaluru': {
    city: 'Bengaluru',
    eyebrow: 'Dental Clinic in Bengaluru',
    title: 'Apple International Dental Clinic in Bengaluru',
    description:
      'Apple International Dental in Bengaluru provides dental consultations for implants, root canals, braces, clear aligners, kids dentistry, gum care, crowns, dentures, and emergency dental care.',
    intro:
      'Apple International Dental helps Bengaluru patients find structured dental consultations for common, advanced, cosmetic, implant, orthodontic, pediatric, and emergency dental needs.',
    highlights: [
      'Dental implants, root canal treatment, crowns, bridges, and dentures',
      'Braces, clear aligners, smile correction, and cosmetic dentistry',
      'Kids dentistry, gum care, tooth cleaning, and emergency dental consultations',
    ],
  },
  '/dental-clinic-andhra-pradesh': {
    city: 'Andhra Pradesh',
    eyebrow: 'Dental Clinics in Andhra Pradesh',
    title: 'Apple International Dental Clinics in Andhra Pradesh',
    description:
      'Apple International Dental clinics in Andhra Pradesh offer root canal treatment, dental implants, braces, clear aligners, kids dentistry, gum care, crowns, dentures, and emergency dental consultations.',
    intro:
      'Across Andhra Pradesh, Apple International Dental provides branch-based dental care guidance for preventive dentistry, restorative treatments, implants, orthodontics, kids dentistry, gum care, dentures, and emergency dental concerns.',
    highlights: [
      'Branch network support for general dentistry, root canals, and emergency visits',
      'Implants, crowns, bridges, dentures, braces, and clear aligner consultations',
      'Kids dentistry, gum care, dental cleaning, and scheme document guidance',
    ],
  },
}

export const locationSeoPaths = Object.keys(locationSeoPages)

export const getCanonicalUrl = (path = '/') => {
  const cleanPath = path === '/' ? '' : path.replace(/\/$/, '')

  return `${siteBaseUrl}${cleanPath}/`
}

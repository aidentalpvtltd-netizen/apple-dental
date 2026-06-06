export const siteBaseUrl = 'https://appleinternationaldental.com'
export const seoBrandAliases = ['Apple Dental', 'Apple Dental Care']

export const defaultSeo = {
  title:
    'Best Dental Clinic in Hyderabad, Vijayawada & Bangalore | Apple International Dental | Apple Dental',
  description:
    'Apple International Dental is best dental hospital and implant center in Hyderabad Vijayawada Bangalore India. Patients searching Apple Dental or Apple Dental Care can find dental implants, aligners, root canals, braces and more.',
  image: `${siteBaseUrl}/logo.png`,
}

export const locationSeoPages = {
  '/dental-clinic-hyderabad': {
    city: 'Hyderabad',
    eyebrow: 'Dental Clinic in Hyderabad',
    title: 'Dental Clinic in Hyderabad | Apple International Dental',
    description:
      'Apple international dental helps patients searching Apple Dental or Apple Dental Care find dental consultations in Hyderabad, Vijayawada, and Bangalore for root canals, implants, braces, aligners, kids dentistry, gum care, crowns, dentures, and emergency care.',
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
    title: 'Dental Clinic in Vijayawada | Apple International Dental',
    description:
      'Apple international dental helps patients searching Apple Dental or Apple Dental Care find dental care in Hyderabad, Vijayawada, and Bangalore including root canals, implants, braces, aligners, kids dentistry, gum care, crowns, dentures, and emergency consultations.',
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
    title: 'Dental Clinic in Bangalore | Apple International Dental',
    description:
      'Apple international dental helps patients searching Apple Dental or Apple Dental Care find consultations in Hyderabad, Vijayawada, and Bangalore for root canals, implants, braces, aligners, kids dentistry, crowns, dentures, gum care, and emergency needs.',
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
    title: 'Dental Clinic in Bengaluru | Apple International Dental',
    description:
      'Apple international dental helps patients searching Apple Dental or Apple Dental Care find dental consultations in Hyderabad, Vijayawada, and Bangalore for implants, root canals, braces, aligners, kids dentistry, gum care, crowns, dentures, and emergency care.',
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
    title: 'Dental Clinics in Andhra Pradesh | Apple International Dental',
    description:
      'Apple international dental helps patients searching Apple Dental or Apple Dental Care across Andhra Pradesh, Hyderabad, Vijayawada, and Bangalore with root canals, implants, braces, aligners, kids dentistry, gum care, crowns, dentures, and emergency consultations.',
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

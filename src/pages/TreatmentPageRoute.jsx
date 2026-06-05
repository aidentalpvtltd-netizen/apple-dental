import { treatmentPages } from '../config/siteContent.js'
import { TreatmentPage } from './TreatmentPage.jsx'

export function TreatmentPageRoute({ path }) {
  const page = treatmentPages[path]

  return page ? <TreatmentPage page={page} /> : null
}

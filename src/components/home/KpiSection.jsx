import {
  kpis,
} from '../../config/siteContent.js'

export function KpiSection() {
  return (
    <section className="kpi-section reveal-section" aria-label="Clinic performance highlights">
      {kpis.map((item) => (
        <article className="kpi-card" key={item.label}>
          <strong>{item.value}</strong>
          <p>{item.label}</p>
        </article>
      ))}
    </section>
  )
}

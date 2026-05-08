import {
  faqs,
} from '../../config/siteContent.js'

export function FaqSection() {
  return (
    <section className="faq-section reveal-section" id="faq">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Questions patients ask</p>
          <h2>Helpful answers before your visit</h2>
        </div>
        <p className="section-text">
          Clear answers around comfort, costs, timing, kids visits, orthodontic choices, and root
          canal treatment.
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
  )
}

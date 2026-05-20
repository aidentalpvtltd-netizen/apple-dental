import {
  faqs,
} from '../../config/siteContent.js'

export function FaqSection({
  items = faqs,
  eyebrow = 'Questions patients ask',
  title = 'Helpful answers before your visit',
  text = 'Clear answers around comfort, costs, timing, kids visits, orthodontic choices, and root canal treatment.',
}) {
  return (
    <section className="faq-section reveal-section" id="faq">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <p className="section-text">{text}</p>
      </div>

      <div className="faq-list">
        {items.map((faq) => (
          <details className="faq-item" key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

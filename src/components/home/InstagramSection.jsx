import { instagramProfileUrl } from '../../config/siteContent.js'

export function InstagramSection({ displayedInstagramPosts }) {
  return (
    <section className="instagram-section reveal-section" id="instagram">
      <div className="instagram-heading">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Instagram feed</p>
            <h2>@appleinternational_dental</h2>
          </div>
          <p className="section-text">
            Follow clinic updates, treatment moments, patient education, and smile care posts from
            Apple International Dental.
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
            key={`${post.permalink ?? post.caption}-${post.image}`}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="instagram-image"
              style={{ backgroundImage: `url(${post.image})` }}
              aria-label={post.caption || 'Instagram post'}
            />
            {post.caption ? (
              <div className="instagram-copy">
                <p>{post.caption}</p>
              </div>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  )
}

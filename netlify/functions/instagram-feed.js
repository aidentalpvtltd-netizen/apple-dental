/* global process */

const jsonResponse = (statusCode, body, extraHeaders = {}) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    ...extraHeaders,
  },
  body: JSON.stringify(body),
})

const getPostImage = (post) => {
  if (post.media_type === 'VIDEO') {
    return post.thumbnail_url || post.media_url
  }

  return post.media_url
}

const getPostTitle = (post) => {
  if (post.media_type === 'VIDEO') {
    return 'Latest reel'
  }

  return 'Latest post'
}

export const handler = async () => {
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!accountId || !accessToken) {
    return jsonResponse(500, { error: 'Instagram feed is not configured.' })
  }

  const params = new URLSearchParams({
    fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
    limit: '4',
    access_token: accessToken,
  })
  const feedUrl = `https://graph.instagram.com/v21.0/${accountId}/media?${params.toString()}`

  try {
    const response = await fetch(feedUrl)
    const payload = await response.json()

    if (!response.ok) {
      return jsonResponse(response.status, {
        error: payload.error?.message ?? 'Instagram feed unavailable.',
      })
    }

    const posts = (payload.data ?? [])
      .map((post) => ({
        id: post.id,
        image: getPostImage(post),
        title: getPostTitle(post),
        caption: post.caption ?? '',
        permalink: post.permalink,
        mediaType: post.media_type,
        timestamp: post.timestamp,
      }))
      .filter((post) => post.image && post.permalink)

    return jsonResponse(200, posts, {
      'Cache-Control': 'public, max-age=900, s-maxage=1800',
    })
  } catch {
    return jsonResponse(500, { error: 'Instagram feed unavailable.' })
  }
}

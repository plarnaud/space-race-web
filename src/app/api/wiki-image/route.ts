import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get('title')
  if (!title) return NextResponse.json({ error: 'Missing title' }, { status: 400 })

  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      {
        headers: {
          'User-Agent': 'SpaceRaceWeb/1.0 (https://github.com/space-race-web; contact@example.com)',
          'Accept': 'application/json',
        },
        next: { revalidate: 86400 }, // cache for 24h
      }
    )

    if (!res.ok) return NextResponse.json({ src: null })

    const data = await res.json()
    const src = data.thumbnail?.source || data.originalimage?.source || null
    return NextResponse.json({ src })
  } catch {
    return NextResponse.json({ src: null })
  }
}

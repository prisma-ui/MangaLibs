// File: app/api/image/[...path]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const MANGA_IMG_URL = process.env.MANGA_IMG_URL;

  // BUG FIX: Validasi env var — tanpa ini akan crash dengan URL invalid jika tidak di-set
  if (!MANGA_IMG_URL) {
    return NextResponse.json(
      { error: 'MANGA_IMG_URL environment variable is not configured' },
      { status: 500 }
    );
  }

  const fullPath = Array.isArray(path) ? path.join('/') : path;
  const { searchParams } = new URL(request.url);
  const url = new URL(`${MANGA_IMG_URL}/${fullPath}`);
  searchParams.forEach((value, key) => url.searchParams.append(key, value));

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      return NextResponse.json(
        { error: `Error fetching image: ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type');
    const imageData = await response.arrayBuffer();

    return new NextResponse(imageData, {
      status: 200,
      headers: {
        'Content-Type': contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

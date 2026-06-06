// File: app/api/manga/[...path]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const MANGA_API_URL = process.env.MANGA_API_URL;

  // BUG FIX: Validasi env var — tanpa ini akan crash dengan URL invalid jika tidak di-set
  if (!MANGA_API_URL) {
    return NextResponse.json(
      { error: 'MANGA_API_URL environment variable is not configured' },
      { status: 500 }
    );
  }

  const fullPath = Array.isArray(path) ? path.join('/') : path;
  const { searchParams } = new URL(request.url);
  const url = new URL(`${MANGA_API_URL}/${fullPath}`);
  searchParams.forEach((value, key) => url.searchParams.append(key, value));

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error from manga API: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from manga API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from manga API' },
      { status: 500 }
    );
  }
}

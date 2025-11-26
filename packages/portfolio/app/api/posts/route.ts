import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/content';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const posts = await getPosts(limit ? parseInt(limit) : undefined);
  return NextResponse.json(posts);
}


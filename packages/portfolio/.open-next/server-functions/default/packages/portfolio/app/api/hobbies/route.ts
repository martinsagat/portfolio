import { NextResponse } from 'next/server';
import { getHobbies } from '@/lib/content';

export async function GET() {
  try {
    const hobbies = await getHobbies();
    return NextResponse.json(hobbies);
  } catch (error) {
    console.error('Error fetching hobbies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hobbies', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}



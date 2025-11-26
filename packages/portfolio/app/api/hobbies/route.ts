import { NextResponse } from 'next/server';
import { getHobbies } from '@/lib/content';

export async function GET() {
  const hobbies = await getHobbies();
  return NextResponse.json(hobbies);
}



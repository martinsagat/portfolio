import { NextResponse } from 'next/server';
import { getJobs } from '@/lib/content';

export async function GET() {
  const jobs = await getJobs();
  return NextResponse.json(jobs);
}



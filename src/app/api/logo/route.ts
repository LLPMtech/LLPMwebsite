import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  const data = fs.readFileSync(logoPath);
  const base64 = `data:image/png;base64,${data.toString('base64')}`;
  return NextResponse.json({ logo: base64 });
}

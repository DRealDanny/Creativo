import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), '..', 'frontend', 'public', 'data', 'showreel.json');

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return NextResponse.json({ url: '' });
    }
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Failed to read showreel.json:', error);
    return NextResponse.json({ url: '' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    // Ensure directory exists
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({ url }, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save showreel.json:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

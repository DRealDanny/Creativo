import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), '..', 'frontend', 'public', 'data', 'skills.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading skills data:', error);
    return NextResponse.json(
      { error: 'Failed to read skills data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();

    let currentData = {};
    try {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      currentData = JSON.parse(fileContents);
    } catch (e) {
      // Ignore read errors if file doesn't exist, we will create it
    }

    const mergedData = { ...currentData, ...newData };

    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(mergedData, null, 2), 'utf8');

    return NextResponse.json({ success: true, data: mergedData });
  } catch (error) {
    console.error('Error writing skills data:', error);
    return NextResponse.json(
      { error: 'Failed to update skills data' },
      { status: 500 }
    );
  }
}

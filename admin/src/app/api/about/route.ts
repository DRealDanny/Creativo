import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), '..', 'frontend', 'public', 'data', 'about.json');
const imagesDirPath = path.join(process.cwd(), '..', 'frontend', 'public', 'images');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading about data:', error);
    // Return empty state if doesn't exist
    return NextResponse.json(
      { identity: {}, story: {} },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentData: any = { identity: {}, story: {} };
    try {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      currentData = JSON.parse(fileContents);
    } catch {
      // Ignore read errors if file doesn't exist
    }

    // Process identity section
    const identityString = formData.get('identity');
    if (identityString && typeof identityString === 'string') {
      const identityData = JSON.parse(identityString);
      currentData.identity = { ...currentData.identity, ...identityData };
    }

    // Process story section
    const storyString = formData.get('story');
    if (storyString && typeof storyString === 'string') {
      const storyData = JSON.parse(storyString);
      currentData.story = { ...currentData.story, ...storyData };
    }

    // Process image file
    const imageFile = formData.get('imageFile') as File | null;
    if (imageFile) {
      if (!fs.existsSync(imagesDirPath)) {
        fs.mkdirSync(imagesDirPath, { recursive: true });
      }

      const ext = path.extname(imageFile.name) || '.jpg';
      const fileName = `profile-${Date.now()}${ext}`;
      const filePath = path.join(imagesDirPath, fileName);

      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);

      currentData.identity.image = `/images/${fileName}`;
    }

    // Ensure data dir exists
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2), 'utf8');

    return NextResponse.json({ success: true, data: currentData });
  } catch (error) {
    console.error('Error writing about data:', error);
    return NextResponse.json(
      { error: 'Failed to update about data' },
      { status: 500 }
    );
  }
}
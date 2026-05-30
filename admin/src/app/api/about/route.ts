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
      {
        identityCard: {
          image: "",
          cardRole: "BRAND STRUCTURALIST & VIDEO EDITOR",
          cardName: "Creativo"
        },
        coreStory: {
          storyHeadline: "I don't just design things. I build the visual logic...",
          bioHtml: "<p>Welcome to my world.</p>",
          cvLink: "#"
        }
      },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentData: any = { identityCard: {}, coreStory: {} };
    try {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      currentData = JSON.parse(fileContents);
    } catch {
      // Ignore read errors if file doesn't exist
    }

    // Process identity section
    const identityString = formData.get('identityCard');
    if (identityString && typeof identityString === 'string') {
      try {
        const identityData = JSON.parse(identityString);
        currentData.identityCard = { ...currentData.identityCard, ...identityData };
      } catch (err) {
        console.error('Error parsing identityCard JSON:', err);
      }
    }

    // Process story section
    const storyString = formData.get('coreStory');
    if (storyString && typeof storyString === 'string') {
      try {
        const storyData = JSON.parse(storyString);
        currentData.coreStory = { ...currentData.coreStory, ...storyData };
      } catch (err) {
        console.error('Error parsing coreStory JSON:', err);
      }
    }

    const isFile = (value: unknown): value is File => {
      return typeof value === 'object' && value !== null && 'size' in value && 'name' in value;
    };

    // Process image file
    const imageFile = formData.get('imageFile');
    if (isFile(imageFile)) {
      try {
        if (!fs.existsSync(imagesDirPath)) {
          fs.mkdirSync(imagesDirPath, { recursive: true });
        }

        const ext = path.extname(imageFile.name) || '.jpg';
        const fileName = `profile-${Date.now()}${ext}`;
        const filePath = path.join(imagesDirPath, fileName);

        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(filePath, buffer);

        currentData.identityCard.image = `/images/${fileName}`;
      } catch (err) {
        console.error('Error processing image upload:', err);
      }
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
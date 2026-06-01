import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '..', 'frontend', 'public', 'data');

async function readJsonFile(filename: string) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

async function writeJsonFile(filename: string, data: any) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

export async function GET() {
  try {
    const [branding, webDev, video] = await Promise.all([
      readJsonFile('branding.json'),
      readJsonFile('web-development.json'),
      readJsonFile('video-editing.json'),
    ]);

    const combined = [
      ...(Array.isArray(branding) ? branding : []).map((item: any) => ({
        ...item,
        category: 'Branding',
        categoryFile: 'branding.json'
      })),
      ...(Array.isArray(webDev) ? webDev : []).map((item: any) => ({
        ...item,
        category: 'Web Development',
        categoryFile: 'web-development.json'
      })),
      ...(Array.isArray(video) ? video : []).map((item: any) => ({
        ...item,
        category: 'Video Editing',
        categoryFile: 'video-editing.json'
      })),
    ];

    return NextResponse.json(combined);
  } catch (error) {
    console.error("GET /api/work error:", error);
    return NextResponse.json({ error: "Failed to fetch work items" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, isFeaturedOnHome, categoryFile } = await request.json();

    if (!id || !categoryFile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const items = await readJsonFile(categoryFile);

    const updatedItems = items.map((item: any) => {
      if (item.id === id) {
        return { ...item, isFeaturedOnHome };
      }
      return item;
    });

    await writeJsonFile(categoryFile, updatedItems);

    return NextResponse.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error("PATCH /api/work error:", error);
    return NextResponse.json({ error: "Failed to update work item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, categoryFile } = await request.json();

    if (!id || !categoryFile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const items = await readJsonFile(categoryFile);

    const updatedItems = items.filter((item: any) => item.id !== id);

    await writeJsonFile(categoryFile, updatedItems);

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/work error:", error);
    return NextResponse.json({ error: "Failed to delete work item" }, { status: 500 });
  }
}

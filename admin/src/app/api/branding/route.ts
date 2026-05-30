import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), '..', 'frontend', 'public', 'data', 'branding.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading branding data:', error);
    return NextResponse.json(
      [
        {
          "id": "brand-project-1",
          "projectCategory": "Branding",
          "isFeaturedOnHome": false,
          "gridPreview": {
            "gridImage": "",
            "gridTitle": "",
            "gridNarrative": ""
          },
          "caseStudyHero": {
            "heroBgImage": "",
            "heroTitle": "",
            "heroSector": "",
            "heroDeliverables": "",
            "heroHookRichText": ""
          },
          "dynamicBlocks": [
            {
              "blockId": "block-1",
              "blockHeading": "",
              "blockSubHeading": "",
              "blockImage": "",
              "blockVimeoLink": ""
            }
          ]
        }
      ],
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(body, null, 2), 'utf8');

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error('Error writing branding data:', error);
    return NextResponse.json(
      { error: 'Failed to update branding data' },
      { status: 500 }
    );
  }
}

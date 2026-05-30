import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), '..', 'frontend', 'public', 'data', 'branding.json');
const imagesDirPath = path.join(process.cwd(), '..', 'frontend', 'public', 'images');

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
            "heroDeliverablesLink": "",
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
    const formData = await request.formData();

    const projectDataString = formData.get('projectData');
    if (!projectDataString || typeof projectDataString !== 'string') {
        return NextResponse.json(
            { error: 'Invalid project data' },
            { status: 400 }
        );
    }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let projectData: any = JSON.parse(projectDataString);

    if (projectData.length > 0 && projectData[0].gridPreview && projectData[0].gridPreview.gridTitle) {
        projectData[0].slug = projectData[0].gridPreview.gridTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    } else if (projectData.length > 0 && !projectData[0].slug) {
        projectData[0].slug = 'branding-project';
    }


    if (!fs.existsSync(imagesDirPath)) {
        fs.mkdirSync(imagesDirPath, { recursive: true });
    }

    const saveFile = async (file: File, prefix: string): Promise<string> => {
        const ext = path.extname(file.name) || '.jpg';
        const fileName = `${prefix}-${Date.now()}${ext}`;
        const filePath = path.join(imagesDirPath, fileName);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(filePath, buffer);

        return `/images/${fileName}`;
    }

    const gridImageFile = formData.get('gridImageFile') as File | null;
    if (gridImageFile) {
        const url = await saveFile(gridImageFile, 'grid-branding');
        if (projectData.length > 0) {
            projectData[0].gridPreview.gridImage = url;
        }
    }

    const heroImageFile = formData.get('heroImageFile') as File | null;
    if (heroImageFile) {
        const url = await saveFile(heroImageFile, 'hero-branding');
        if (projectData.length > 0) {
            projectData[0].caseStudyHero.heroBgImage = url;
        }
    }

    if (projectData.length > 0 && projectData[0].dynamicBlocks) {
        for (let i = 0; i < projectData[0].dynamicBlocks.length; i++) {
            const blockImageFile = formData.get(`blockImageFile_${i}`) as File | null;
            if (blockImageFile) {
                const url = await saveFile(blockImageFile, `block-branding-${i}`);
                projectData[0].dynamicBlocks[i].blockImage = url;
            }
        }
    }

    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(projectData, null, 2), 'utf8');

    return NextResponse.json({ success: true, data: projectData });
  } catch (error) {
    console.error('Error writing branding data:', error);
    return NextResponse.json(
      { error: 'Failed to update branding data' },
      { status: 500 }
    );
  }
}

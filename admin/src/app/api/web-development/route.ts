import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), '..', 'frontend', 'public', 'data', 'web-development.json');
const imagesDirPath = path.join(process.cwd(), '..', 'frontend', 'public', 'images');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading web-development data:', error);
    return NextResponse.json(
      [
        {
          "id": "web-project-1",
          "projectCategory": "Web Development",
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
            "heroWhatWeDid": "",
            "heroWebsiteLink": "",
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
    let incomingData: any = JSON.parse(projectDataString);

    let existingData: any = [];
    try {
        if (fs.existsSync(dataFilePath)) {
            const fileContents = fs.readFileSync(dataFilePath, 'utf8');
            existingData = JSON.parse(fileContents);
        }
    } catch (e) {
        // ignore read errors
    }

    const updateSection = formData.get('updateSection') as string | null;

    let projectData: any = incomingData;

    if (updateSection && existingData.length > 0 && incomingData.length > 0) {
        // Partial merge
        projectData = [...existingData];
        if (updateSection === 'gridPreview') {
            projectData[0].gridPreview = incomingData[0].gridPreview;
        } else if (updateSection === 'caseStudyHero') {
            projectData[0].caseStudyHero = incomingData[0].caseStudyHero;
        } else if (updateSection === 'dynamicBlocks') {
            projectData[0].dynamicBlocks = incomingData[0].dynamicBlocks;
        }
    }

    if (projectData.length > 0 && projectData[0].gridPreview && projectData[0].gridPreview.gridTitle) {
        projectData[0].slug = projectData[0].gridPreview.gridTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    } else if (projectData.length > 0 && !projectData[0].slug) {
        projectData[0].slug = 'web-development-project';
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

    const isFile = (value: unknown): value is File => {
        return typeof value === 'object' && value !== null && 'size' in value && 'name' in value;
    };

    if (!updateSection || updateSection === 'gridPreview') {
        const gridImageFile = formData.get('gridImageFile');
        if (isFile(gridImageFile)) {
            const url = await saveFile(gridImageFile, 'grid-web-dev');
            if (projectData.length > 0) {
                projectData[0].gridPreview.gridImage = url;
            }
        }
    }

    if (!updateSection || updateSection === 'caseStudyHero') {
        const heroImageFile = formData.get('heroImageFile');
        if (isFile(heroImageFile)) {
            const url = await saveFile(heroImageFile, 'hero-web-dev');
            if (projectData.length > 0) {
                projectData[0].caseStudyHero.heroBgImage = url;
            }
        }
    }

    if (!updateSection || updateSection === 'dynamicBlocks') {
        if (projectData.length > 0 && projectData[0].dynamicBlocks) {
            for (let i = 0; i < projectData[0].dynamicBlocks.length; i++) {
                const blockImageFile = formData.get(`blockImageFile_${i}`);
                if (isFile(blockImageFile)) {
                    const url = await saveFile(blockImageFile, `block-web-dev-${i}`);
                    projectData[0].dynamicBlocks[i].blockImage = url;
                }
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
    console.error('Error writing web-development data:', error);
    return NextResponse.json(
      { error: 'Failed to update web-development data' },
      { status: 500 }
    );
  }
}

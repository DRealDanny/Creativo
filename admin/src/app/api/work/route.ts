import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getFilePath = (category: string) => {
    let filename = '';
    if (category === 'Branding') filename = 'branding.json';
    else if (category === 'Web Development') filename = 'web-development.json';
    else if (category === 'Video Editing') filename = 'video-editing.json';
    else return null;

    return path.join(process.cwd(), '..', 'frontend', 'public', 'data', filename);
};

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, category, isFeaturedOnHome } = body;

        if (!id || !category || typeof isFeaturedOnHome !== 'boolean') {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const dataFilePath = getFilePath(category);
        if (!dataFilePath) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }

        if (fs.existsSync(dataFilePath)) {
            const fileContents = fs.readFileSync(dataFilePath, 'utf8');
            let data = JSON.parse(fileContents);

            const index = data.findIndex((item: any) => item.id === id);
            if (index !== -1) {
                data[index].isFeaturedOnHome = isFeaturedOnHome;
                fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
                return NextResponse.json({ success: true, data: data[index] });
            } else {
                 return NextResponse.json({ error: 'Project not found' }, { status: 404 });
            }
        } else {
             return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating feature status:', error);
        return NextResponse.json({ error: 'Failed to update feature status' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const category = url.searchParams.get('category');

        if (!id || !category) {
            return NextResponse.json({ error: 'Missing id or category' }, { status: 400 });
        }

        const dataFilePath = getFilePath(category);
        if (!dataFilePath) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }

        if (fs.existsSync(dataFilePath)) {
            const fileContents = fs.readFileSync(dataFilePath, 'utf8');
            let data = JSON.parse(fileContents);

            const filteredData = data.filter((item: any) => item.id !== id);

            fs.writeFileSync(dataFilePath, JSON.stringify(filteredData, null, 2), 'utf8');
            return NextResponse.json({ success: true });
        } else {
             return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
        }

    } catch (error) {
         console.error('Error deleting project:', error);
         return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}

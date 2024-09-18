// app/api/questions/route.ts

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const filePath = path.join(process.cwd(), 'data', 'questions.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const formData = JSON.parse(jsonData);

    return NextResponse.json(formData);
}

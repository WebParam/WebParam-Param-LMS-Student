import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'calendar', 'calendarEvents.json');
    console.log('Attempting to read file from:', filePath);
    
    if (!fs.existsSync(filePath)) {
      console.error('File does not exist:', filePath);
      return NextResponse.json({ error: 'Calendar events file not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    console.log('File contents:', fileContents);

    const data = JSON.parse(fileContents);
    console.log('Parsed data:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading calendar events:', error);
    return NextResponse.json({ error: 'Failed to read calendar events' }, { status: 500 });
  }
}
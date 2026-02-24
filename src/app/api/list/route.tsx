import { NextRequest, NextResponse } from "next/server";
import {promises as fs} from "fs";


const PATH = process.cwd() + "/src/app/wordlist.txt";


const file = await fs.readFile(PATH, "utf-8");
const fileData = file.split("\n").map((line) => line.trim());

const MAX_RESULTS = 10;

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get("searchQuery") || '';
  if(searchQuery === '') {
    return NextResponse.json({
      data: [],
    }, {
      headers: {
        'Cache-Control': 'max-age=10800',
      }
    });
  }
  try{  
    const data = [];
    for (let suggestion of fileData) {
      if(suggestion.startsWith(searchQuery.trim())) {
        data.push(suggestion);
        if(data.length >= MAX_RESULTS) {
          break;
        }
      }
    }
    return NextResponse.json({
      data,
    },{
      headers: {
        'Cache-Control': 'max-age=10800',
      }
    });
  } catch(e: unknown ) {
  e as Error;
  return NextResponse.json(
    {message: 'file not found'}, {status: 500}
  );
  }
}
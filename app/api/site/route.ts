import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET(req: Request) {
  const siteId = 'site1'
  const filePath = path.join(process.cwd(), 'sites', `${siteId}.json`)

  if (!fs.existsSync(filePath)) {
    return new NextResponse(null, { status: 404 })
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents)

  return new NextResponse(JSON.stringify(data))
}

export async function POST(req: NextRequest) {
  const { siteId, jsonData } = await req.json()

  try {
    const filePath = path.join(process.cwd(), 'sites', `${siteId}.json`)
    fs.writeFileSync(filePath, JSON.stringify(jsonData))

    return new NextResponse(JSON.stringify({ status: 'success' }))
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({ status: 'error', error: error.message }),
        { status: 500 }
      )
    }

    return new NextResponse(
      JSON.stringify({ status: 'error', error: 'An unknown error occurred.' }),
      { status: 500 }
    )
  }
}

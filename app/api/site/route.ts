// Import the necessary modules
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET(req: Request) {
  const siteId = 'site1'
  const filePath = path.join(process.cwd(), 'sites', `${siteId}.json`)

  if (!fs.existsSync(filePath)) {
    return NextResponse.error({ status: 404 })
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents)

  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const { siteId, jsonData } = await req.json()

  try {
    const filePath = path.join(process.cwd(), 'sites', `${siteId}.json`)
    fs.writeFileSync(filePath, JSON.stringify(jsonData))

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    return NextResponse.json({ status: 'error', error: error.message }, 500)
  }
}

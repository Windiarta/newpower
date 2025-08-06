import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type,
    })

    return NextResponse.json({ 
      assetId: asset._id,
      url: asset.url 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
} 
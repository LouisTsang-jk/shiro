#!/usr/bin/env bun

import 'dotenv/config'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import mime from 'mime-types'
import fs from 'fs'
import path from 'path'
import { Glob } from 'bun'

function getR2Client(): S3Client {
  const { R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env
  if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error('R2_ENDPOINT, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY must be set')
  }

  return new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY
    }
  })
}

function parseArgs() {
  const args = process.argv.slice(2)
  const parsed: Record<string, string> = {}

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--') && i + 1 < args.length) {
      const key = args[i].slice(2)
      parsed[key] = args[i + 1]
      i++
    }
  }

  return parsed
}

function printUsage() {
  console.log(`
Usage: bun scripts/upload-to-r2.ts --file "path" --folder "r2/folder" [options]

Options:
  --file      (required) File path, glob pattern, or directory
  --folder    (required) R2 target folder (e.g. "images/essays")
  --filename  Custom filename (single file only)

Env:
  R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY  (required)
  R2_PUBLIC_BUCKET_NAME                                (required)
  NEXT_PUBLIC_R2_PUBLIC_URL                            (required, public base URL)

Examples:
  bun scripts/upload-to-r2.ts --file "uploads/hero.webp" --folder "images/essays"
  bun scripts/upload-to-r2.ts --file "uploads/*.webp" --folder "images/notes"
  bun scripts/upload-to-r2.ts --file "uploads/img.webp" --folder "images" --filename "custom-name.webp"
`)
}

async function resolveFiles(fileArg: string): Promise<string[]> {
  if (fileArg.includes('*') || fileArg.includes('?')) {
    const glob = new Glob(fileArg)
    const files: string[] = []
    for await (const file of glob.scan({ cwd: process.cwd(), absolute: true })) {
      files.push(file)
    }
    return files.sort()
  }

  const resolved = path.resolve(fileArg)
  if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
    return fs
      .readdirSync(resolved)
      .map((f) => path.join(resolved, f))
      .filter((f) => fs.statSync(f).isFile())
      .sort()
  }

  if (!fs.existsSync(resolved)) {
    throw new Error(`File not found: ${resolved}`)
  }
  return [resolved]
}

async function uploadFile(
  client: S3Client,
  filePath: string,
  folder: string,
  customFilename?: string
): Promise<string> {
  const bucket = process.env.R2_PUBLIC_BUCKET_NAME
  const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL

  if (!bucket) {
    throw new Error('R2_PUBLIC_BUCKET_NAME must be set')
  }
  if (!publicUrl) {
    throw new Error('NEXT_PUBLIC_R2_PUBLIC_URL must be set')
  }

  const filename = customFilename || path.basename(filePath)
  const key = `${folder}/${filename}`
  const contentType = mime.lookup(filePath) || 'application/octet-stream'
  const body = fs.readFileSync(filePath)

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType
    })
  )

  return `${publicUrl}/${key}`
}

async function main() {
  const args = parseArgs()

  if (!args.file || !args.folder) {
    printUsage()
    process.exit(1)
  }

  const { file, folder, filename } = args
  const files = await resolveFiles(file)

  if (files.length === 0) {
    console.error('No files found matching:', file)
    process.exit(1)
  }

  if (filename && files.length > 1) {
    console.error('--filename can only be used with a single file')
    process.exit(1)
  }

  const client = getR2Client()
  console.log(`\nUploading ${files.length} file(s) to ${folder}/\n`)

  for (const filePath of files) {
    const customName = files.length === 1 ? filename : undefined
    const url = await uploadFile(client, filePath, folder, customName)
    console.log(`  ${path.basename(filePath)} -> ${url}`)
  }

  console.log(`\nDone! ${files.length} file(s) uploaded.`)
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})

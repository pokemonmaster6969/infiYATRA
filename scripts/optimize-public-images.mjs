import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const projectRoot = process.cwd()
const publicAssetsPath = path.join(projectRoot, 'public', 'assets')
const outputPath = path.join(publicAssetsPath, 'optimized')
const manifestPath = path.join(projectRoot, 'src', 'lib', 'responsiveImageAssets.ts')
const targetWidths = [480, 960, 1600]
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png'])

const getImages = async directory => {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async entry => {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      return entry.name === 'optimized' ? [] : getImages(entryPath)
    }
    return supportedExtensions.has(path.extname(entry.name).toLowerCase()) ? [entryPath] : []
  }))

  return files.flat()
}

const imageFiles = await getImages(publicAssetsPath)
const manifest = {}
let sourceBytes = 0
let outputBytes = 0

await fs.rm(outputPath, { recursive: true, force: true })
await fs.mkdir(outputPath, { recursive: true })

for (const filePath of imageFiles) {
  const relativePath = path.relative(publicAssetsPath, filePath)
  const source = `/assets/${relativePath.split(path.sep).join('/')}`
  const key = path.parse(relativePath).name.replace(/[^a-z0-9_-]/gi, '-')
  const metadata = await sharp(filePath).metadata()
  if (!metadata.width || !metadata.height) continue

  const rotated = metadata.orientation && metadata.orientation >= 5 && metadata.orientation <= 8
  const width = rotated ? metadata.height : metadata.width
  const height = rotated ? metadata.width : metadata.height
  const variants = {}
  const stats = await fs.stat(filePath)
  sourceBytes += stats.size
  const sourceHash = createHash('sha256')
    .update(await fs.readFile(filePath))
    .digest('hex')
    .slice(0, 10)
  const widths = [...new Set([
    ...targetWidths.filter(targetWidth => targetWidth < width),
    Math.min(width, Math.max(...targetWidths)),
  ])].sort((left, right) => left - right)

  for (const targetWidth of widths) {
    const outputFileName = `${key}-${sourceHash}-${targetWidth}.webp`
    const outputFilePath = path.join(outputPath, outputFileName)

    await sharp(filePath)
      .rotate()
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(outputFilePath)

    const variantStats = await fs.stat(outputFilePath)
    outputBytes += variantStats.size
    variants[targetWidth] = `/assets/optimized/${outputFileName}`
  }

  manifest[source] = { width, height, variants }
}

const entries = Object.entries(manifest)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([source, details]) => `  ${JSON.stringify(source)}: ${JSON.stringify(details)},`)
  .join('\n')

const manifestContents = `export interface ResponsiveImageAsset {
  width: number
  height: number
  variants: Record<number, string>
}

export const responsiveImageAssets: Record<string, ResponsiveImageAsset> = {
${entries}
}
`

await fs.writeFile(manifestPath, manifestContents)

console.log(`Optimized ${Object.keys(manifest).length} images.`)
console.log(`Source photos: ${(sourceBytes / 1024 / 1024).toFixed(2)} MB`)
console.log(`Responsive WebP variants: ${(outputBytes / 1024 / 1024).toFixed(2)} MB`)
console.log(`Manifest: ${path.relative(projectRoot, manifestPath)}`)
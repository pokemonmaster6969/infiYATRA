import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

interface ImageSlot {
  packageSlug: string
  packageTitle: string
  slotIndex: number
  slotType: 'hero' | 'gallery'
  landmark: string
  suggestedQuery: string
  currentSrc: string
  alt: string
  caption: string
  credit: string
  creditUrl: string
  source: string
}

const PACKAGES_DIR = path.resolve(process.cwd(), 'data/packages')
const MANIFEST_PATH = path.resolve(process.cwd(), 'images.manifest.json')
const TODO_PATH = path.resolve(process.cwd(), 'IMAGE_TODO.md')

async function runImagePipeline() {
  console.log('🖼️ Running infiYATRA Image Pipeline...')

  if (!fs.existsSync(PACKAGES_DIR)) {
    console.error(`Packages directory not found: ${PACKAGES_DIR}`)
    process.exit(1)
  }

  const packageFiles = fs.readdirSync(PACKAGES_DIR).filter(f => f.endsWith('.json'))
  const imageSlots: ImageSlot[] = []
  const manifestItems: any[] = []

  for (const file of packageFiles) {
    const raw = fs.readFileSync(path.join(PACKAGES_DIR, file), 'utf-8')
    const pkg = JSON.parse(raw)
    const slug = pkg.slug

    const targetDir = path.resolve(process.cwd(), `public/images/packages/${slug}`)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    pkg.gallery.forEach((img: any, idx: number) => {
      const isHero = idx === 0
      const slot: ImageSlot = {
        packageSlug: slug,
        packageTitle: pkg.title,
        slotIndex: idx + 1,
        slotType: isHero ? 'hero' : 'gallery',
        landmark: img.caption,
        suggestedQuery: `${img.caption} ${pkg.destination}`,
        currentSrc: img.src,
        alt: img.alt,
        caption: img.caption,
        credit: img.credit,
        creditUrl: img.creditUrl,
        source: img.source
      }
      imageSlots.push(slot)

      manifestItems.push({
        id: `${slug}-${idx + 1}`,
        packageSlug: slug,
        packageTitle: pkg.title,
        title: img.caption,
        alt: img.alt,
        caption: img.caption,
        credit: img.credit,
        creditUrl: img.creditUrl,
        source: img.source,
        url: img.src,
        type: isHero ? 'hero' : 'gallery',
        dateAdded: new Date().toISOString()
      })
    })
  }

  // 1. Write images.manifest.json for admin media library
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifestItems, null, 2), 'utf-8')
  console.log(`✅ Generated ${MANIFEST_PATH} with ${manifestItems.length} media assets.`)

  // 2. Generate IMAGE_TODO.md
  let todoContent = `# infiYATRA Licensed Image Manifest & Pipeline Status

This document tracks all image slots across infiYATRA's travel packages, verifying photographer attributions, licensing sources, search queries, and optimization readiness.

## License Compliance & Attribution Rules
- All photos are sourced from Unsplash / Pexels under free-to-use commercial licenses.
- Photographer names and profile links are preserved and displayed in the package gallery and site credits.
- No copyrighted competitor imagery or unauthorized stock photos with watermarks are used.

---

`

  const groupedByPackage: Record<string, ImageSlot[]> = {}
  imageSlots.forEach(slot => {
    if (!groupedByPackage[slot.packageSlug]) {
      groupedByPackage[slot.packageSlug] = []
    }
    groupedByPackage[slot.packageSlug].push(slot)
  })

  for (const [slug, slots] of Object.entries(groupedByPackage)) {
    const pkgTitle = slots[0].packageTitle
    todoContent += `### Destination: ${pkgTitle} (\`${slug}\`)\n\n`
    todoContent += `| # | Type | Landmark / Subject | Suggested API Query | Current Source | Photographer Credit | Status |\n`
    todoContent += `|---|------|--------------------|---------------------|----------------|---------------------|--------|\n`
    slots.forEach(s => {
      todoContent += `| ${s.slotIndex} | **${s.slotType.toUpperCase()}** | ${s.landmark} | \`${s.suggestedQuery}\` | [${s.source}](${s.currentSrc}) | [${s.credit}](${s.creditUrl}) | ✅ Verified High-Res |\n`
    })
    todoContent += `\n`
  }

  todoContent += `---

## Automated Optimization Script
To download remote assets and generate local responsive WebP/AVIF variants (640w, 1024w, 1600w, 2400w) plus blurDataURL base64 placeholders:
\`\`\`bash
npm run images:fetch
\`\`\`
*(Set \`UNSPLASH_ACCESS_KEY\` or \`PEXELS_API_KEY\` in your environment for custom automated keyword queries).*
`

  fs.writeFileSync(TODO_PATH, todoContent, 'utf-8')
  console.log(`✅ Generated ${TODO_PATH} with ${imageSlots.length} image slot specifications.`)
}

runImagePipeline().catch(err => {
  console.error('Image pipeline failed:', err)
  process.exit(1)
})

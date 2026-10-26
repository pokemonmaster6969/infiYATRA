import fs from 'fs'
import path from 'path'
import { PackageSchema, PackageType } from '../src/lib/packageSchema'
import { Trip } from '../src/lib/trips'

const PACKAGES_DIR = path.resolve(process.cwd(), 'data/packages')
const DB_FILE = path.resolve(process.cwd(), 'db.json')
const TRIPS_TS_FILE = path.resolve(process.cwd(), 'src/lib/trips.ts')
const DATA_SERVICE_FILE = path.resolve(process.cwd(), 'src/lib/dataService.ts')

console.log('🌱 Starting infiYATRA Seed Script...')

// 1. Read & Validate Packages
if (!fs.existsSync(PACKAGES_DIR)) {
  console.error(`Directory not found: ${PACKAGES_DIR}`)
  process.exit(1)
}

const packageFiles = fs.readdirSync(PACKAGES_DIR).filter(f => f.endsWith('.json'))
console.log(`Found ${packageFiles.length} package files in data/packages/`)

const validatedPackages: PackageType[] = []

for (const file of packageFiles) {
  const raw = fs.readFileSync(path.join(PACKAGES_DIR, file), 'utf-8')
  const json = JSON.parse(raw)
  const result = PackageSchema.safeParse(json)
  if (!result.success) {
    console.error(`❌ Validation failed for ${file}:`)
    result.error.issues.forEach(i => console.error(`  - [${i.path.join('.')}] ${i.message}`))
    process.exit(1)
  }
  validatedPackages.push(result.data)
  console.log(`✅ Loaded & validated: ${result.data.title} (${result.data.slug})`)
}

// 2. Transform into Trip format
const mappedTrips: Trip[] = validatedPackages.map(pkg => {
  return {
    id: pkg.id,
    title: pkg.title,
    location: `${pkg.destination}, ${pkg.country}`,
    price: pkg.price.from,
    rating: 4.9,
    reviews: 142,
    duration: `${pkg.duration.days} Days / ${pkg.duration.nights} Nights`,
    category: pkg.category.includes('honeymoon') ? 'Honeymoon' : pkg.category.includes('adventure') ? 'Adventure' : pkg.category.includes('beach') ? 'Adventure' : 'Nature',
    type: pkg.country === 'India' ? 'Domestic' : 'International',
    image: pkg.gallery[0]?.src || '/assets/spiti.jpg',
    link: `/trip/${pkg.id}`,
    description: pkg.overview,
    images: pkg.gallery.map(g => g.src),
    groupSize: pkg.groupType,
    nextBatch: pkg.departures[0]?.date || 'Upcoming dates open',
    featured: pkg.featured,
    status: 'Published',
    badge: (pkg.price.offerBadge as any) || 'Popular',
    highlights: pkg.highlights,
    inclusions: pkg.inclusions,
    exclusions: pkg.exclusions,
    departures: pkg.departures.map(d => ({
      date: d.date,
      seatsTotal: d.seatsTotal,
      seatsAvailable: d.seatsLeft,
      priceOverride: d.price,
      status: d.status
    })),
    captain: {
      name: 'Captain Rohan Shah',
      role: 'Lead Expedition Specialist',
      bio: 'Expert in curated itineraries, cultural storytelling, and on-ground logistics.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      rating: 5.0,
      trips: 45
    },
    itinerary: pkg.itinerary.map(it => {
      const mealsList = Object.entries(it.meals)
        .filter(([_, v]) => v)
        .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1))
        .join(', ')

      return {
        day: it.day,
        title: it.title,
        description: it.description,
        activities: it.activities,
        meals: mealsList ? `${mealsList} Included` : 'Self-arranged / At leisure',
        stay: `${it.stay.category}, ${it.stay.city}`
      }
    }),
    faqs: pkg.faqs.map(f => ({ q: f.question, a: f.answer })),
    // Extended fields
    slug: pkg.slug,
    tagline: pkg.tagline,
    destination: pkg.destination,
    region: pkg.region,
    country: pkg.country,
    priceBands: pkg.price.priceBands,
    bestTime: pkg.bestTime,
    difficulty: pkg.difficulty,
    visaInfo: pkg.visaInfo,
    hotels: pkg.hotels,
    transport: pkg.transport,
    thingsToCarry: pkg.thingsToCarry,
    tips: pkg.tips,
    cancellationPolicy: pkg.cancellationPolicy,
    paymentTerms: pkg.paymentTerms,
    galleryDetailed: pkg.gallery,
    seo: pkg.seo
  }
})

// 3. Update db.json
let dbData: any = { trips: [], heroSlides: [], customTrips: [], leads: [], corporateTestimonials: [], corporatePhotos: [], auditLogs: [], mediaAssets: [] }
if (fs.existsSync(DB_FILE)) {
  try {
    dbData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
  } catch (e) {}
}

const existingTrips: Trip[] = dbData.trips || []
const mappedIds = new Set(mappedTrips.map(t => t.id))
const nonOverwrittenTrips = existingTrips.filter(t => !mappedIds.has(t.id))

dbData.trips = [...mappedTrips, ...nonOverwrittenTrips]

// Populate mediaAssets in dbData
const mediaManifestPath = path.resolve(process.cwd(), 'images.manifest.json')
if (fs.existsSync(mediaManifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(mediaManifestPath, 'utf-8'))
    dbData.mediaAssets = manifest
  } catch (e) {}
}

fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), 'utf-8')
console.log(`✅ Updated ${DB_FILE} with ${dbData.trips.length} total packages and ${dbData.mediaAssets?.length || 0} media assets.`)

// 4. Generate src/lib/flagshipPackages.ts
const FLAGSHIP_FILE = path.resolve(process.cwd(), 'src/lib/flagshipPackages.ts')
const flagshipCode = `import type { Trip } from './trips';

export const FLAGSHIP_PACKAGES: Trip[] = ${JSON.stringify(mappedTrips, null, 2)};
`
fs.writeFileSync(FLAGSHIP_FILE, flagshipCode, 'utf-8')
console.log(`✅ Generated ${FLAGSHIP_FILE} with ${mappedTrips.length} publish-ready flagship packages.`)

// 5. Update dataService.ts version bump to 9.0 to bust browser caches
if (fs.existsSync(DATA_SERVICE_FILE)) {
  let code = fs.readFileSync(DATA_SERVICE_FILE, 'utf-8')
  code = code.replace(/CURRENT_VERSION = '[^']+'/, `CURRENT_VERSION = '9.0'`)
  fs.writeFileSync(DATA_SERVICE_FILE, code, 'utf-8')
  console.log(`✅ Bumped client cache version to 9.0 in src/lib/dataService.ts`)
}

console.log('🎉 Seed completed successfully!')

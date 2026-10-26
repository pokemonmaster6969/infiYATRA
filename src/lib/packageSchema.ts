import { z } from 'zod'

const countWords = (str: string): number => {
  return str.trim().split(/\s+/).filter(Boolean).length
}

export const RouteStopSchema = z.object({
  city: z.string().min(1, 'City name is required'),
  nights: z.number().int().min(0, 'Nights must be non-negative')
})

export const PriceBandsSchema = z.object({
  standard: z.string().min(1),
  deluxe: z.string().min(1),
  premium: z.string().min(1)
})

export const PriceSchema = z.object({
  from: z.string().min(1),
  currency: z.literal('INR'),
  per: z.literal('person twin sharing'),
  priceBands: PriceBandsSchema,
  offerBadge: z.string().optional()
})

export const BestTimeSchema = z.object({
  months: z.array(z.string()).min(1),
  notes: z.string().min(5)
})

export const MealsSchema = z.object({
  breakfast: z.boolean(),
  lunch: z.boolean(),
  dinner: z.boolean()
})

export const StaySchema = z.object({
  category: z.string().min(1),
  city: z.string().min(1)
})

export const ItineraryDaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(3),
  location: z.string().min(2),
  description: z.string().refine(
    desc => {
      const words = countWords(desc)
      return words >= 55 && words <= 125
    },
    { message: 'Itinerary day description must be between 60 and 110 words (with allowance 55-125)' }
  ),
  activities: z.array(z.string()).min(1).max(5),
  meals: MealsSchema,
  stay: StaySchema,
  transferInfo: z.string().min(3)
})

export const HotelSchema = z.object({
  city: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  nights: z.number().int().positive()
})

export const TransportSchema = z.object({
  mode: z.string().min(2),
  details: z.string().min(5)
})

export const FaqSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(10)
})

export const DepartureSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  price: z.string().min(1),
  seatsTotal: z.number().int().positive(),
  seatsLeft: z.number().int().min(0),
  status: z.enum(['Open', 'Filling Fast', 'Sold Out'])
})

export const GalleryItemSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(5),
  caption: z.string().min(3),
  credit: z.string().min(2),
  creditUrl: z.string().url(),
  source: z.string().min(2)
})

export const SeoSchema = z.object({
  title: z.string().max(60, 'SEO title must be 60 characters or fewer'),
  description: z.string().max(160, 'SEO description must be 160 characters or fewer')
})

export const PackageSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be kebab-case lowercase'),
  title: z.string().min(5),
  tagline: z.string().min(5),
  destination: z.string().min(2),
  region: z.string().min(2),
  country: z.string().min(2),
  category: z.array(z.string()).min(1),
  duration: z.object({
    nights: z.number().int().positive(),
    days: z.number().int().positive()
  }),
  route: z.array(RouteStopSchema).min(1),
  price: PriceSchema,
  bestTime: BestTimeSchema,
  difficulty: z.string(),
  groupType: z.string(),
  minAge: z.number().int().positive().optional(),
  visaInfo: z.string().min(5),
  overview: z.string().refine(
    desc => {
      const words = countWords(desc)
      return words >= 110 && words <= 175
    },
    { message: 'Overview must be between 120 and 160 words (with allowance 110-175)' }
  ),
  highlights: z.array(z.string()).min(6).max(8),
  itinerary: z.array(ItineraryDaySchema),
  inclusions: z.array(z.string()).min(8).max(14),
  exclusions: z.array(z.string()).min(8).max(12),
  hotels: z.array(HotelSchema).min(1),
  transport: TransportSchema,
  thingsToCarry: z.array(z.string()).min(4),
  tips: z.array(z.string()).min(3),
  cancellationPolicy: z.union([z.array(z.string()), z.string()]),
  paymentTerms: z.string().min(10),
  faqs: z.array(FaqSchema).min(6).max(8),
  departures: z.array(DepartureSchema).min(3),
  gallery: z.array(GalleryItemSchema).min(6),
  seo: SeoSchema,
  status: z.literal('published'),
  featured: z.boolean()
}).superRefine((data, ctx) => {
  // Consistency Check 1: day count must equal itinerary length
  if (data.duration.days !== data.itinerary.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Duration days (${data.duration.days}) must match itinerary length (${data.itinerary.length})`,
      path: ['itinerary']
    })
  }

  // Consistency Check 2: sum of hotel nights must equal duration nights
  const totalHotelNights = data.hotels.reduce((acc, h) => acc + h.nights, 0)
  if (totalHotelNights !== data.duration.nights) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Total hotel nights (${totalHotelNights}) must match duration nights (${data.duration.nights})`,
      path: ['hotels']
    })
  }

  // Consistency Check 3: sum of route nights must equal duration nights
  const totalRouteNights = data.route.reduce((acc, r) => acc + r.nights, 0)
  if (totalRouteNights !== data.duration.nights) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Total route nights (${totalRouteNights}) must match duration nights (${data.duration.nights})`,
      path: ['route']
    })
  }
})

export type PackageType = z.infer<typeof PackageSchema>

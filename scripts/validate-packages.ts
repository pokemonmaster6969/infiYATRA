import fs from 'fs'
import path from 'path'
import { PackageSchema } from '../src/lib/packageSchema'

const packagesDir = path.resolve(process.cwd(), 'data/packages')

if (!fs.existsSync(packagesDir)) {
  console.error(`Directory not found: ${packagesDir}`)
  process.exit(1)
}

const files = fs.readdirSync(packagesDir).filter(f => f.endsWith('.json'))
console.log(`Found ${files.length} package files in ${packagesDir}`)

let hasErrors = false

for (const file of files) {
  const filePath = path.join(packagesDir, file)
  const raw = fs.readFileSync(filePath, 'utf-8')
  try {
    const json = JSON.parse(raw)
    const result = PackageSchema.safeParse(json)
    if (!result.success) {
      hasErrors = true
      console.error(`❌ Validation FAILED for ${file}:`)
      result.error.issues.forEach(issue => {
        console.error(`   - [${issue.path.join('.')}] ${issue.message}`)
      })
    } else {
      console.log(`✅ Validated ${file} successfully (ID: ${json.id}, Slug: ${json.slug})`)
    }
  } catch (err: any) {
    hasErrors = true
    console.error(`❌ JSON parse error in ${file}:`, err.message)
  }
}

if (hasErrors) {
  console.error('\nOne or more packages failed schema validation!')
  process.exit(1)
} else {
  console.log('\n🎉 ALL packages passed strict Zod schema validation!')
}

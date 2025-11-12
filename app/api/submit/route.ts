import { google } from 'googleapis'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// CRITICAL: Force Node.js runtime (googleapis doesn't work on Edge)
export const runtime = 'nodejs'

// Validation schema with sanitization
const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .trim()
    .refine((val) => !val.match(/^[=+\-@]/), {
      message: 'Invalid name format',
    }),
  email: z
    .string()
    .email('Invalid email address')
    .max(100, 'Email is too long')
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .max(500, 'Message is too long')
    .trim()
    .optional()
    .refine((val) => !val || !val.match(/^[=+\-@]/), {
      message: 'Invalid message format',
    }),
  formType: z.enum(['contact', 'partnership']).optional().default('contact'),
})

export async function POST(request: Request) {
  try {
    console.log('📥 Received form submission')
    
    // Parse and validate request body
    const body = await request.json()
    console.log('📝 Form data:', { name: body.name, email: body.email })
    
    const validatedData = formSchema.parse(body)
    console.log('✅ Validation passed')

    // Get environment variables
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    console.log('🔑 Env vars check:', {
      hasClientEmail: !!clientEmail,
      hasPrivateKey: !!privateKey,
      privateKeyLength: privateKey?.length,
      hasSpreadsheetId: !!spreadsheetId,
    })

    // Verify environment variables
    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error('❌ Missing environment variables:', {
        clientEmail: !!clientEmail,
        privateKey: !!privateKey,
        spreadsheetId: !!spreadsheetId,
      })
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Authenticate with Google Sheets
    console.log('🔐 Authenticating with Google...')
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    console.log('✅ Google Sheets client created')

    // Generate timestamp in IST
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })

    // Determine which sheet tab to use based on form type
    const tabName = validatedData.formType === 'partnership' ? 'Partnership' : 'contact'
    console.log(`📊 Attempting to write to Google Sheet tab: ${tabName}`)

    // Append data to Google Sheet
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A:D`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[timestamp, validatedData.name, validatedData.email, validatedData.message || '']],
      },
    })

    console.log('✅ Data successfully added to Google Sheets:', result.data)

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ API Error:', error)

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    // Handle Google API errors
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

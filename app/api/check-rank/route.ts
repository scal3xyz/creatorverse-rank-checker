import { type NextRequest, NextResponse } from "next/server"

const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

function formatDatabaseId(id: string): string {
  return id.replace(/[-\s]/g, "")
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] NOTION_API_KEY exists:", !!NOTION_API_KEY)
    console.log("[v0] NOTION_API_KEY first 20 chars:", NOTION_API_KEY?.substring(0, 20))
    console.log("[v0] NOTION_DATABASE_ID:", NOTION_DATABASE_ID)

    if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
      console.log("[v0] Missing env vars - API_KEY:", !!NOTION_API_KEY, "DB_ID:", !!NOTION_DATABASE_ID)
      return NextResponse.json({ error: "Server configuration incomplete. Please contact support." }, { status: 500 })
    }

    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    const formattedDatabaseId = formatDatabaseId(NOTION_DATABASE_ID)
    console.log("[v0] Formatted database ID:", formattedDatabaseId)

    const queryBody = {
      filter: {
        property: "Email",
        email: {
          equals: email.toLowerCase(),
        },
      },
    }

    console.log("[v0] Query body:", JSON.stringify(queryBody))

    const response = await fetch("https://api.notion.com/v1/databases/" + formattedDatabaseId + "/query", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryBody),
    })

    console.log("[v0] Response status:", response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.log("[v0] Notion API error response:", JSON.stringify(errorData))
      return NextResponse.json({ error: "Unable to search database. Please try again." }, { status: 500 })
    }

    const data = await response.json()
    console.log("[v0] Results found:", data.results?.length || 0)

    if (!data.results || data.results.length === 0) {
      return NextResponse.json({ error: "Email not found in database. Please check and try again." }, { status: 404 })
    }

    const record = data.results[0]
    let tier = "Unknown"

    // Handle different possible property names for tier/rank
    if (record.properties["Tier"]) {
      const tierProp = record.properties["Tier"]
      if (tierProp.select) {
        tier = tierProp.select.name
      }
    } else if (record.properties["Rank"]) {
      const rankProp = record.properties["Rank"]
      if (rankProp.select) {
        tier = rankProp.select.name
      }
    }

    return NextResponse.json({ tier }, { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 })
  }
}

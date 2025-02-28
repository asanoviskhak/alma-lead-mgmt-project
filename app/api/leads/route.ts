import { NextResponse } from "next/server"
import type { Lead } from "@/types/lead"
import { mockLeads } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json(mockLeads)
}

export async function POST(request: Request) {
  const data = await request.json()
  const newLead: Lead = {
    ...data,
    id: (mockLeads.length + 1).toString(),
    status: "PENDING",
    submittedAt: new Date().toISOString(),
    resumeUrl: "/placeholder.svg?height=600&width=400", // In a real app, you'd handle file upload
  }
  mockLeads.push(newLead)
  return NextResponse.json(newLead, { status: 201 })
}


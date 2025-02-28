import { NextResponse } from "next/server"
import type { Lead } from "@/types/lead"
import { mockLeads } from "@/lib/mock-data"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()
    const leadIndex = mockLeads.findIndex((lead) => lead.id === id)

    if (leadIndex === -1) {
      console.log(`Lead not found: ${id}`)
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    mockLeads[leadIndex] = { ...mockLeads[leadIndex], ...data }
    console.log(`Updated lead: ${JSON.stringify(mockLeads[leadIndex])}`)
    return NextResponse.json(mockLeads[leadIndex])
  } catch (error) {
    console.error("Error in PATCH /api/leads/[id]:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


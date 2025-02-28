"use client"

import { useState, useEffect } from "react"
import { LeadsList } from "@/components/leads-list"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Lead } from "@/types/lead"
import { toast } from "@/components/ui/use-toast"
import { Search } from "lucide-react"

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/leads")
        if (!response.ok) {
          throw new Error("Failed to fetch leads")
        }
        const data = await response.json()
        setLeads(data)
      } catch (error) {
        console.error("Error fetching leads:", error)
        toast({
          title: "Error",
          description: "Failed to fetch leads. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [])

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      console.log(`Updating lead ${id} to status ${newStatus}`)
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      console.log(`Response status: ${response.status}`)
      console.log(`Response headers: ${JSON.stringify(Object.fromEntries(response.headers))}`)

      const responseText = await response.text()
      console.log(`Response text: ${responseText}`)

      if (!response.ok) {
        throw new Error(`Failed to update lead status: ${responseText}`)
      }

      let updatedLead
      try {
        updatedLead = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Error parsing response:", parseError)
        throw new Error("Invalid response from server")
      }

      setLeads(leads.map((lead) => (lead.id === id ? updatedLead : lead)))

      toast({
        title: "Success",
        description: "Lead status updated successfully.",
      })
    } catch (error) {
      console.error("Error updating lead status:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update lead status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchQuery === "" ||
      lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || lead.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Leads</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center w-full md:w-[50%] ">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reached_out">Reached Out</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <LeadsList leads={filteredLeads} onStatusUpdate={handleStatusUpdate} />
      )}
    </div>
  )
}


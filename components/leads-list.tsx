"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Lead } from "@/types/lead"
import { LeadDetails } from "@/components/lead-details"
import { FileText, ExternalLink } from "lucide-react"
import { visaOptions, countryOptions } from "@/constants/lead"

interface LeadsListProps {
  leads: Lead[]
  onStatusUpdate: (id: string, newStatus: string) => void
}

export function LeadsList({ leads, onStatusUpdate }: LeadsListProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead)
  }

  const handleCloseDialog = () => {
    setSelectedLead(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "REACHED_OUT":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Reached Out
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCountryName = (countryId: string) => {
    const foundCountry = countryOptions.find(({id}) => id === countryId)
    if (!foundCountry) {
      return "None"
    }
    return foundCountry.label
  }

  const getVisaLabel = (visaId: string) => {
    const foundVisa = visaOptions.find(({id}) => id === visaId)
    if (!foundVisa) {
      return "None"
    }

    return foundVisa.label
  }

  const getVisasOfInterest = (visasOfInterest: string[]) => {
    return visasOfInterest.length > 0 ? (
      <div className="flex flex-wrap gap-1">
        {visasOfInterest.slice(0, 2).map((visaId) => (
          <Badge key={visaId} variant="secondary" className="text-xs">
            {getVisaLabel(visaId)}
          </Badge>
        ))}
        {visasOfInterest.length > 2 && (
          <Badge variant="secondary" className="text-xs">
            +{visasOfInterest.length - 2}
          </Badge>
        )}
      </div>
    ) : (
      <span className="text-muted-foreground text-sm">None</span>
    )
  }

  return (
    <>
      <div className="rounded-md border container">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Visas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No leads found.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">
                    {lead.firstName} {lead.lastName}
                  </TableCell>
                  <TableCell>{new Date(lead.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {getVisasOfInterest(lead?.visasOfInterest ?? [])}
                  </TableCell>
                  <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  <TableCell>{getCountryName(lead.countryOfCitizenship)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(lead)}>
                        <FileText className="mr-1 h-4 w-4" />
                        Details
                      </Button>
                      {lead.status === "PENDING" && (
                        <Button variant="default" size="sm" onClick={() => onStatusUpdate(lead.id, "REACHED_OUT")}>
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Mark as Reached Out
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedLead} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>Detailed information about the lead.</DialogDescription>
          </DialogHeader>
          {selectedLead && <LeadDetails lead={selectedLead} onStatusUpdate={onStatusUpdate} />}
        </DialogContent>
      </Dialog>
    </>
  )
}


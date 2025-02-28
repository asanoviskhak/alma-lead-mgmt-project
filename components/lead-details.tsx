import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Lead } from "@/types/lead"
import { ExternalLink, FileDown, Linkedin } from "lucide-react"
import { countryOptions, visaOptions } from "@/constants/lead"

interface LeadDetailsProps {
  lead: Lead
  onStatusUpdate: (id: string, newStatus: string) => void
}

export function LeadDetails({ lead, onStatusUpdate }: LeadDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium">Personal Information</h3>
          <div className="mt-2 space-y-2">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Name:</span>
              <p>
                {lead.firstName} {lead.lastName}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Email:</span>
              <p>{lead.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">LinkedIn:</span>
              <p>
                <a
                  href={lead.linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <Linkedin className="mr-1 h-4 w-4" />
                  View Profile
                </a>
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Country of Citizenship:</span>
              <p>{getCountryName(lead.countryOfCitizenship)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Submitted:</span>
              <p>{formatDate(lead.submittedAt)}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Application Details</h3>
          <div className="mt-2 space-y-2">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Status:</span>
              <p>
                {lead.status === "PENDING" ? (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Pending
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Reached Out
                  </Badge>
                )}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Visas of Interest:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {getVisasOfInterest(lead.visasOfInterest)}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Resume:</span>
              <p>
                <a
                  href={lead.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <FileDown className="mr-1 h-4 w-4" />
                  Download Resume
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Additional Information</h3>
        <div className="mt-2 p-4 rounded-md bg-muted">
          {lead.additionalInfo ? (
            <p className="whitespace-pre-line">{lead.additionalInfo}</p>
          ) : (
            <p className="text-muted-foreground">No additional information provided.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {lead.status === "PENDING" && (
          <Button onClick={() => onStatusUpdate(lead.id, "REACHED_OUT")}>
            <ExternalLink className="mr-1 h-4 w-4" />
            Mark as Reached Out
          </Button>
        )}
      </div>
    </div>
  )
}


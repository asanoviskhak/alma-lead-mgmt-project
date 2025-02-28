export type LeadStatus = "PENDING" | "REACHED_OUT"

export interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  linkedinProfile: string
  countryOfCitizenship: string
  visasOfInterest: string[]
  resumeUrl: string
  additionalInfo?: string
  status: LeadStatus
  submittedAt: string
}


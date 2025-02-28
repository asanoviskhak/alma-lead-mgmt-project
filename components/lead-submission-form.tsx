"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Upload, X, Loader2, FileText, Boxes, Heart } from "lucide-react"
import { visaOptions, countryOptions } from "@/constants/lead"


const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  linkedinProfile: z.string().url({
    message: "Please enter a valid LinkedIn URL.",
  }),
  countryOfCitizenship: z.string({
    required_error: "Please select your country of citizenship.",
  }),
  visasOfInterest: z.array(z.string()).min(1, {
    message: "Please select at least one visa type.",
  }),
  resume: z.instanceof(File, { message: "Resume is required" }).optional(),
  additionalInfo: z.string().optional(),
})

export function LeadSubmissionForm() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      linkedinProfile: "",
      countryOfCitizenship: "",
      visasOfInterest: [],
      resume: undefined,
      additionalInfo: "",
    },
  })

  const handleFileChange = (onFormChange: (data: any) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      onFormChange(selectedFile)
    }
  }

  const removeFile = (onFormChange: (data: any) => void) => () => {
    setFile(null)
    onFormChange(null)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        if (key === "visasOfInterest") {
          formData.append(key, JSON.stringify(value))
        } else if (key === "resume" && value instanceof File) {
          formData.append("resume", value)
        } else if (key !== "resume") {
          formData.append(key, value as string)
        }
      })

      if (!values.resume) {
        throw new Error("Resume is required")
      }

      const response = await fetch("/api/leads", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to submit lead")
      }

      toast({
        title: "Lead submitted successfully!",
        description: "We'll be in touch with you soon.",
      })

      router.push("/thank-you")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error submitting form",
        description: "Please try again later.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  if (isSubmitting) {
    return (
      <Card className="mx-auto max-w-2xl bg-white mt-20">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-lg font-medium">Submitting your application...</p>
            <p className="text-sm text-muted-foreground">Please wait while we process your information.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-xl bg-white mx-auto ">
      <div className="pt-6 md:px-0 px-6">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold">Want to understand your visa options?</h2>
          <p className="text-muted-foreground">
            Submit the form below and our team of experienced attorneys will review your information and send a
            preliminary assessment of your case based on your goals.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input className="bg-white" placeholder="Iskhak" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input className="bg-white" placeholder="Asanov" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" className="bg-white" placeholder="asanov.personal@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="countryOfCitizenship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country of Citizenship *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country of citizenship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countryOptions.map((country) => (
                          <SelectItem key={country.id} value={country.id}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedinProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile *</FormLabel>
                    <FormControl>
                      <Input className="bg-white" placeholder="https://linkedin.com/in/iskhakasan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="mb-4 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Boxes className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Visa categories of interest?</h3>
              </div>

              <FormField
                control={form.control}
                name="visasOfInterest"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 gap-2">
                      {visaOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="visasOfInterest"
                          render={({ field }) => {
                            return (
                              <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, option.id])
                                        : field.onChange(field.value?.filter((value) => value !== option.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{option.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="resume"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Resume/CV Upload *</FormLabel>
                    <FormControl>
                      <div className="mt-1">
                        {!file ? (
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="file-upload"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  PDF, DOC, or DOCX (MAX. 10MB)
                                </p>
                              </div>
                              <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange(onChange)}
                                {...rest}
                              />
                            </label>
                          </div>
                        ) : (
                          <div className="flex items-center p-2 mt-2 space-x-2 border rounded-md">
                            <div className="flex-1 truncate">{file.name}</div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeFile(onChange)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="mb-4 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">How can we help you?</h3>
              </div>

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
                        className="min-h-[120px] resize-none bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <Toaster />
    </div>
  )
}


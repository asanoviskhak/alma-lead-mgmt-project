import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function ThankYouPage() {
  return (
      <div className="container relative z-20 pt-20 pb-24">
        <div className="max-w-xl bg-white mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-lg bg-primary-foreground p-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="mb-4 text-2xl font-bold">Thank You</h1>

          <p className="mb-8 text-muted-foreground">
            Your information was submitted to our team of immigration attorneys. Expect an email from{" "}
            <span className="font-medium text-foreground">hello@tryalma.ai</span>.
          </p>

          <Link href="/">
            <Button className="w-full mt-8" size="lg">
              Go Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
  )
}


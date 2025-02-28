import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col mx-auto">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8 w-full mx-auto">
          <h1 className="text-lg font-semibold">Alma</h1>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-center gap-6 py-12 md:py-24 lg:py-32 w-full mx-auto">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Lead Management System</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Submit your information to get started or login to manage leads.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/submit">
              <Button>
                Submit Lead <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Login to Dashboard</Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:flex-row mx-auto">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Lead Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}


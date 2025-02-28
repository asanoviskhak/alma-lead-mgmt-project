export default function CommonLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
        <div className="min-h-screen">
            <div className="relative bg-gradient-to-br from-[#C5D86D] to-[#A7C957] pb-32 pt-12">
                <div className="absolute bottom-0 left-0 top-0 w-1/3">
                <div className="absolute left-10 top-20 h-32 w-32 rounded-full bg-[#A7C957]/30"></div>
                <div className="absolute left-20 top-40 h-24 w-24 rounded-full bg-[#A7C957]/20"></div>
                <div className="absolute left-5 top-60 h-40 w-40 rounded-full bg-[#A7C957]/40"></div>
                </div>
                <div className="container relative z-10 mx-auto max-w-6xl">
                <div className="mb-8">
                    <h3 className="text-2xl font-bold">alma</h3>
                </div>
                <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
                    Get An Assessment Of Your Immigration Case
                </h1>
                </div>
            </div>

                <div className="container relative z-20 pb-24 mx-auto">
                    {children}
                </div>
            </div>
        </body>
      </html>
    )
  }
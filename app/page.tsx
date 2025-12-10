"use client"

import { useState } from "react"
import RankCheckForm from "@/components/rank-check-form"
import RankResultModal from "@/components/rank-result-modal"

export default function Home() {
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<{
    tier: string
    email: string
  } | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (email: string) => {
    setError("")
    setResult(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/check-rank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "An error occurred")
        setShowResult(false)
        return
      }

      setResult({ tier: data.tier, email })
      setShowResult(true)
    } catch (err) {
      setError("Failed to connect. Please try again.")
      setShowResult(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF7E9] flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#1364DB] rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#1364DB] rounded-full opacity-10 blur-3xl"></div>

      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10 relative z-10 w-full max-w-2xl flex-shrink-0 pt-2 sm:pt-4">
        <div className="inline-block mb-2 sm:mb-3 md:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1364DB] text-white rounded-full text-xs font-bold tracking-widest uppercase">
          Creator Status
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#232324] mb-1 sm:mb-2 leading-none tracking-tighter">
          Check your
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1364DB] leading-none tracking-tighter mb-4 sm:mb-6 md:mb-8">
          Creatorverse Rank
        </h2>

        <p className="mt-4 sm:mt-6 md:mt-8 text-[#232324] text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed md:whitespace-nowrap">
          Discover your tier and see how you rank in the Creatorverse community
        </p>
      </div>

      {/* Form Container with card styling */}
      <div className="w-full max-w-lg relative z-10 flex-shrink-0 mb-6 sm:mb-8 md:mb-10 px-2 sm:px-0">
        <div className="bg-white border-3 border-[#232324] rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg">
          <RankCheckForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
        </div>
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10 text-center relative z-10 flex flex-col items-center gap-3 sm:gap-4">
        <a
          href="https://www.scal3.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <img src="/images/scal3-logo.png" alt="Scal3 Logo" className="h-10 sm:h-12" />
        </a>

        <a
          href="https://www.scal3.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 sm:px-8 py-2 sm:py-3 bg-[#1364DB] text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
        >
          Visit Website
        </a>
      </div>

      {/* Result Modal */}
      {showResult && result && (
        <RankResultModal tier={result.tier} email={result.email} onClose={() => setShowResult(false)} />
      )}
    </main>
  )
}

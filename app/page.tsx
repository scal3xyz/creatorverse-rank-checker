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
    <main className="min-h-screen bg-[#FFF7E9] flex flex-col items-center justify-between px-6 py-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#1364DB] rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#1364DB] rounded-full opacity-10 blur-3xl"></div>

      {/* Header Section */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-block mb-3 px-4 py-2 bg-[#1364DB] text-white rounded-full text-xs font-bold tracking-widest uppercase">
          Creator Status
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-[#232324] mb-1 leading-none tracking-tighter">
          Check your
        </h1>
        <h2 className="text-4xl md:text-6xl font-black text-[#1364DB] leading-none tracking-tighter mb-6">
          Creatorverse Rank
        </h2>

        <p className="mt-6 text-[#232324] text-base font-medium max-w-md mx-auto leading-relaxed">
          Discover your tier and see how you rank in the Creatorverse community
        </p>
      </div>

      {/* Form Container with card styling */}
      <div className="w-full max-w-md relative z-10 flex-shrink-0">
        <div className="bg-white border-3 border-[#232324] rounded-2xl p-6 shadow-lg">
          <RankCheckForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
        </div>
      </div>

      <div className="mt-8 text-center relative z-10 flex flex-col items-center">
        <a
          href="https://www.scal3.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <img src="/images/scal3-logo.png" alt="Scal3 Logo" className="h-10" />
        </a>

        <a
          href="https://www.scal3.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 px-6 py-2 bg-[#1364DB] text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-sm"
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

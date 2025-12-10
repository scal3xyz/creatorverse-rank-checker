"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface RankCheckFormProps {
  onSubmit: (email: string) => void
  isLoading: boolean
  error: string
}

export default function RankCheckForm({ onSubmit, isLoading, error }: RankCheckFormProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    onSubmit(email)
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      {/* Input Field */}
      <div className="space-y-1.5 sm:space-y-2">
        <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-[#232324] uppercase tracking-wide">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="creator@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="h-10 sm:h-12 border-2 border-[#232324] rounded-lg text-sm sm:text-base bg-white text-[#232324] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1364DB] focus:ring-offset-2 focus:ring-offset-white font-medium"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-2 sm:p-3 bg-red-100 border-2 border-red-400 rounded-lg">
          <p className="text-red-800 font-bold text-xs sm:text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={!email.trim() || isLoading}
        className="w-full h-10 sm:h-12 bg-[#1364DB] hover:bg-[#0E4FA8] text-white font-black text-xs sm:text-base rounded-lg border-2 border-[#1364DB] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide shadow-md hover:shadow-lg hover:-translate-y-1"
      >
        {isLoading ? "Checking..." : "See My Rank"}
      </Button>

      {/* Help Text */}
      <p className="text-center text-xs text-[#232324] opacity-70 font-medium">
        Enter your registered email to check your Creatorverse tier
      </p>
    </form>
  )
}

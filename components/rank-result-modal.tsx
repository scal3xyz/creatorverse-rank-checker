"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface RankResultModalProps {
  tier: string
  email: string
  onClose: () => void
}

export default function RankResultModal({ tier, email, onClose }: RankResultModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const getTierColor = (tierName: string) => {
    const lowerTier = tierName.toLowerCase().trim()
    switch (lowerTier) {
      case "bronze":
        return "#CD7F32"
      case "silver":
        return "#C0C0C0"
      case "gold":
        return "#FFD700"
      case "platinum":
        return "#E5E4E2"
      default:
        return "#1364DB"
    }
  }

  const getTierBadgeColor = (tierName: string) => {
    const lowerTier = tierName.toLowerCase().trim()
    switch (lowerTier) {
      case "bronze":
        return "bg-[#CD7F32] text-white"
      case "silver":
        return "bg-[#C0C0C0] text-[#232324]"
      case "gold":
        return "bg-[#FFD700] text-[#232324]"
      case "platinum":
        return "bg-[#E5E4E2] text-[#232324]"
      default:
        return "bg-[#1364DB] text-white"
    }
  }

  const tierColor = getTierColor(tier)
  const badgeColorClass = getTierBadgeColor(tier)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        className={`fixed inset-0 flex items-center justify-center px-4 pointer-events-none transition-all duration-300 z-50 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`bg-white border-4 border-[#232324] rounded-3xl p-10 max-w-sm w-full shadow-2xl pointer-events-auto transform transition-all duration-300 relative ${
            isVisible ? "scale-100" : "scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <Image
              src="/images/scal3-logo-square.png"
              alt="Scal3 Logo"
              width={64}
              height={64}
              className="drop-shadow-lg"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-black text-[#232324] mb-4 uppercase tracking-widest">
              Your Creatorverse Rank is:
            </p>

            <div
              className={`inline-block px-6 py-3 rounded-full mb-4 ${badgeColorClass} font-black text-2xl shadow-lg border-2 border-[#232324]`}
            >
              {tier.toUpperCase()}
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-[#232324] opacity-70 font-medium">
              {tier.toLowerCase() === "platinum" && "You're in our elite creator tier!"}
              {tier.toLowerCase() === "gold" && "You're a valued creator in our community!"}
              {tier.toLowerCase() === "silver" && "You're an active creator with us!"}
              {tier.toLowerCase() === "bronze" && "Welcome to the Creatorverse family!"}
            </p>
          </div>

          {/* Email Display */}
          <div className="bg-[#FFF7E9] border-2 border-[#232324] rounded-xl p-4 mb-8 text-center">
            <p className="text-xs font-black text-[#232324] mb-2 uppercase tracking-wide">Verified Email</p>
            <p className="text-sm font-bold text-[#232324] break-all">{email}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="w-full bg-[#1364DB] hover:bg-[#0E4FA8] text-white font-black py-3 rounded-lg border-2 border-[#1364DB] transition-all duration-200 uppercase tracking-wide shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            Done
          </button>
        </div>
      </div>
    </>
  )
}

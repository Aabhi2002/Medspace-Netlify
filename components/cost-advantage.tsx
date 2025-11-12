"use client"

import { useState } from "react"

export function CostAdvantage() {
  const [showModal, setShowModal] = useState(false)

  const costComparison = [
    { item: "Rent", traditional: "₹40,000+", medspaces: "₹0" },
    { item: "Staff", traditional: "₹30,000", medspaces: "₹0" },
    { item: "Utilities", traditional: "₹10,000", medspaces: "₹0" },
    { item: "Marketing", traditional: "₹20,000", medspaces: "Included" },
  ]

  return (
    <>
      <section className="py-20 bg-gradient-to-r from-[#F9FBFB] to-[#E6F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Save ₹1–1.2L/month</h2>
              <p className="text-xl text-gray-700 mb-2">vs owning a private clinic.</p>
              <p className="text-lg text-gray-600 mb-8">No rent. No staff. No utilities. All growth tools included.</p>
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 bg-[#2a319b] text-white rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 inline-flex items-center gap-2"
              >
                See Real Cost Comparison
                <span>→</span>
              </button>
            </div>

            {/* Right Side - Comparison Table */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left pb-4 text-gray-700 font-semibold">Cost Item</th>
                    <th className="text-center pb-4 text-gray-700 font-semibold">Traditional</th>
                    <th className="text-center pb-4 text-gray-700 font-semibold">MedSpaces</th>
                  </tr>
                </thead>
                <tbody>
                  {costComparison.map((row, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-4 text-gray-900 font-medium">{row.item}</td>
                      <td className="py-4 text-center text-gray-600">{row.traditional}</td>
                      <td className="py-4 text-center">
                        <span
                          className={`font-bold ${row.medspaces === "Included" ? "text-[#00a8b8]" : "text-[#2a319b]"}`}
                        >
                          {row.medspaces === "₹0" && <span className="text-[#00a8b8]">✓ </span>}
                          {row.medspaces}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold text-gray-900">Cost Breakdown</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                ✕
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {costComparison.map((row, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <div className="font-semibold text-gray-900 mb-2">{row.item}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Traditional Clinic</p>
                      <p className="text-gray-900 font-semibold">{row.traditional}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">MedSpaces</p>
                      <p className="text-[#00a8b8] font-semibold">{row.medspaces}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t-2 border-gray-900">
                <p className="text-gray-600 mb-2">Monthly Savings</p>
                <p className="text-3xl font-bold text-[#2a319b]">₹1,00,000 - ₹1,20,000</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

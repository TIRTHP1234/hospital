import React, { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export const AIAssistantFab: React.FC = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const handleInsightsClick = () => {
        setIsAnalyzing(true)

        // Array of dynamic insights for the hackathon
        const insights = [
            "Patient flow expected to peak at 2 PM. Consider reallocating 2 nurses to triage from the surgery ward.",
            "ER wait times are trending 15% above normal. Recommend opening an overflow consultation room.",
            "ICU bed occupancy is at 88%. Recommend reviewing discharge candidates for the next 4 hours.",
            "Staffing levels in Pediatrics are optimal, but Orthopedics may need backup based on incoming trauma alerts.",
            "Supply alert: Inventory for IV fluids is depleting faster than projected today. Recommend restocking.",
            "Cardiology department resolution time has improved by 12% today. Current workflows are highly efficient."
        ];

        const randomInsight = insights[Math.floor(Math.random() * insights.length)];

        // Simulate AI thinking
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden border border-white/50`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <Sparkles className="h-10 w-10 text-indigo-500 animate-pulse" />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                                AI Analysis Complete
                            </p>
                            <p className="mt-1 text-sm text-gray-700">
                                {randomInsight}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:bg-white/50 hover:text-indigo-500 focus:outline-none"
                    >
                        Close
                    </button>
                </div>
            </div>
        ), { id: 'ai-insight', duration: 6000 })

        setTimeout(() => setIsAnalyzing(false), 2000)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={handleInsightsClick}
                disabled={isAnalyzing}
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-lg shadow-blue-500/40 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300 disabled:opacity-80"
            >
                {isAnalyzing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                )}
                <span className="font-semibold tracking-wide">
                    {isAnalyzing ? 'Analyzing...' : 'AI Insights'}
                </span>
            </button>
        </div>
    )
}

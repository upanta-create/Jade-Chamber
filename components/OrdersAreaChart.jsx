'use client'
import { useState } from 'react'

export default function OrdersAreaChart({ allOrders = [] }) {
    const [hoveredPoint, setHoveredPoint] = useState(null)

    // Group orders by date
    const ordersPerDay = (allOrders || []).reduce((acc, order) => {
        const date = order?.createdAt ? new Date(order.createdAt).toISOString().split('T')[0] : 'Today'
        acc[date] = (acc[date] || 0) + 1
        return acc
    }, {})

    // Ensure we have at least sample series if empty
    let entries = Object.entries(ordersPerDay)
    if (entries.length === 0) {
        entries = [
            ['Day 1', 1],
            ['Day 2', 2],
            ['Day 3', 3],
            ['Day 4', 2],
            ['Day 5', 4]
        ]
    }

    const maxVal = Math.max(...entries.map(([, count]) => count), 4)
    const chartW = 700
    const chartH = 200
    const padX = 40
    const padY = 20
    const plotW = chartW - padX * 2
    const plotH = chartH - padY * 2

    const points = entries.map(([date, count], i) => {
        const x = padX + (entries.length > 1 ? (i / (entries.length - 1)) * plotW : plotW / 2)
        const y = padY + plotH - (count / maxVal) * plotH
        return { x, y, date, count }
    })

    // Create smooth SVG path
    const pathD = points.reduce((acc, pt, i, arr) => {
        if (i === 0) return `M ${pt.x},${pt.y}`
        const prev = arr[i - 1]
        const cx1 = prev.x + (pt.x - prev.x) / 2
        const cy1 = prev.y
        const cx2 = prev.x + (pt.x - prev.x) / 2
        const cy2 = pt.y
        return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${pt.x},${pt.y}`
    }, '')

    const areaD = `${pathD} L ${points[points.length - 1].x},${padY + plotH} L ${points[0].x},${padY + plotH} Z`

    return (
        <div className="w-full max-w-4xl bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-semibold text-slate-900">Orders Velocity</h3>
                    <p className="text-xs text-slate-500">Real-time daily order distribution & dispatch rate</p>
                </div>
                <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Live Telemetry
                </div>
            </div>

            <div className="relative w-full h-[220px]">
                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                    </defs>

                    {/* Gridlines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                        const y = padY + plotH * (1 - ratio)
                        return (
                            <g key={ratio}>
                                <line
                                    x1={padX}
                                    y1={y}
                                    x2={chartW - padX}
                                    y2={y}
                                    stroke="#e2e8f0"
                                    strokeDasharray="4 4"
                                    strokeWidth="1"
                                />
                                <text x={padX - 8} y={y + 3} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                                    {Math.round(ratio * maxVal)}
                                </text>
                            </g>
                        )
                    })}

                    {/* Area fill */}
                    <path d={areaD} fill="url(#emeraldGrad)" />

                    {/* Main curve */}
                    <path d={pathD} fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Data points */}
                    {points.map((pt, i) => (
                        <g key={i}>
                            <circle
                                cx={pt.x}
                                cy={pt.y}
                                r={hoveredPoint === i ? 6 : 4}
                                fill="#ffffff"
                                stroke="#059669"
                                strokeWidth={hoveredPoint === i ? 3 : 2}
                                className="cursor-pointer transition-all duration-150"
                                onMouseEnter={() => setHoveredPoint(i)}
                                onMouseLeave={() => setHoveredPoint(null)}
                            />
                            <text
                                x={pt.x}
                                y={chartH - 2}
                                textAnchor="middle"
                                className="text-[10px] fill-slate-500 font-sans"
                            >
                                {pt.date.length > 5 ? pt.date.slice(5) : pt.date}
                            </text>
                        </g>
                    ))}
                </svg>

                {/* Tooltip */}
                {hoveredPoint !== null && (
                    <div
                        className="absolute pointer-events-none bg-slate-900 text-white text-[11px] px-3 py-1.5 rounded-lg shadow-lg -translate-x-1/2 -translate-y-full border border-slate-700"
                        style={{
                            left: `${(points[hoveredPoint].x / chartW) * 100}%`,
                            top: `${(points[hoveredPoint].y / chartH) * 100 - 8}%`
                        }}
                    >
                        <div className="font-semibold text-emerald-400">{points[hoveredPoint].count} orders</div>
                        <div className="text-slate-400 text-[10px]">{points[hoveredPoint].date}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

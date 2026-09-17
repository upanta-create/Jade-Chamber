'use client';

import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle2, AlertTriangle, Server, ShieldCheck, X } from 'lucide-react';

export default function CanaryBanner() {
  const [health, setHealth] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          setHealth(data);
        }
      } catch (err) {
        console.error('Failed to query health probe', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !health) return null;

  const isCanary = health.releaseChannel === 'canary' || health.version.includes('canary') || health.version.includes('rc');

  return (
    <>
      <aside 
        aria-label="Deployment diagnostics"
        className={`w-full text-xs font-mono py-1.5 px-4 transition-colors duration-300 border-b ${
        isCanary
          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase ${
              isCanary ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isCanary ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              {isCanary ? 'Canary Rollout' : 'Production Stable'}
            </span>

            <span className="text-slate-300">
              Release: <strong className="text-white font-bold">Jade Chamber {health.version}</strong>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
              <Server size={12} className="text-slate-400" />
              Pod: <code className="text-slate-300">{health.deployment?.podName?.substring(0, 18)}</code>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <Activity size={12} className={health.database.status === 'connected' ? 'text-emerald-400' : 'text-amber-400'} />
              DB: {health.database.status} ({health.database.latencyMs ?? '<1'}ms)
            </span>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-[11px] underline underline-offset-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Diagnostics
            </button>
          </div>
        </div>
      </aside>

      {/* Diagnostics Modal / Drawer */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 text-slate-200 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-400" size={18} />
                <h3 className="font-semibold text-sm text-white">Argo Rollout Pod Diagnostics</h3>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Release Version</span>
                  <span className="text-emerald-400 font-bold">{health.version}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Release Channel</span>
                  <span className="text-white capitalize">{health.releaseChannel}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Pod Hostname</span>
                  <span className="text-slate-300 truncate block">{health.deployment?.podName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Node.js Runtime</span>
                  <span className="text-slate-300">{health.deployment?.nodeVersion} ({health.deployment?.platform})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Uptime</span>
                  <span className="text-slate-300">{health.uptimeSeconds}s</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Heap Memory</span>
                  <span className="text-slate-300">{health.memory?.heapUsedMb} MB / {health.memory?.heapTotalMb} MB</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">PostgreSQL (Prisma) Status</span>
                <span className={`inline-flex items-center gap-1 font-semibold ${
                  health.database?.status === 'connected' ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {health.database?.status === 'connected' ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    <AlertTriangle size={13} />
                  )}
                  {health.database?.status}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-800/40 p-2.5 rounded border border-slate-800">
                💡 <strong>Argo Rollouts Note:</strong> Refreshing this page during a Canary release progressively switches pod hostnames and versions according to the configured traffic weight (e.g. 10% → 30% → 100%).
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

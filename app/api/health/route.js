import { NextResponse } from 'next/server';
import os from 'os';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  let dbStatus = 'disconnected';
  let dbLatencyMs = null;

  try {
    const dbStart = Date.now();
    // Quick probe to check DB connectivity
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - dbStart;
    dbStatus = 'connected';
  } catch (error) {
    dbStatus = 'unreachable';
  }

  const memory = process.memoryUsage();

  const healthData = {
    status: dbStatus === 'unreachable' ? 'degraded' : 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    version: process.env.NEXT_PUBLIC_APP_VERSION || 'v1.0.0',
    releaseChannel: process.env.NEXT_PUBLIC_RELEASE_CHANNEL || 'stable',
    deployment: {
      podName: process.env.HOSTNAME || os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
    },
    database: {
      status: dbStatus,
      latencyMs: dbLatencyMs,
    },
    memory: {
      rssMb: Math.round(memory.rss / (1024 * 1024)),
      heapUsedMb: Math.round(memory.heapUsed / (1024 * 1024)),
      heapTotalMb: Math.round(memory.heapTotal / (1024 * 1024)),
    },
    responseTimeMs: Date.now() - startTime,
  };

  return NextResponse.json(healthData, {
    status: healthData.status === 'degraded' ? 200 : 200, // keep 200 for liveness probe, status field indicates degraded
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-App-Version': healthData.version,
      'X-Pod-Name': healthData.deployment.podName,
    },
  });
}

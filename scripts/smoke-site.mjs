#!/usr/bin/env node

const url = process.argv[2] ?? process.env.SMOKE_URL ?? 'https://tichu.xyz';

try {
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(15_000)
  });
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  if (!body.includes('Tichu Counter')) {
    throw new Error('response did not contain the Tichu app shell');
  }

  console.log(`Smoke check passed: ${response.url}`);
} catch (error) {
  const causeCode = error?.cause?.code;
  const detail =
    causeCode === 'ENOTFOUND'
      ? `DNS resolution failed for ${new URL(url).hostname}`
      : error instanceof Error
        ? error.message
        : String(error);

  console.error(`Smoke check failed: ${detail}`);
  process.exitCode = 1;
}

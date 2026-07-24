import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import test from 'node:test';

async function runSmoke(url) {
  const child = spawn(process.execPath, ['scripts/smoke-site.mjs', url], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe']
  });
  const stdout = [];
  const stderr = [];
  child.stdout.on('data', (chunk) => stdout.push(chunk));
  child.stderr.on('data', (chunk) => stderr.push(chunk));
  const [code] = await once(child, 'close');

  return {
    code,
    stdout: Buffer.concat(stdout).toString(),
    stderr: Buffer.concat(stderr).toString()
  };
}

test('smoke check succeeds when the deployed app shell is healthy', async (t) => {
  const server = createServer((_request, response) => {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end('<!doctype html><title>Tichu Counter</title><main>Tichu Counter</main>');
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => server.close());

  const address = server.address();
  const result = await runSmoke(`http://127.0.0.1:${address.port}`);

  assert.equal(result.code, 0, result.stderr);
  assert.match(result.stdout, /Smoke check passed/);
});

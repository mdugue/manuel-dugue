import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const policyPromise = readFile(join(process.cwd(), 'LLMs.de.txt'), 'utf8');

export async function GET() {
  const body = await policyPromise;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

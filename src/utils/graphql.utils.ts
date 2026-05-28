import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export function loadGraphQL(importMetaUrl: string, filename: string): string {
  const __dirname = dirname(fileURLToPath(importMetaUrl));
  return readFileSync(join(__dirname, filename), 'utf-8');
}

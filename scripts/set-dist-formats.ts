import { writeFileSync } from 'fs';
import { resolve } from 'path';

const formats: Record<string, 'module' | 'commonjs'> = {
  'dist/esm': 'module',
  'dist/cjs': 'commonjs',
};

for (const [dir, type] of Object.entries(formats)) {
  writeFileSync(
    resolve(dir, 'package.json'),
    JSON.stringify({ type }, null, 2) + '\n'
  );
}

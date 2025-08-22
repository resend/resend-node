import fs from 'node:fs';

const pkg = JSON.parse(await fs.promises.readFile('package.json', 'utf8'));
const errors = [];

function isPinned(version) {
  return /^\d+\.\d+\.\d+(-canary\.\d+)?$/.test(version);
}

for (const [dep, version] of Object.entries(pkg.dependencies || {})) {
  if (!isPinned(version)) {
    errors.push(`Dependency "${dep}" is not pinned: "${version}"`);
  }
}

for (const [dep, version] of Object.entries(pkg.devDependencies || {})) {
  if (!isPinned(version)) {
    errors.push(`Dev dependency "${dep}" is not pinned: "${version}"`);
  }
}

if (errors.length > 0) {
  console.error(`\n${errors.join('\n')}\n`);
  process.exit(1);
} else {
  console.log('All dependencies are pinned.');
}

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function getDataDir(): string {
  const team = process.env.NEXT_PUBLIC_TEAM;
  const dir = team === 'data-platform' ? 'data-dp' : 'data';
  return path.join(process.cwd(), dir);
}

export function readYaml<T>(relativePath: string): T {
  const filePath = path.join(getDataDir(), relativePath);
  const raw = fs.readFileSync(filePath, 'utf8');
  return yaml.load(raw) as T;
}

export function readYamlOr<T>(relativePath: string, fallback: T): T {
  try {
    return readYaml<T>(relativePath);
  } catch {
    return fallback;
  }
}

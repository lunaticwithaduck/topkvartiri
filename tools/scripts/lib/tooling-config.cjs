const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_CONFIG_PATH = path.resolve(__dirname, '..', '..', 'tooling.config.json');

function loadToolingConfig(configPath) {
  const resolvedPath = configPath ? path.resolve(configPath) : DEFAULT_CONFIG_PATH;
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`tooling config not found: ${resolvedPath}`);
  }

  const rootDir = path.dirname(resolvedPath);
  const config = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
  return { config, configPath: resolvedPath, rootDir };
}

function resolveConfiguredPath(rootDir, configuredPath) {
  return path.resolve(rootDir, configuredPath);
}

module.exports = {
  loadToolingConfig,
  resolveConfiguredPath,
};

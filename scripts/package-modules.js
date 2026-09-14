#!/usr/bin/env node
/**
 * scripts/package-modules.js
 *
 * Compiles each modular extension into an optimized, self-contained standalone
 * bundle (module.bundle.js) using Vite, and packages them into release zip archives
 * (dist-modules/module-<id>.zip) alongside modules-index.json for GitHub Releases.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const { build } = require('vite');

const rootDir = path.resolve(__dirname, '..');
const modulesDir = path.join(rootDir, 'modules');
const outputDir = path.join(rootDir, 'dist-modules');
const tempBuildDir = path.join(rootDir, '.temp-module-build');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function packageAllModules() {
  console.log('📦 Compiling & Packaging ArmoryVault Modular Extensions...\n');

  const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
  const repoVersion = packageJson.version;

  const moduleFolders = fs
    .readdirSync(modulesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name !== 'registry')
    .map((dirent) => dirent.name);

  const indexPayload = {
    repository: 'cook0001/ArmoryVault-Modules',
    version: repoVersion,
    generatedAt: new Date().toISOString(),
    modules: {},
  };

  for (const modId of moduleFolders) {
    const modDir = path.join(modulesDir, modId);
    const manifestPath = path.join(modDir, 'manifest.json');
    const entryPath = path.join(modDir, 'index.tsx');

    if (!fs.existsSync(manifestPath)) {
      console.warn(`⚠️ Skipping ${modId}: missing manifest.json`);
      continue;
    }

    if (!fs.existsSync(entryPath)) {
      console.warn(`⚠️ Skipping ${modId}: missing index.tsx entry point`);
      continue;
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const targetOutDir = path.join(tempBuildDir, modId);

    console.log(`🔨 Building bundle for: ${manifest.name} (${modId})...`);

    try {
      await build({
        configFile: false,
        logLevel: 'warn',
        resolve: {
          alias: {
            '@': path.resolve(rootDir, 'src'),
          },
        },
        build: {
          outDir: targetOutDir,
          emptyOutDir: true,
          lib: {
            entry: entryPath,
            name: `ArmoryModule_${modId.replace(/-/g, '_')}`,
            formats: ['iife'],
            fileName: () => 'module.bundle.js',
          },
          rollupOptions: {
            external: [
              'react',
              'react-dom',
              'react/jsx-runtime',
              'react/jsx-dev-runtime',
              'lucide-react',
              'react-router-dom',
            ],
            output: {
              exports: 'named',
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'ReactJSXRuntime',
                'react/jsx-dev-runtime': 'ReactJSXRuntime',
                'lucide-react': 'LucideIcons',
                'react-router-dom': 'ReactRouterDOM',
              },
            },
          },
        },
      });
    } catch (buildErr) {
      console.error(`❌ Build failed for module ${modId}:`, buildErr.message);
      continue;
    }

    // Prepare Zip
    const zip = new AdmZip();

    // 1. Add compiled bundle(s) and assets
    if (fs.existsSync(targetOutDir)) {
      zip.addLocalFolder(targetOutDir, '');
    }

    // 2. Add manifest with updated entry
    const compiledManifest = {
      ...manifest,
      entry: 'module.bundle.js',
      bundleCompiledAt: new Date().toISOString(),
    };
    zip.addFile('manifest.json', Buffer.from(JSON.stringify(compiledManifest, null, 2), 'utf8'));

    // 3. Add raw module files as secondary fallback
    const rawFiles = fs.readdirSync(modDir);
    for (const file of rawFiles) {
      if (file !== 'manifest.json') {
        const fullPath = path.join(modDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          zip.addLocalFolder(fullPath, file);
        } else {
          zip.addLocalFile(fullPath);
        }
      }
    }

    const zipFilename = `module-${modId}.zip`;
    const zipPath = path.join(outputDir, zipFilename);
    zip.writeZip(zipPath);

    const zipBuffer = fs.readFileSync(zipPath);
    const sha256 = crypto.createHash('sha256').update(zipBuffer).digest('hex');
    const sizeKb = (zipBuffer.length / 1024).toFixed(1);

    indexPayload.modules[modId] = {
      ...compiledManifest,
      filename: zipFilename,
      sha256,
      sizeBytes: zipBuffer.length,
      sizeKb: `${sizeKb} KB`,
      downloadUrl: `https://github.com/cook0001/ArmoryVault-Modules/releases/download/v${repoVersion}/${zipFilename}`,
    };

    console.log(`  ✓ Built & Packaged -> ${zipFilename} (${sizeKb} KB)\n`);
  }

  // Cleanup temp build directory
  try {
    if (fs.existsSync(tempBuildDir)) {
      fs.rmSync(tempBuildDir, { recursive: true, force: true });
    }
  } catch {}

  // Write catalog indices (both in dist-modules/ and root)
  const indexPath = path.join(outputDir, 'modules-index.json');
  const rootIndexPath = path.join(rootDir, 'modules-index.json');
  const catalogJson = JSON.stringify(indexPayload, null, 2);

  fs.writeFileSync(indexPath, catalogJson, 'utf8');
  fs.writeFileSync(rootIndexPath, catalogJson, 'utf8');

  console.log(`✨ Successfully packaged ${Object.keys(indexPayload.modules).length} modules!`);
  console.log(`📄 Catalog index generated at: modules-index.json\n`);
}

packageAllModules().catch((err) => {
  console.error('Packaging failed:', err);
  process.exit(1);
});

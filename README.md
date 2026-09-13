# ArmoryVault Modules

[![Modules Release](https://img.shields.io/github/v/release/cook0001/ArmoryVault-Modules?style=flat-square&color=emerald)](https://github.com/cook0001/ArmoryVault-Modules/releases/latest)
[![Catalog Hub](https://img.shields.io/badge/Web%20Hub-cook0001.github.io%2FArmoryVault--Modules-818cf8?style=flat-square)](https://cook0001.github.io/ArmoryVault-Modules/)
[![Desktop App](https://img.shields.io/badge/Desktop%20App-cook0001.github.io%2FArmoryVault-blue?style=flat-square)](https://cook0001.github.io/ArmoryVault/)
[![License](https://img.shields.io/badge/License-ISC-purple?style=flat-square)](LICENSE)

> **Live Modules Web Hub**: [https://cook0001.github.io/ArmoryVault-Modules/](https://cook0001.github.io/ArmoryVault-Modules/)  
> **Raw Catalog Index (JSON)**: [https://raw.githubusercontent.com/cook0001/ArmoryVault-Modules/main/modules-index.json](https://raw.githubusercontent.com/cook0001/ArmoryVault-Modules/main/modules-index.json)  
> **Core Desktop Application**: [https://github.com/cook0001/ArmoryVault](https://github.com/cook0001/ArmoryVault)

Official modular extensions and plugin repository for **[ArmoryVault Desktop](https://github.com/cook0001/ArmoryVault)**.

This repository allows specialized features to be developed, maintained, updated, and released completely independently of the ArmoryVault core desktop application. The core desktop app dynamically checks this repository's releases and enables users to install, update, and manage extensions on-demand via the in-app **Module Center**.

---

## Included Modules

| Module ID | Module Name | Category | Description | Data Keys | Package Size |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `reloading` | **Reloading Workbench** | `bench` | Powder, primers, brass, bullets inventory, multi-unit conversions, batch manufacturing deductions, and load development ladders. | `components`, `load_recipes`, `load_ladder_tests` | ~25.6 KB |
| `maintenance` | **Armorer & Maintenance** | `armorer` | Round count telemetry, cleaning schedules, service logs, optic torque & zero registry, and parts ledger. | `custom_schedule_presets`, `maintenance_logs` | ~22.0 KB |
| `ballistics` | **Ballistics Calculator** | `range` | Exterior trajectory solver utilizing standard G1 and G7 ballistic coefficients, density altitude compensation, and optic click charts. | `ballistic_profiles` | ~11.3 KB |
| `nfa` | **NFA Compliance Tracker** | `compliance` | ATF Form 1 and Form 4 tracker, tax stamp archives, trust beneficiary records, suppressor wear, and CLEO notifications. | `nfa_items` | ~12.1 KB |
| `boundbook` | **FFL / C&R Bound Book** | `compliance` | ATF-compliant acquisition and disposition record book for collectors, C&R holders, and FFL licensees (27 CFR Part 478). | `bound_book_entries` | ~6.5 KB |

---

## In-App Integration in ArmoryVault Desktop

1. **Launch ArmoryVault Desktop** (v2.9.0 or later).
2. Click the **Blocks** icon in the sidebar footer (adjacent to Settings).
3. The in-app **Module Center** queries `cook0001/ArmoryVault-Modules` on GitHub to display available extensions.
4. Click **"Download & Install"** on any module:
   - The desktop app downloads the `.zip` archive from GitHub Releases.
   - Files are extracted to `userData/installed_modules/<module_id>/`.
   - The module mounts dynamically into navigation and routes without restarting the application.
5. If you uninstall a module to free disk space:
   - Your data is extracted, encrypted with AES-256-GCM using your vault master key, and archived to `userData/module_archives/<module_id>.enc`.
   - The archive is preserved inside your automated `.zip` backups so your data travels with you.

---

## How to Add a New Module

To build and contribute a new extension:

1. **Create a module folder under `modules/<module_id>/`**:
   ```bash
   mkdir -p modules/competitions
   ```

2. **Add `manifest.json`**:
   ```json
   {
     "id": "competitions",
     "name": "Match & Competition Ledger",
     "version": "1.0.0",
     "minAppVersion": "2.9.0",
     "author": "ArmoryVault",
     "category": "range",
     "description": "Log USPSA/IDPA matches, stage hit factors, penalties, and division gear configurations.",
     "dataKeys": ["competition_matches", "stage_scores"],
     "entry": "index.tsx"
   }
   ```

3. **Add `index.tsx`**:
   Export an object conforming to the `ArmoryModule` TypeScript interface (defining `manifest`, `routes`, `navItems`, and optional `commands`).

4. **Package & Verify**:
   ```bash
   npm run package:modules
   ```
   This generates `dist-modules/module-<module_id>.zip` and updates `modules-index.json` with calculated SHA-256 hashes.

---

## Release Workflow

To release new or updated modules to all ArmoryVault Desktop users:

1. Update the version in `package.json` (e.g. `1.1.0`) or in the module's `manifest.json`.
2. Commit your changes and push a git tag:
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```
3. GitHub Actions (`.github/workflows/release-modules.yml`) automatically:
   - Packages all modules into standalone `.zip` files.
   - Computes SHA-256 cryptographic checksums.
   - Publishes a new GitHub Release with `modules-index.json` and `module-*.zip` assets.
4. **All ArmoryVault Desktop clients worldwide will immediately detect the updated modules via the in-app Module Center!**

---

## License

Released under the [ISC License](LICENSE). Copyright &copy; 2026 Daniel C. (cook0001).

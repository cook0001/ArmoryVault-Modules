# ArmoryVault Modules 📦

Official modular extensions and plugin repository for **[ArmoryVault Desktop](https://github.com/cook0001/ArmoryVault)**.

This repository allows features to be developed, maintained, updated, and released completely independently of the ArmoryVault core desktop application. The core desktop app dynamically checks this repository's releases and enables users to install, update, and manage extensions on-demand via the in-app **Module Center**.

---

## 🧩 Included Modules

| Module ID | Module Name | Category | Description | Data Keys |
| :--- | :--- | :--- | :--- | :--- |
| `reloading` | **Reloading Workbench** | `bench` | Powder, primers, brass, bullets inventory, batch manufacturing, and load development ladders. | `components`, `load_recipes`, `load_ladder_tests`, `target_analyses`, `chrono_strings` |
| `maintenance` | **Armorer & Maintenance** | `armorer` | Round count telemetry, cleaning schedules, service logs, optic zero registry, and parts ledger. | `custom_schedule_presets` |
| `ballistics` | **Ballistics Calculator** | `range` | Long-range exterior ballistics, trajectory tables, drop charts, wind deflection, and optic clicks. | `ballistic_profiles` |
| `nfa` | **NFA & Compliance** | `compliance` | ATF Form 1 and Form 4 tracker, tax stamp status, trust beneficiary records, and CLEO notifications. | `nfa_items` |
| `boundbook` | **FFL / C&R Bound Book** | `compliance` | ATF-compliant acquisition and disposition record book for collectors, C&R holders, and FFL licensees. | `bound_book_entries` |

---

## 🚀 How to Add a New Module

To create a new extension:

1. **Create a folder under `modules/<module_id>/`**:
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
   Export an object conforming to `ArmoryModule` (defining `manifest`, `routes`, `navItems`, and optional `commands`).

4. **Package & Verify**:
   ```bash
   npm run package:modules
   ```
   This generates `dist-modules/module-competitions.zip` and updates `dist-modules/modules-index.json`.

---

## 📦 Release Workflow

Whenever you want to release or update modules:

1. Update the version in `package.json` (e.g. `1.1.0`) or in the specific module's `manifest.json`.
2. Commit your changes and push a git tag:
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```
3. GitHub Actions (`.github/workflows/release-modules.yml`) automatically:
   - Packages all modules into standalone `.zip` files.
   - Computes SHA-256 cryptographic checksums.
   - Publishes a new GitHub Release with `modules-index.json` and `module-*.zip` assets.
4. **All ArmoryVault Desktop clients will immediately see the new/updated modules in their in-app Module Center!**

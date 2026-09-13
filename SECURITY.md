# Security Policy

## Supported Versions

ArmoryVault Modules maintains active security updates and patch support for the official modular extension releases.

| Version | Status | Security Support |
| :--- | :--- | :---: |
| **`v1.0.0`** | Current Production Baseline | Supported |

---

## Core Security & Privacy Model

ArmoryVault Modules adhere to the same zero-compromise privacy standards as the core ArmoryVault ecosystem:

- **Zero-Cloud Architecture**: Modules execute strictly within the local ArmoryVault desktop application environment. Modules do not include telemetry, analytics, tracking pixels, or background outbound connections.
- **Local Isolation**: Each module runs within its own encapsulated component tree, accessing application state exclusively via documented, sanitized props and standard IPC handlers provided by the core host runtime.
- **Package Integrity**: Official module archives distributed via GitHub Releases and the Module Center registry are built directly from version-tagged commits with automated CI linting and testing.

---

## Reporting a Vulnerability

We take the security and integrity of ArmoryVault and its extensions seriously. If you identify a vulnerability, logic flaw, or potential security concern within any official module:

1. **GitHub Security Advisory (Preferred)**:
   Submit a private report via GitHub:
   [Report a Vulnerability on GitHub](https://github.com/cook0001/ArmoryVault-Modules/security/advisories/new)

2. **Issue Tracker**:
   If the concern does not involve sensitive user data exposure or an exploitable security vector, you may open an issue on the [ArmoryVault-Modules Issue Tracker](https://github.com/cook0001/ArmoryVault-Modules/issues).

### Disclosure Guidelines
- Please provide a detailed description of the vulnerability, affected module(s), and step-by-step reproduction instructions.
- Include sample configuration or reproduction scripts where applicable.
- Allow reasonable time for investigation and remediation before public disclosure.
- Security disclosures will be reviewed promptly, and fix releases will be published across the registry.

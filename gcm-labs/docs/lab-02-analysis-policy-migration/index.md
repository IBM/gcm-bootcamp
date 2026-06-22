---
sidebar_position: 1
title: Lab Introduction
---

# Lab 2: IBM Guardium Cryptography Manager (GCM) + HashiCorp Vault

**Hands-On Lab Guide | Post-Quantum Cryptography Migration**

## Background & Lab Introduction

With Lab 1 complete, the CCE agency's Quantum Safe Explorer (QSE) has produced a full Cryptographic Bill of Materials (CBOM) — a living inventory of every cryptographic asset across CCE's hybrid environment, from TLS certificates and SSH keys to database encryption keys and signed firmware.

The findings confirmed what Johnny Utah feared: CCE's cryptographic posture is deeply vulnerable to quantum threats. RSA-1024 and ECDSA P-256 algorithms are present throughout mission-critical systems, and dozens of certificates are within months of expiry with no automated renewal in place.

Lab 2 picks up immediately where Lab 1 left off. Now that the agency knows what it has, it must answer three urgent operational questions:

- **Analysis** — What is our actual risk exposure, ranked by business criticality?
- **Policy & Management** — What cryptographic policies must we enforce enterprise-wide and how do we automate enforcement?
- **Migration** — How do we begin the controlled migration of vulnerable assets to NIST-standardized post-quantum algorithms without disrupting live operations?

These three questions map directly to the lab phases: Discovery surfaces the data for analysis; Assessment answers the risk-exposure question; Execution delivers the migration; and Sustain validates the remediation and introduces TDE key management for data-at-rest protection.

In this lab, you will take on the role of **Bohdi, CCE's Security Administrator**. Your mission is to use IBM tools and integrated partner capabilities — IBM Guardium Cryptography Manager (GCM) and HashiCorp Vault — to discover, assess, and remediate cryptographic vulnerabilities in CCE's infrastructure, specifically focusing on the **sampleapp.test.lab** application that uses weak RSA-1024 certificates.

:::info[CCE SCENARIO]

NSA issues an updated advisory: the quantum timeline has been revised forward. HNDL data captured in the last 18 months is now assessed as being at elevated risk of decryption within the target window. OMB M-23-02 compliance deadlines are immovable.

Johnny Utah convenes an emergency cryptographic posture review. QSE's CBOM data is loaded into GCM. Bohdi, CCE's Security Administrator, is tasked with driving the analysis, setting enterprise policy, and executing the first wave of migration starting with the highest-risk cryptographic assets identified in Lab 1.

Key findings from Lab 1 that drive Lab 2 priorities:

- 19 PQC vulnerabilities (8 non-quantum-resistant RSA, 3 broken MD5, DES and AES).
- 112 ECDSA P-256 keys protecting API gateways and inter-service communication.
- 8 RSA-1024-bit certificates across CCE production systems — all quantum-vulnerable.
- HashiCorp Vault PKI still issuing new certificates using legacy RSA-1024 profiles.
- No enterprise-wide cryptographic security policy currently enforced.

:::

:::tip

No coding experience is required. You will be clicking through pre-built tools in the GCM web interface, running network scans, and using Certificate Lifecycle Management to renew certificates. Follow each step in order.

:::

## Tools You Will Use

| Tool | What It Does |
|------|--------------|
| **IBM Guardium Cryptography Manager (GCM)** | Your command center for cryptographic asset discovery and lifecycle management. GCM scans your network to find certificates, calculates exploitability scores based on algorithm strength and business impact, enforces cryptographic policies, and maintains a living CBOM for compliance reporting. |
| **HashiCorp Vault PKI** | Integrated Certificate Authority (CA) that issues and signs certificates. GCM uses Vault PKI to generate new quantum-resistant certificates during the renewal process, replacing weak RSA-1024 certificates with stronger RSA-2048 (or future PQC algorithms). |
| **Certificate Lifecycle Management (CLM)** | Automated workflow within GCM that discovers certificates, monitors expiration dates, renews certificates before they expire, and deploys updated certificates to target servers — preventing service outages and maintaining continuous compliance. |
| **Network Scanner** | Built-in GCM capability that discovers TLS/SSL certificates across your infrastructure by scanning domains and ports. It identifies weak cryptographic algorithms (RSA-1024, MD5, SHA-1) and generates policy violation alerts. |
| **AI-Powered Risk Assessment** | GCM's AI engine that analyzes discovered certificates, explains vulnerabilities in plain English, calculates exploitability scores, and generates remediation recommendations including ticket creation for tracking fixes. |

## Lab Workflow

Each step below maps to a phase of IBM's Six-Phase PQC Migration Lifecycle. Lab 2 focuses on Phases 3 and 5: ranking assets by quantum urgency (Risk Scoring) and executing the first migration of vulnerable certificates and encryption keys (Pilot Migration). The Sustain step also introduces Phase 6 validation through post-remediation scanning and continuous monitoring.

| Step | Name | What Happens | PQC Lifecycle Phase |
|------|------|--------------|---------------------|
| **1** | **Discover** | Run GCM's network scanner to discover the sampleapp.test.lab certificate. Review the scan results showing 4 IT assets, identify the RSA-1024 certificate with Critical exploitability, and understand the "Small RSA Key Length" policy violation. | Phase 3 — Risk Scoring & Prioritization |
| **2** | **Assess** | Use GCM's AI-powered risk assessment to understand why RSA-1024 is quantum-vulnerable. Review the certificate details showing it is self-signed and untrusted. Adjust business impact settings to see how exploitability scores change. Use the AI-generated ticket creation feature to document the vulnerability. | Phase 3 — Risk Scoring & Prioritization |
| **3** | **Execute** | Use GCM's Certificate Lifecycle Management (CLM) integrated with HashiCorp Vault PKI to renew the weak certificate. Generate a new RSA-2048 certificate signed by the internal CA, download the certificate with private key, and deploy it to the sample application server using the automated deployment script. | Phase 5 — Pilot Testing & Phased Migration |
| **4** | **Sustain** | Run a post-renewal network scan to confirm vulnerability resolution, verify the new RSA-2048 certificate is browser-trusted, and demonstrate live TDE master key rotation using GCM's KMIP key management to protect CCE's database encryption at rest. | Phase 5 & 6 — Pilot Migration / Validation & Monitoring |

---
sidebar_position: 6
title: "Summary & Glossary"
---

# Summary & Glossary

## Lab Summary

In this lab, you completed a real-world PQC migration workflow using IBM Quantum Safe Explorer, IBM Bob, Jenkins CI/CD, and IBM Guardium Cryptography Manager. Here is what CCE accomplished:

| Capability Demonstrated | CCE Outcome |
|-------------------------|-------------|
| **QSE Automated Discovery Pipeline** | CCE secure-chat application scanned; GCM-Jenkins-QSE workflow understood and operational |
| **GCM Vulnerability Assessment** | RSA-1024 vulnerability identified in Client.java (line 32); CWE classifications reviewed; remediation ticket created |
| **IBM Bob AI-Assisted Remediation** | Bob queried live QSE scan data via MCP; RSA-1024 fix applied without deep cryptography expertise; QSE re-scan confirmed reduced vulnerability count |
| **CI/CD Pipeline Validation** | Code committed and pushed; Jenkins triggered; CycloneDX CBOM generated and uploaded to GCM; remediation confirmed with timestamped audit trail |
| **OMB M-23-02 Compliance Foundation** | CCE's first CBOM produced and validated in GCM; discovery-to-remediation evidence trail established; foundation for Labs 2 and 3 ready |

:::info[KEY TAKEAWAY]

PQC migration does not have to be a massive, disruptive project. By using automated scanning tools like QSE and AI-assisted remediation through IBM Bob, the CCE Agency was able to discover, assess, fix, and validate cryptographic vulnerabilities in a single, streamlined workflow — without requiring deep cryptography expertise from every team member involved. The validated CBOM produced in Lab 1 is now the living intelligence foundation for CCE's enterprise-wide PQC migration in Labs 2 and 3.

:::

## Quick Glossary

| Term | Definition |
|------|------------|
| **PQC (Post-Quantum Cryptography)** | Encryption algorithms that can withstand attacks from both classical and quantum computers. NIST finalized the first PQC standards in 2024. |
| **RSA** | A widely-used public-key encryption algorithm that will become vulnerable once large-scale quantum computers exist. |
| **CBOM (Cryptographic Bill of Materials)** | An inventory of every cryptographic algorithm and key used in an application — similar to a software bill of materials (SBOM). |
| **CRQC** | A Cryptographically Relevant Quantum Computer — powerful enough to break current public-key encryption using algorithms like Shor's. |
| **Harvest-Now, Decrypt-Later (HNDL)** | An attack strategy where adversaries collect encrypted data today to decrypt it later once a quantum computer is available. |
| **CI/CD Pipeline (Jenkins)** | An automated process that builds, tests, and scans your code every time a change is committed. A quality control checkpoint. |
| **GCM (IBM Guardium Cryptography Manager)** | A dashboard that collects QSE scan results and gives a centralized view of your organization's cryptographic posture and compliance status. |
| **CWE (Common Weakness Enumeration)** | A standardized catalog of known security weaknesses used to classify vulnerabilities. QSE maps each finding to a CWE ID. |
| **MCP (Model Context Protocol)** | The protocol that connects IBM Bob to live QSE scan data, so Bob's answers are grounded in your actual findings rather than generic knowledge. |
| **CycloneDX CBOM** | The open standard format used by QSE to output the cryptographic inventory. Uploaded automatically to GCM by Jenkins. |

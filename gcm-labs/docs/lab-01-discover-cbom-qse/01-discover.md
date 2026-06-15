---
sidebar_position: 2
title: "Phase 1: Discover"
---

# Phase 1: Discover — Review the Automated Scan Workflow

Review the Automated Scan Workflow — see how QSE, Jenkins, and GCM connect before diving into findings.

## Part 1: Review the QSE Automated Workflow

Before looking at specific vulnerabilities, it is essential to understand how the pieces fit together. The QSE Automated Workflow diagram illustrates the full pipeline CCE uses to discover, track, and validate cryptographic vulnerabilities — the same flow you will execute during this lab.

The pipeline has four key components:

- **QSE Scan:** Performs static analysis of the secure-chat source code. Output: CWE-classified vulnerability findings and a CycloneDX CBOM.
- **Jenkins CI/CD:** Automates the build-scan-report cycle. Every code commit triggers a QSE scan, generates an updated CBOM, and uploads results to GCM.
- **IBM Bob:** IBM's agentic coding IDE and connected to QSE via MCP. Bob queries live scan data to explain findings and apply targeted code fixes.
- **GCM Dashboard:** Aggregates QSE findings and serves as the single source of truth for CCE's cryptographic posture, compliance reporting, and CBOM history.

### Step 1.1 — Open the QSE Workflow Diagram

1. In your browser, click the bookmark labeled **"QSE Workflow"** (labeled **A** on your screen). This opens a diagram showing how GCM, QSE, and the Jenkins CI/CD pipeline work together.

   <img src="/img/lab-01/image1.png" alt="QSE Automated Workflow diagram showing GCM, QSE, and Jenkins pipeline" />

   *QSE Automated Workflow diagram showing GCM, QSE, and Jenkins pipeline*

2. Study the diagram. As you review it, confirm you can identify:

   - Where QSE performs the scan on the source code repository
   - How Jenkins triggers the scan automatically on each code commit
   - How the CBOM flows from Jenkins into GCM
   - Where IBM Bob connects to QSE scan data via MCP

:::note

This diagram represents the exact workflow you will follow in this lab. Each arrow represents an automated handoff — once you commit and push code in Phase 4, Jenkins, QSE, and GCM each play their role without any manual intervention.

:::

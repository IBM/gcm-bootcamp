---
sidebar_position: 2
title: "Step 1: Discover"
---

# Step 1: Discover — Review the Automated Scan Workflow

Review the Automated Scan Workflow — see how QSE, Jenkins, and GCM connect before diving into findings.

## Part 1: Review the QSE Automated Workflow

Before looking at specific vulnerabilities, it is essential to understand how the pieces fit together. The QSE Automated Workflow diagram illustrates the full pipeline CCE uses to discover, track, and validate cryptographic vulnerabilities — the same flow you will execute during this lab.

The pipeline has four key components:

- **QSE Scan:** Performs static analysis of the secure-chat source code. Output: CWE-classified vulnerability findings and a [CycloneDX](https://cyclonedx.org/) CBOM.
- **Jenkins CI/CD:** Automates the build-scan-report cycle. Every code commit triggers a QSE scan, generates an updated CBOM, and uploads results to GCM.
- **IBM Bob:** IBM's agentic coding IDE, connected to QSE via MCP. Bob queries live scan data to explain findings and apply targeted code fixes.
- **GCM Dashboard:** Aggregates QSE findings and serves as the single source of truth for CCE's cryptographic posture, compliance reporting, and CBOM history.

### Step 1.1 — Open the QSE Workflow Diagram

1. In Google Chrome, click the bookmark labeled **"QSE Workflow"** (labeled **A**). This opens a diagram showing how GCM, QSE, and the Jenkins CI/CD pipeline work together.

   ![QSE Automated Workflow diagram showing GCM, QSE, and Jenkins pipeline](/img/lab-01/image1.png)
2. Study the diagram. As you review it, confirm you can identify:

   - Where QSE performs the scan on the source code repository
   - How Jenkins triggers the scan automatically on each code commit
   - How the CBOM flows from Jenkins into GCM
   - Where IBM Bob connects to QSE scan data via MCP

:::note

This diagram represents the exact workflow you will follow in this lab. Each arrow represents an automated handoff — once you commit code in Step 4, Jenkins, QSE, and GCM each play their role without any manual intervention.

:::

:::info[Step 1 Complete]

You have reviewed the automated QSE-Jenkins-GCM workflow and understand how cryptographic scan results flow from source code into GCM's dashboard. Proceed to Step 2 to review the actual vulnerabilities discovered in the secure-chat application.

:::


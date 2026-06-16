---
sidebar_position: 2
title: "Phase 1: Discover"
---

# Phase 1: Discover — Run GCM's Network Scanner

Run GCM's network scanner to discover cryptographic assets and identify quantum-vulnerable certificates.

This phase establishes the cryptographic inventory baseline by running GCM's network scanner across the environment, which discovers the sampleapp.test.lab service and surfaces its RSA-1024 certificate. Discovery is the foundation of crypto-agility: you cannot assess, enforce policy on, or remediate assets you cannot see. The scan turns an unknown attack surface into a ranked, living CBOM, automatically flagging the RSA-1024 key as Critical exploitability and tying it to the "Small RSA Key Length" policy violation so the team knows exactly where to act first.

## Certificate Lifecycle Management

Inventory management is key to maintaining crypto-agility. Here, you'll run scans, review discovered assets and perform lifecycle operations like renewing and deploying certificates. These tasks demonstrate how GCM helps reduce risk and enforce cryptographic policies.

### Step 1: Run Network Scan (Sample App)

1. Click top menu > **Discovery** > **Discovery profiles**
2. **Network Scan** > **…** > **Run discovery now (A)**
3. Click **Refresh icon (B)** until Status is **Completed**
4. Click on **4 IT Assets link (C)**

<img src="/img/lab-02/image1.png" alt="GCM Discovery Profiles screen with Network Scan Run discovery now and the 4 IT Assets link highlighted" />

*GCM Discovery Profiles screen with Network Scan "Run discovery now" and the 4 IT Assets link highlighted*

### Step 2: Review Discovered Assets

1. Click on the **sampleapp.test.lab:5080** IT asset **(A)** to open side panel

<img src="/img/lab-02/image2.png" alt="GCM Inventory IT-assets table filtered to Network Scan, sampleapp.test.lab:5080 flagged Critical" />

*GCM Inventory IT-assets table filtered to Network Scan, sampleapp.test.lab:5080 flagged Critical*

2. Click on **Explain (B)** to understand why Exploitability is Critical
3. Change **Business impact (C)** to see how this changes the Exploitability. Value is updated in the main table.

:::note

Sometimes the value doesn't change. This is a known issue. Leave it as Moderate (C) again. Mouse over **Small RSA Key Length (D)** policy violation. Close side panel and click on the **Certificate (E)** link.

:::

<img src="/img/lab-02/image3.png" alt="sampleapp.test.lab:5080 asset side panel showing Unsafe/Critical posture, cert-69, and Small RSA Key Length violation" />

*sampleapp.test.lab:5080 asset side panel showing Unsafe/Critical posture, cert-69, and Small RSA Key Length violation*

:::info[Phase 1 Complete]

You've discovered the sampleapp.test.lab certificate with RSA-1024 encryption, identified as Critical exploitability due to quantum vulnerability.

:::

---
sidebar_position: 3
title: "Phase 2: Assess"
---

# Phase 2: Assess — AI-Powered Risk Assessment

Use GCM's AI-powered risk assessment to understand vulnerabilities and create remediation plans.

Here the focus shifts from "what do we have" to "how bad is it and what do we do about it." GCM's AI-powered risk assessment explains in plain language why RSA-1024 is quantum-vulnerable, you confirm directly in the browser that the certificate is self-signed and untrusted, and you model how changing business impact moves the exploitability score. Generating a remediation ticket converts the raw finding into a tracked, auditable work item with an AI-drafted title, description, and recommended fix — the kind of evidence trail required to demonstrate compliance under mandates such as OMB M-23-02.

### Step 1: Check Certificate in Browser

Let's verify the actual certificate that the application is using by connecting directly to it.

1. Click on **SampleWebs** > **Sample App** (right-click) > **Open in new tab (A)**
2. Click **Show advanced** > **Proceed to sampleapp.test.lab (unsafe) (A)**
3. Click **Not Secure** > **Certificate details (B)**

<img src="/img/lab-02/image4.png" alt="Your connection is not private warning for sampleapp.test.lab with Certificate details highlighted" />

*"Your connection is not private" warning for sampleapp.test.lab with Certificate details highlighted*

4. Notice this is a self-signed certificate **(A)** which is not trusted

<img src="/img/lab-02/image5.png" alt="Certificate Viewer showing the self-signed sampleapp.test.lab certificate hierarchy" />

*Certificate Viewer showing the self-signed sampleapp.test.lab certificate hierarchy*

### Step 2: Review Certificate Details and Create Ticket

Return to the GCM tab...

1. Click on the **cert-69 (A)** to open side panel. The certificate name may vary but should follow the same naming convention.

<img src="/img/lab-02/image6.png" alt="GCM Cryptographic Objects view with cert-69 (High combined violation severity) highlighted" />

*GCM Cryptographic Objects view with cert-69 (High combined violation severity) highlighted*

2. Review **RSA Key size (B)** is 1024 and Produces a Policy Violation
3. Notice AI generated Summary at the top
4. Click **Create Ticket (C)**

<img src="/img/lab-02/image7.png" alt="cert-69 side panel with AI-generated summary and RSA-1024 details, Create Ticket flow open" />

*cert-69 side panel with AI-generated summary and RSA-1024 details, Create Ticket flow open*

:::note

Notice how AI will generate a Title and Description, which includes affected IT assets and the following Recommendation:

- [Classic] Generate a new RSA certificate with a key length of at least 2048 bits to replace 'cert-69'.
- [Classic] Update all systems and applications that use this certificate to reference the new certificate.
- [Classic] Verify that the new certificate is correctly deployed and trusted by all relevant parties.

:::

:::info[Phase 2 Complete]

You've assessed the quantum vulnerability, confirmed the certificate is self-signed and untrusted, and reviewed AI-generated remediation recommendations. Now let's execute the fix.

:::

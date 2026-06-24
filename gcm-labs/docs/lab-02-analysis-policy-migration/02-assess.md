---
sidebar_position: 3
title: "Step 2: Assess"
---

# Step 2: Assess — AI-Powered Risk Assessment

Use GCM's AI-powered risk assessment to understand vulnerabilities and prioritize remediation.

:::tip

GCM should be open from Step 1. If you closed it, reopen it using the GCM bookmark and navigate to **Inventory → IT Assets**.

:::

Here the focus shifts from "what do we have" to "how bad is it and what do we do about it." GCM's AI-powered risk assessment explains in plain language why RSA-1024 is quantum-vulnerable, you confirm directly in the browser that the certificate is self-signed and untrusted, and you model how changing business impact moves the exploitability score.

### Step 1: Check Certificate in Browser

Let's verify the actual certificate that the application is using by connecting directly to it.

1. Click on **SampleWebs** > **Sample App** (right-click) > **Open in new tab (A)**
2. Click **Show advanced** > **Proceed to sampleapp.test.lab (unsafe) (A)**
3. Click **Not Secure** > **Certificate details (B)**

!["Your connection is not private" warning for sampleapp.test.lab with Certificate details highlighted](/img/lab-02/Phase2.1.png)

*"Your connection is not private" warning for sampleapp.test.lab with Certificate details highlighted*

4. Notice this is a self-signed certificate **(A)** which is not trusted

![Certificate Viewer showing the self-signed sampleapp.test.lab certificate hierarchy](/img/lab-02/Phase2.2.png)

*Certificate Viewer showing the self-signed sampleapp.test.lab certificate hierarchy*

![GCM Cryptographic Objects view with cert-69 (High combined violation severity) highlighted](/img/lab-02/Phase2.3.png)

*GCM Cryptographic Objects view with cert-69 (High combined violation severity) highlighted*

:::note

The following steps reference **cert-69**. Your certificate may have a different name but will follow the same cert-N naming convention.

:::

### Step 2: Review Certificate Details

Return to the GCM tab:

1. Click on the **cert-69 (A)** to open side panel.
2. Review **RSA Key size (B)** is 1024 and produces a Policy Violation.
3. Review the AI-generated Summary at the top.

![cert-69 side panel showing RSA-1024 key size, policy violation, and AI-generated summary](/img/lab-02/Phase2.4.png)

*cert-69 side panel showing RSA-1024 key size, policy violation, and AI-generated summary*

:::note

In a production workflow, this is where Bohdi would click **Create Ticket** to generate a tracked remediation work item. GCM pre-populates the ticket with an AI-drafted title, description, affected assets, and the following recommended fixes:

- Generate a new RSA certificate with a key length of at least 2048 bits to replace 'cert-69'.
- Update all systems and applications that use this certificate to reference the new certificate.
- Verify that the new certificate is correctly deployed and trusted by all relevant parties.

:::

:::info[Step 2 Complete]

You've assessed the quantum vulnerability, confirmed the certificate is self-signed and untrusted, and reviewed the AI-generated analysis and recommended fixes. Proceed to Step 3 to renew the certificate and deploy a stronger replacement.

:::


---
sidebar_position: 3
title: "Step 2: Assess"
---

# Step 2: Assess — Review Vulnerabilities in GCM

Review Vulnerabilities in GCM — as Bohdi, CCE's Security Administrator, use the GCM dashboard to find and prioritize cryptographic weaknesses.

## Part 2: Identify Vulnerabilities in Guardium Cryptography Manager

IBM Guardium Cryptography Manager (GCM) is your command center. It shows you every application that has been scanned, what cryptographic algorithms are in use, and which ones have known weaknesses. In this section, you are acting as Bohdi, CCE's Security Administrator — reviewing findings and deciding what the development team needs to fix.

### Step 1: Open GCM

1. In Google Chrome, click the bookmark labeled **"GCM"**. This opens the IBM Guardium Cryptography Manager dashboard.

2. Delete the GCM cookies so you start with a fresh session: click the **site information icon** to the left of the address bar, select **Cookies and site data** > **Manage on-device site data**, delete the entries for the GCM address, then refresh the page.

3. Log in by clicking "Login with OIDC" and use the pre-populated credentials.

### Step 2: Navigate to the Code Repository

1. In GCM, open the top menu.

   ![GCM page with button to open top menu highlighted](/img/lab-01/image2.png)

2. Select **"Portfolio view"** from the top menu.

   ![GCM top menu with portfolio view highlighted](/img/lab-01/image3.png)

3. Find the entry for the **secure-chat** application (the Impacted Code Assets count may differ from the screenshot, e.g., 7 instead of 8) and click the value in the **"Impacted code assets"** column (labeled **A**). This opens a list of all source code files that contain cryptographic functions.

   ![GCM Inventory showing code repositories with secure-chat highlighted](/img/lab-01/image4.png)

4. Click the **"Vulnerabilities"** tab (labeled **A**) to see a list of detected security weaknesses.

   ![Impacted code assets page for secure-chat with Vulnerabilities tab highlighted](/img/lab-01/image5.png)

5. Locate the vulnerability called **"Use of small key size: 1024"** and click on it to expand the details.

   ![Expanding the Use of small key size: 1024 vulnerability details](/img/lab-01/image6.png)

   *GCM Vulnerabilities tab showing Client.java with "Use of small key size: 1024"*

:::note

The number of vulnerabilities, impacted code assets, and other counts in your environment may differ from the numbers shown in the screenshots. This is expected.

:::

:::note

A 1024-bit RSA key is considered too small by modern security standards — it can be cracked by today's computers, let alone a quantum computer running Shor's algorithm. NIST recommends a minimum of 2048 bits for RSA and recommends migrating away from RSA entirely in favor of NIST-approved PQC algorithms.

:::

:::note

In a production workflow, this is where Bohdi would create a formal remediation ticket from this finding — GCM supports direct ticket creation pre-populated with the vulnerability details, affected files, and AI-generated fix recommendations, creating the auditable work item trail required for compliance.

:::

:::tip

You are now switching roles. You have reviewed the findings as the Security Administrator and will now act as the Developer who must fix the vulnerability at the code level using the QSE plugin and IBM Bob.

:::

:::info[Step 2 Complete]

You have reviewed CCE's vulnerability findings in GCM and identified the RSA-1024 weakness in Client.java. Proceed to Step 3 to fix the vulnerability using IBM Bob.

:::


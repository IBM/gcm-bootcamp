---
sidebar_position: 3
title: "Phase 2: Assess"
---

# Phase 2: Assess — Review Vulnerabilities in GCM

Review Vulnerabilities in GCM — as Bohdi, CCE's Security Administrator, use the GCM dashboard to find and prioritize cryptographic weaknesses.

## Part 2: Identify Vulnerabilities in Guardium Cryptography Manager

IBM Guardium Cryptography Manager (GCM) is your command center. It shows you every application that has been scanned, what cryptographic algorithms are in use, and which ones have known weaknesses. In this section, you are acting as Bohdi, CCE's Security Administrator — reviewing findings and deciding what the development team needs to fix.

### Step 1: Open GCM

1. In your browser, click the bookmark labeled **"GCM"**. This opens the IBM Guardium Cryptography Manager dashboard.

2. Log in with the credentials provided by your lab facilitator if prompted.

### Step 2: Navigate to the Code Repository

1. In GCM, open the top menu

   ![GCM page with button to open top menu highlighted](/img/lab-01/image2.png)

2. Select **"Portfolio view"** from the top menu.

   ![GCM top menu with portfolio view highlighted](/img/lab-01/image3.png)

3. Find the entry for the **secure-chat** application and click the value in the **"Impacted code assets"** column (labeled **A**). This opens a list of all source code files that contain cryptographic functions.

   ![GCM Inventory showing code repositories with secure-chat highlighted](/img/lab-01/image4.png)

4. Click the **"Vulnerabilities"** tab (labeled **A**) to see a list of detected security weaknesses.

   ![Impacted code assets page for secure-chat with Vulnerabilities tab highlighted](/img/lab-01/image5.png)

5. Locate the vulnerability called **"Use of small key size: 1024"** and click on it to expand the details.

   ![Expanding the Use of small key size: 1024 vulnerability details](/img/lab-01/image6.png)

   *GCM Vulnerabilities tab showing Client.java with "Use of small key size: 1024"*

:::note

A 1024-bit RSA key is considered too small by modern security standards — it can be cracked by today's computers, let alone a quantum computer running Shor's algorithm. NIST recommends a minimum of 2048 bits for RSA and recommends migrating away from RSA entirely in favor of NIST-approved PQC algorithms.

:::

### Step 3: Create a Ticket for the Development Team

As CCE's Security Administrator, formally flag this issue for the development team. In a real workflow, this becomes a traceable work item in your project management system.

1. Note the exact location: **line 32 of Client.java** in the secure-chat application.

2. Create a ticket (or note) for the development team: *"Fix RSA-1024 key generation on line 32 of Client.java. Upgrade to minimum RSA-2048 or migrate to a NIST PQC algorithm."*

:::tip

You are now switching roles. You have received the ticket and will now act as the Developer who must find and fix the vulnerability at the code level using the QSE plugin and IBM Bob.

:::

:::info[Phase 2 Complete]

You have reviewed CCE's vulnerability findings in GCM, identified the RSA-1024 weakness in Client.java, and created a remediation ticket for the development team. Proceed to Phase 3 to fix the vulnerability using IBM Bob.

:::

---

Proceed to **[Phase 3: Execute →](./execute)**

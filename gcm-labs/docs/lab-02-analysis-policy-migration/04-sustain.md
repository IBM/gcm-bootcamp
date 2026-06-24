---
sidebar_position: 5
title: "Step 4: Sustain"
---

# Step 4: Sustain — Validate Remediation and Continuous Monitoring

Validate the remediation was successful and establish continuous monitoring for ongoing compliance.

Remediation only counts if it is verified and maintained. A post-remediation rescan confirms exploitability has dropped from Critical to Medium, the RSA key-length violation is gone, and the new RSA-2048 certificate is now trusted by browsers. Just as importantly, this phase shows that PQC violations still remain — RSA-2048, while stronger, is still quantum-vulnerable — which frames the next stage of the journey toward NIST-standardized post-quantum algorithms (ML-KEM / ML-DSA) and reinforces continuous monitoring as an ongoing discipline rather than a one-time fix.

### Step 1: Run Post-Remediation Scan

1. Click top menu > **Discovery** > **Discovery profiles**
2. **Network Scan** > **…** > **Run discovery now (A)**
3. Click **Refresh icon (B)** until Status is **Completed**
4. Click on **4 IT Assets link (C)**

![GCM Discovery Profiles re-running the Network Scan after remediation](/img/lab-02/Phase4.1.png)

*GCM Discovery Profiles re-running the Network Scan after remediation*

### Step 2: Verify Vulnerability Resolution

1. Click on **sampleapp.test.lab:5080**
2. Risk Level has been reduced from **Critical** to **Medium (A)**
3. And no RSA key length violation shows **(B)** any more
4. Click **Certificate (C)** to see the new certificate

![GCM Inventory and asset panel showing exploitability reduced to Medium with no RSA key-length violation](/img/lab-02/Phase4.2.png)

*GCM Inventory and asset panel showing exploitability reduced to Medium with no RSA key-length violation*

5. Click on the new certificate **cert-69** that has been associated to the IT Asset
6. Now the Key Size is **RSA 2048 (A)**
7. In the Classic Violations tab, confirm **No violations found (B)** — the RSA key-length violation has been resolved.
8. However, there are still **PQC Violations (C)**

![Certificate panels showing RSA-2048, no classic violations, and remaining PQC violations](/img/lab-02/Phase4a.png)

*Certificate panels showing RSA-2048, no classic violations, and remaining PQC violations*

### Step 3: Validate Certificate in Browser

Let's verify the certificate is now trusted by the browser:

1. Click on **SampleWebs** > **Sample App** (right-click) > **Open in incognito window (A)**

![SampleWebs menu with Sample App Open in incognito window highlighted](/img/lab-02/Phase4.7.png)

*SampleWebs menu with Sample App "Open in incognito window" highlighted*

2. Click **View site information** > **Connection is secure** > **Show certificate (issued by CLM) (B)**
3. Notice how the **sampleapp.test.lab** certificate is issued by **CLM (B)** and therefore trusted by the browser

![Incognito Certificate Viewer showing the certificate issued by CLM and trusted](/img/lab-02/Phase4.8.png)

*Incognito Certificate Viewer showing the certificate issued by CLM and trusted*

:::info[Step 4 Complete]

You've validated that the quantum-vulnerable RSA-1024 certificate has been successfully replaced with RSA-2048, reducing exploitability from Critical to Medium. The certificate is now trusted by browsers and no longer violates classic cryptographic policies.

:::

:::caution[Important Note]

While RSA-2048 is stronger than RSA-1024, it's still vulnerable to future quantum computers. The remaining PQC Violations indicate that the next step in CCE's quantum-safe journey will be migrating to NIST-standardized post-quantum algorithms (ML-KEM/ML-DSA) which will be covered in future labs.

:::

---

## Step 4 Part 2: Transparent Database Encryption (TDE) Key Management *(Optional)*

:::tip[Optional — Explore if time allows]

This section demonstrates GCM's TDE Key Management capability. **Db2 is not available in this lab environment**, so the workflow is split:

- **Step 1** is interactive — navigate the GCM UI to explore the TDE Clients screen yourself.
- **Steps 2–4** are reference walkthroughs — Db2 is not set up here, so review the screenshots to understand what a full key rotation looks like in practice.

:::

Transparent Database Encryption (TDE) protects sensitive data at rest by encrypting entire database files at the storage layer — invisible to applications but critical to CCE's data security posture. For CCE, whose mission involves protecting the United States' commodity-backed digital currency ledger, any database encryption key compromise is a national security event.

GCM's TDE Key Management capability provides centralized visibility and control over TDE clients across CCE's database fleet, with GCM acting as the KMIP keystore that authorizes all database encryption operations.

### Step 1: Review TDE Clients in GCM

1. Click top menu > **Inventory** > **TDE clients**
2. Click **Configure TDE client (A)**

![GCM TDE Clients inventory with the DB2 client (Active KMIP, Complete linking) and Configure TDE client](/img/lab-02/Phase4.9.png)

*GCM TDE Clients inventory with the DB2 client (Active KMIP, Complete linking) and Configure TDE client*

3. Review the supported database types **(B)** — GCM supports IBM Db2, Oracle Database, Microsoft SQL Server, MySQL/MariaDB, and PostgreSQL. For CCE, IBM Db2 is the primary database platform running the digital currency ledger.
4. Click **Cancel (C)** to close the configuration dialog without saving.
5. Click on the existing **DB2 TDE Client (D)** to review its current configuration.

![Configure TDE client dialog with the Database type dropdown showing supported platforms](/img/lab-02/Phase4.10.png)

*Configure TDE client dialog with the Database type dropdown showing supported platforms*

The existing Db2 TDE Client is already registered in GCM with two AES-256 symmetric keys that were activated during CCE's initial GCM onboarding. The KMIP client certificate status is **Active** and Database Linking is **Complete** — confirming that GCM is the live keystore authorizing Db2's encryption operations.

---

:::note[Reference Walkthrough — Db2 Not Available in This Environment]

The following steps show what TDE key management looks like end-to-end in a full deployment. Db2 is not configured in this lab, so these are illustrative — review the screenshots to understand the workflow.

### Step 2: Connect to the Database Server and Review Encryption Status

In a full deployment, the lab environment includes pre-configured shell aliases for common Db2 operations: `connect` opens the database connection, `info` displays encryption status, and `rotate` executes key rotation.

An administrator would:
1. Click the **SSH icon** on the Taskbar to open an SSH connection to the RHEL server.
2. At the prompt, type the **connect** alias to connect to the Db2 database as db2inst1.
3. Type the **info** alias to run the encryption info command and review the current configuration.

The output below shows what a healthy TDE configuration looks like — AES-256 encryption with a KMIP keystore pointing to GCM:

![Db2 encryptioninfo output showing AES-256 and a KMIP keystore with master key labels](/img/lab-02/Phase4.11.png)

*Db2 encryptioninfo output showing AES-256 and a KMIP keystore with master key labels*

Key details to note:
- The database is encrypted with **AES-256**
- The keystore type is **KMIP** (pointing to GCM)
- The current master key label is visible

### Step 3: Rotate the Master Encryption Key

To rotate the master encryption key, an administrator would type the **rotate** alias to execute the rotation command against the live Db2 instance.

A successful rotation returns **Status 0** and assigns a new master key label, as shown below:

![Rotation output showing Return Status 0 and a new master key label](/img/lab-02/Phase4.12.png)

*Rotation output showing Return Status 0 and a new master key label*

### Step 4: Verify the Rotated Key in GCM

After rotation, the new key is immediately visible in GCM. An administrator would navigate to **Inventory** > **Cryptographic objects** to confirm the new AES-256 symmetric key appears with a current activation timestamp.

![GCM Cryptographic Objects showing the newly rotated AES-256 key with activation timestamp](/img/lab-02/Phase4.13.png)

*GCM Cryptographic Objects showing the newly rotated AES-256 key with activation timestamp*

![GCM TDE key management updated view after key rotation](/img/lab-02/Phase4.13.png)

*GCM TDE key management updated view after key rotation*

![GCM TDE client showing updated key inventory after rotation](/img/lab-02/Phase4.13.png)

*GCM TDE client showing updated key inventory after rotation*

:::

:::info[TDE Walkthrough Complete]

You've explored GCM's TDE Key Management capability — navigating the TDE Clients inventory and reviewing how GCM acts as the KMIP keystore for database encryption operations. In a full deployment, this workflow enables centralized, auditable master key rotation for CCE's Db2 database fleet, satisfying OMB M-23-02 data-at-rest encryption requirements without touching application code.

:::


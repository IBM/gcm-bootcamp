---
sidebar_position: 5
title: "Phase 4: Sustain"
---

# Phase 4: Sustain — Validate Remediation and Continuous Monitoring

Validate the remediation was successful and establish continuous monitoring for ongoing compliance.

Remediation only counts if it is verified and maintained. A post-remediation rescan confirms exploitability has dropped from Critical to Medium, the RSA key-length violation is gone, and the new RSA-2048 certificate is now trusted by browsers. Just as importantly, this phase shows that PQC violations still remain — RSA-2048, while stronger, is still quantum-vulnerable — which frames the next stage of the journey toward NIST-standardized post-quantum algorithms (ML-KEM / ML-DSA) and reinforces continuous monitoring as an ongoing discipline rather than a one-time fix.

### Step 1: Run Post-Remediation Scan

1. Click top menu > **Discovery** > **Discovery profiles**
2. **Network Scan** > **…** > **Run discovery now (A)**
3. Click **Refresh icon (B)** until Status is **Completed**
4. Click on **4 IT Assets link (C)**

<img src="/img/lab-02/image14.png" alt="GCM Discovery Profiles re-running the Network Scan after remediation" />

*GCM Discovery Profiles re-running the Network Scan after remediation*

### Step 2: Verify Vulnerability Resolution

1. Click on **sampleapp.test.lab:5080**
2. Exploitability has been reduced from **Critical** to **Medium (A)**
3. And no RSA key length violation shows **(B)** any more
4. Click **Certificate (C)** to see the new certificate

<img src="/img/lab-02/image15.png" alt="GCM Inventory and asset panel showing exploitability reduced to Medium with no RSA key-length violation" />

*GCM Inventory and asset panel showing exploitability reduced to Medium with no RSA key-length violation*

5. Click on the new certificate **sampleapp (A)** that has been associated to the IT Asset

<img src="/img/lab-02/image16.png" alt="GCM Cryptographic Objects showing the new sampleapp certificate linked to the IT asset" />

*GCM Cryptographic Objects showing the new sampleapp certificate linked to the IT asset*

6. Now the Key Size is **RSA 2048 (B)**
7. In the Classic Violations tab, you can also see there are **No violations found (C)** or the original Key Size violation is no longer there
8. However, there are still **PQC Violations (D)**

<img src="/img/lab-02/image17.png" alt="Certificate panels showing RSA-2048, no classic violations, and remaining PQC violations" />

*Certificate panels showing RSA-2048, no classic violations, and remaining PQC violations*

### Step 3: Validate Certificate in Browser

Let's verify the certificate is now trusted by the browser:

1. Click on **SampleWebs** > **Sample App** (right-click) > **Open in incognito window (A)**

<img src="/img/lab-02/image18.png" alt="SampleWebs menu with Sample App Open in incognito window highlighted" />

*SampleWebs menu with Sample App "Open in incognito window" highlighted*

2. Click **View site information** > **Connection is secure** > **Show certificate (issued by CLM) (B)**
3. Notice how the **sampleapp.test.lab** certificate is issued by **CLM (B)** and therefore trusted by the browser

<img src="/img/lab-02/image19.png" alt="Incognito Certificate Viewer showing the certificate issued by CLM and trusted" />

*Incognito Certificate Viewer showing the certificate issued by CLM and trusted*

:::info[Phase 4 Complete]

You've validated that the quantum-vulnerable RSA-1024 certificate has been successfully replaced with RSA-2048, reducing exploitability from Critical to Medium. The certificate is now trusted by browsers and no longer violates classic cryptographic policies.

:::

:::caution[Important Note]

While RSA-2048 is stronger than RSA-1024, it's still vulnerable to future quantum computers. The remaining PQC Violations indicate that the next step in CCE's quantum-safe journey will be migrating to NIST-standardized post-quantum algorithms (ML-KEM/ML-DSA) which will be covered in future labs.

:::

---

## Phase 4 Part 2: Transparent Database Encryption (TDE) Key Management

### Background — Why TDE Key Management Matters for CCE

Transparent Database Encryption (TDE) protects sensitive data at rest by encrypting entire database files at the storage layer — invisible to applications but critical to the agency's data security posture.

For CCE, whose mission involves protecting the United States' commodity-backed digital currency ledger, any database encryption key compromise is a national security event.

GCM's TDE Key Management capability provides centralized visibility and control over TDE clients across CCE's database fleet.

### GCM TDE Client Overview — Supported Database Types

The existing Db2 TDE Client is already registered in GCM with two AES-256 symmetric keys active, both created in December 2025 during CCE's initial GCM onboarding. The KMIP client certificate status is Active and Database Linking is Complete — confirming that GCM is the live keystore authorizing Db2's encryption operations.

Bohdi will explore GCM's TDE client inventory, review the existing IBM Db2 TDE configuration, and execute a live master encryption key rotation — a critical operational step for maintaining cryptographic hygiene and demonstrating readiness under NSA CNSA 2.0 and OMB M-23-02 mandates.

1. Click top menu > **Inventory** > **TDE clients**
2. Click **Configure TDE client (A)**

<img src="/img/lab-02/image20.png" alt="GCM TDE Clients inventory with the DB2 client (Active KMIP, Complete linking) and Configure TDE client" />

*GCM TDE Clients inventory with the DB2 client (Active KMIP, Complete linking) and Configure TDE client*

3. Check all supported database types **(B)**
4. Click **cancel (C)** to stop the TDE client configuration
5. Click on the existing **DB2 TDE Client (D)**

<img src="/img/lab-02/image21.png" alt="Configure TDE client dialog with the Database type dropdown showing supported platforms" />

*Configure TDE client dialog with the Database type dropdown showing supported platforms*

GCM's TDE Key Management module supports multiple enterprise database platforms. Bohdi will first explore the full list of supported database types in GCM before drilling into CCE's existing Db2 TDE client configuration. Supported database types visible in the "Configure TDE client" dialog include:

- IBM Db2
- Oracle Database
- Microsoft SQL Server
- MySQL / MariaDB
- PostgreSQL

For CCE, IBM Db2 is the primary database platform running the digital currency ledger.

### Rotate Key from DB2

1. Click on **SSH icon** on the Taskbar to ssh into the RHEL server with user admin
   - Switch user to **db2inst1**. Run Connect command to Connect to the Database.
2. Run the following commands to see current configuration

   :::tip
   You only need to type the alias. ie: connect, **info**, **rotate**
   :::

<img src="/img/lab-02/image22.png" alt="Db2 encryptioninfo output showing AES-256 and a KMIP keystore with master key labels" />

*Db2 encryptioninfo output showing AES-256 and a KMIP keystore with master key labels*

3. Rotate key using these commands. Run Rotate command to rotate the key.

<img src="/img/lab-02/image23.png" alt="Rotation output showing Return Status 0 and a new master key label" />

*Rotation output showing Return Status 0 and a new master key label*

4. Check in GCM to see the new Rotated key. Go to **Inventory** and **Cryptographic objects**.

<img src="/img/lab-02/image24.png" alt="GCM Cryptographic Objects showing the newly rotated AES-256 key with activation timestamp" />

*GCM Cryptographic Objects showing the newly rotated AES-256 key with activation timestamp*

### Phase 4.2 Outcome — CCE TDE Key Management

Bohdi has demonstrated end-to-end TDE key management for CCE's IBM Db2 database.

- GCM's role as the KMIP keystore was validated — Db2 confirmed AES-256 encryption with GCM as the active key authority.
- The live master key rotation via SYSPROC.ADMIN_ROTATE_MASTER_KEY completed without database downtime.
- GCM immediately reflected the new AES-256 symmetric key with a timestamped activation record, providing a complete audit trail.
- CCE's digital currency ledger remained protected at rest throughout the operation — satisfying OMB M-23-02 data-at-rest encryption requirements and NSA CNSA 2.0 key management hygiene standards.

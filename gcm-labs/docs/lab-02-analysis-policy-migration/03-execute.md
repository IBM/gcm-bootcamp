---
sidebar_position: 4
title: "Phase 3: Execute"
---

# Phase 3: Execute — Certificate Renewal and Deployment

Use GCM's Certificate Lifecycle Management (CLM) integrated with Vault PKI to renew and deploy the quantum-resistant certificate.

This is the remediation step. Using Certificate Lifecycle Management integrated with HashiCorp Vault PKI, you renew the weak certificate by issuing a new RSA-2048 certificate signed by an internal CA, download it together with its private key, and deploy it to the target server through an automated script that restarts the application container. This demonstrates the operational heart of crypto-agility: replacing a vulnerable asset with a stronger, CA-trusted one quickly and repeatably, without manual reconfiguration or service downtime.

### Step 1: Initiate Certificate Renewal

Directly from Phase 2 (reference previous images) within GCM using the Certificate Lifecycle Management capability and Vault PKI integration:

1. Click **back arrow (D)** to skip ticket creation
2. Ensure **Certificate Lifecycle Management (E)** is selected
3. Click **Manage > Renew (F)**

![cert-69 panel with Certificate Lifecycle Management selected](/img/lab-02/Phase2.5\(3.1\).png)

*cert-69 panel with Certificate Lifecycle Management selected*

### Step 2: Configure New Certificate

1. Select **CA-signed certificate (A)**
2. Fill in required field values **(B)** and Click **Next (C)**

![Renew certificate wizard — Select certificate authority (Vault PKI / CLM / VaultCA)](/img/lab-02/Phase2.6\(3.2\).png)

*Renew certificate wizard — Select certificate authority (Vault PKI / CLM / VaultCA)*

:::tip

All these values are already pre-recorded for your convenience, just click on the fields.

:::

3. Ensure the values for **Name (certificate alias)** and **Common name** match **(A)**
4. Click **Next (B)**

![Renew certificate wizard — Define certificate with alias and Common Name matched to sampleapp.test.lab](/img/lab-02/Phase3.3.png)

*Renew certificate wizard — Define certificate with alias and Common Name matched to sampleapp.test.lab*

5. Continue clicking **Next** until you reach the **Preview** page then click **Save** to renew the certificate.

:::tip

If you get an error after trying to save, reduce the validity period as seen in the screenshot above.

:::

### Step 2: Download and Deploy Certificate

1. Close the right panel
2. Type **sampleapp (A)** in the search bar and Click on the newly created **sampleapp (B)**
3. Click **Manage** > **Download (C)**

![GCM Inventory with the new sampleapp certificate selected](/img/lab-02/Phase3.5.png)

*GCM Inventory with the new sampleapp certificate selected*

4. Select **Certificate with private key (A)**
5. Select **PEM (B)** File Format
6. Enter **"pass"** as Password **(C)**
7. Click **Download (D)**

![Download Certificate dialog set to Certificate with private key, PEM format](/img/lab-02/Phase3.7.png)

*Download Certificate dialog set to Certificate with private key, PEM format*

8. Certificate and Keys will be downloaded **(A)** in a zip file
9. Click on the **Deploy Certificate (B)** script in the Taskbar
10. Zip file **(C)** will be copied to the destination server
11. File will be unzipped on the destination and **sample-web-app container (D)** will be restarted
12. Press any key to exit… **(E)**

![Certificate script copying sampleapp.zip and restarting the sample-web-app container](/img/lab-02/Phase3.8.png)

*Certificate script copying sampleapp.zip and restarting the sample-web-app container*

![Certificate deployment script completed successfully](/img/lab-02/Phase3.9.png)

*Certificate deployment script completed successfully*

:::info[Phase 3 Complete]

You've successfully renewed the RSA-1024 certificate with a new RSA-2048 certificate signed by Vault PKI and deployed it to the sample application server.

:::

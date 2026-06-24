---
sidebar_position: 4
title: "Step 3: Execute"
---

# Step 3: Execute — Certificate Renewal and Deployment

Use GCM's Certificate Lifecycle Management (CLM) integrated with Vault PKI to renew and deploy the quantum-resistant certificate.

This is the remediation step. Using Certificate Lifecycle Management integrated with HashiCorp Vault PKI, you renew the weak certificate by issuing a new RSA-2048 certificate signed by an internal CA, download it together with its private key, and deploy it to the target server through an automated script that restarts the application container. This demonstrates the operational heart of crypto-agility: replacing a vulnerable asset with a stronger, CA-trusted one quickly and repeatably, without manual reconfiguration or service downtime.

### Step 1: Initiate Certificate Renewal

Continuing within GCM from Step 2, with the cert-69 side panel open:

1. Scroll down until you see **Managed by DPM** dropdown (Labeled **A**). Select **Certificate Lifecycle Management** (Labeled **B**).

![cert-69 panel with Managed by DPM dropdown selected](/img/lab-02/Phase2b.png)

2. Click **Manage > Renew (B)**

![cert-69 panel with Manage dropdown](/img/lab-02/Phase2c.png)

### Step 2: Configure New Certificate

1. Select **CA-signed certificate (A)**
2. Fill in required field values **(B)** and Click **Next (C)**

![Renew certificate wizard — Define certificate](/img/lab-02/Phase3.3.png)


3. Set the value for **Validity Period (Days)** to **60** **(A)**. 
4. Click **Next (B)**

![Renew certificate wizard ](/img/lab-02/Phase2d.png)

5. Continue clicking **Next** until you reach the **Preview** page, then click **Save** to renew the certificate.

:::tip

If you get an error after trying to save, reduce the validity period as seen in the screenshot above.

:::

### Step 3: Download and Deploy Certificate

1. Click the **Manage** dropdown **(A)** and select **Download (B)**

![GCM certificate download](/img/lab-02/Phase3a.png)

4. Select **Certificate with private key (A)**
5. Select **PEM (B)** File Format
6. Enter **"pass"** as Password **(C)**
7. Click **Download (D)**

![Download Certificate dialog set to Certificate with private key, PEM format](/img/lab-02/Phase3b.png)

8. Certificate and keys will be downloaded **(A)** in a zip file (named cert-N.zip, not sampleapp.zip)
9. Click on the **Deploy Certificate (B)** script in the Taskbar
10. Zip file **(C)** will be copied to the destination server
11. File will be unzipped on the destination and **sample-web-app container (D)** will be restarted
12. Press any key to exit… **(E)**

![Certificate script copying sampleapp.zip and restarting the sample-web-app container](/img/lab-02/Phase3.7.png)


:::info[Step 3 Complete]

You've successfully renewed the RSA-1024 certificate with a new RSA-2048 certificate signed by HashiCorp Vault PKI and deployed it to the sample application server. Proceed to Step 4 to validate the remediation and manage CCE's database encryption keys.

:::


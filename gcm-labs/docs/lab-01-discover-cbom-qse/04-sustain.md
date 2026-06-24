---
sidebar_position: 5
title: "Step 4: Sustain"
---

# Step 4: Sustain — CI/CD Pipeline + GCM Confirmation

CI/CD Pipeline + GCM Confirmation — commit your fix and confirm the vulnerability is resolved in GCM.

Remediation is not complete until it has been independently validated. Every code change must pass through the Jenkins CI/CD pipeline, which automatically triggers a new QSE scan, regenerates the CBOM, and uploads updated results to GCM — creating the timestamped audit trail needed for OMB M-23-02 compliance.

## Part 4: Commit Your Changes

### Step 1: Open Jenkins and Stage Your Changes in IBM Bob

1. Before committing, open **Jenkins** in your browser using the Jenkins bookmark and log in. Keep the Jenkins tab open — you will switch to it after committing to watch the pipeline run.

   ![Jenkins dashboard open in browser via bookmark](/img/lab-01/image15.png)

2. In IBM Bob, click the **"Source Control"** icon in the left sidebar (labeled **A**).

3. Click on **"Client.java"** (labeled **B**) to preview the changes you are about to commit.

4. Right-click on **"Client.java"** (labeled **B**) and select **"Stage Changes"** (labeled **C**).

5. In the commit message box, type:

   > **"Fix key size vulnerability"**

6. Click **"Commit"** (labeled **E**). Wait a few seconds and watch the commit graph (labeled **F**) update to show your new commit.

   ![IBM Bob Source Control panel with Client.java staged and commit message entered](/img/lab-01/image16.png)

### Step 2: Watch the Jenkins Pipeline Run

1. Switch to the **Jenkins** tab in your browser. Within a few seconds of your commit, a new build will start automatically.

2. Click on the **build progress bar** (labeled **A**) to watch the pipeline run in real time, or click the build number and select **"Console Output"** (labeled **B**) if the build has already finished.

   ![Jenkins dashboard showing new build triggered with Console Output option](/img/lab-01/image17.png)

3. In the Console Output, watch for Jenkins to: scan the code with QSE, generate a findings report, produce a **CycloneDX CBOM** file, and upload it to GCM automatically.

   ![Jenkins Console Output showing CBOM generation and successful file upload to GCM](/img/lab-01/image18.png)

## Part 5: Verify the Results in GCM

With the pipeline complete, return to GCM to confirm that the vulnerability has been resolved and that the updated scan results are reflected in the dashboard.

1. Navigate back to **GCM** (labeled **A**) and click **"Discovery" → "Import profiles"** in the top menu.

2. Check the **"Last import date"** (labeled **C**) for the QSE findings report to confirm it has been updated since your commit.

   ![GCM Discovery Import profiles page showing updated last import date for QSE report](/img/lab-01/image19.png)

3. Click on the **"Code assets"** count (labeled **D**) and select **"secure-chat"**.

4. Confirm that the **"Use of small key size: 1024"** vulnerability is no longer listed in the Vulnerabilities tab.

   ![GCM secure-chat Vulnerabilities tab showing reduced findings after the fix](/img/lab-01/image20.png)

:::tip

If the vulnerability is still showing, wait 30 seconds and refresh the page. The GCM import can take a minute to complete after the Jenkins build finishes. Check the "Last import date" again to confirm the upload completed.

:::

:::info[Step 4 Complete]

The Jenkins pipeline has run, the updated CBOM has been uploaded to GCM, and the RSA-1024 vulnerability no longer appears in the secure-chat findings. CCE's first auditable CBOM is now live in GCM.

:::

---

## Optional: Reset the Lab to Its Starting State

If you want to run through the lab again from the beginning, you can revert the secure-chat code to its original state.

1. Make sure you have at least one committed change after the initial setup commit.

2. Open a terminal in IBM Bob and run:

   > **git reset --hard HEAD~1**

3. Restart IBM Bob so the QSE plugin reloads the updated scan data.

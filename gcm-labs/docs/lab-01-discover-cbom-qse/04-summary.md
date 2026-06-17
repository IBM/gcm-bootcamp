---
sidebar_position: 5
title: "Phase 4: Sustain"
---

# Phase 4: Sustain — CI/CD Pipeline + GCM Confirmation

CI/CD Pipeline + GCM Confirmation — commit your fix, push to trigger Jenkins, and confirm the vulnerability is resolved in GCM.

Remediation is not complete until it has been independently validated. Every code change must pass through the Jenkins CI/CD pipeline, which automatically triggers a new QSE scan, regenerates the CBOM, and uploads updated results to GCM — creating the timestamped audit trail needed for OMB M-23-02 compliance.

## Part 4: Commit and Push Your Changes

### Step A: Open Jenkins and Stage Your Changes in IBM Bob

1. Before committing, open **Jenkins** in your browser using the Jenkins bookmark and log in. Keep the Jenkins tab open — you will switch to it after pushing to watch the pipeline run.

   <img src="/img/lab-01/jenkins-dashboard.png" alt="Jenkins dashboard open in browser via bookmark" />

   *Jenkins dashboard open in browser via bookmark*

2. In IBM Bob, click the **"Source Control"** icon in the left sidebar (labeled **A**).

3. Click on **"Client.java"** (labeled **B**) to preview the changes you are about to commit.

4. Right-click on **"Client.java"** (labeled **B**) and select **"Stage Changes"** (labeled **C**).

5. In the commit message box, type:

   > **"fixed code with bob"**

6. Click **"Commit"** (labeled **E**). Wait a few seconds and watch the commit graph (labeled **F**) update to show your new commit.

   <img src="/img/lab-01/bob-source-control.png" alt="IBM Bob Source Control panel with Client.java staged and commit message entered" />

   *IBM Bob Source Control panel with Client.java staged and commit message entered*

### Step B: Push Your Changes to the Repository

1. After committing, click the **"Sync Changes"** button (or the push arrow icon in the Source Control panel) to push your commit to the remote repository.

2. Alternatively, open the Terminal (**Terminal → New Terminal**), type the following command, and then press enter:

   > **git push**

:::note

The push to the remote repository is what triggers the Jenkins pipeline. A local commit without a push will not start a new Jenkins build. Always push your changes to see them flow through the pipeline and into GCM.

:::

### Step C: Watch the Jenkins Pipeline Run

1. Switch to the **Jenkins** tab in your browser. Within a few seconds of your push, a new build will start automatically.

2. Click on the **build progress bar** (labeled **A**) to watch the pipeline run in real time, or click the build number and select **"Console Output"** (labeled **B**) if the build has already finished.

   <img src="/img/lab-01/jenkins-build-triggered.png" alt="Jenkins dashboard showing new build triggered with Console Output option" />

   *Jenkins dashboard showing new build triggered with Console Output option*

3. In the Console Output, watch for Jenkins to: scan the code with QSE, generate a findings report, produce a **CycloneDX CBOM** file, and upload it to GCM automatically.

   <img src="/img/lab-01/jenkins-console-output.png" alt="Jenkins Console Output showing CBOM generation and successful file upload to GCM" />

   *Jenkins Console Output showing CBOM generation and successful file upload to GCM*

## Part 5: Verify the Results in GCM

With the pipeline complete, return to GCM to confirm that the vulnerability has been resolved and that the updated scan results are reflected in the dashboard.

1. Navigate back to **GCM** (labeled **A**) and click **"Discovery" → "Import profiles"** in the top menu.

2. Check the **"Last import date"** (labeled **C**) for the QSE findings report to confirm it has been updated since your push.

   <img src="/img/lab-01/gcm-import-profiles.png" alt="GCM Discovery Import profiles page showing updated last import date for QSE report" />

   *GCM Discovery Import profiles page showing updated last import date for QSE report*

3. Click on the **"Code assets"** count (labeled **D**) and select **"secure-chat"**.

4. Confirm that the **"Use of small key size: 1024"** vulnerability is no longer listed in the Vulnerabilities tab.

   <img src="/img/lab-01/gcm-vulnerabilities-resolved.png" alt="GCM secure-chat Vulnerabilities tab showing reduced findings after the fix" />

   *GCM secure-chat Vulnerabilities tab showing reduced findings after the fix*

:::tip

If the vulnerability is still showing, wait 30 seconds and refresh the page. The GCM import can take a minute to complete after the Jenkins build finishes. Check the "Last import date" again to confirm the upload completed.

:::

## Optional: Reset the Lab to Its Starting State

If you want to run through the lab again from the beginning, you can revert the secure-chat code to its original state.

1. Make sure you have at least one committed change after the initial setup commit.

2. Open a terminal in IBM Bob and run:

   > **git reset --hard HEAD~1**

3. Push the reset to trigger a new Jenkins scan:

   > **git push --force**

4. Restart IBM Bob so the QSE plugin reloads the updated scan data.


---
sidebar_position: 4
title: "Step 3: Execute"
---

# Step 3: Execute — Fix Vulnerabilities Using QSE + IBM Bob

Fix Vulnerabilities Using QSE + IBM Bob — use the QSE plugin and IBM Bob to understand and fix RSA vulnerabilities.

## Part 3: Fix Vulnerabilities in IBM Bob

You will now open the secure-chat project in IBM Bob, review the exact lines flagged by QSE, and use IBM Bob to fix them — in plain English, no manual code editing required.

:::info[WHY IBM BOB'S MCP INTEGRATION MATTERS]

Bob does not guess at what your vulnerabilities might be. It calls QSE's `list_findings` and `get_finding_detail` tools to retrieve the actual scan data for the secure-chat project. Bob's explanations and proposed fixes are grounded in the precise CWE findings QSE generated — the same findings you just reviewed in GCM. Every fix can be traced back to a specific QSE finding and a specific line of code.

:::

### Step 1: Confirm the QSE Service is Running

1. Before opening IBM Bob, confirm the QSE service is running. Look for the **QSE Service icon** (labeled **A**) in the system tray.

2. If the service is not running, double-click the **QSE Service icon** (labeled **B**) to start it, then minimize the window (labeled **C**).

   ![QSE Service icon in system tray and startup dialog](/img/lab-01/image7.png)

3. Open **IBM Bob**.

   ![IBM Bob IDE open](/img/lab-01/image8.png)

Once IBM Bob is open:

4. Click **File->Open Folder** (labeled **A**)

   ![IBM Bob Open Folder](/img/lab-01/image6b.png)

5. Navigate to and select the **"secure-chat"** folder (labeled **B**), then click **"Select Folder"** (labeled **C**).

   ![IBM Bob Open Folder dialog with secure-chat selected](/img/lab-01/image9.png)

6. Click **Terminal->New Terminal** (labeled **A**), then click the **EXPLORER SCAN RESULTS** tab (labeled **B**).

   ![QSE Scan Results within IBM Bob](/img/lab-01/image9b.png)

### Step 2: Locate the Vulnerability in QSE's Cryptography Analysis

1. Click **"Cryptography analysis"** (labeled **A**) to open a full breakdown of every cryptographic function in the project and its associated vulnerabilities.

2. Click the first entry: **"keygen-(RSA)-(1024 bit)"** (labeled **B**). You will see it has 4 vulnerabilities.

   ![QSE Scan Results showing keygen-RSA-1024 entry with 4 vulnerabilities](/img/lab-01/image9c.png)

3. Click through each vulnerability to jump to the affected line of code and read the details. Pay attention to the **CWE reference** (labeled **E**) — click it to read the full description of the weakness.

   ![QSE Scan Results showing RSA-1024 vulnerabilites](/img/lab-01/image10a.png)

4. In the Cryptography results panel, click **"API discovery"** (labeled **D**) and select **`src\Client.java Line: 32`** (labeled **E**). The QSE plugin will automatically highlight line 32 — the location of the vulnerability.

   ![IBM Bob Cryptography Analysis panel showing keygen-RSA-1024 entry with 4 vulnerabilities](/img/lab-01/image10.png)

:::note

You will notice two types of issues: classic cryptography vulnerabilities (e.g., key size too small) and PQC-specific issues (e.g., use of a non-quantum-resistant algorithm). Both need to be addressed for a complete migration.

:::

### Step 3: Ask Bob to List Your Vulnerabilities

1. Open **IBM Bob** chat window by clicking on the side panel toggle, if not already open.

   ![IBM Bob side panel toggle](/img/lab-01/image11.png)

2. If not logged in, follow the [Sign Into IBM Bob](/docs/getting-started#step-5--sign-into-ibm-bob) steps in the Environment Setup section.

3. Type the following message to Bob:

   > **"List my PQC vulnerabilities"**

4. Confirm that Bob calls MCP tools in the background — you will see tool call indicators in the Bob panel (`list_findings` will appear). If no tools are invoked, ask your lab facilitator to verify the MCP connection.

   <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
     <img src="/img/lab-01/image12.png" alt="IBM Bob panel showing MCP tool call for list_findings with scan summary results" style={{width: '50%'}} />
     <img src="/img/lab-01/image13.png" alt="IBM Bob listing PQC vulnerabilities by category including RSA findings" style={{width: '50%'}} />
   </div>

   *IBM Bob listing PQC vulnerabilities by category including RSA findings*

### Step 4: Navigate to Code Findings Directly

1. Review the list Bob returns. You can click any **code reference** in Bob's response (e.g., *Client.java:32*) to jump directly to that line in the file.

2. Try clicking a few references to confirm navigation works and to familiarize yourself with where each vulnerability appears in the source code before asking Bob to fix them.

### Step 5: Get Detailed Information on the RSA Vulnerabilities

1. In the Bob panel, type:

   > **"Give me more details about the RSA vulnerabilities"**

2. Bob will call the `get_finding_detail` tool to retrieve the full details of each RSA finding from the QSE scan, including CWE guidance. This grounds Bob in the real scan data before making any code changes.

### Step 6: Ask Bob to Fix the Vulnerabilities

1. In the Bob panel, type:

   > **"Can you remediate some of these RSA vulnerabilities without adding additional libraries?"**

2. Bob will propose a remediation plan. **Review the plan before confirming** — make sure the proposed changes align with what was flagged in the QSE analysis.

   ![IBM Bob Todo List showing planned RSA fixes across Client.java and Server.java](/img/lab-01/image14.png)

3. Once Bob applies the fix, review the changes made to **Client.java** in the editor.

:::tip

Bob is making real changes to your code. Take a moment to read through the diff to understand what changed and why. If anything looks unexpected, ask Bob: "Why did you make this change?"

:::

### Step 7: Verify the Fix with a New QSE Scan

1. Run a new QSE scan to confirm the fix worked. In IBM Bob: **View → Command Palette** (labled **A**) -> Select **"Quantum Safe Explorer: Scan Cryptography Analysis"** (Labeled **B**).

   ![Opening Command Pallete to re-run the QSE Scan](/img/lab-01/image14a.png)

   ![Running QSE Cryptography Analysis Scan](/img/lab-01/image14b.png)

2. After the scan completes, return to the **Cryptography Analysis** panel. Confirm that the total vulnerability count has decreased and that **"keygen-(RSA)-(1024 bit)"** shows fewer vulnerabilities than before.

:::note

The exact number of remaining vulnerabilities may vary depending on the specific changes Bob made. A reduction confirms the fix was successful. You will get final confirmation in GCM after the Jenkins pipeline runs in Step 4.

:::

:::info[Step 3 Complete]

IBM Bob has used live QSE scan data to identify and fix the RSA-1024 vulnerabilities in the secure-chat source code. The QSE re-scan confirms a reduced vulnerability count. Proceed to Step 4 to commit the fix and validate it through the CI/CD pipeline.

:::


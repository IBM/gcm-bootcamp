---
sidebar_position: 2
title: "Step 1: Discover"
---

# Step 1: Discover — Understand the QSR Adaptive Proxy Architecture

Before running the demo, you will review the QSR architecture and confirm your environment is ready.

The demo follows this traffic flow:

```
Legacy / Hybrid / Quantum Safe Client
            |
            v
  Quantum Safe Forward Proxy
            |
            v
    Internet / Network Boundary
            |
            v
  Quantum Safe Reverse Proxy
            |
            v
      Backend Application
```

The goal is to show how QSR protects communication over the internet while allowing existing backend systems to remain unchanged. The demo includes three client types — **Legacy**, **Hybrid**, and **Quantum Safe** — along with controls for the Forward Proxy, Reverse Proxy, and Performance Harness.

---

## Step 1.1 — Open the QSR Adaptive Proxy Demo

### What You're Doing

You're accessing IBM's Quantum Safe Remediator demo environment, which simulates a real-world enterprise network architecture with multiple client types connecting to a backend application through quantum-safe proxies.

### Steps

1. Open your browser and navigate to the QSR demo link provided in your **Box folder**.

2. Log in using the credentials provided to you.

   ![QSR login page](/img/lab-03/Step1.1LogIn.png)

   **What's Happening:** You're authenticating to a secure demo environment that hosts the QSR Adaptive Proxy architecture. This environment is pre-configured with simulated clients, proxies, and a backend application.

3. Once logged in, click the **Adaptive Proxy Demo** tab in the top navigation bar.

   ![Adaptive Proxy Demo tab selected in top navigation](/img/lab-03Step1.1aptab.png)

   **What's Happening:** This tab contains the interactive demo interface where you'll test different client types and proxy configurations.

4. Wait for the QSR demo landing page to load.

5. Confirm that you can see three client options:
   - **Legacy client** — Represents older systems using traditional TLS 1.2/1.3 with classical cryptography only
   - **Hybrid client** — Represents transitional systems that support both classical and post-quantum cryptography
   - **Quantum Safe client** — Represents modern systems with full post-quantum cryptographic capabilities

6. Confirm that you can see controls for:
   - **Forward Proxy** — Upgrades outbound client traffic to quantum-safe before crossing the internet
   - **Reverse Proxy** — Protects the enterprise perimeter and bridges quantum-safe traffic to legacy backends

![QSR Adaptive Proxy demo landing page showing Legacy Client, Hybrid Client, and Quantum Safe Client panels](/img/lab-03/Step1.1.png)

*QSR Adaptive Proxy demo landing page showing Legacy Client, Hybrid Client, and Quantum Safe Client panels*

### What You Should See

The demo interface displays three distinct client panels, each with a **"Try it"** button. You'll also see toggle controls for the Forward Proxy and Reverse Proxy. These controls allow you to test different architectural configurations and observe how QSR handles various cryptographic scenarios.

### Why This Matters

This demo environment represents a critical real-world challenge: **how to protect communications during the multi-year transition to post-quantum cryptography**. In production, CCE will have:
- Legacy applications that cannot be immediately upgraded
- Partner systems at different stages of PQC readiness
- A mix of old and new clients accessing the same services
- The need to protect traffic **now**, not years from now when everything is upgraded

QSR's Adaptive Proxy architecture solves this by providing a transition layer that maintains compatibility while adding quantum-safe protection.

:::tip

If the page does not load or you do not see your credentials, ask your lab facilitator for assistance.

:::

---

## Step 1.2 — Review the Traffic Flow Architecture

### What You're Doing

You're examining the architectural components of QSR's Adaptive Proxy solution to understand how it creates a quantum-safe communication channel without requiring changes to existing applications.

### Understanding the Architecture

With the demo landing page open, take a moment to review how the components relate to each other.

In this model:

- The **Forward Proxy** intercepts outbound traffic from the client side and upgrades it to quantum-safe communication.
- The **Reverse Proxy** protects the enterprise perimeter, bridging incoming PQC traffic to the legacy backend application.
- The **backend application** does not need to be modified.
- QSR provides a transition layer between legacy, hybrid, and quantum-safe cryptographic environments.

This architecture is what allows CCE to protect communications **before** a full application rewrite is feasible.

![QSR Adaptive Proxy architecture showing Legacy, Hybrid, and PQC clients connected through Forward and Reverse Proxies to the backend application](/img/lab-03/Step1.2.png)

*QSR Adaptive Proxy architecture showing Legacy, Hybrid, and PQC clients connected through Forward and Reverse Proxies to the backend application*

### How the Traffic Flow Works

**Without QSR Proxies:**
```
Legacy Client → [Classical TLS over Internet] → Backend Application
```
**Problem:** Traffic crossing the internet uses only classical cryptography, vulnerable to Harvest-Now, Decrypt-Later attacks.

**With QSR Proxies:**
```
Legacy Client → [Classical TLS] → Forward Proxy → [Quantum-Safe TLS] → Internet → Reverse Proxy → [Classical TLS] → Backend Application
```
**Solution:** The segment crossing the internet (the most vulnerable part) is protected with quantum-safe cryptography, while both endpoints continue using their existing cryptographic capabilities.

### Key Architectural Benefits

1. **No Backend Changes Required:** The backend application continues to use its existing TLS configuration. The Reverse Proxy handles all quantum-safe negotiation and translation.

2. **Client Flexibility:** Different clients can connect with different cryptographic capabilities. The proxies handle the translation and ensure the internet segment is always protected.

3. **Immediate Protection:** CCE can deploy quantum-safe protection for critical communications **today**, without waiting for application rewrites or vendor updates.

4. **Policy Enforcement Point:** The proxies provide a centralized location to enforce cryptographic policies, monitor traffic, and control which cryptographic standards are accepted.

### Why This Matters

In a real-world PQC migration, agencies face a critical timing problem:
- **Threat Timeline:** Adversaries are harvesting encrypted traffic **now** for future decryption
- **Migration Timeline:** Full application modernization takes **years**
- **The Gap:** Without an interim solution, sensitive communications remain vulnerable during the entire migration period

QSR's Adaptive Proxy architecture closes this gap by providing quantum-safe protection **during the transition**, not just after it's complete. This is especially critical for:
- High-value communications (financial transactions, classified data, healthcare records)
- Cross-agency or partner communications where you don't control both endpoints
- Legacy systems that cannot be upgraded on short timelines
- Vendor-managed applications where source code access is limited

---

## Step 1.3 — Identify the Gap in CCE's Current Posture

### What You're Doing

You're connecting the work from Labs 1 and 2 to identify the remaining cryptographic vulnerability: **communications in transit across network boundaries**.

### CCE's Progress So Far

Labs 1 and 2 addressed two layers of CCE's cryptographic exposure:

- **Lab 1:** Discovered and fixed vulnerable cryptographic algorithms in application source code and generated a living CBOM.
  - **What was protected:** Cryptographic implementations within applications
  - **What was NOT protected:** The TLS connections between clients and servers

- **Lab 2:** Renewed the weakest certificates and rotated database encryption keys.
  - **What was protected:** Certificate validity and key strength for authentication
  - **What was NOT protected:** The key exchange algorithms used during TLS handshakes

### The Remaining Gap

What CCE has not yet addressed: the cryptographic posture of **communications in transit** across network boundaries. Even after certificates are renewed at the application layer, the TLS sessions between clients and backend services may still negotiate legacy or hybrid key exchange — leaving traffic exposed to Harvest-Now, Decrypt-Later (HNDL) risk during transmission.

**The Problem:** When a legacy client connects to a backend application, the TLS handshake negotiates the strongest cryptography **both sides support**. If the client only supports classical algorithms (RSA, ECDH), the entire session uses classical cryptography — even if the server could support better.

### Gap Analysis

Review the gap analysis below before proceeding to Step 2:

| Communication Path | Current Status | HNDL Risk | Why It Matters |
|---|---|---|---|
| Quantum-safe client → Backend | Strong key exchange, compatible | **Low** | Client and server negotiate PQC algorithms; traffic is protected |
| Hybrid client → Backend | Mixed — depends on negotiation | **Medium** | May use PQC or fall back to classical; protection depends on what's negotiated |
| Legacy client → Backend | Legacy TLS only, no PQC protection | **High** | Uses only classical algorithms; adversaries can harvest and store this traffic for future decryption |

### Why This Gap Is Critical

**Harvest-Now, Decrypt-Later (HNDL) Threat:**
1. Adversaries intercept and store encrypted traffic **today**
2. They wait for quantum computers capable of breaking classical cryptography
3. They decrypt the stored traffic **years later** to access sensitive information

**The Timing Problem:**
- Sensitive communications are being transmitted **right now**
- Full application modernization will take **years**
- The harvesting is happening **during the gap**

**Real-World Impact for CCE:**
- Financial transactions crossing agency boundaries
- Classified communications with partner agencies
- Healthcare records transmitted to external systems
- Any sensitive data sent from legacy clients or to legacy partners

### The Solution

QSR's Adaptive Proxy addresses this gap by protecting communications at the network layer — without requiring any changes to the backend application.

**How QSR Solves the Problem:**
- **For legacy clients:** The Forward Proxy upgrades their traffic to quantum-safe before it crosses the internet
- **For all clients:** The Reverse Proxy ensures the backend remains compatible while the internet segment is protected
- **For CCE:** Protection is deployed in **weeks**, not years, and works with existing applications

### What You've Learned

By completing Step 1, you now understand:
1. **The Architecture:** How Forward and Reverse Proxies create a quantum-safe communication channel
2. **The Gap:** Legacy and hybrid clients are still vulnerable to HNDL attacks during network transmission
3. **The Urgency:** Protection is needed **now**, during the migration, not just after it's complete
4. **The Solution:** QSR provides immediate protection without requiring application changes

:::info[Step 1 Complete]

You have reviewed the QSR Adaptive Proxy architecture and identified the gap in CCE's current posture: legacy and hybrid clients communicating over network boundaries without quantum-safe protection. Proceed to Step 2 to test how each client type behaves with the Reverse Proxy active.

:::


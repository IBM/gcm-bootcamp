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

1. Open your browser and navigate to the QSR demo link provided in your **Box folder**.

2. Log in using the credentials provided to you.

   ![Screenshot: QSR login page](/img/lab-03/Step1.1-LogIn.png)

3. Once logged in, click the **Adaptive Proxy Demo** tab in the top navigation bar.

   ![Screenshot: Adaptive Proxy Demo tab selected in top navigation](/img/lab-03/Step1.1-ap-tab.png)

4. Wait for the QSR demo landing page to load.

5. Confirm that you can see three client options:
   - **Legacy client**
   - **Hybrid client**
   - **Quantum Safe client**

6. Confirm that you can see controls for:
   - **Forward Proxy**
   - **Reverse Proxy**

![QSR Adaptive Proxy demo landing page showing Legacy Client, Hybrid Client, and Quantum Safe Client panels](/img/lab-03/Step1.1.png)

*QSR Adaptive Proxy demo landing page showing Legacy Client, Hybrid Client, and Quantum Safe Client panels*

:::tip

If the page does not load or you do not see your credentials, ask your lab facilitator for assistance.

:::

---

## Step 1.2 — Review the Traffic Flow Architecture

With the demo landing page open, take a moment to review how the components relate to each other.

In this model:

- The **Forward Proxy** intercepts outbound traffic from the client side and upgrades it to quantum-safe communication.
- The **Reverse Proxy** protects the enterprise perimeter, bridging incoming PQC traffic to the legacy backend application.
- The **backend application** does not need to be modified.
- QSR provides a transition layer between legacy, hybrid, and quantum-safe cryptographic environments.

This architecture is what allows CCE to protect communications **before** a full application rewrite is feasible.

![QSR Adaptive Proxy architecture showing Legacy, Hybrid, and PQC clients connected through Forward and Reverse Proxies to the backend application](/img/lab-03/Step1.2.png)

*QSR Adaptive Proxy architecture showing Legacy, Hybrid, and PQC clients connected through Forward and Reverse Proxies to the backend application*

---

## Step 1.3 — Identify the Gap in CCE's Current Posture

Labs 1 and 2 addressed two layers of CCE's cryptographic exposure:

- **Lab 1:** Discovered and fixed vulnerable cryptographic algorithms in application source code and generated a living CBOM.
- **Lab 2:** Renewed the weakest certificates and rotated database encryption keys.

What CCE has not yet addressed: the cryptographic posture of **communications in transit** across network boundaries. Even after certificates are renewed at the application layer, the TLS sessions between clients and backend services may still negotiate legacy or hybrid key exchange — leaving traffic exposed to Harvest-Now, Decrypt-Later (HNDL) risk during transmission.

Review the gap analysis below before proceeding to Step 2:

| Communication Path | Current Status | HNDL Risk |
|---|---|---|
| Quantum-safe client → Backend | Strong key exchange, compatible | Low |
| Hybrid client → Backend | Mixed — depends on negotiation | Medium |
| Legacy client → Backend | Legacy TLS only, no PQC protection | **High** |

QSR's Adaptive Proxy addresses this gap by protecting communications at the network layer — without requiring any changes to the backend application.

:::info[Step 1 Complete]

You have reviewed the QSR Adaptive Proxy architecture and identified the gap in CCE's current posture: legacy and hybrid clients communicating over network boundaries without quantum-safe protection. Proceed to Step 2 to test how each client type behaves with the Reverse Proxy active.

:::


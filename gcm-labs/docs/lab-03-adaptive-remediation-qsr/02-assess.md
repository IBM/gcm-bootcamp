---
sidebar_position: 3
title: "Phase 2: Assess"
---

# Phase 2: Assess — Test Client Compatibility and TLS Behavior

In this phase, you will test how different client types interact with the backend application through the QSR architecture, with only the **Reverse Proxy** enabled.

You will observe how QSR handles:

- TLS handshake behavior
- Key exchange algorithm negotiation
- Authentication translation
- Compatibility across legacy, hybrid, and PQC clients

---

## Step 2.1 — Test the Quantum Safe Client

1. On the QSR demo landing page, locate the **Quantum Safe client**.
2. Ensure the **Reverse Proxy** control is **enabled**.
3. Leave the **Forward Proxy** control **disabled** for this first test.
4. Click **Try it** for the Quantum Safe client.
5. Review the transaction output.

As you review the results, identify:

- TLS handshake details
- Key exchange algorithm used
- Authentication method
- Whether the connection succeeds
- How the Reverse Proxy handles the incoming connection

---

## Step 2.2 — Test the Hybrid Client

1. Return to the QSR demo landing page.
2. Locate the **Hybrid client**.
3. Confirm the **Reverse Proxy** control remains **enabled**.
4. Click **Try it** for the Hybrid client.
5. Review the transaction output.

Look for differences compared to the Quantum Safe client result. Pay attention to:

- Whether hybrid cryptography is used
- What key exchange is negotiated
- Whether the backend application remains unchanged
- Whether the Reverse Proxy enables interoperability between the client and the legacy backend

---

## Step 2.3 — Test the Legacy Client

1. Return to the QSR demo landing page.
2. Locate the **Legacy client**.
3. Confirm the **Reverse Proxy** control remains **enabled**.
4. Click **Try it** for the Legacy client.
5. Review the transaction output.

The purpose of this test is to observe that legacy clients may still connect to the backend, but their cryptographic posture does not meet CCE's desired quantum-safe standard without additional protection on the client side.

---

## Discussion Checkpoint

After completing all three client tests, consider the following:

:::note[Questions to Consider]

- Which clients can communicate with the backend application?
- Which clients use legacy cryptography?
- Which clients use hybrid or quantum-safe cryptography?
- What role does the Reverse Proxy play in maintaining compatibility?
- Why is compatibility important during a multi-year PQC migration?

:::

---

## Phase 2 Complete

You tested multiple client types and observed how QSR supports interoperability across legacy, hybrid, and quantum-safe cryptographic standards.

CCE has now assessed the communication behavior of different client crypto profiles. The key gap identified: legacy clients are still communicating without quantum-safe protection between the client and the enterprise perimeter. That is what Phase 3 addresses.

---

Proceed to **[Phase 3: Execute →](./03-execute)**

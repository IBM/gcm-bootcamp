---
sidebar_position: 3
title: "Step 2: Assess"
---

# Step 2: Assess — Test Client Compatibility and TLS Behavior

## Overview

In this phase, you will test how different client types interact with the backend application through the QSR architecture, with only the **Adaptive Proxy** protecting traffic and the **Forward Proxy** still disabled.

**Testing Configuration:**
- **Adaptive Proxy:** ACTIVE — the always-on enterprise-side proxy protecting the backend
- **Forward Proxy:** DISABLED (not yet protecting client-side traffic)

This configuration simulates a common deployment scenario where the enterprise has deployed quantum-safe protection at the backend perimeter, but clients are still connecting with their native cryptographic capabilities.

You will observe how QSR handles:

- TLS handshake behavior
- Key exchange algorithm negotiation
- Authentication translation
- Compatibility across legacy, hybrid, and PQC clients

---

## Step 2.1 — Test the Quantum Safe Client

You're testing a fully quantum-safe client connecting through the Adaptive Proxy — the ideal end-state where both client and server support post-quantum cryptography.

![QSR demo landing page with Try It highlighted for all three client types](/img/lab-03/Step2.1.png)

### Steps

1. On the QSR demo landing page, locate the **Quantum Safe client**.
2. Confirm the **Adaptive Proxy** is active.
3. Leave the **Forward Proxy** control **disabled** for this first test.
4. Click **Try it** for the Quantum Safe client.
5. Review the transaction output.

### Expected Results

**What You Should See:** the banking web portal loads, followed by the TLS Handshake Details:

- ✅ **Connection Status:** SUCCESS
- ✅ **Client → Adaptive Proxy:** TLS 1.3 · KEM `MLKEM512` · signature `id-ml-dsa-44` — **fully quantum-safe**
- ✅ **Adaptive Proxy → Upstream Application:** TLS 1.3 · KEM `secp521r1` · signature `id-ecPublicKey` — **classical** (the backend is unchanged)
- ✅ **Backend Compatibility:** The backend responds normally, unaware that quantum-safe cryptography was used on the client side

**What's Happening Behind the Scenes:**
1. The client initiates a TLS handshake using PQC algorithms (`MLKEM512` / `id-ml-dsa-44`)
2. The Adaptive Proxy accepts the quantum-safe connection
3. The Adaptive Proxy establishes a separate, **classical** TLS connection to the backend (`secp521r1`)
4. The backend processes the request using its existing cryptographic configuration
5. The Adaptive Proxy translates the response back to the client

The backend never has to understand post-quantum cryptography — the Adaptive Proxy handles all the translation. **This same mechanic applies to the hybrid and legacy clients below.**

---

## Step 2.2 — Test the Hybrid Client

You're testing a hybrid client that supports both classical and post-quantum cryptography — the transitional state most organizations experience during PQC migration.

### Steps

1. Return to the QSR demo landing page.
2. Locate the **Hybrid client**.
3. Confirm the **Forward Proxy** remains **disabled** (the Adaptive Proxy stays active).
4. Click **Try it** for the Hybrid client.
5. Review the transaction output.

### Expected Results

**What You Should See:** the banking web portal loads, followed by the TLS Handshake Details:

- ✅ **Connection Status:** SUCCESS
- ✅ **Client → Adaptive Proxy:** TLS 1.3 · KEM `p256_mlkem512` · signature `p256_mldsa44` — **hybrid** (classical P-256 combined with ML-KEM-512 / ML-DSA-44)
- ✅ **Adaptive Proxy → Upstream Application:** TLS 1.3 · KEM `secp521r1` · signature `id-ecPublicKey` — **classical** (the backend is unchanged)
- ✅ **Backend Unchanged:** The backend application continues operating with its existing configuration

Because the hybrid handshake already includes a quantum-safe component (`p256_mlkem512`), the client-to-proxy hop is **already protected**, even before the Forward Proxy is introduced.

---

## Step 2.3 — Test the Legacy Client

You're testing a legacy client that supports only classical cryptography — the majority of existing systems that haven't been upgraded yet, and may not be for years.

### Steps

1. Return to the QSR demo landing page.
2. Locate the **Legacy client**.
3. Confirm the **Forward Proxy** remains **disabled** (the Adaptive Proxy stays active).
4. Click **Try it** for the Legacy client.
5. Review the transaction output.

### Expected Results

**What You Should See:** the banking web portal loads, but the TLS Handshake Details tell a different story:

- ✅ **Connection Status:** SUCCESS (the connection works)
- ⚠️ **Client → Adaptive Proxy:** TLS 1.3 · KEM `x25519` · signature `id-ecPublicKey` — **classical only, NOT quantum-safe**
- ✅ **Adaptive Proxy → Upstream Application:** TLS 1.3 · KEM `secp521r1` · signature `id-ecPublicKey` — **classical** (the backend is unchanged)
- ⚠️ **Security Posture:** The client-to-proxy hop is classical and exposed to Harvest-Now, Decrypt-Later attacks

**This is the gap Lab 3 must close.** The legacy client's traffic crosses the internet protected only by classical `x25519`. Step 3 deploys the Forward Proxy to upgrade this hop to quantum-safe without changing the client itself.

---

![QSR demo results showing all three clients connected to the banking web portal with TLS Handshake Details](/img/lab-03/Step2.2.png)

*QSR demo results showing all three clients connected to the banking web portal with TLS Handshake Details*

---

## Discussion Checkpoint — Understanding What You've Learned

After completing all three client tests, take a moment to synthesize your observations.

### Summary of Results

The HNDL risk below reflects the **client → Adaptive Proxy** hop — the traffic that crosses the network. The Adaptive Proxy → backend hop is classical (`secp521r1`) in every case, by design.

| Client Type | Connection Status | Client → Proxy Key Exchange | HNDL Risk | Backend Impact |
|-------------|------------------|------------------------------|-----------|----------------|
| **Quantum Safe** | ✅ Success | `MLKEM512` (post-quantum) | Low | None — backend unchanged |
| **Hybrid** | ✅ Success | `p256_mlkem512` (hybrid PQC) | Low | None — backend unchanged |
| **Legacy** | ✅ Success | `x25519` (classical only) | **High** | None — backend unchanged |

### Critical Questions to Consider

:::note[Questions to Consider]

**1. Which clients can communicate with the backend application?**
- **Answer:** All three client types successfully connect. The Adaptive Proxy ensures compatibility across different cryptographic capabilities.

**2. Which clients use legacy cryptography?**
- **Answer:** Only the Legacy client, which negotiates classical `x25519`. The Hybrid client reaches the proxy with a hybrid quantum-safe KEM (`p256_mlkem512`), and the Quantum Safe client uses full PQC (`MLKEM512`).

**3. Which clients use hybrid or quantum-safe cryptography?**
- **Answer:** The Quantum Safe client uses pure PQC (`MLKEM512` / `id-ml-dsa-44`). The Hybrid client uses a hybrid PQC KEM (`p256_mlkem512` — classical P-256 combined with ML-KEM-512). The Legacy client cannot use PQC.

**4. What role does the Adaptive Proxy play in maintaining compatibility?**
- **Answer:** The Adaptive Proxy acts as a translation layer between clients (which may use PQC) and the backend (which uses classical TLS). This allows the backend to remain unchanged while still supporting quantum-safe clients.

**5. Why is compatibility important during a multi-year PQC migration?**
- **Answer:** Because not everything can be upgraded simultaneously. Organizations need to:
  - Support legacy systems that cannot be upgraded immediately
  - Maintain service availability during the transition
  - Allow different systems to migrate at different speeds
  - Ensure partners and external systems can still connect
  - Avoid a "big bang" cutover that would be operationally risky

:::

---

:::info[Step 2 Complete]

You tested all three client types and observed how the Adaptive Proxy supports interoperability across legacy, hybrid, and quantum-safe cryptographic profiles.

**Key Findings:**
- ✅ The Adaptive Proxy maintains backward compatibility with all client types
- ✅ The backend application requires no changes
- ⚠️ Legacy clients are still vulnerable to HNDL attacks on the client-to-proxy segment

**The Gap:** Legacy clients are still communicating without quantum-safe protection between client and enterprise perimeter. Step 3 addresses this by deploying the Forward Proxy to protect the vulnerable segment.

:::


---
sidebar_position: 3
title: "Step 2: Assess"
---

# Step 2: Assess — Test Client Compatibility and TLS Behavior

## Overview

In this phase, you will test how different client types interact with the backend application through the QSR architecture, with only the **Reverse Proxy** enabled.

**Testing Configuration:**
- **Reverse Proxy:** ENABLED (protecting the backend)
- **Forward Proxy:** DISABLED (not yet protecting client-side traffic)

This configuration simulates a common deployment scenario where the enterprise has deployed quantum-safe protection at the backend perimeter, but clients are still connecting with their native cryptographic capabilities.

You will observe how QSR handles:

- TLS handshake behavior
- Key exchange algorithm negotiation
- Authentication translation
- Compatibility across legacy, hybrid, and PQC clients

---

## Step 2.1 — Test the Quantum Safe Client

### What You're Doing

You're testing a fully quantum-safe client connecting through the Reverse Proxy to the backend application. This represents the ideal end-state where both client and server support post-quantum cryptography.

![QSR demo landing page with Try It highlighted for all three client types](/img/lab-03/Step2.1.png)

*QSR demo landing page with Try It highlighted for all three client types*

### Steps

1. On the QSR demo landing page, locate the **Quantum Safe client**.
2. Ensure the **Reverse Proxy** control is **enabled**.
3. Leave the **Forward Proxy** control **disabled** for this first test.
4. Click **Try it** for the Quantum Safe client.
5. Review the transaction output.

### What to Look For

As you review the results, identify:

- **TLS handshake details** — Look for the TLS version and cipher suite negotiated
- **Key exchange algorithm used** — Should show a post-quantum algorithm like MLKEM (Module-Lattice-Based Key Encapsulation Mechanism)
- **Authentication method** — How the client and server verify each other's identity
- **Whether the connection succeeds** — The transaction should complete successfully
- **How the Reverse Proxy handles the incoming connection** — The proxy translates between the quantum-safe client and the legacy backend

### Expected Results

**What You Should See:**
- ✅ **Connection Status:** SUCCESS
- ✅ **Key Exchange:** Post-quantum algorithm (e.g., MLKEM1024, MLKEM768)
- ✅ **TLS Version:** TLS 1.3 (the version that supports PQC extensions)
- ✅ **Backend Compatibility:** The backend application responds normally, unaware that quantum-safe cryptography was used

**What's Happening Behind the Scenes:**
1. The Quantum Safe client initiates a TLS handshake with PQC algorithms
2. The Reverse Proxy accepts the quantum-safe connection
3. The Reverse Proxy establishes a separate, classical TLS connection to the backend
4. The backend application processes the request using its existing cryptographic configuration
5. The Reverse Proxy translates the response back to the client

### Why This Matters

This test demonstrates **forward compatibility**: when clients are upgraded to support quantum-safe cryptography, they can immediately benefit from enhanced protection without waiting for backend applications to be upgraded. The Reverse Proxy acts as a translation layer, allowing modern clients to use strong cryptography while legacy backends continue operating unchanged.

**Key Insight:** The backend application doesn't need to understand post-quantum cryptography. The Reverse Proxy handles all the complexity, making PQC adoption transparent to existing applications.

---

## Step 2.2 — Test the Hybrid Client

### What You're Doing

You're testing a hybrid client that supports both classical and post-quantum cryptography. This represents the transitional state most organizations will experience during PQC migration — systems that have been partially upgraded but still maintain backward compatibility.

### Steps

1. Return to the QSR demo landing page.
2. Locate the **Hybrid client**.
3. Confirm the **Reverse Proxy** control remains **enabled**.
4. Click **Try it** for the Hybrid client.
5. Review the transaction output.

### What to Look For

Look for differences compared to the Quantum Safe client result. Pay attention to:

- **Whether hybrid cryptography is used** — The client may negotiate a combination of classical and PQC algorithms
- **What key exchange is negotiated** — Could be pure PQC, pure classical, or a hybrid approach
- **Whether the backend application remains unchanged** — The backend should still respond normally
- **Whether the Reverse Proxy enables interoperability** — The proxy should successfully bridge between the hybrid client and legacy backend

### Expected Results

**What You Should See:**
- ✅ **Connection Status:** SUCCESS
- ✅ **Key Exchange:** May show hybrid algorithms (combining classical and PQC) or negotiate down to what both sides support
- ✅ **Backward Compatibility:** The connection works even though the client has mixed cryptographic capabilities
- ✅ **Backend Unchanged:** The backend application continues operating with its existing configuration

**What's Happening Behind the Scenes:**
1. The Hybrid client advertises support for both classical and PQC algorithms during the TLS handshake
2. The Reverse Proxy negotiates the strongest mutually supported cryptography
3. The connection may use hybrid key exchange (combining classical and PQC for defense-in-depth)
4. The Reverse Proxy still translates to classical TLS for the backend connection
5. The application functions normally regardless of which algorithms were negotiated

### Why This Matters

Hybrid clients represent the **reality of PQC migration**: not everything upgrades at once. Organizations will have:
- Some systems fully upgraded to PQC
- Some systems in transition with hybrid support
- Some systems still using only classical cryptography

The Reverse Proxy ensures all three types can coexist and communicate successfully. This is critical because:
- **Migration takes years** — you can't wait for 100% completion before deploying protection
- **Different vendors move at different speeds** — your partners may upgrade before or after you
- **Risk tolerance varies** — some systems need immediate PQC protection, others can wait

**Key Insight:** Hybrid cryptography provides a safety net during migration. If PQC algorithms are later found to have vulnerabilities, the classical algorithms provide fallback protection. If classical algorithms are broken by quantum computers, the PQC algorithms provide protection.

---

## Step 2.3 — Test the Legacy Client

### What You're Doing

You're testing a legacy client that only supports classical cryptography (RSA, ECDH, etc.). This represents the majority of existing systems that haven't been upgraded yet — and may not be upgradeable for years.

### Steps

1. Return to the QSR demo landing page.
2. Locate the **Legacy client**.
3. Confirm the **Reverse Proxy** control remains **enabled**.
4. Click **Try it** for the Legacy client.
5. Review the transaction output.

### What to Look For

The purpose of this test is to observe that legacy clients may still connect to the backend, but their cryptographic posture does not meet CCE's desired quantum-safe standard without additional protection on the client side.

Pay attention to:
- **Key exchange algorithm** — Will be classical only (RSA, ECDHE, etc.)
- **Connection success** — The connection should work, demonstrating backward compatibility
- **Security posture** — Note that this traffic is vulnerable to HNDL attacks
- **The gap** — This is the problem the Forward Proxy will solve in Step 3

### Expected Results

**What You Should See:**
- ✅ **Connection Status:** SUCCESS (the connection works)
- ⚠️ **Key Exchange:** Classical algorithms only (e.g., ECDHE, RSA)
- ⚠️ **Security Posture:** NOT quantum-safe — vulnerable to Harvest-Now, Decrypt-Later attacks
- ✅ **Backend Compatibility:** The backend application responds normally

**What's Happening Behind the Scenes:**
1. The Legacy client initiates a TLS handshake with only classical algorithms
2. The Reverse Proxy accepts the connection (maintaining backward compatibility)
3. The connection uses classical cryptography end-to-end
4. The backend application processes the request normally
5. **The Problem:** If this traffic crosses the internet, it's vulnerable to HNDL attacks

### Why This Matters — The Critical Gap

This test reveals the **core problem** that Lab 3 addresses:

**The Scenario:**
- CCE has legacy applications that cannot be immediately upgraded
- These applications are still processing sensitive transactions
- Adversaries are harvesting this traffic **today** for future decryption
- The backend has been protected with the Reverse Proxy, but the client-to-proxy segment is still vulnerable

**The Risk:**
```
[Legacy Client] --[Classical TLS - VULNERABLE]-- [Internet] --[Classical TLS]-- [Reverse Proxy] --[Classical TLS]-- [Backend]
```

The segment crossing the internet uses only classical cryptography. An adversary positioned on the network can:
1. Intercept and store the encrypted traffic
2. Wait for quantum computers to become available
3. Decrypt the stored traffic years later
4. Access sensitive information that was transmitted today

**The Question Step 3 Will Answer:**
How can CCE protect this legacy client traffic **without upgrading the client itself**?

**Preview of the Solution:**
The Forward Proxy will be deployed on the client side to upgrade the traffic to quantum-safe **before** it crosses the internet, even though the client itself only supports classical cryptography.

---

![QSR demo results showing all three clients connected to the banking web portal with TLS Handshake Details](/img/lab-03/Step2.2.png)

*QSR demo results showing all three clients connected to the banking web portal with TLS Handshake Details*

---

## Discussion Checkpoint — Understanding What You've Learned

After completing all three client tests, take a moment to synthesize your observations.

### Summary of Results

| Client Type | Connection Status | Key Exchange | HNDL Risk | Backend Impact |
|-------------|------------------|--------------|-----------|----------------|
| **Quantum Safe** | ✅ Success | Post-quantum (MLKEM) | Low | None — backend unchanged |
| **Hybrid** | ✅ Success | Hybrid or negotiated | Medium | None — backend unchanged |
| **Legacy** | ✅ Success | Classical only | **High** | None — backend unchanged |

### Key Observations

**What Works:**
- ✅ All three client types can successfully connect to the backend application
- ✅ The Reverse Proxy maintains backward compatibility with legacy clients
- ✅ The backend application requires no modifications
- ✅ Quantum-safe clients can use strong cryptography when available

**What's Still Vulnerable:**
- ⚠️ Legacy client traffic crossing the internet uses only classical cryptography
- ⚠️ Hybrid clients may negotiate down to classical algorithms depending on configuration
- ⚠️ The client-to-proxy segment is not yet protected for legacy clients

### Critical Questions to Consider

:::note[Questions to Consider]

**1. Which clients can communicate with the backend application?**
- **Answer:** All three client types successfully connect. The Reverse Proxy ensures compatibility across different cryptographic capabilities.

**2. Which clients use legacy cryptography?**
- **Answer:** The Legacy client uses only classical algorithms. The Hybrid client may use classical algorithms depending on what's negotiated. Only the Quantum Safe client guarantees PQC usage.

**3. Which clients use hybrid or quantum-safe cryptography?**
- **Answer:** The Quantum Safe client uses PQC algorithms. The Hybrid client can use either hybrid or PQC algorithms depending on negotiation. The Legacy client cannot use PQC.

**4. What role does the Reverse Proxy play in maintaining compatibility?**
- **Answer:** The Reverse Proxy acts as a translation layer between clients (which may use PQC) and the backend (which uses classical TLS). This allows the backend to remain unchanged while still supporting quantum-safe clients.

**5. Why is compatibility important during a multi-year PQC migration?**
- **Answer:** Because not everything can be upgraded simultaneously. Organizations need to:
  - Support legacy systems that cannot be upgraded immediately
  - Maintain service availability during the transition
  - Allow different systems to migrate at different speeds
  - Ensure partners and external systems can still connect
  - Avoid a "big bang" cutover that would be operationally risky

:::

### The Remaining Challenge

While the Reverse Proxy successfully protects the backend and maintains compatibility, there's still a critical vulnerability:

**The Problem:**
```
[Legacy Client] --[Classical TLS - VULNERABLE]-- [Internet] --[Reverse Proxy]-- [Backend]
                  ↑
                  This segment is exposed to HNDL attacks
```

**The Question:**
How can CCE protect legacy client traffic when the client itself cannot be upgraded to support quantum-safe cryptography?

**The Answer (Coming in Step 3):**
Deploy a Forward Proxy on the client side to upgrade the traffic to quantum-safe **before** it crosses the internet, creating a protected tunnel:

```
[Legacy Client] --[Classical TLS]-- [Forward Proxy] --[Quantum-Safe TLS]-- [Internet] --[Reverse Proxy]-- [Backend]
                                                       ↑
                                                       This segment is now protected
```

---

:::info[Step 2 Complete]

You tested all three client types and observed how the Reverse Proxy supports interoperability across legacy, hybrid, and quantum-safe cryptographic profiles.

**Key Findings:**
- ✅ The Reverse Proxy maintains backward compatibility with all client types
- ✅ The backend application requires no changes
- ⚠️ Legacy clients are still vulnerable to HNDL attacks on the client-to-proxy segment

**The Gap:** Legacy clients are still communicating without quantum-safe protection between client and enterprise perimeter. Step 3 addresses this by deploying the Forward Proxy to protect the vulnerable segment.

:::


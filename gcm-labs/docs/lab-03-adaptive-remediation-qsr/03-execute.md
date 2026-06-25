---
sidebar_position: 4
title: "Step 3: Execute"
---

# Step 3: Execute — Protect Legacy Traffic with the Forward Proxy

## Overview — The Complete Solution

In this phase, you will enable the **Forward Proxy** and demonstrate how QSR upgrades legacy client traffic before it crosses the internet.

**This is the core remediation scenario for Lab 3.** With both proxies active, the full traffic path becomes:

```
Legacy / Hybrid / Quantum Safe Client
            |
            v
  [Forward Proxy — upgrades outbound TLS to PQC]
            |
            v
    Quantum-Safe Transport over Internet
            |
            v
  [Adaptive Proxy — bridges PQC to legacy backend]
            |
            v
      Backend Application
```

### The Problem Being Solved

In Step 2, you observed that legacy clients communicate using only classical cryptography, leaving their traffic vulnerable to Harvest-Now, Decrypt-Later (HNDL) attacks when crossing the internet.

**The Challenge:**
- The client cannot be upgraded (legacy system, vendor-managed, or operationally risky to change)
- The backend cannot be changed (same reasons)
- But the traffic crossing the internet **must** be protected with quantum-safe cryptography

### The Solution

The Forward Proxy addresses **Harvest-Now, Decrypt-Later (HNDL)** risk by ensuring that traffic crossing the internet uses quantum-safe cryptography — even when the originating client cannot support it natively.

**How It Works:**
1. **Client → Forward Proxy:** The legacy client connects using classical TLS (the only protocol it supports)
2. **Forward Proxy → Internet → Adaptive Proxy:** The Forward Proxy upgrades the connection to quantum-safe TLS before transmission
3. **Adaptive Proxy → Backend:** The Adaptive Proxy translates back to classical TLS for the backend

**The Result:** The most vulnerable segment (crossing the internet) is protected with quantum-safe cryptography, while both endpoints continue using their existing configurations.

---

## Step 3.1 — Enable the Forward Proxy

### What You're Doing

You're activating the Forward Proxy to create a complete quantum-safe tunnel between the client-side proxy and the enterprise-side proxy. This protects the internet segment without requiring changes to either the client or the backend.

### Steps

1. Return to the QSR demo landing page.
2. Locate the **Forward Proxy Control**.
3. Turn on / enable the **Forward Proxy**.
4. Confirm the **Adaptive Proxy** remains active (it is always on — no toggle to change).

![QSR demo with Forward Proxy control highlighted](/img/lab-03/Step3.1.png)

*QSR demo with Forward Proxy control highlighted*

### What's Happening

**Before (Step 2 Configuration):**
```
[Legacy Client] --[Classical TLS - VULNERABLE]-- [Internet] --[Adaptive Proxy]-- [Backend]
```

**After (Step 3 Configuration):**
```
[Legacy Client] --[Classical TLS]-- [Forward Proxy] --[Quantum-Safe TLS]-- [Internet] --[Adaptive Proxy]-- [Backend]
                                                       ↑
                                                Protected Segment
```

Both proxies are now active. The full client-to-backend path is protected, with the critical internet segment using quantum-safe cryptography.

### Why This Matters

This configuration represents a **practical PQC migration strategy** that CCE can deploy immediately:

**Deployment Timeline:**
- **Traditional Approach:** Wait years to upgrade all clients and backends → Vulnerable during entire migration
- **QSR Approach:** Deploy proxies in weeks → Protected immediately while migration continues

**Operational Benefits:**
- No application code changes required
- No client software updates needed
- No backend modifications necessary
- Protection deployed at network layer
- Centralized policy enforcement
- Works with vendor-managed systems

---

## Step 3.2 — Retest the Legacy Client

### What You're Doing

You're retesting the legacy client with the Forward Proxy now enabled. This demonstrates the **core value proposition** of QSR: protecting legacy client traffic without upgrading the client itself.

### Steps

1. Locate the **Legacy client**.
2. Click **Try it** again.
3. Review the updated transaction output.

### What to Look For

Compare this result to your Step 2 Legacy client test. Look for:

- **TLS handshake changes** — The handshake between proxies should now show quantum-safe algorithms
- **Key exchange changes** — Should show MLKEM or other PQC algorithms between the proxies
- **Authentication translation by the Forward Proxy** — The Forward Proxy handles the upgrade transparently
- **Evidence that traffic between the proxies is now quantum-safe protected** — The internet segment uses PQC
- **Continued successful access to the backend application** — Everything still works

![Legacy client TLS handshake details showing quantum-safe key exchange between Forward Proxy and Adaptive Proxy](/img/lab-03/Step3.2.png)

*Legacy client TLS handshake details showing quantum-safe key exchange (MLKEM1024) between Forward Proxy and Adaptive Proxy*

### Expected Results

**What You Should See:**

**Client → Forward Proxy Connection:**
- ✅ **Protocol:** Classical TLS (the client hasn't changed)
- ✅ **Key Exchange:** Classical algorithms (RSA, ECDHE, etc.)
- ✅ **Status:** SUCCESS

**Forward Proxy → Adaptive Proxy Connection (Over Internet):**
- ✅ **Protocol:** Quantum-Safe TLS
- ✅ **Key Exchange:** Post-quantum algorithm (MLKEM1024, MLKEM768, etc.)
- ✅ **Status:** SUCCESS — **This is the critical protection**

**Adaptive Proxy → Backend Connection:**
- ✅ **Protocol:** Classical TLS (the backend hasn't changed)
- ✅ **Key Exchange:** Classical algorithms
- ✅ **Status:** SUCCESS

### Why This Matters — The Breakthrough

This test demonstrates the **breakthrough capability** of QSR:

**The Problem Solved:**
- ❌ **Before:** Legacy client traffic was vulnerable to HNDL attacks
- ✅ **After:** The same legacy client is now protected, without any changes to the client

**The Business Impact:**
- **No client upgrades required** — Works with existing systems
- **No backend changes required** — Applications continue unchanged
- **Immediate protection** — Deployed in weeks, not years
- **Maintains compatibility** — Legacy clients still work
- **Reduces HNDL risk** — Traffic crossing the internet is protected

:::tip

The desired outcome is not simply that the application works. The desired outcome is that CCE can protect sensitive communications **while maintaining compatibility** with different client capabilities.

**Key Insight:** The legacy client doesn't know it's being protected. The Forward Proxy transparently upgrades the connection, making quantum-safe protection invisible to the application layer.

:::

---

## Step 3.3 — Retest the Hybrid Client

### What You're Doing

You're verifying that hybrid clients continue to work correctly with both proxies enabled, and observing how the Forward Proxy handles clients that already have some PQC capability.

### Steps

1. Locate the **Hybrid client**.
2. Click **Try it** again.
3. Review the transaction output.

### What to Look For

Observe whether enabling the Forward Proxy changes the negotiated cryptographic path for a hybrid client.

### Expected Results

**What You Should See:**
- ✅ **Connection Status:** SUCCESS
- ✅ **Flexibility:** The Forward Proxy may allow the hybrid client to negotiate directly with the Adaptive Proxy, or it may still provide translation
- ✅ **Optimization:** The system uses the strongest cryptography available at each segment

### Why This Matters

This demonstrates that QSR doesn't force all traffic through the same path. It intelligently handles different client capabilities:
- **Legacy clients:** Get upgraded by the Forward Proxy
- **Hybrid clients:** May negotiate directly or use proxy translation
- **Quantum-safe clients:** Can communicate end-to-end with PQC

---

## Step 3.4 — Retest the Quantum Safe Client

### What You're Doing

You're confirming that fully quantum-safe clients continue to work correctly through the complete proxy architecture.

### Steps

1. Locate the **Quantum Safe client**.
2. Click **Try it** again.
3. Review the transaction output.

### Expected Results

**What You Should See:**
- ✅ **Connection Status:** SUCCESS
- ✅ **End-to-End PQC:** The quantum-safe client can use PQC algorithms throughout the connection
- ✅ **No Degradation:** The proxies don't force downgrade to weaker cryptography

### Why This Matters

This confirms that QSR provides **forward compatibility**: as clients are upgraded to support quantum-safe cryptography, they can immediately benefit without waiting for other components to catch up.

---

## Step 3.5 — Interpret the Result

### What You've Accomplished

After retesting all three clients with both proxies enabled, take a moment to connect the technical outcome back to CCE's operational objective.

### Summary of Protection Levels

| Client Type | Step 2 (Adaptive Proxy Only) | Step 3 (Both Proxies) | Improvement |
|-------------|----------------------------|----------------------|-------------|
| **Legacy** | ⚠️ Classical TLS over internet | ✅ Quantum-safe TLS over internet | **HNDL risk eliminated** |
| **Hybrid** | ⚠️ May use classical TLS | ✅ Quantum-safe TLS guaranteed | **Consistent protection** |
| **Quantum Safe** | ✅ Already protected | ✅ Still protected | **Maintained** |

### The Strategic Value of QSR

QSR provides a practical transition architecture that allows CCE to:

1. **Keep legacy systems operating without immediate code changes**
   - No application rewrites required
   - No vendor dependencies
   - No operational disruption

2. **Protect traffic across network boundaries using quantum-safe cryptography**
   - The most vulnerable segment (internet) is protected
   - HNDL attacks are mitigated
   - Sensitive data is secured during transmission

3. **Support clients at different stages of crypto readiness simultaneously**
   - Legacy, hybrid, and quantum-safe clients all work
   - No "big bang" migration required
   - Phased approach reduces risk

4. **Give enterprise security teams policy control over inbound and outbound cryptographic behavior**
   - Centralized enforcement point
   - Consistent security posture
   - Auditable and manageable

5. **Reduce HNDL exposure during the migration — not only after it is complete**
   - Protection deployed immediately
   - Risk reduced while migration continues
   - No waiting for 100% completion

### Real-World Application for CCE

**Scenario:** CCE has a legacy financial transaction system that:
- Processes millions of dollars in transactions daily
- Cannot be taken offline for extended periods
- Is vendor-managed with limited source code access
- Communicates with partner agencies over the internet
- Contains data valuable for 20+ years

**Without QSR:**
- Must wait years for vendor to provide PQC-capable version
- Traffic remains vulnerable to HNDL attacks during entire migration
- Risk accumulates as more traffic is harvested

**With QSR:**
- Deploy Forward and Adaptive Proxies in weeks
- Protect traffic immediately
- Continue using existing application
- Reduce HNDL risk while planning long-term modernization

---

:::info[Step 3 Complete]

You enabled the Forward Proxy and demonstrated how QSR protects legacy client traffic using quantum-safe communication between proxy points.

**Key Achievements:**
- ✅ Legacy client traffic is now protected without client modifications
- ✅ The internet segment uses quantum-safe cryptography
- ✅ The backend application continues operating unchanged
- ✅ All three client types work correctly through the proxy architecture

**The Result:** CCE can now protect sensitive communications across network boundaries without modifying applications, providing immediate HNDL risk reduction during the multi-year PQC migration.

:::


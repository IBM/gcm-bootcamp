---
sidebar_position: 5
title: "Step 4: Sustain"
---

# Step 4: Sustain — Enforce Policy and Benchmark Performance

## Overview — From Pilot to Production

In Labs 1 and 2, CCE learned that remediation is not complete until it can be governed and repeated at scale. The same principle applies to QSR.

**The Challenge:** Steps 1-3 demonstrated that QSR **can** protect legacy traffic. But for CCE to operate QSR in production, they need:
- **Policy enforcement** — Control which cryptographic standards are accepted or blocked
- **Performance validation** — Understand the operational impact of PQC algorithms
- **Operational repeatability** — Ensure the solution scales across the enterprise

In this phase, you will review two operational capabilities that allow CCE to run quantum-safe remediation continuously — not just as a one-time technical exercise:

1. **Adaptive Proxy policy controls** — Enforce cryptographic standards at the network layer
2. **Performance Harness** — Benchmark TLS performance across different algorithm types

---

## Part 4.1 — Adaptive Proxy Policy Controls

The Adaptive Proxy includes dynamic policy controls that enforce enterprise-wide cryptographic standards for all incoming traffic — defining which client crypto profiles are accepted or blocked, without modifying backend applications. One policy applies to every protected service, can be updated without redeploying applications, and logs every decision for audit.

### Step 4.1.1 — Open the Adaptive Proxy Controls

1. Return to the **Adaptive Proxy Demo** tab.
2. Locate the **Adaptive Proxy Controls** panel on the right side of the interface, next to **Forward Proxy Controls**.

The Adaptive Proxy is the **policy enforcement point** for all incoming traffic: instead of each backend implementing its own cryptographic policy, the proxy enforces one consistent standard across all protected services.

---

### Step 4.1.2 — Review Available Controls

The **Adaptive Proxy Controls** panel exposes two policy toggles and an apply action:

- **Disable Legacy / Allow legacy** — Accept or reject clients that present only classical (legacy) cryptography.
- **Disable Hybrid / Allow hybrid** — Accept or reject clients that present hybrid (classical + PQC) cryptography.
- **Reconfigure** — Applies your selected policy to the live Adaptive Proxy.

Quantum-safe clients are always accepted; the toggles control whether weaker profiles are permitted. Combining them produces the policy modes CCE moves through as the migration advances:

| Mode | Toggles | Use Case |
|------|---------|----------|
| **Permissive** (current default) | Allow legacy + allow hybrid | Early migration, broad partner ecosystem |
| **Hybrid-Minimum** | Disable legacy, allow hybrid | Mid-migration, reducing HNDL risk |
| **PQC-Only** | Disable legacy + disable hybrid | Post-migration, maximum security |

---

### Step 4.1.3 — Adjust a Control and Retest

1. In the **Adaptive Proxy Controls**, set **Disable Legacy** and **Disable Hybrid** to enforce a **PQC-only** policy. (For Hybrid-Minimum mode, disable only **Legacy**.)
2. Click **Reconfigure** to apply the policy.
3. Rerun each client with **Try it**.

**Expected Results (PQC-only):**
- ❌ **Legacy Client:** rejected — *"Legacy Clients no longer supported"*
- ❌ **Hybrid Client:** rejected — *"Hybrid Clients no longer supported"*
- ✅ **Quantum Safe Client:** SUCCESS — meets the quantum-safe requirement

![QSR demo showing policy enforcement — Legacy and Hybrid clients blocked, Quantum Safe client still supported](/img/lab-03/Step4.1.png)

*Policy enforcement — legacy and hybrid clients blocked, the quantum-safe client still supported*

This is **centralized policy enforcement**: one change at the proxy applies instantly to every protected service, with no application code changes. If CCE discovers a weakness in a classical algorithm, it updates the proxy policy once — the change takes effect immediately across all services, and the audit log shows which clients were affected.

---

### Step 4.1.4 — Restore the Original Setting

Set both toggles back to **Allow legacy** and **Allow hybrid**, then click **Reconfigure** to restore the permissive policy — unless instructed otherwise by your lab facilitator. This keeps the demo environment ready for the next participant.

---

## Part 4.2 — Performance Harness

PQC migration is not only a security exercise — agencies must also understand the operational cost before deploying new algorithms broadly. The **New Performance Test Harness** benchmarks TLS performance across legacy, hybrid, and quantum-safe algorithms so CCE can plan capacity and set realistic SLAs. In this lab you review **pre-run** results rather than executing new tests.

### Step 4.2.1 — Open the Performance Test Harness

1. From the top navigation, open the **New Performance Test Harness** tab.
2. Confirm you can see the results table, with the per-run timing chart below it.

![Navigating to the Performance Test Harness in the QSR demo](/img/lab-03/PerformanceHarnessSelection.png)

---

### Step 4.2.2 — Review What the Harness Measures

The harness compares cryptographic configurations at scale — each run drives millions of requests across thousands of concurrent clients. You can filter by:

- **Servers** — `Adaptive Proxy`, `Direct`, or `PTH` — to compare connecting through the proxy versus directly.
- **Key agreement algorithm** — legacy (`RSA`, `X25519`, `X448`), hybrid (`X25519MLKEM768`, `Secp256r1MLKEM768`), and PQC (`mlkem512`, `kyber768`, `kyber1024` — ML-KEM).
- **Signature algorithm** — e.g. `ecdsap256` (classical) or `dilithium5` (ML-DSA / PQC).

For each configuration it reports **throughput (Tps)**, **success percentage**, and a latency breakdown in milliseconds — connect time, TLS negotiation time, first-byte time, adaptive-proxy processing time, and upstream time.

![Performance Test Harness results comparing legacy, hybrid, and PQC algorithms](/img/lab-03/perf%20harness%20test%20results.png)

---

### Step 4.2.3 — Analyze the Results

Compare a few rows across legacy, hybrid, and PQC algorithms and look at:

- **Throughput (Tps)** — How does PQC compare to classical? In this harness the gap is **modest** — PQC and hybrid runs land close to their classical counterparts, not multiples slower.
- **Latency breakdown** — Most of the time is TLS negotiation and upstream processing; the **adaptive-proxy processing time** the proxy itself adds is small.
- **Proxy vs. Direct** — Switch the **Servers** filter between `Adaptive Proxy` and `Direct` to see the overhead the proxy introduces.

:::tip
The headline finding is reassuring: at the proxy, the throughput cost of quantum-safe algorithms is small. PQC's larger keys and signatures add measurable but modest overhead — not the order-of-magnitude penalty often assumed.
:::

---

### Step 4.2.4 — Connect the Data to CCE's Decisions

In production, CCE would use these benchmarks to answer questions such as:

- **Which services need load testing before cutover?** High-transaction systems (payments, real-time messaging) should be validated under production-like load before switching to PQC.
- **Where do proxies go first?** Prioritize the network boundaries with the highest HNDL exposure — high-value data crossing the internet, legacy systems that can't be upgraded quickly, and partner connections.
- **What policy fits each boundary?** Internal networks may tolerate stricter PQC-only enforcement; public-facing or partner-facing services may need hybrid mode longer for compatibility.

---

:::info[Step 4 Complete]

You reviewed QSR's policy controls — enforcing which client crypto profiles are accepted or blocked — and benchmarked TLS performance across legacy, hybrid, and PQC configurations.

**Key Achievements:**
- ✅ Understand how to enforce cryptographic policies at the network layer
- ✅ Tested policy changes and observed their impact on client connectivity
- ✅ Reviewed performance benchmarking capabilities
- ✅ Learned how to use performance data to guide migration decisions

**The Result:** CCE now has a repeatable operational model for quantum-safe remediation at scale, with the ability to enforce policies and validate performance before production deployment.

:::


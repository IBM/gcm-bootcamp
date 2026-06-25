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

### What This Is

QSR includes dynamic policy controls that enforce enterprise-wide cryptographic standards for all incoming traffic. These controls allow security teams to define which client crypto profiles are accepted, blocked, or translated — without modifying backend applications.

**Why This Matters:**
- **Centralized Enforcement:** One policy applies to all traffic through the proxy
- **No Application Changes:** Backend applications don't need to implement policy logic
- **Dynamic Adjustment:** Policies can be updated without redeploying applications
- **Audit and Compliance:** All policy decisions are logged and traceable

### Step 4.1.1 — Open the Adaptive Proxy Controls

#### What You're Doing

You're locating the policy configuration interface for the Adaptive Proxy to see which client cryptographic profiles can be accepted or blocked at the network layer.

#### Steps

1. Return to the **Adaptive Proxy Demo** tab.
2. Locate the **Adaptive Proxy Controls** panel on the right side of the interface, next to **Forward Proxy Controls**.

#### What's Happening

The Adaptive Proxy acts as a **policy enforcement point** for all incoming traffic. Instead of each backend application implementing its own cryptographic policy, the proxy enforces a consistent standard across all protected services.

---

### Step 4.1.2 — Review Available Controls

#### What You're Doing

You're examining the controls that govern which clients are allowed to connect and what cryptographic standards they must meet.

#### Steps

The **Adaptive Proxy Controls** panel exposes two policy toggles and an apply action:

- **Disable Legacy / Allow legacy** — Accept or reject clients that present only classical (legacy) cryptography.
- **Disable Hybrid / Allow hybrid** — Accept or reject clients that present hybrid (classical + PQC) cryptography.
- **Reconfigure** — Applies your selected policy to the live Adaptive Proxy.

Quantum-safe clients are always accepted; the toggles control whether weaker profiles are permitted.

#### Understanding Policy Options

Combining these two toggles produces the policy modes CCE will move through during migration:

1. **Permissive Mode (Current Configuration):**
   - Allow legacy **and** allow hybrid (quantum-safe always accepted)
   - Maximize compatibility during migration
   - Use case: Early migration phase, broad partner ecosystem

2. **Hybrid-Minimum Mode:**
   - **Disable legacy**, allow hybrid
   - Require at least hybrid cryptography; block pure legacy clients
   - Use case: Mid-migration, reducing HNDL risk

3. **PQC-Only Mode:**
   - **Disable legacy and disable hybrid**
   - Require full quantum-safe cryptography
   - Use case: Post-migration, maximum security

#### Why This Matters

Policy controls allow CCE to **progressively tighten** cryptographic requirements as the migration advances:

**Migration Timeline:**
- **Year 1:** Permissive mode — all clients accepted, proxies provide protection
- **Year 2:** Hybrid-minimum mode — legacy-only clients must upgrade
- **Year 3:** PQC-only mode — full quantum-safe requirement

This phased approach balances security with operational continuity.

---

### Step 4.1.3 — Adjust a Control and Retest

#### What You're Doing

You're testing how policy changes affect client connectivity, demonstrating how CCE can enforce cryptographic standards without modifying applications.

#### Steps

1. In the **Adaptive Proxy Controls**, set **Disable Legacy** and **Disable Hybrid** to enforce a **PQC-only** policy. (To try Hybrid-Minimum mode instead, disable only **Legacy**.)
2. Click **Reconfigure** to apply the new policy to the Adaptive Proxy.
3. Rerun each client using **Try it** and review how the transaction behavior changes.

#### What to Observe

**Example Test:** Enforce a PQC-only policy (disable both legacy and hybrid)

**Expected Results:**
- ❌ **Legacy Client:** Connection rejected — *"Legacy Clients no longer supported"*
- ❌ **Hybrid Client:** Connection rejected — *"Hybrid Clients no longer supported"*
- ✅ **Quantum Safe Client:** Connection SUCCESS (meets the quantum-safe requirement)

![QSR demo showing policy enforcement — Legacy and Hybrid clients blocked, Quantum Safe client still supported](/img/lab-03/Step4.1.png)

*QSR demo showing policy enforcement — Legacy and Hybrid clients blocked when stricter controls are applied, while the Quantum Safe client remains supported*

#### Why This Matters — Operational Control

This demonstrates **centralized policy enforcement**:

**Without QSR:**
- Each application must implement its own cryptographic policy
- Inconsistent enforcement across services
- Difficult to audit and update
- Requires code changes to adjust policy

**With QSR:**
- One policy applies to all services behind the proxy
- Consistent enforcement across the enterprise
- Policy changes take effect immediately
- No application code changes required

**Real-World Scenario for CCE:**

CCE discovers a new vulnerability in a classical algorithm. With QSR:
1. Update the Adaptive Proxy policy to block that algorithm
2. Policy takes effect immediately for all protected services
3. No application deployments required
4. Audit logs show which clients were affected

---

### Step 4.1.4 — Restore the Original Setting

#### Steps

After testing, set both toggles back to **Allow legacy** and **Allow hybrid**, then click **Reconfigure** to restore the permissive policy — unless instructed otherwise by your lab facilitator.

#### Why

This ensures the demo environment is ready for the next participant and maintains the expected configuration for subsequent steps.

---

## Part 4.2 — Performance Harness

### What This Is

PQC migration is not only a security exercise. Agencies must also understand latency, throughput, and operational impact before deploying new cryptographic standards broadly. The Performance Harness benchmarks TLS performance across legacy, hybrid, and PQC transactions to help guide production architecture decisions.

**Why This Matters:**
- **Capacity Planning:** Understand resource requirements for PQC at scale
- **Service Level Agreements:** Ensure PQC doesn't violate latency SLAs
- **Architecture Decisions:** Identify which services need hardware acceleration
- **Risk Assessment:** Balance security improvements against performance impact

---

### Step 4.2.1 — Access the Performance Harness

#### What You're Doing

You're accessing the performance benchmarking interface to review pre-run test results that demonstrate the operational impact of different cryptographic algorithms.

#### Steps

1. Return to the QSR demo environment.
2. Locate **Performance Harness**.
3. Click **Performance Test Harness** to view existing test results.

![Performance Harness selection in QSR demo interface](/img/lab-03/Performance%20Harness%20Selction.png)

*Performance Harness selection in QSR demo interface*

#### What's Happening

The Performance Harness has already run comprehensive benchmarks that simulate real-world TLS connections and measure:
- **Handshake time** — How long it takes to establish a secure connection
- **Throughput** — How much data can be transmitted per second
- **CPU utilization** — How much processing power is required
- **Memory usage** — How much RAM is consumed

**Note:** In this lab, you will review pre-run test results rather than executing new tests. This allows you to analyze performance data without waiting for lengthy benchmark runs.

---

### Step 4.2.2 — Review Available Test Results

#### What You're Doing

You're examining pre-run benchmark results that compare different algorithm combinations to understand their performance characteristics.

#### Steps

1. Review the Performance Harness dashboard showing available test results.
2. Observe the different algorithm combinations that have been benchmarked:
   - **Legacy, hybrid, and PQC TLS transaction types**
   - **Key exchange algorithms** (RSA, ECDH, MLKEM, etc.)
   - **Signature algorithms** (RSA, ECDSA, Dilithium, etc.)

![Performance Harness dashboard showing test configuration options](/img/lab-03/Perf%20Harness%20Dashboard.png)

*Performance Harness dashboard showing available test results and configurations*

#### Understanding Performance Factors

**Key Performance Considerations:**

1. **Key Exchange Algorithms:**
   - **Classical (RSA, ECDH):** Fast, well-optimized, but not quantum-safe
   - **PQC (MLKEM):** Larger key sizes, more computation, quantum-safe
   - **Hybrid:** Combines both, highest security but most overhead

2. **Signature Algorithms:**
   - **Classical (RSA, ECDSA):** Fast verification, moderate signing
   - **PQC (Dilithium, Falcon):** Larger signatures, different performance profiles
   - **Hybrid:** Combines both for defense-in-depth

3. **Performance Trade-offs:**
   - **Security vs. Speed:** PQC algorithms are generally slower than classical
   - **Key Size vs. Bandwidth:** PQC keys are larger, consuming more network bandwidth
   - **CPU vs. Memory:** Different algorithms have different resource profiles

---

### Step 4.2.3 — Analyze Test Results

#### What You're Doing

You're reviewing pre-run performance benchmark results to understand the real-world impact of different cryptographic choices.

#### Steps

1. Select a test result from the available benchmarks.
2. Open the test result to view detailed performance metrics.
3. Review the benchmark output and compare different algorithm types.

![Performance Harness test results showing benchmark data for different algorithm types](/img/lab-03/perf%20harness%20test%20results.png)

*Performance Harness test results showing benchmark data comparing classical, hybrid, and PQC algorithms*

#### What to Look For

As you review the test results, pay attention to:

- **Connection setup time and TLS handshake behavior** — How long does it take to establish a connection with each algorithm type?
- **Relative performance differences across algorithm types** — How much slower is PQC compared to classical? What about hybrid?
- **Algorithm combinations and compatibility** — Which combinations provide the best balance of security and performance?
- **Resource utilization patterns** — Which algorithms consume more CPU, memory, or bandwidth?

#### Expected Observations

**Typical Performance Patterns:**

| Algorithm Type | Handshake Time | Key Size | CPU Usage | Best Use Case |
|---------------|----------------|----------|-----------|---------------|
| **Classical (RSA/ECDH)** | Fast (baseline) | Small | Low | Legacy compatibility |
| **Hybrid** | Moderate (1.5-2x) | Medium | Medium | Transition period |
| **PQC (MLKEM)** | Slower (2-3x) | Large | Higher | Maximum security |

**Important Note:** These are relative comparisons. Actual performance depends on hardware, network conditions, and implementation.

---

### Step 4.2.4 — Interpret the Results

#### What You're Doing

You're connecting the performance data to real-world operational decisions that CCE must make during PQC migration.

#### Key Questions the Data Answers

In a production setting, CCE would use this data to answer questions such as:

**1. Which PQC or hybrid configurations are viable for high-volume services?**
- **Answer:** Services with tight latency requirements may need hybrid mode initially, then migrate to full PQC as hardware improves or algorithms are optimized.

**2. Which applications need dedicated performance testing before cutover?**
- **Answer:** High-transaction services (payment processing, real-time communications) should be tested with production-like loads before switching to PQC.

**3. Which clients or partners may need phased onboarding?**
- **Answer:** Partners with limited bandwidth or older hardware may need to stay on hybrid mode longer, or may require hardware upgrades.

**4. Where should QSR proxies be deployed first for the highest HNDL risk reduction?**
- **Answer:** Deploy proxies first at network boundaries where:
  - High-value data crosses the internet
  - Legacy systems cannot be upgraded quickly
  - Partner communications occur
  - Regulatory compliance is required

**5. What cryptographic policy should be enforced at each network boundary?**
- **Answer:** Use performance data to set realistic policies:
  - **Internal networks:** May tolerate higher latency, can enforce PQC-only
  - **Public-facing services:** May need hybrid mode for broader compatibility
  - **Partner connections:** Policy depends on partner capabilities

#### Real-World Application for CCE

**Scenario:** CCE is planning to deploy QSR for a high-volume financial transaction system.

**Performance Testing Reveals:**
- Classical TLS: 1000 transactions/second
- Hybrid TLS: 800 transactions/second (20% reduction)
- PQC-only TLS: 600 transactions/second (40% reduction)

**CCE's Decision:**
1. **Phase 1:** Deploy with hybrid mode to maintain 80% of current throughput while adding PQC protection
2. **Phase 2:** Upgrade proxy hardware or optimize configuration
3. **Phase 3:** Switch to PQC-only mode once performance is acceptable
4. **Ongoing:** Monitor performance and adjust as algorithms improve

**The Value:** CCE can make **data-driven decisions** about when and how to deploy PQC, balancing security improvements against operational requirements.

---

### Summary — Operational Readiness

By completing Part 4.2, you've learned how CCE can:

**Measure Impact:**
- Quantify the performance cost of PQC algorithms
- Identify services that need hardware upgrades
- Set realistic expectations for migration timelines

**Plan Deployment:**
- Prioritize which services to migrate first
- Determine appropriate cryptographic policies
- Allocate resources for hardware or optimization

**Sustain Operations:**
- Monitor performance over time
- Adjust policies as algorithms improve
- Validate that SLAs are maintained

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


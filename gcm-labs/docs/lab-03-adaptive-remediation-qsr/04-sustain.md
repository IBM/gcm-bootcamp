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

1. **Reverse Proxy policy controls** — Enforce cryptographic standards at the network layer
2. **Performance Harness** — Benchmark TLS performance across different algorithm types

---

## Part 4.1 — Reverse Proxy Policy Controls

### What This Is

QSR includes dynamic policy controls that enforce enterprise-wide cryptographic standards for all incoming traffic. These controls allow security teams to define which client crypto profiles are accepted, blocked, or translated — without modifying backend applications.

**Why This Matters:**
- **Centralized Enforcement:** One policy applies to all traffic through the proxy
- **No Application Changes:** Backend applications don't need to implement policy logic
- **Dynamic Adjustment:** Policies can be updated without redeploying applications
- **Audit and Compliance:** All policy decisions are logged and traceable

### Step 4.1.1 — Open Reverse Proxy Controls

#### What You're Doing

You're accessing the policy configuration interface for the Reverse Proxy to see what cryptographic standards can be enforced at the network layer.

#### Steps

1. Return to the QSR demo landing page.
2. Locate the **Reverse Proxy Control** section.
3. Open or expand the Reverse Proxy controls.

#### What's Happening

The Reverse Proxy acts as a **policy enforcement point** for all incoming traffic. Instead of each backend application implementing its own cryptographic policy, the proxy enforces a consistent standard across all protected services.

---

### Step 4.1.2 — Review Available Controls

#### What You're Doing

You're examining the types of policies that can be enforced to control which clients are allowed to connect and what cryptographic standards they must meet.

#### Steps

Review the policy options available in the demo environment. Depending on your lab setup, these may include settings related to:

- **Accepted client crypto profiles** (legacy, hybrid, quantum-safe)
- **Legacy compatibility and fallback behavior**
- **Routing and enforcement behavior**
- **Hybrid and PQC support levels**

#### Understanding Policy Options

**Typical Policy Scenarios:**

1. **Permissive Mode (Current Configuration):**
   - Accept legacy, hybrid, and quantum-safe clients
   - Maximize compatibility during migration
   - Use case: Early migration phase, broad partner ecosystem

2. **Hybrid-Minimum Mode:**
   - Require at least hybrid cryptography
   - Block pure legacy clients
   - Use case: Mid-migration, reducing HNDL risk

3. **PQC-Only Mode:**
   - Require full quantum-safe cryptography
   - Block legacy and hybrid clients
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

1. Select one available Reverse Proxy control and change the setting.
2. Rerun one of the client tests using **Try it**.
3. Review how the transaction behavior changes in response to the policy adjustment.

#### What to Observe

**Example Test:** Change policy to block legacy clients

**Expected Results:**
- ❌ **Legacy Client:** Connection BLOCKED or REJECTED
- ✅ **Hybrid Client:** Connection SUCCESS (meets minimum standard)
- ✅ **Quantum Safe Client:** Connection SUCCESS (exceeds minimum standard)

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
1. Update the Reverse Proxy policy to block that algorithm
2. Policy takes effect immediately for all protected services
3. No application deployments required
4. Audit logs show which clients were affected

---

### Step 4.1.4 — Restore the Original Setting

#### Steps

After testing, return the control to its original setting unless instructed otherwise by your lab facilitator.

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

### Step 4.2.1 — Open the Performance Harness

#### What You're Doing

You're accessing the performance benchmarking tool to measure the operational impact of different cryptographic algorithms.

#### Steps

1. Return to the QSR demo environment.
2. Locate **Performance Harness**.
3. Click **New Performance Test Harness** or **Performance Test Harness**, depending on the available option.

![Performance Harness selection in QSR demo interface](/img/lab-03/Performance%20Harness%20Selction.png)

*Performance Harness selection in QSR demo interface*

#### What's Happening

The Performance Harness simulates real-world TLS connections and measures:
- **Handshake time** — How long it takes to establish a secure connection
- **Throughput** — How much data can be transmitted per second
- **CPU utilization** — How much processing power is required
- **Memory usage** — How much RAM is consumed

---

### Step 4.2.2 — Review Test Options

#### What You're Doing

You're examining the different algorithm combinations that can be benchmarked to understand their performance characteristics.

#### Steps

Review the available benchmark configurations. The demo allows you to explore combinations of:

- **Legacy, hybrid, and PQC TLS transaction types**
- **Key exchange algorithms** (RSA, ECDH, MLKEM, etc.)
- **Signature algorithms** (RSA, ECDSA, Dilithium, etc.)

![Performance Harness dashboard showing test configuration options](/img/lab-03/Perf%20Harness%20Dashboard.png)

*Performance Harness dashboard showing test configuration options*

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

### Step 4.2.3 — Run or Review a Test

#### What You're Doing

You're executing or reviewing performance benchmarks to understand the real-world impact of different cryptographic choices.

#### Steps

1. Select an available test configuration.
2. Start the test or open an existing test result.
3. Review the benchmark output.

#### What to Look For

Pay attention to:

- **Connection setup time and TLS handshake behavior** — How long does it take to establish a connection?
- **Relative performance differences across algorithm types** — How much slower is PQC compared to classical?
- **Algorithm combinations and any compatibility observations** — Which combinations work well together?

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


---
sidebar_position: 5
title: "Step 4: Sustain"
---

# Step 4: Sustain — Enforce Policy and Benchmark Performance

In Labs 1 and 2, CCE learned that remediation is not complete until it can be governed and repeated at scale. The same principle applies to QSR.

In this phase, you will review two operational capabilities that allow CCE to run quantum-safe remediation continuously — not just as a one-time technical exercise:

1. Reverse Proxy policy controls
2. Performance Harness

---

## Part 4.1 — Reverse Proxy Policy Controls

QSR includes dynamic policy controls that enforce enterprise-wide cryptographic standards for all incoming traffic. These controls allow security teams to define which client crypto profiles are accepted, blocked, or translated — without modifying backend applications.

### Step 4.1.1 — Open Reverse Proxy Controls

1. Return to the QSR demo landing page.
2. Locate the **Reverse Proxy Control** section.
3. Open or expand the Reverse Proxy controls.

### Step 4.1.2 — Review Available Controls

Review the policy options available in the demo environment. Depending on your lab setup, these may include settings related to:

- Accepted client crypto profiles (legacy, hybrid, quantum-safe)
- Legacy compatibility and fallback behavior
- Routing and enforcement behavior
- Hybrid and PQC support levels

### Step 4.1.3 — Adjust a Control and Retest

1. Select one available Reverse Proxy control and change the setting.
2. Rerun one of the client tests using **Try it**.
3. Review how the transaction behavior changes in response to the policy adjustment.

![QSR demo showing policy enforcement — Legacy and Hybrid clients blocked, Quantum Safe client still supported](/img/lab-03/Step4.1.png)

*QSR demo showing policy enforcement — Legacy and Hybrid clients blocked when stricter controls are applied, while the Quantum Safe client remains supported*

### Step 4.1.4 — Restore the Original Setting

After testing, return the control to its original setting unless instructed otherwise by your lab facilitator.

---

## Part 4.2 — Performance Harness

PQC migration is not only a security exercise. Agencies must also understand latency, throughput, and operational impact before deploying new cryptographic standards broadly. The Performance Harness benchmarks TLS performance across legacy, hybrid, and PQC transactions to help guide production architecture decisions.

### Step 4.2.1 — Open the Performance Harness

1. Return to the QSR demo environment.
2. Locate **Performance Harness**.
3. Click **New Performance Test Harness** or **Performance Test Harness**, depending on the available option.

### Step 4.2.2 — Review Test Options

Review the available benchmark configurations. The demo allows you to explore combinations of:

- Legacy, hybrid, and PQC TLS transaction types
- Key exchange algorithms
- Signature algorithms

### Step 4.2.3 — Run or Review a Test

1. Select an available test configuration.
2. Start the test or open an existing test result.
3. Review the benchmark output.

Pay attention to:

- Connection setup time and TLS handshake behavior
- Relative performance differences across algorithm types
- Algorithm combinations and any compatibility observations

### Step 4.2.4 — Interpret the Results

In a production setting, CCE would use this data to answer questions such as:

- Which PQC or hybrid configurations are viable for high-volume services?
- Which applications need dedicated performance testing before cutover?
- Which clients or partners may need phased onboarding?
- Where should QSR proxies be deployed first for the highest HNDL risk reduction?
- What cryptographic policy should be enforced at each network boundary?

---

:::info[Step 4 Complete]

You reviewed QSR's policy controls — enforcing which client crypto profiles are accepted or blocked — and benchmarked TLS performance across legacy, hybrid, and PQC configurations. CCE now has a repeatable operational model for quantum-safe remediation at scale.

:::


---
sidebar_position: 5
title: "Phase 4: Sustain"
---

# Phase 4: Sustain — Enforce Policy, Monitor Crypto Operations, and Manage Proxies

In Labs 1 and 2, CCE learned that remediation is not complete until it can be monitored, governed, and repeated at scale. The same principle applies to QSR.

In this phase, you will review four operational capabilities that allow CCE to run quantum-safe remediation continuously — not just as a one-time technical exercise:

1. Reverse Proxy policy controls
2. Observability and crypto telemetry
3. Proxy Manager
4. Performance Harness

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

### Step 4.1.4 — Restore the Original Setting

After testing, return the control to its original setting unless instructed otherwise by your lab facilitator.

---

## Part 4.2 — Observability

QSR's observability capability provides real-time visibility into cryptographic operations and traffic metrics, including Prometheus-compatible monitoring for crypto events. This allows security teams to detect, track, and report on cryptographic activity without relying solely on application logs.

### Step 4.2.1 — Open Observability

1. On the QSR demo page, locate **Admin tasks**.
2. Select **Observability**.
3. Wait for the observability dashboard to load.

### Step 4.2.2 — Review Crypto Telemetry

Review the available dashboard panels. Look for information such as:

- Traffic volume and TLS transaction patterns
- Crypto usage trends and key exchange activity
- Client crypto profiles observed
- Proxy activity and health
- Policy enforcement events or errors

### Step 4.2.3 — Connect Observability to CCE Operations

Consider how Bohdi would use these dashboards in a production CCE deployment:

- Detect continued use of legacy cryptography across agency systems.
- Track the adoption of hybrid and PQC traffic over time.
- Identify clients that fail policy enforcement.
- Monitor proxy health across data centers and cloud environments.
- Provide evidence packages for OMB M-23-02 and FedRAMP compliance reporting.
- Feed crypto telemetry into existing SIEM and enterprise monitoring workflows.

---

## Part 4.3 — Proxy Manager

Proxy Manager provides centralized monitoring, configuration, and management of multiple QSR proxies from a single console. In a production CCE deployment, it would give security and platform teams unified control over proxies deployed across data centers, cloud environments, Kubernetes ingress paths, agency-to-agency network boundaries, and partner integration zones.

:::warning

In this lab environment, Proxy Manager is **view only**. Do not edit, save, or update any configuration unless explicitly instructed by your lab facilitator.

:::

### Step 4.3.1 — Open Proxy Manager

1. On the QSR demo page, locate **Admin tasks**.
2. Select **Proxy Manager**.
3. Wait for the Proxy Manager console to open.

### Step 4.3.2 — Review Managed Proxies

Review the available proxy entries and identify:

- Reverse Proxy and Forward Proxy instances
- Proxy health and status
- Configuration and deployment metadata
- Monitoring details

---

## Part 4.4 — Performance Harness

PQC migration is not only a security exercise. Agencies must also understand latency, throughput, and operational impact before deploying new cryptographic standards broadly. The Performance Harness benchmarks TLS performance across legacy, hybrid, and PQC transactions to help guide production architecture decisions.

### Step 4.4.1 — Open the Performance Harness

1. Return to the QSR demo environment.
2. Locate **Performance Harness**.
3. Click **New Performance Test Harness** or **Performance Test Harness**, depending on the available option.

### Step 4.4.2 — Review Test Options

Review the available benchmark configurations. The demo allows you to explore combinations of:

- Legacy, hybrid, and PQC TLS transaction types
- Key exchange algorithms
- Signature algorithms

### Step 4.4.3 — Run or Review a Test

1. Select an available test configuration.
2. Start the test or open an existing test result.
3. Review the benchmark output.

Pay attention to:

- Connection setup time and TLS handshake behavior
- Relative performance differences across algorithm types
- Algorithm combinations and any compatibility observations

### Step 4.4.4 — Interpret the Results

In a production setting, CCE would use this data to answer questions such as:

- Which PQC or hybrid configurations are viable for high-volume services?
- Which applications need dedicated performance testing before cutover?
- Which clients or partners may need phased onboarding?
- Where should QSR proxies be deployed first for the highest HNDL risk reduction?
- What cryptographic policy should be enforced at each network boundary?

---

:::info[Phase 4 Complete]

You reviewed all four operational capabilities for sustaining QSR in production: dynamic crypto policy controls, real-time observability, centralized proxy management, and TLS performance benchmarking. CCE now has a repeatable operational model for quantum-safe remediation at scale.

:::

---

Proceed to **[Lab Summary →](./summary)**

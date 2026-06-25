---
sidebar_position: 1
title: Lab Introduction
---

# Lab 3: IBM Quantum Safe Remediator — Adaptive Proxy

**Hands-On Lab Guide | Post-Quantum Cryptography Migration**

## Background & Lab Introduction

With Labs 1 and 2 complete, the CCE agency has established its initial quantum-safe migration foundation.

In **Lab 1**, CCE used **IBM Quantum Safe Explorer (QSE)** to discover cryptographic vulnerabilities in application source code and generate a living Cryptographic Bill of Materials (CBOM).

In **Lab 2**, CCE used **IBM Guardium Cryptography Manager (GCM)** and **HashiCorp Vault** to analyze risk, enforce cryptographic policy, renew weak certificates, and validate improved cryptographic posture.

However, Johnny Utah, CCE's CISO, now faces a harder operational problem.

Many of CCE's mission-critical applications cannot be rewritten immediately. Some are legacy systems, vendor-managed applications, or production services where changing application code would require long testing cycles, contract changes, or major downtime windows. At the same time, these systems still send and receive sensitive communications across agency boundaries, cloud environments, partner networks, and the internet.

This creates an urgent PQC transition challenge:

> **How can CCE protect legacy applications with quantum-safe communication *now*, without changing the applications themselves?**

That is the purpose of Lab 3.

In this lab, you will use **IBM Quantum Safe Remediator (QSR)** — specifically the **Adaptive Proxy** — to demonstrate how CCE can protect inbound and outbound TLS traffic using quantum-safe cryptography while maintaining full compatibility with legacy applications.

:::info[CCE SCENARIO]

CCE has inventoried its cryptographic assets and renewed its weakest certificates. But Johnny Utah's threat model has expanded: adversaries are not only targeting data at rest — they are actively harvesting encrypted communications across agency network boundaries today, including traffic from legacy systems that cannot be rewritten on short notice.

Johnny Utah briefs CCE leadership:

> "We now know what cryptography we have. We have renewed weak certificates. But our legacy applications are still communicating over network boundaries using inconsistent cryptographic standards. We need protection over the wire before adversaries harvest today's traffic for future decryption."

Bohdi, CCE's Security Administrator, is assigned the next mission:

1. Demonstrate how CCE can support **legacy, hybrid, and quantum-safe clients**.
2. Protect inbound agency application traffic using the **Quantum Safe Adaptive Proxy**.
3. Protect outbound client-side traffic using a **Quantum Safe Forward Proxy**.
4. Enforce cryptographic policies dynamically.
5. Benchmark legacy, hybrid, and PQC TLS performance using the performance harness.

:::

:::tip

No coding experience is required. You will be clicking through a pre-built demo environment. Follow each phase in order.

:::

## Why This Lab Matters

During PQC migration, agencies will encounter inconsistent cryptographic standards across applications, users, services, and external partners. Some clients may support only legacy TLS, others hybrid key exchange, and newer systems full quantum-safe algorithms.

Without an interoperability layer, agencies face a difficult choice:

- Leave legacy applications exposed to **Harvest-Now, Decrypt-Later (HNDL)** risk.
- Rewrite applications immediately — which may be expensive or operationally risky.
- Break compatibility with older clients and partner systems.
- Delay PQC migration until all systems are fully modernized.

IBM Quantum Safe Remediator addresses this transition problem by placing adaptive proxies at strategic network points. The **Adaptive Proxy** is deployed at the enterprise backend or cloud perimeter, where it functions as a *reverse proxy* — terminating incoming PQC traffic and bridging it to legacy applications while preserving interoperability. The **Forward Proxy** sits on the client side to upgrade legacy TLS traffic to PQC before transmission over the internet.

## Tools You Will Use

| Tool | What It Does |
|------|--------------|
| **IBM Quantum Safe Remediator — Adaptive Proxy** | Provides quantum-safe protection for communications without requiring changes to backend applications. Supports adaptive and forward proxy modes, crypto enforcement, interoperability, quantum-safe key exchange, policy controls, and legacy-to-modern bridging. |
| **Quantum Safe Adaptive Proxy** | Deployed at the enterprise backend or cloud perimeter, where it acts as a reverse proxy to handle incoming PQC traffic and bridge it to legacy applications. |
| **Quantum Safe Forward Proxy** | Deployed near the client side to upgrade legacy TLS traffic to PQC before traffic crosses the internet. |
| **Performance Harness** | Benchmarks TLS performance across legacy, hybrid, and PQC transactions to guide production architecture decisions. |

## Lab Workflow

Each step below maps to a phase of IBM's Six-Phase PQC Migration Lifecycle. Lab 3 focuses on Phases 5 and 6: executing a pilot deployment of QSR proxies (Pilot Migration) and establishing policy controls and performance benchmarking to sustain quantum-safe operations at scale (Validation & Monitoring). The Discover step also touches Phase 4 as CCE reviews proxy architecture and identifies the gaps in its current network posture.

| Step | Name | What Happens | PQC Lifecycle Phase |
|------|------|--------------|---------------------|
| **1** | **Discover** | Open the QSR Adaptive Proxy demo environment and review the client-to-proxy-to-application architecture. Identify the gap in CCE's current posture: legacy communications still unprotected at the network layer. | Phase 4 & 5 — Architecture & Pilot Testing |
| **2** | **Assess** | Test legacy, hybrid, and quantum-safe clients to observe TLS handshake behavior, key exchange, and authentication translation. | Phase 5 — Pilot Testing & Phased Migration |
| **3** | **Execute** | Enable the Forward Proxy so client traffic is upgraded to quantum-safe before it reaches the Adaptive Proxy, protecting the internet segment while preserving compatibility with the backend application. | Phase 5 — Pilot Testing & Phased Migration |
| **4** | **Sustain** | Review policy controls and performance benchmarking to understand how CCE can operate QSR continuously at scale. | Phase 6 — Validation, Monitoring & Crypto-Agility |


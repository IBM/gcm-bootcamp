---
sidebar_position: 1
title: Lab Introduction
---

# Lab 1: IBM Quantum Safe Explorer + IBM Bob

**Hands-On Lab Guide | Post-Quantum Cryptography Migration**

## Background & Lab Introduction

Quantum computers are advancing rapidly and will eventually break the public-key cryptography that protects most of today's digital systems — including encrypted communications, authentication tokens, and digital signatures. To stay ahead of this threat, government agencies and organizations must migrate their cryptographic implementations to **Post-Quantum Cryptography (PQC)** algorithms, which are designed to be secure even against quantum computers.

In this lab, you will take on the role of **Bohdi, CCE's Security Administrator**. Your mission is to use IBM tools — IBM Quantum Safe Explorer (QSE), IBM Bob, Jenkins CI/CD, and IBM Guardium Cryptography Manager (GCM) — to assess and harden the CCE Agency's secure-chat application against quantum threats.

:::info[CCE SCENARIO]

Breaking NSA headline: China has published a definitive quantum roadmap. Harvest-Now, Decrypt-Later (HNDL) operations are actively capturing encrypted communications today — data that becomes readable once a quantum computer is operational. [OMB M-23-02](https://www.whitehouse.gov/wp-content/uploads/2022/11/M-23-02-M-Memo-on-Migrating-to-Post-Quantum-Cryptography.pdf) compliance deadlines are immovable.

CCE's secure-chat application handles encrypted agency communications, but no one has ever inventoried its cryptographic assets. Until now, CCE has had no CBOM, no vulnerability baseline, and no automated cryptographic scanning in its CI/CD pipeline. This lab changes that.

:::

:::tip

No coding experience is required. You will be clicking through pre-built tools and asking IBM Bob questions in plain English. Follow each step in order.

:::

## Tools You Will Use

| Tool | What It Does |
|------|--------------|
| **IBM Quantum Safe Explorer (QSE)** | Scans application source code to find cryptographic weaknesses — outdated algorithms or insecure key sizes — and generates detailed vulnerability findings and a [CycloneDX](https://cyclonedx.org/) CBOM. |
| **IBM Bob** | IBM's agentic coding IDE, connected to QSE via MCP. Bob queries live scan data to explain vulnerabilities in plain English, suggests fixes, and can automatically update the code for you. |
| **Jenkins CI/CD** | Automates the build-scan-report pipeline. Every code commit triggers a QSE scan, generates an updated CBOM, and uploads results to GCM — creating a continuous, timestamped audit trail. |
| **IBM Guardium Cryptography Manager (GCM)** | Your command center. Aggregates QSE scan findings, displays CCE's cryptographic security posture, and maintains the living CBOM. The source of truth for vulnerability review and OMB M-23-02 compliance reporting. |

## Lab Workflow

Each step below maps to a phase of IBM's Six-Phase PQC Migration Lifecycle. Lab 1 focuses primarily on Phase 2 (Discovery & Cryptographic Inventory), with the Execute step reaching into Phase 5 (Pilot Testing & Phased Migration) as CCE applies its first code-level fix.

| Step | Name | What Happens | PQC Lifecycle Phase |
|------|------|--------------|---------------------|
| **1** | **Discover** | Review the automated QSE-Jenkins-GCM workflow and understand how the scan pipeline operates before diving into findings. | Phase 2 — Discovery & Cryptographic Inventory |
| **2** | **Assess** | Use the GCM dashboard to review scan results, identify the most critical cryptographic weaknesses, and create a remediation ticket. | Phase 2 — Discovery & Cryptographic Inventory |
| **3** | **Execute** | Use IBM Bob to automatically identify and fix RSA vulnerabilities with AI-generated code changes grounded in the real QSE scan data. | Phase 5 — Pilot Testing & Phased Migration |
| **4** | **Sustain** | Commit the fixed code and confirm in GCM that the vulnerability is resolved — producing CCE's first auditable CBOM. | Phase 2 & 5 — Discovery & Pilot Migration |

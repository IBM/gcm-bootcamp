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

Breaking NSA headline: China has published a definitive quantum roadmap. Harvest-Now, Decrypt-Later (HNDL) operations are actively capturing encrypted communications today — data that becomes readable once a quantum computer is operational. OMB M-23-02 compliance deadlines are immovable.

CCE's secure-chat application handles encrypted agency communications, but no one has ever inventoried its cryptographic assets. Until now, CCE has had no CBOM, no vulnerability baseline, and no automated cryptographic scanning in its CI/CD pipeline. This lab changes that.

:::

:::tip

No coding experience is required. You will be clicking through pre-built tools and asking IBM Bob questions in plain English. Follow each step in order.

:::

## Tools You Will Use

| Tool | What It Does |
|------|--------------|
| **IBM Quantum Safe Explorer (QSE)** | Scans application source code to find cryptographic weaknesses — outdated algorithms or insecure key sizes — and generates detailed vulnerability findings and a CycloneDX CBOM. |
| **IBM Bob** | IBM's agentic coding IDE, connected to QSE via MCP. Bob queries live scan data to explain vulnerabilities in plain English, suggests fixes, and can automatically update the code for you. |
| **Jenkins CI/CD** | Automates the build-scan-report pipeline. Every code commit triggers a QSE scan, generates an updated CBOM, and uploads results to GCM — creating a continuous, timestamped audit trail. |
| **IBM Guardium Cryptography Manager (GCM)** | Your command center. Aggregates QSE scan findings, displays CCE's cryptographic security posture, and maintains the living CBOM. The source of truth for vulnerability review and OMB M-23-02 compliance reporting. |

## PQC Migration Phases Covered in This Lab

| Phase | Name | What Happens |
|-------|------|--------------|
| **1** | **Discover** | Review the automated QSE-Jenkins-GCM workflow and understand how the scan pipeline operates before diving into findings. |
| **2** | **Assess** | Use the GCM dashboard to review scan results, identify the most critical cryptographic weaknesses, and create a remediation ticket. |
| **3** | **Execute** | Use IBM Bob to automatically identify and fix RSA vulnerabilities with AI-generated code changes grounded in the real QSE scan data. |
| **4** | **Sustain** | Commit the fixed code, push to trigger Jenkins, and confirm in GCM that the vulnerability is resolved — producing CCE's first auditable CBOM. |

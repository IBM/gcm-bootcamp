---
sidebar_position: 4
title: "Step 3: Execute"
---

# Step 3: Execute — Protect Legacy Traffic with the Forward Proxy

## Overview

In this phase you enable the **Forward Proxy** — the client-side proxy that upgrades outbound traffic to quantum-safe **before** it crosses the internet. This is the core remediation scenario for Lab 3.

In Step 2, only the legacy client was exposed: it reached the Adaptive Proxy over the internet using classical `x25519`, while the hybrid and quantum-safe clients already negotiated PQC. Enabling the Forward Proxy closes the legacy gap — and standardizes the internet hop for every client — without changing the client or the backend.

---

## Step 3.1 — Enable the Forward Proxy

You're activating the Forward Proxy to create a quantum-safe tunnel across the internet, between the client side and the Adaptive Proxy.

### Steps

1. Return to the QSR demo landing page.
2. In **Forward Proxy Controls**, set the toggle to **Enable**.
3. Confirm the **Adaptive Proxy** remains active (it is always on — no toggle to change).

![QSR demo with Forward Proxy control highlighted](/img/lab-03/Step3.1.png)

**Before (Step 2 — Forward Proxy disabled):**
```
[Legacy Client] --[Classical x25519 — VULNERABLE]-- [Internet] --[Adaptive Proxy]-- [Backend]
```

**After (Step 3 — Forward Proxy enabled):**
```
[Legacy Client] --[Classical]-- [Forward Proxy] --[Quantum-Safe MLKEM1024]-- [Internet] --[Adaptive Proxy]-- [Backend]
                                                  ↑
                                           Protected over the wire
```

With the Forward Proxy enabled, every client now routes through it: the internet-crossing hop is upgraded to quantum-safe cryptography, while the client and backend keep their existing configurations.

---

## Step 3.2 — Retest the Legacy Client

Retest the legacy client with the Forward Proxy enabled — this is the **core value proposition** of QSR: protecting legacy traffic without upgrading the client itself.

### Steps

1. Locate the **Legacy client**.
2. Click **Try it** again.
3. Review the updated TLS Handshake Details.

### Expected Results

The handshake now shows **three** segments instead of two — the Forward Proxy has inserted itself between the client and the Adaptive Proxy:

- ✅ **Client → Forward Proxy:** TLS 1.3 · KEM `x25519` · signature `RSASSA-PSS` — classical, but this hop is local to the client side and never crosses the internet
- ✅ **Forward Proxy → Adaptive Proxy:** TLS 1.3 · KEM `MLKEM1024` · signature `id-ml-dsa-44` — **quantum-safe** — this is the internet-crossing segment, now protected
- ✅ **Adaptive Proxy → Upstream Application:** TLS 1.3 · KEM `secp521r1` · signature `id-ecPublicKey` — classical (the backend is unchanged)

![Legacy client TLS handshake details showing quantum-safe key exchange between Forward Proxy and Adaptive Proxy](/img/lab-03/Step3.2.png)

*Legacy client handshake with the Forward Proxy enabled — the internet segment now uses MLKEM1024*

**The breakthrough:** in Step 2 the legacy client crossed the internet with classical `x25519`, exposed to Harvest-Now, Decrypt-Later. The same client, **completely unchanged**, now crosses the internet with `MLKEM1024`. The legacy client doesn't know it's being protected — the Forward Proxy upgrades the connection transparently.

---

## Step 3.3 — Retest the Hybrid Client

Retest the hybrid client to confirm it also routes through the Forward Proxy.

### Steps

1. Locate the **Hybrid client**.
2. Click **Try it** again.
3. Review the TLS Handshake Details.

### Expected Results

- ✅ **Client → Forward Proxy:** TLS 1.3 · KEM `p256_mlkem512` · signature `RSASSA-PSS` — hybrid, reflecting the client's native capability
- ✅ **Forward Proxy → Adaptive Proxy:** TLS 1.3 · KEM `MLKEM1024` · signature `id-ml-dsa-44` — **quantum-safe** (identical to every other client)
- ✅ **Adaptive Proxy → Upstream Application:** TLS 1.3 · KEM `secp521r1` · signature `id-ecPublicKey` — classical

The hybrid client was already protected in Step 2; the Forward Proxy now standardizes its internet hop to `MLKEM1024`.

---

## Step 3.4 — Retest the Quantum Safe Client

Retest the quantum-safe client to confirm the architecture doesn't degrade an already-strong client.

### Steps

1. Locate the **Quantum Safe client**.
2. Click **Try it** again.
3. Review the TLS Handshake Details.

### Expected Results

- ✅ **Client → Forward Proxy:** TLS 1.3 · KEM `MLKEM512` · signature `RSASSA-PSS` — full PQC, the client's native capability
- ✅ **Forward Proxy → Adaptive Proxy:** TLS 1.3 · KEM `MLKEM1024` · signature `id-ml-dsa-44` — **quantum-safe**
- ✅ **Adaptive Proxy → Upstream Application:** TLS 1.3 · KEM `secp521r1` · signature `id-ecPublicKey` — classical

No downgrade: the quantum-safe client stays quantum-safe end-to-end, and its internet hop is upgraded from `MLKEM512` to `MLKEM1024`.

---

## Step 3.5 — Interpret the Result

The key takeaway: with the Forward Proxy enabled, **the internet-crossing hop is a uniform `MLKEM1024` for every client**, regardless of what the client natively supports. The Forward Proxy enforces one consistent quantum-safe standard on the wire.

### Summary — Internet-Crossing Segment

The table below compares the over-the-internet key exchange before and after enabling the Forward Proxy. (The Adaptive Proxy → backend hop stays classical `secp521r1` throughout, by design.)

| Client Type | Step 2 (Adaptive Proxy only) | Step 3 (Forward Proxy enabled) | Result |
|-------------|------------------------------|--------------------------------|--------|
| **Legacy** | `x25519` (classical — vulnerable) | `MLKEM1024` (quantum-safe) | **HNDL risk eliminated** |
| **Hybrid** | `p256_mlkem512` (hybrid PQC) | `MLKEM1024` (quantum-safe) | Standardized & strengthened |
| **Quantum Safe** | `MLKEM512` (PQC) | `MLKEM1024` (quantum-safe) | Strengthened |

The legacy client is the dramatic win — classical to quantum-safe with no client change. The hybrid and quantum-safe clients, already protected, are standardized to the same strong `MLKEM1024` on the wire.

:::info[Step 3 Complete]

You enabled the Forward Proxy and confirmed that all three clients now cross the internet using quantum-safe `MLKEM1024`, while their backends remain unchanged.

**Key Achievements:**
- ✅ Legacy client traffic is protected without any client modification
- ✅ The internet segment uses quantum-safe cryptography for every client
- ✅ The backend application continues operating unchanged

**The Result:** CCE can protect sensitive communications across network boundaries without modifying applications — delivering immediate HNDL risk reduction during the multi-year PQC migration.

:::

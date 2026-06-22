---
sidebar_position: 4
title: "Step 3: Execute"
---

# Step 3: Execute — Protect Legacy Traffic with Forward and Reverse Proxy

In this phase, you will enable the **Forward Proxy** and demonstrate how QSR upgrades legacy client traffic before it crosses the internet.

This is the core remediation scenario for Lab 3. With both proxies active, the full traffic path becomes:

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
  [Reverse Proxy — bridges PQC to legacy backend]
            |
            v
      Backend Application
```

The Forward Proxy addresses **Harvest-Now, Decrypt-Later (HNDL)** risk by ensuring that traffic crossing the internet uses quantum-safe cryptography — even when the originating client cannot support it natively.

---

## Step 3.1 — Enable the Forward Proxy

1. Return to the QSR demo landing page.
2. Locate the **Forward Proxy Control**.
3. Turn on / enable the **Forward Proxy**.
4. Confirm the **Reverse Proxy** remains enabled.

![QSR demo with Forward Proxy control highlighted](/img/lab-03/Step3.1.png)

*QSR demo with Forward Proxy control highlighted*

Both proxies are now active. The full client-to-backend path is protected.

---

## Step 3.2 — Retest the Legacy Client

1. Locate the **Legacy client**.
2. Click **Try it** again.
3. Review the updated transaction output.

Compare this result to your Step 2 Legacy client test. Look for:

- TLS handshake changes
- Key exchange changes
- Authentication translation by the Forward Proxy
- Evidence that traffic between the proxies is now quantum-safe protected
- Continued successful access to the backend application

![Legacy client TLS handshake details showing quantum-safe key exchange between Forward Proxy and Adaptive Proxy](/img/lab-03/Step3.2.png)

*Legacy client TLS handshake details showing quantum-safe key exchange (MLKEM1024) between Forward Proxy and Adaptive Proxy*

:::tip

The desired outcome is not simply that the application works. The desired outcome is that CCE can protect sensitive communications **while maintaining compatibility** with different client capabilities.

:::

---

## Step 3.3 — Retest the Hybrid Client

1. Locate the **Hybrid client**.
2. Click **Try it** again.
3. Review the transaction output.

Observe whether enabling the Forward Proxy changes the negotiated cryptographic path for a hybrid client.

---

## Step 3.4 — Retest the Quantum Safe Client

1. Locate the **Quantum Safe client**.
2. Click **Try it** again.
3. Review the transaction output.

Confirm that the Quantum Safe client continues to work correctly through the full proxy architecture.

---

## Step 3.5 — Interpret the Result

After retesting all three clients with both proxies enabled, take a moment to connect the technical outcome back to CCE's operational objective.

QSR provides a practical transition architecture that allows CCE to:

- Keep legacy systems operating without immediate code changes.
- Protect traffic **across network boundaries** using quantum-safe cryptography.
- Support clients at different stages of crypto readiness simultaneously.
- Give enterprise security teams policy control over inbound and outbound cryptographic behavior.
- Reduce HNDL exposure **during** the migration — not only after it is complete.

---

:::info[Step 3 Complete]

You enabled the Forward Proxy and demonstrated how QSR protects legacy client traffic using quantum-safe communication between proxy points. CCE can now protect sensitive communications across network boundaries without modifying the backend application.

:::

---

Proceed to **[Step 4: Sustain →](./sustain)**

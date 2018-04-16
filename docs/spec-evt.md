---
id: spec-evt
title: Exception Vector Table
---

Exception Vector Table (EVT) is located in the main memory, and tells core where to find routines necessary for handling exceptional states.

## EVT address

Address of EVT is controlled by [control register ``cr1``](registers.md#cr1). At the boot, address of EVT is set to ``0x00000000``.


## EVT structure

EVT is 256 bytes - 1 memory page - long, forming an array of 32 entries, each 8 bytes long. Entries are indexed by the exception ID. Lower 16 entries are reserved for interrupts, while upper 16 entries lead to software routines that deal with remaining exception types.

Entry content allows core to find and run a routine to handle the exception:

```
63                             32 31                             0
 v                              v v                              v
+--------------------------------+--------------------------------+
|             SP                 |               IP               |
+--------------------------------+--------------------------------+
```

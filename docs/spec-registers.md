---
id: spec-registers
title: Registers
---

## General Purpose Registers

**DuckyISA** provides 32 32-bit registers:

* ``r0`` to ``r29`` are general purpose registers
* ``r30`` is nicknamed ``fp`` and serves as a frame pointer
* ``r31`` is nicknamed ``sp`` and serves as a stack pointer

Both ``fp`` and ``sp`` can be manipulated by common instructions, but both are used by instructions implementing calls and returns and such instructions may read or write their content as well.


## Flags register

Flags register is a read-only pseudo-register. It is not possible to change its value by writing into it, yet its value is modified by some instructions by reflecting their effects on the CPU core. 

| Mask       | Flag   | Usage                                                                                          |
|:----------:|:------:|------------------------------------------------------------------------------------------------|
|  ``0x00``  |  ``P`` | If set, CCPU core runs in a privileged mode, and it is possible to run protected instructions. |
|  ``0x01``  |  ``H`` | If set, hardware interrupts can be delivered to the CPU core.                                  |
|  ``0x02``  |        | Reserved.                                                                                      |
|  ``0x04``  |  ``E`` | Set when the last two compared values were equal.                                              |
|  ``0x08``  |  ``Z`` | Set when the last instruction produced zero.                                                   |
|  ``0x10``  |  ``O`` | Set when the last instruction produced value too large to fit into a register.                 |
|  ``0x20``  |  ``S`` | Set when the last instruction produced value with the highest bit set.                         |


## Instruction Pointer

The Instruction Pointer register (``IP``) is a hidden register, 32 bits wide, holding the address of the instruction that will be executed next. It is not possible to modify it directly, it is however saved to and restored from a stack during routine calls and exception handling.


## Control registers

Control registers allow inspection or modification of various runtime properties of the CPU core.

Access to these registers is allowed only in privileged mode (i.e. ``P`` flag is set).


### ``CR0``

``cr0`` register contains so-called *CPUID* value which identifies location of the CPU in a global system topology when system can have multiple CPUs, each with multiple cores.

```
31             16 15             0
 v              v v              v
+----------------+----------------+
| CPU            | core           |
+----------------+----------------+
```

There is always a core whose ``cr0`` contains ``0x00000000`` since there's always at least a CPU with at least one core.

This register is read-only.


### ``CR1``

Contains address of Exception Vector Table of this core.

> Be aware that **any** address is accepted - no aligment or any other restrictions are enforced.


### ``CR2``

Contains contains Page Table address of this core.

> Be aware that **any** address is accepted - no aligment or any other restrictions are enforced.


### ``CR3``

Contains several flags describing behavior of the core.

| Mask     | Flag      | Access   | Usage                                                                                       |
|----------|:---------:|:--------:|---------------------------------------------------------------------------------------------|
| ``0x00`` | ``PTE``   | RW       | If set, page tables are enabled and every memory access is affected by their configuration. |
| ``0x02`` | ``EM``    | R-       | If set, the core is being emulated. Hardware implementations must return zero.              |
| ``0x04`` | ``JIT``   | R-       | If set, JIT optimizations are enabled. Valid only when ``EM`` is set.                       |
| ``0x08`` | ``VMDBG`` | RW       | If set, core will produce huge amount of debugging logs. Valid only when ``EM`` is set.     |

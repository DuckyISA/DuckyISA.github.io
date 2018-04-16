---
id: spec-memory-model
title: Memory model
---

DuckyISA is a load-store architecture, where only dedicated instructions transfer data between memory and registers, and remaining instructions operate on CPU registers.

DuckyISA supports a 32-bit address space, byte-addressed and little-endian.

> Virtual memory - via paging - support and specifications are still under development. Some necessary features (e.g. control registers) are already present while MMU or page table format specification are still not finished.

Load (``l*``) and store (``st*``) instructions transfer a value between the registers and memory, using another register and an optional immediate offset to address the memory. Addresses must be naturally aligned  for each data type, misaligned access is not supported.

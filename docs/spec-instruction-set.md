---
id: spec-instruction-set
title: Instruction Set
---

## Introduction

* ``rN`` refers to generaly any general purpose register (``r0`` - ``r29``). Special registers are refered to by their nicknames, ``fp`` and ``sp``
* ``iN`` refers to an immediate, N bits long
* immediate operands accept integers in decimal or hexadecimal base, or symbol identifiers whose actual addresses are determined later during the linking process
* to depict a possible use of two different types in a single operand, ``|`` is used. E.g. operand ``rB|i15`` means the operand can be either a register or an immediate


## Instruction Encoding

In the Ducky ISA, there are 5 core instruction formats (``R``, ``C``, ``I``, ``S`` and ``C``). All have a fixed length of 32 bits, and must be aligned to a four-byte boundary in memory.

Immediate values encoded in the instructions are sign-extended to the full length of 32 bits, with very few exceptions mentioned explicitly when describing those instructions. The use of immediate value is signaled by setting the *immediate flag* (``I``).


### ``R`` format

```
 31           17   15 11 10  6 5    0
 v             v   v   v v   v v    v
+---------------+-+-----+-----+------+
| i15           |I|  rB |  rA |   OP |
+---------------+-+-----+-----+------+
```

The most common format, encoding instructions with two operands, represented by a destination register (``rA``) and source register (``rB``) or immediate value (``i15``).


### ``C`` format

```
 31            16      13 10  6 5    0
 v              v       v v   v v    v
+----------------+-+-+---+-----+------+
| i16            |I|V| F |  R  |   OP |
+----------------+-+-+---+-----+------+
```

Format of conditional instructions, e.g. branching instructions. Compares one of flags (``F``) with expected value (``V``). If they match, either register (``R``) or immediate (``i16``) is taken into account by the instruction.


### ``S`` format

```
 31       20 19 16 15  11 10  6 5    0
 v         v v   v v    v v   v v    v
+-----------+-+---+------+-----+------+
| i12       |V| F |   rB |  rA |   OP |
+-----------+-+---+------+-----+------+
```

Format of selection instructions. Compares one of flags (``F``) with expected value (``V``). If they match, no effect is applied. If they don't match, it stores new value, a register (``rB``) or an immediate (`i12`), into destination register (``rA``).


### ``I`` format

```
 31                 12  10  6 5    0
 v                  v   v   v v    v
+--------------------+-+-----+------+
| i20                |I|  R  |   OP |
+--------------------+-+-----+------+
```

Format of instructions dedicated to loading immediate values into registers.


### ``A`` format

```
31       21 20 16 15 11 10  6 5    0
 v        v v   v v   v v   v v    v 
+----------+-----+-----+-----+------+
| unused   | rC  | rB  | rA  |   OP |
+----------+-----+-----+-----+------+
```

Special format, used by a *compare-and-swap* instruction.

---

## Conditional flags

Conditional instructions encode the test in the form of two fields, *flag* ``F`` and expected *value* ``V``. When executed, the *flag* is compared against the *vlue* for a match. *Flag* represents a combination of one or more flags of a [status register](spec-registers#flags-register) that must have proper values to satisfy ``F`` vs. ``V`` comparison.

| Test   | Flag  | Value | Status flags            |
|:------:|:-----:|:-----:|-------------------------|
| ``e``  | ``0`` | ``1`` | ``e = 1``               |
| ``ne`` | ``0`` | ``0`` | ``e = 0``               |
| ``z``  | ``1`` | ``1`` | ``z = 1``               |
| ``nz`` | ``1`` | ``0`` | ``z = 0``               |
| ``o``  | ``2`` | ``1`` | ``o = 1``               |
| ``no`` | ``2`` | ``0`` | ``o = 0``               |
| ``s``  | ``3`` | ``1`` | ``s = 1``               |
| ``ns`` | ``3`` | ``0`` | ``s = 0``               |
| ``l``  | ``4`` | ``1`` | ``e = 0`` and ``s = 1`` |
| ``ge`` | ``4`` | ``0`` | ``e = 1`` or ``s = 0``  |
| ``g``  | ``5`` | ``1`` | ``e = 0`` and ``s = 0`` |
| ``le`` | ``5`` | ``0`` | ``e = 1`` or ``s = 1``  |

---

## Memory addressing

Common instructions of DuckyISA, being inspired by LOAD-STORE principles, operate only on registers, and dedicated instructions are reserved for memory access.

---

## Arithmetic operations

### ``add``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``O``, ``S``

```
add rA, rB|i15
```

Add two operands, and store the result to ``rA``.

### ``dec``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``O``, ``S``

``` asm
dec rA
```

Decrement ``rA`` by one.

### ``inc``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``O``, ``S``

``` asm
inc rA
```

Increment ``rA`` by one.

### ``mul``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``O``, ``S``

``` asm
mul rA, rB|i15
```

Multiply two operands and store the result to ``rA``.

### ``sub``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``S``

``` asm
sub rA, rB|i15
```

Subtract the second operand from the first one and store the result to ``rA``.

## Bitwise operations

### ``and``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``S``

``` asm
and rA, rB|i15
```

Perform logical AND on each pair of corresponding bits from ``rA`` and ``rB|i15``, and store the result to ``rA``.

### ``not``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``S``

``` asm
not rA
```

Perform logical negation of each bit in ``rA``.

### ``or``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``S``

``` asm
or rA, rB|i15
```

Perform logical inclusive OR on each pair of corresponding bits from ``rA`` and ``rB|i15``, and store the result to ``rA``.

### ``shiftl``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``S``

```
shiftl rA, rB|i15
```

Perform left logical shift of ``rA`` by ``rB|i15`` bits.

### ``shiftr``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``S``

```
shiftr rA, rB|i15
```

Perform right logical shift of ``rA`` by ``rB|i15`` bits.

### ``shiftrs``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``S``

```
shiftrs rA, rB|i15
```

Perform right arithmetic shift of ``rA`` by ``rB|i15`` bits.

### ``xor``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``S``

```
xor rA, rB|i15
```

Perform logical exclusive OR on each pair of corresponding bits from ``rA`` and ``rB|i15`, and store the result to ``rA``.


## Branching

### ``j``

* Encoding: [``I``](#i-format)
* Affected flags: none

``` asm
j rA|i20
```

Uncoditionaly move execution to new address.

* If the operand is a register, its value is set as new value of [``IP``](spec-registers.md#instruction-pointer).
* If the operand is an immediate, it is sign-extended, shifted left by 2 bits and the result is added to the [``IP``](spec-registers.md#instruction-pointer).

### ``b*``

* Encoding: [``C``](#c-format)
* Affected flags: none

``` asm
be rA|i16
bne rA|i16
bz rA|i16
bnz rA|i16
bo rA|i16
bno rA|i16
bs rA|i16
bns rA|i16
bl rA|i16
bge rA|i16
bg rA|i16
ble rA|i16
```

Coditionaly move execution to new address. Instruction evaluates the specific [set of flags](#conditional-flags) of status register, and if the condition is satisfied, the branch is taken.

* If the operand is a register, its value is set as new value of [``IP``](spec-registers.md#instruction-pointer).
* If the operand is an immediate, it is sign-extended, shifted left by 2 bits and the result is added to the [``IP``](spec-registers.md#instruction-pointer).


## Conditional selection


## Conditional setting


## Comparison

### ``cmp``

* Encoding: [``R``](#r-format)
* Affected flags: ``E``, ``Z``, ``S``

``` asm
cmp rA, rB|i15
```

Compare two signed operands and set flags accordingly:

* ``Z``: ``rA == rB|i15``
* ``E``: ``rA == rB|i15 and rA == 0``
* ``S``: ``rA < rB``

### ``cmpu``

* Encoding: [``R``](#r-format)
* Affected flags: ``E``, ``Z``, ``S``

``` asm
cmpu rA, rB|i15
```

Compare two unsigned operands and set flags accordingly:

* ``Z``: ``rA == rB|i15``
* ``E``: ``rA == rB|i15 and rA == 0``
* ``S``: ``rA < rB``

> ``i15`` is **zero-extended** to 32 bits.


## Memory access

Address operand - ``target`` - can be specified in different ways:

* ``rB`` - address is stored in the ``rB`` register. No offset.
* ``rB[i15]`` - base address from the ``rB`` register, offset ``i15`` is added.

Size of data is signaled by the suffix:

* ``w`` operates with 32-bit cells
* ``s`` operates with 16-bit cells
* ``b`` operates with 8-bit cells.


### ``l*``

* Encoding: [``R``](#r-format)
* Affected flags: ``Z``, ``S``

``` asm
lw rA, target
ls rA, target
lb rA, target
```

Load value from ``target`` and store it corresponding low number of bits of ``rA``. Remaining bits are set to zero.


### ``s*``

* Encoding: [``R``](#r-format)
* Affected flags: none

``` asm
stw target, rA
sts target, rA
stb target, rA
```

Store corresponding number of lower bits from ``rA`` to memory at ``target``. ``rA`` bits beyond the size of value are ignored.

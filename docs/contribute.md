---
id: contribute
title: Contribute
---

In general, **DuckyISA** lives on Github, under [DuckyISA](https://github.com/DuckyISA) organization. All tools, examples, showcase apps and documentation is kept in repositories there.

## Bugs

> TODO: where to report bugs? Multiple repos, multiple issue trackers :/ Need a single point. Or at least a signpost.

> TODO: add links to issues for each repo

## Contacts

> TODO: twitter, mail

## Tools

Tools customized for development with **DuckyISA** are forked from their upstream repositories, hosted on GitHub as well. Forks are not continuously synced with their origins, such action requires rebasing **DuckyISA** patches and often involves examination of upstream changelogs since the last sync. That usualy happens when interesting or major changes hit upstream, and it's a good idea to pull them to **DuckyISA** downstream.

Versions of **DuckyISA** tools follows the upstream versioning schemes, reflecting the last sync with the upstream repository at the moment **DuckyISA** patches were applied.

### LLVM

LLVM project keeps its tools in separate repositories, mirrored on GitHub. DuckyISA keeps its forks separated as well, keeping them in sync, refreshing them all at the same point of upstream development cycle.

* Master LLVM repository: https://github.com/DuckyISA/ducky-llvm/
* Clang: https://github.com/DuckyISA/ducky-clang/
* LLD: https://github.com/DuckyISA/ducky-lld/
* DuckyISA packaging tools: https://github.com/DuckyISA/ducky-llvm-build/
* COPR project: https://copr.fedorainfracloud.org/coprs/happz/ducky-llvm/

### QEMU

* QEMU fork: https://github.com/DuckyISA/ducky-qemu/
* DuckyISA packaging tools: https://github.com/DuckyISA/ducky-qemu-build/
* COPR project: https://copr.fedorainfracloud.org/coprs/happz/ducky-qemu/

## Apps

### `libducky`

* Repository: https://github.com/DuckyISA/libducky/
* Packaging tools: https://github.com/DuckyISA/libducky-build/
* COPR project: https://copr.fedorainfracloud.org/coprs/happz/libducky/

### `compiler-rt`

* Repository: https://github.com/DuckyISA/ducky-compiler-rt/
* Packaging tools: https://github.com/DuckyISA/ducky-compiler-rt-build/
* COPR project: https://copr.fedorainfracloud.org/coprs/happz/ducky-compiler-rt/


## Documentation

### The website

The website is build with [Docusaurus](https://docusaurus.io). and the sources sources are kept in a GitHub repository.

* Repository: https://github.com/DuckyISA/DuckyISA.github.io

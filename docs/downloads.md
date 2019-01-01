---
id: downloads
title: Downloads
---

> All **distribution** packages install their files under `/opt/ducky` directory. This directory is **not** added to your `$PATH`. One has to either use the whole path, e.g. `/opt/ducky/bin/clang`, or update one's `$PATH` environment variable to include `/opt/ducky/bin`.


Tools are packaged in two ways:

* distribution packages (e.g. RPMs) - easy to install in using your system package manager (e.g. `dnf`, or
* Docker images - if you prefer containers, pull an image with the tools and avoid spoiling your OS \o/


## Toolchain

### Fedora 27/28/29

```
dnf copr enable happz/ducky-llvm
dnf install -y ducky-llvm
```

### Docker

```
docker pull docker.io/duckyisa/llvm:latest
```


## QEMU

### Fedora 27/28/29

```
dnf copr enable happz/ducky-qemu
dnf install -y ducky-qemu
```

### Docker

```
docker pull docker.io/duckyisa/qemu:latest
```


## `libducky`


## `compiler-rt`


## Ducky FORTH

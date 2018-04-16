---
id: toolchain
title: Toolchain
---

**DuckyISA** comes with the complete software development toolchain, based on [LLVM project](http://llvm.org/). LLVM and related tools cover wide area of languages and backends, development for **DuckyISA** is currently limited to C and assembly language only.

**Clang** is a full-featured C compiler and serves as the main tool of the toolchain, being capable of calling other relevant tools necessary for successfull compilation and linkage of an application. It is however easy to use those tools - preprocessor, assembler, linker, etc. - as standalone units.

---

## Installation

> All packages install their files under `/opt/ducky` directory. This directory is **not** added to your `$PATH`.

### Fedora 26/27/28

1. Enable COPR repository:

```
dnf copr enable happz/ducky-llvm
```

2. Install toolchain package:

```
dnf install -y ducky-llvm
```

### Docker image

1. Pull the image:

```
docker pull docker.io/happz/ducky-llvm
```

## Usage

### Distribution packages

> All examples assume you have updated your `$PATH` environmental variable to include `/opt/ducky/bin`. Otherwise, calling tools by their full paths would be necessary.


**TODO:** clang use, with C, assembler, linker use


### Docker image

Toolchain docker image does pack all tools, and when executed, does nothing but printing out the short help. To use the tools, you simply run them by starting a container, telling Docker to start a command inside it. You can follow the examples in [Distribution packages](Distribution packages) section, prepending each use of a tool by "start a container" *spell*:

```
docker run --rm docker.io/happz/ducky-llvm clang ...
```

However, the container runs within its own filesystem, separated from the host's filesystems, therefore tools don't have access to files on the host. To overcome this barrier - and use tools to compile sources on your laptop, for example, you can tell Docker to let container access host's directory:

```
docker run --rm -v /path/on/your/laptop:/path/in/the/container:Z clang -c /path/in/the/container/hello-world.c
```

``clang`` will compile C file `/path/in/the/container/hello-world.c` - this path is evaluated **in the container**, and, by Docker magic, it corresponds to `/path/on/your/laptop/hello-world.c` on your laptop. ``clang`` will store the resulting object file in the same directory, and when ``clang`` finishes its work, you should see ``/path/on/your/laptop/hello-world.o`` on your filesystem.

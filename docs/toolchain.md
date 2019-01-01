---
id: toolchain
title: Toolchain
---

**DuckyISA** comes with the complete software development toolchain, based on [LLVM project](http://llvm.org/). While LLVM and related tools cover wide area of languages and backends, development for **DuckyISA** is currently limited to C and assembly language only.

**Clang** is a full-featured C compiler, implemented on top of LLVM libraries, and serves as the main tool of the toolchain, being capable of calling other relevant tools necessary for successfull compilation and linkage of an application. It is however easy to use those tools - preprocessor, assembler, linker, etc. - as standalone units.

---

## Installation

* [Fedora 27/28/29 RPMs](downloads.md#fedora-27-28-29)
* [Docker](downloads.md#docker)


## Usage

To build an application, you might need to install base Ducky libraries - see ....

Following examples assume you have installed the toolchain and necessary libraries, and the whole toolchain lives happily under `/opt/ducky` which would be represented by `$DUCKY_ROOT` variable in the examples.

### Distribution packages

> All examples assume you have updated your `$PATH` environmental variable to include `/opt/ducky/bin`. Otherwise, calling tools by their full paths would be necessary.

#### C/C++

```C
#include <stdio.h>

int main(int argc, char **argv)
{
  printf("Hello, world!\n");

  return 0;
}
```

```bash
clang -fno-builtin -nostdlib \
      -nostdinc -isystem $DUCKY_ROOT/include/ \
      -static -Wl,--no-threads \
      -Wl,--script=$DUCKY_ROOT/ld-scripts/mallard.ld \
      $DUCKY_ROOT/lib/libducky.a \
      $DUCKY_ROOT/lib/libclang_rt.builtins-ducky.a \
      -o hello-world hello-world.c
```

* `-fno-builtin`, `-nostdlib` - prevents `clang` from using its built-in implementations of common functions;
* `-nostdinc`, `-isystem $DUCKY_ROOT/include/` - prevents `clang` from using your host's header files - we're not interested in any of libc' bits, installed on your laptop, since it is probably not written with Ducky as one of its target environments;
* `-static` - only statically linked binaries are suitable for deployment on Ducky boards;
* `-Wl,--no-threads` - LLVM's linker for Ducky cannot handle multiple threads working on the same binary, therefore it's necessary to disable linker's multi-threading;
* `-Wl,--script=$DUCKY_ROOT/ld-scripts/mallard.ld` - linker needs a guidance on how to put all pieces of the final application together, and that is provided in a form of *linker script*, specific for the board;
* `$DUCKY_ROOT/lib/libducky.a` - "system" library, providing common functions (`printf`, `puts`, ...) one could find in GNU C Library or other similar system-level library, tailored for the board;
* `$DUCKY_ROOT/lib/libclang_rt.builtins-ducky.a` - a "built-ins" library, providing functions compiler might refer to e.g. when emitting code which would need CPU instructions not supported by Ducky ISA, like `div` with 64-bit wide operands - compiler would emit a `call` to a library function, which provides the desired functionality, implemented with existing instructions;
* `-o hello-world` - the final binary filename.


### Docker image

Toolchain docker image bundles all tools into a single "package", and when executed, does nothing but printing out the short help. To use the tools, you simply run them by starting a container and telling Docker to start a command inside it. You can follow the examples in [Distribution packages](Distribution packages) section, prepending each use of a tool by a "start a container" *spell*:

```
docker run --rm docker.io/duckyisa/llvm clang ...
```

However, the container runs within its own filesystem, isolated from the host's filesystems, therefore tools don't have any access to files on the host. To overcome this barrier - and use tools to compile sources on your laptop, for example - you can tell Docker to let container access host's directory:

```
docker run --rm
           -v /path/on/your/laptop:/path/in/the/container:Z \
           docker.io/duckyisa/llvm clang -c /path/in/the/container/hello-world.c
```

``clang`` will compile C file `/path/in/the/container/hello-world.c` - this path is evaluated **in the container**, and, by Docker magic, it corresponds to `/path/on/your/laptop/hello-world.c` on your laptop. ``clang`` will store the resulting object file in the same directory, and when ``clang`` finishes its work, you should see ``/path/on/your/laptop/hello-world.o`` on your filesystem.


## Additional resources

* original `clang` "User's Manual": https://clang.llvm.org/docs/UsersManual.html

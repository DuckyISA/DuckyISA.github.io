---
id: qemu
title: QEMU
---

QEMU (https://www.qemu.org/) is a generic and open source machine emulator and virtualizer. It is a hosted virtual machine monitor: it emulates the machine's processor through dynamic binary translation and provides a set of different hardware and device models for the machine, enabling it to run a variety of guest operating systems.

> QEMU supports two levels of emulation - a "system" level, which emulates the whole machine and its hardware, and the application (like Linux kernel) runs on top of the virtual hardware, or "userspace" emulation which does not create the whole machine but "merely" translates system calls between the emulated application and the host OS. **DuckyISA** fork or QEMU supports the "system" level only - one runs QEMU, emulationg the whole **DuckyISA** board.


## Installation

* [Fedora 27/28/29](downloads.md#fedora-27-28-29-1)
* [Docker](downloads.md#docker-1)


## Usage

Following examples assume you have installed the QEMU, which lives happily under `/opt/ducky` which would be represented by `$DUCKY_ROOT` variable in the examples. Also, you have to have an application you want the emulator to run, let's say the path to it is `$APP`.

### Distribution packages

> All examples assume you have updated your `$PATH` environmental variable to include `/opt/ducky/bin`. Otherwise, calling tools by their full paths would be necessary.

```bash
qemu-system-ducky -machine mallard-board \
                  -device loader,file=$APP,addr=0x20000 \
                  -nographic
```

* `-machine mallard-board` - tells QEMU what machine it is supposed to emulate. This defines things like IRQ numbers, memory size & so on;
* `-device loader,file=$APP,addr=0x20000` - tells QEMU what program it is supposed to load and start, and at what address it should be loaded to;
* `-nographic` - tells QEMU to pretend its standard output and input are connected to serial port of the emulated machine.


### Docker image

Docker image contains just the QEMU build, and when executed, the QEMU is started. You can follow the examples in [Distribution packages](Distribution packages) section, and replace `qemu-system-ducky` with a "start a container" *spell*:

```
docker run --rm docker.io/duckyisa/qemu ...
```

However, the container runs within its own filesystem, isolated from the host's filesystems, therefore QEMU doesn't have any access to files on the host. To overcome this barrier - and use QEMU to run you application, you can tell Docker to let container access host's directory:

```
docker run --rm \
           -v /path/on/your/laptop:/path/in/the/container:Z \
           docker.io/duckyisa/qemu -device loader,file=/path/in/the/container/app ...
```

QEMU will load file `/path/in/the/container/app` - this path is evaluated **in the container**, and, by Docker magic, it corresponds to `/path/on/your/laptop/app` on your laptop.


## Adiitional resources

* original QEMU documentation: https://qemu.weilnetz.de/doc/qemu-doc.html

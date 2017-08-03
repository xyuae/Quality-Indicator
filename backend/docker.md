## What is Docker
An open-source project that automates the deployment of software applications inside
containers by providing an additional layer of abstraction and automation of OS-level virtualization on Linux;

In simple words, Docker is a tool that allows developers, sys-admins et. to easily deploy their
applications in a sandbocx (called containers) to run on the host operating system. i.e. Linux. The
key benefit of Docker is that it allows users to package an application with all of its dependencies into a standardized unit
for software development. Unlike virtual machines, containers do not have the high overhead and hence enable more eficient usage of hte underlying system and
resources.

##
What are containers?
The industry standard today is to use Virtual Machines (VMs) to run software applicatoins. VMs
run appications inside a guest Operating system, which runs on virtual hardware powered by hte
server's host OS.

VMs are great at providing full process isolation for applications: there are very few ways
a problem in the host operating system can affect the software running in the guest operating sytem, and vice-versa.
But this isolation comes at great cost - the computational overhead spent virtualizing hardware
for a guest OS to use is substantial.

Containers take a different approach: by leveraging the low-level machanics of the host operating system,
containers provide most of the isolation of virtual machines at a fraction of the computing power.

## Why should I use it?
Docker's rise has been nothing short of meteoric.Although containers by themselves
are not a new technology, it was not until Docekr arrived that they started to get
mainstream attention. By providing standard APIs that made containers easy to use and creating a way for the community to collaborate around libraries of contiainers,
Docker has radicaly changed the face of the technology landscape. In an article published
by The Register in mide-2014, it was claimed that Google runs over two billion contianers per week.

In addition to Docker's continual growth, Docker, Inc., the developer behind Docker has been valued at oveer a billion dollars! Due
to its benefits of efficiency and portability, Docker has been gaining mind share rapidly, and is now leading the Containeriztion movement.
As developers going out into the world, it is important that we understand this trend and see how we can benefit from it.


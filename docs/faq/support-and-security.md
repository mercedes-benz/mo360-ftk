# Support and security

If you have specific improvement ideas or bug reports then please see our [contribution guide](../../CONTRIBUTING.md).

----

## Security fixes / patches

Preamble:  
> The FTK is an **open source** project and **NOT** an commercial product.  
> We do **NOT** provide comprehensive support like one would expect from a commercial product.  
> With the creation of a new WebApp project based upon the FTK the responsibility for the dependency management is transferred to the project.  

Definition of critical security risk: NPM audit level of high or critical.

### Core

With every release we ensure that at the time of the release no dependency poses a critical security risk.  
A continuous security audit will be done once a month. If there are findings during the audit which can be fixed then a patch will be released.  
Every project that is based upon the FTK has to act on one's own responsibility to take actions accordingly.

### Boilerplate / Examples

We decided to remove the boilerplate from the project, due to high maintenance and support efforts.
The provided examples in the src-Folder are not frequently maintained and may contain deprecated dependencies.

### GitHub alerts

If GitHub notifies you about potential security vulnerabilities in your project it is the project's responsibility to check if there are newer versions
of the core available that resolve those issues.  
If that is **not** the case then the project has to act on one's own responsibility to update the noted dependencies.

# What is the Mercedes-Benz MO360 Frontend Toolkit

- [Brief overview](#brief-overview)
- [Big picture](#big-picture)
- [FOSS](#foss)
- [Single-Page-Application Toolkit](#single-page-application-toolkit)
- [Micro-Frontend Framework](#micro-frontend-framework)
- [Hybrid-App-Toolkit](#hybrid-app-toolkit)
- [Future-Proof Standard](#future-proof-standard)
- [Common use cases and problems](#common-use-cases-and-problems)
- [Developer experience](#developer-experience)

----

## Brief overview

The Mercedes-Benz MO360 Frontend Toolkit (FTK) is a toolkit for creating modern Web-Applications.

To be more specific: for Single-Page-Applications (SPA) based on [React and TypeScript](../faq/why-react-and-typescript.md).
It contains various tools and libraries for [common use cases and problems](#common-use-cases-and-problems) and provides several built-in features for better [developer experience](#developer-experience).

## Big picture

The FTK is composed around the idea and concept of [FOSS](#foss) (Free and Open Source Software).
With FOSS in mind we created two technological elements:
[Single-Page-Application Toolkit](#single-page-application-toolkit) and [Micro-Frontend Framework](#micro-frontend-framework).  
The FTK provides a [future-proof standard](#future-proof-standard) for Web-Applications by relying on industry leading technologies, frameworks and libraries.

----

## FOSS

The FTK is **FOSS**!

### Definition

FOSS is an acronym for Free or Open Source Software. FOSS programs / software / frameworks are those that have licenses that allow users to freely run the program for any purpose, modify the program as they want, and also to freely distribute copies of either the original version or their own modified version.

### Our understanding of FOSS

- All our sources are available on [GitHub](https://github.com/Daimler/mo360-ftk).
- Everyone is welcome to participate in the development of the FTK.
- We as maintainers are open to and seek feedback.
- The whole project is community driven but we as maintainers reserve governance right.
- The FTK is **not** a product therefore we do not provide support like one would expect from an commercial product. Click here for additional information about [support and security](./support-and-security.md).

### What we do for you in terms of FOSS

With every release we verify that all dependencies have FOSS compatible licenses.

----

## Single-Page-Application Toolkit

The FTK is SPA toolkit that provides a feature-rich and easy to install boilerplate.

A boilerplate is the skeleton of a web application.
It bundles all the features, dependencies, developer tools and build jobs. No setup and no configuration needed.

----

## Micro-Frontend Framework

The FTK introduces the architectural style or design pattern called [Micro-Frontends](../faq/what-is-a-micro-frontend.md).  
This approach provides various advantages over normal SPAs.  
To avoid confusion with the naming we call the main application **Host-App** and every Micro-Frontend inside is a **Swidget**.

- **Common code base**  
  Same boilerplate is used for Host-App and Swidget.
  Resulting in the same technology stack and setup everywhere.
- **Shared dependencies**  
  Each Host-App can expose various dependencies that every Swidget can access.
  Making the bundle size for a Swidget incredibly small.
- **Swidgets can be dynamically added on runtime**  
  Swidgets can be loaded based on conditions (e.g. User, Profile, Location, ...) at any time.
- **Independent build and deployment**  
  Since Swidget are integrated at runtime, the development, update and deployment procedures are **not** dependent on the Host-App.
- **Sandboxing**  
  Runtime-Errors within a Swidget do not affect the Host-App.
- **Swidgets can also run as standalone Host-App**  
  The boilerplate provides build jobs to create Host-Apps or Swidgets based on the same source-code.
- **Interaction between Host-App and Swidgets**  
  Host-App and Swidgets can communicate bi-directional.

----

## Future-Proof Standard

The FTK codebase itself as well as the dependencies it relies on are future-proof.

> That is a **bold** statement, but it is true.

**Technology:** [React and TypeScript](../faq/why-react-and-typescript.md)  
**Dependencies:** Each and every dependency is not only carefully selected and tested before integrated, we also do a FOSS compatibility check.

----

## Common use cases and problems

### Functional requirements of Web-Apps (SPAs):

- Routing
- Internationalization
- Environment based configurations
- Favicon and App-Logo
- Static assets

### Non-functional requirements:

- Fast loading
- Quick UI responses
- Learned mental modals: Unified UI / UX
- Cross-Browser compatibility

----

## Developer experience

Beside from all the tooling that comes with the FTK, it also includes a carefully selected and predefined set of rules, suggestions and hints to assist and encourage developers to maintain coding standards and best practices.

### Built-in features:

- Reliable build scripts
- Dev-Mode with hot-reloading and debugging tools
- Performance-optimized production builds

### Developer convenience:

- Quick setup
- Source code structure
- Automated linting and formatting

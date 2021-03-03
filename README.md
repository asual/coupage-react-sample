# Coupage React Sample

A complete sample project that showcases the basic capabilities of the [Coupage](https://github.com/asual/coupage)
toolkit and contains a host application, a set of common extension definition rules, and a few sample extensions. It
offers a built-in internationalization and a highly optimized production setup.

Each of the provided sample packages can be independently built and extracted into a separate code repository.

## Content

The sample consits of the following main packages:

### application

The entry point of the sample that loads common dependencies, extensions and relevant resources. It specifies the
general sample infrastructure and defines how extensions are being used and displayed.

The provided implementation performs an automatic file system lookup for extension resources but in real-world scenarios
such information can be manually configured and dynamically retrieved.

### common

The common package provides the structure of the extensibility contract between the application and its extensions as
well as common components and APIs.

### extensions

All extensions provide a definition of their contributions which is loaded during the application initialization
together with their internationalization resources. In addition to that, each extension exposes a lazily loaded main
entry point that may contain custom dependencies.

Extension development requires a local copy of the application package. The extension codebase is always developed in
the context of the full application but only the current package is loaded in development mode. This mechanism provides
a simple and performant extension testing.

## Deployment

The sample ships with a deployment recipe that relies on Docker and nginx. It achieves great
[Lighthouse](https://developers.google.com/web/tools/lighthouse) results and provides a strong
[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) implementation.

The following commands can be used for building and running the complete sample:

- `docker build --rm -t coupage-react-sample:latest .`
- `docker run --rm --name coupage-react-sample -p 80:80 -p 443:443 coupage-react-sample:latest`

## Development

Local development requires an initial build of all relevant packages similarly to the way it's done in the provided
`Dockerfile`. Each extension ships with a predefined `npm start` script that enables all typical development
capabilities.

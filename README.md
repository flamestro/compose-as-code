# Compose-as-Code

[![Npm package version](https://badgen.net/npm/v/compose-as-code)](https://npmjs.com/package/compose-as-code)
[![Npm package yearly downloads](https://badgen.net/npm/dm/compose-as-code)](https://npmjs.com/package/compose-as-code)
[![Npm package license](https://badgen.net/npm/license/compose-as-code)](https://npmjs.com/package/compose-as-code)

![Compose as Code](./.github/assets/logo.png)

compose-as-code has one purpose: express docker compose infrastructure as code.
The benefits of this:

- generate docker compose files in a typesafe way
- write tests for your docker compose infrastructure
- store customer infrastructure definitions in a database and apply them (like https://servercontrol.io)
- flex around that you use typescript to write docker compose infrastructures

# Getting Started

To create a minimal project with some example code you can use:

`npx create-composition@latest my-app`

This will give you a project on which you can run `yarn conduct`. Afterward, you can check out the `./out` dir in which
you will find the generated docker compose files. 

# Basic Structure

Compose-as-Code is composed of four main entities that you will interact with:

1. **`App`**: The fundamental cornerstone of your infrastructure, `App` forms the root of all your code. Think of it as
   the bedrock upon which you build your Docker Compose components. It has the broadest scope and encapsulates
   everything else.

2. **`Composition`**: Each `Composition` is nested within the `App` scope and maps directly to a Docker Compose file in
   the output. It provides an organized layer where you can design and arrange your Docker components. You can flexibly
   create and manage multiple `Composition`s within a single `App` to cater to your various needs.

3. **`Service`**, **`Network`**, **`Volume`**: These are your building blocks. Each `Service`, `Network`, or `Volume`
   corresponds to a service, network, or volume in your resulting Docker Compose file. They reside within the scope of
   a `Composition`, allowing you to design and deploy your Docker infrastructure effectively.

This structure enables a clear and hierarchical workflow, making it easy to write, share, and deploy your Docker Compose
files.

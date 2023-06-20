# Compose-as-Code
[![Npm package version](https://badgen.net/npm/v/compose-as-code)](https://npmjs.com/package/compose-as-code)
[![Npm package yearly downloads](https://badgen.net/npm/dm/compose-as-code)](https://npmjs.com/package/compose-as-code)
[![Npm package license](https://badgen.net/npm/license/compose-as-code)](https://npmjs.com/package/compose-as-code)


![Compose as Code](./.github/assets/logo.png)

Introducing Compose-as-Code, a revolutionary way to transform your Docker infrastructure into dynamic and expressive TypeScript code. This project unchains the power of code abstraction and reusability, enabling you to script, share, and construct Docker Compose components seamlessly.

Compose-as-Code doesn't just stop at offering a new perspective on creating Docker Compose infrastructure, it breathes life into your TypeScript code. With the magic of the `conduct` command, it converts your Compose-as-Code Typescript project into fully-fledged Dockerfiles in the blink of an eye.

Once your code is transformed, Compose-as-Code generates Docker Compose files and neatly tucks them away in the `./out` directory. All set and ready for deployment, your Docker Compose files are now at your disposal, thanks to the power of Compose-as-Code.

Dive in, and experience a refreshing take on building Docker infrastructure!

# Getting Started

To create a minimal project with some example code you can use:

`npx create-composition@latest my-app`

# Structure

Compose-as-Code is composed of four main entities that you will interact with:

1. **`App`**: The fundamental cornerstone of your infrastructure, `App` forms the root of all your code. Think of it as the bedrock upon which you build your Docker Compose components. It has the broadest scope and encapsulates everything else.

2. **`Composition`**: Each `Composition` is nested within the `App` scope and maps directly to a Docker Compose file in the output. It provides an organized layer where you can design and arrange your Docker components. You can flexibly create and manage multiple `Composition`s within a single `App` to cater to your various needs.

3. **`Service`**, **`Network`**, **`Volume`**: These are your building blocks. Each `Service`, `Network`, or `Volume` corresponds to a service, network, or volume in your resulting Docker Compose file. They reside within the scope of a `Composition`, allowing you to design and deploy your Docker infrastructure effectively.

This structure enables a clear and hierarchical workflow, making it easy to write, share, and deploy your Docker Compose files.

We invite you to explore Compose-as-Code, where we bring code reusability, abstraction, and organization to Docker infrastructure! Happy Coding!

# My Vision

My aspiration with Compose-as-Code is to transform it into a key resource for building scalable and modular Docker Compose infrastructures. I envision a tool that not only simplifies Docker infrastructure creation, but also elevates it to new levels of efficiency and organization.

The aim is to go beyond the norm, offering you the power to turn your TypeScript code into practical Docker Compose files. I'm passionate about providing a seamless blend of simplicity, power, and innovation.

With Compose-as-Code, I hope to foster a new era of Docker infrastructure management and I'm excited to embark on this journey with you.
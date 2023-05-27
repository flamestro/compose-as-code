# compose-as-code
[![Npm package version](https://badgen.net/npm/v/compose-as-code)](https://npmjs.com/package/compose-as-code)
[![Npm package yearly downloads](https://badgen.net/npm/dm/compose-as-code)](https://npmjs.com/package/compose-as-code)
[![Npm package license](https://badgen.net/npm/license/compose-as-code)](https://npmjs.com/package/compose-as-code)


![Compose as Code](./.github/assets/logo.png)

This project provides a way of expressing and generating docker compose as typescript code.

It allows to convert your typescript code to a dockerfile by running the `conduct` command.

This will generate docker compose files in the `./out` directory by default. You can then deploy those files.

# Create Project

To create a minimal project with some example code you can use:

`npx create-composition@latest my-app`

# Structure

There are 4 main components in compose-as-code.

1. `App`: The root of all your code. It has the most overarching scope.
2. `Composition`: A composition lives in the scope of an app. It is mapped to a docker compose file in the end. You can have multiple compositions.
3. `Service || Network || Volume`: These are services/networks/volumes in your resulting docker file. They live in the scope of a composition.


# Vision

The vision is to become a package that allows to build highly scalable and modular docker compose infrastructures.

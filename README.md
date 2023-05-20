# compose-as-code

![Compose as Code](./.github/assets/logo.png)

This project provides a way of expressing and generating docker compose as typescript code.

It allows to convert your typescript code to a dockerfile by running the `conduct` command.

This will generate docker compose files in the `./out` directory by default. You can then deploy those files.

# Structure

There are 4 main components in compose-as-code.

1. `App`: The root of all your code. It has the most overarching scope.
2. `Composition`: A composition lives in the scope of an app. It is mapped to a docker compose file in the end. You can have multiple compositions.
3. `Service || Network`: These are services/networks in your resulting docker file. They live in the scope of a composition.

_Note: **1.** Volumes are missing **2.** Networks still need a lot of implementation for their interfaces **3.** Services also have open areas in their interfaces_

# Create Project

To create a minimal project with some example code you can use:  

`npx create-composition@latest my-app`

# Vision

The vision is to become a package that allows to build highly scalable and modular docker compose infrastructures.

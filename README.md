# compose-as-code

![Compose as Code](./.github/assets/logo.png)

This project provides a way of expressing and generating docker compose as typescript code.

# How to

Currently, no init command exists.  
Therefore, a manual setup is needed at the moment.

1. Create an npm project (typescript)
2. install `npm install compose-as-code`
3. add a `cac.config.json` to the root that looks like this
   ```
   {
   "entrypoint": "./src/index.ts",
   "outputDir": "./out"
   }
   ```
4. In your index.ts you can now define a `const app = new App("MyApp")`
5. You can also define Services and Compositions (scopes are App >> Composition >> (Service || Network)) 
6. Finally, run `cac` in your cli (in project root). It will create a docker compose file in your outputDir.

# Vision

The vision is to become a package that allows to build highly scalable and modular docker compose infrastructures.
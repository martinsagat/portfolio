---
title: Managing NPM packages in projects
description: Explore how to install and keep libraries of your project up to date
date: 2022-08-05
draft: true
slug: /articles/managing-npm-packages
tags:
  - NPM
  - Node
  - JavaScript
  - TypeScript
  - Frontend
---

## Install NPM package

For installing a new package, we need to determine whether the application needs the package for it to run, or is the package for development support only.

Example:

Our application needs to use the [moment](https://www.npmjs.com/package/moment) package to parse and display dates. Considering this, the application cannot run without this package, therefore we install it like so:

```bash{}[]
$ npm install moment
```

<v-banner elevation="1" class="blue darken-2 white--text rounded-lg mb-4" icon="mdi-alert-circle">
In some cases you can see ` --save ` at the end, this option is set as default since npm version 5
</v-banner>

Now let's install jest. Jest is a testing suite for javascript and therefore the application does not necessarily need this package for it to run, that's why we add `--save-dev` flag

```bash{}[]
$ npm install jest --save-dev
```

If everything went well, we should see installed packages listed:

```json{}[package.json]
"dependencies": {
   ...
   "moment": "^2.17.1"
},
"devDependencies": {
    ...
    "jest": "^28.1.3",
}
```

Incorrectly installed packages might make the application load slower.

## When to install a package globally

A package should be installed globally when it provides an executable command that you run from the shell (CLI), and it's reused across projects.

- Local packages are installed in the directory where you run `npm install <package-name>`, and they are put in the node_modules folder under this directory.
- Global packages are all put in a single place in your system (exactly where depends on your setup), regardless of where you run `npm install -g <package-name>`

You can try list your installed global packages using `npm list -g`

Bellow we will be checking for package updates using another packages such as npm-check or ncu. All these packages make sense to be installed globally as they can be used
for multiple if not all of your projects.

## Checking for packages updates

<div class="pa-4 my-2 rounded-lg">
<div class="d-flex mt-5 mb-0 title font-weight-bold align-center">npm <v-rating class="ml-2" half-increments :value="1.5" readonly dense color="orange"/></div>

```bash{}[command]
$ npm outdated
```

Result:
![npm outdated](/img/npm-outdated.png)

</div>
<div class="pa-4 my-2 rounded-lg">
<div class="d-flex mt-5 mb-0 title font-weight-bold align-center">ncu (npm-check-updates) <v-rating class="ml-2" half-increments :value="3" readonly dense color="orange"/></div>

```bash{}[command]
$ ncu --interactive --format group
```

Result:
![ncu](/img/ncu.png)

</div>
<div class="pa-4 my-2 rounded-lg">
<div class="d-flex mt-5 mb-0 title font-weight-bold align-center">npm-check <v-rating class="ml-2" half-increments :value="4" readonly dense color="orange"/></div>
  
 ```bash{}[command]
 $ npm-check -gu
```
Result:
  ![npm check](/img/npm-check-1.png)
</div>
     
## Checking for unused packages with depcheck

[Depcheck](https://github.com/depcheck/depcheck) is a tool to help determine whether there is an unused dependency in our project.

## References

https://nodejs.dev/learn/npm-global-or-local-packages  
https://stackoverflow.com/questions/22891211/what-is-the-difference-between-save-and-save-dev  
https://github.com/depcheck/depcheck  
https://github.com/raineorshine/npm-check-updates

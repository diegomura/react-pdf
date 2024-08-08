# Contribute

## Introduction

First, thank you for considering contributing to react-pdf!

We welcome any type of contribution, not only code. You can help with

- **QA**: file bug reports, the more details you can give the better (e.g. screenshots with the console open)
- **Marketing**: writing blog posts, howto's, printing stickers, ...
- **Community**: presenting the project at meetups, organizing a dedicated meetup for the local community, ...
- **Code**: take a look at the [open issues](https://github.com/diegomura/react-pdf/issues). Even if you can't write code, commenting on them, showing that you care about a given issue matters. It helps us triage them.
- **Money**: we welcome financial contributions in full transparency on our [open collective](https://opencollective.com/react-pdf).

## Your First Contribution

Working on your first Pull Request? You can learn how from this _free_ series, [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

## Set up your development environment

react-pdf is a monorepo. That means the whole solution is broken into small pieces, or packages, each of which solves a specific problem. No need to worry much about it, since [Lerna](https://lerna.js.org/) does most of the work for us. If you are not familiarized with it it's always helpful to have an overall idea of how it works.

Here I present a quick guide about how to setup your development environment exactly as I have it when working on react-pdf. Please bare in mind small differences can be present depending on which environment you are running this library (on the web, node, electron, etc).

### 1. Clone react-pdf project

This goes without saying but first you need to download the code

```sh
git clone https://github.com/diegomura/react-pdf.git
cd react-pdf
```

### 2. Install Node 18

If you have `nvm` installed all you have to do is

```sh
nvm install 18
nvm use
```

Other versions should work although I can't guarantee it

### 3. Install dependencies and boostrap monorepo

We need to download this project dependencies in order to make it work. Because this is a monorepo, we also have to bind all the internal packages together so they are aware of each other. Both things can be done by running:

```sh
yarn install
yarn bootstrap
```

### 4. Build & watch codebase

In order to to quickly iterate in your development process, react-pdf has a watch script that builds all the required modules and waits for changes to happen to re-compile the affected packages. This is handy because enables you to have this process running on the background and just focus on coding what you want. All you have to do is:

```sh
yarn watch
```

### 5. Setup testing project

Now that we have react-pdf built and running, we need to setup a testing project to use as a development target. This might not be the more straighforward way to set up your dev environment but enables to use the lib as an "external" agent, just as final users will do. It's also extensible for testing in different environmens, whether it is a web or node project, or electron or native app. I usually have a web project (just a plain [create react app](https://reactjs.org/docs/create-a-new-react-app.html) project, and a Node one.

### 6. Link your react-pdf build to your testing project

Now all we have to do is make our testing project point to our react-pdf watch instance so we can apply changes to it and see them working. For that I use `yarn link`.

On another terminal

```sh
cd react-pdf/packages/renderer # navigate to react-pdf renderer package
yarn link
```

In our testing project:

```sh
yarn link @react-pdf/renderer
```

If everything went well, now your testing project should be running your local react-pdf build and any change in the codebase should be immediately accesible from your project.

<details>
 <summary>A comment about react and react-dom</summary>
  I observed that it's sometimes needed to apply the same linking process to both react and react-dom. This is becuase otherwise your local react-pdf build and your testing project will be using each a different react and react-dom instance, making react complain. All you have to do is

<pre>
# on your react-pdf project

cd react-pdf/node_modules/react
yarn link
cd ../react-dom
yarn link

# on your testing project

yarn link react
yarn link react-dom
</pre>
</details>

## Submitting code

Any code change should be submitted as a pull request. The description should explain what the code does and give steps to execute it. The pull request should also contain tests.

## Code review process

The bigger the pull request, the longer it will take to review and merge. Try to break down large pull requests in smaller chunks that are easier to review and merge.
It is also always helpful to have some context for your pull request. What was the purpose? Why does it matter to you?

## Financial contributions

We also welcome financial contributions in full transparency on our [open collective](https://opencollective.com/react-pdf).
Anyone can file an expense. If the expense makes sense for the development of the community, it will be "merged" in the ledger of our open collective by the core contributors and the person who filed the expense will be reimbursed.

## Questions

If you have any questions, create an [issue](https://github.com/diegomura/react-pdf/issues) (protip: do a quick search first to see if someone else didn't ask the same question before!).
You can also reach us at hello@react-pdf.opencollective.com.

## Credits

### Contributors

Thank you to all the people who have already contributed to react-pdf!
<a href="/diegomura/react-pdf/graphs/contributors"><img src="https://opencollective.com/react-pdf/contributors.svg?width=890" /></a>

### Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/react-pdf#backer)]

<a href="https://opencollective.com/react-pdf#backers" target="_blank"><img src="https://opencollective.com/react-pdf/backers.svg?width=890"></a>

<!-- This `CONTRIBUTING.md` is based on @nayafia's template https://github.com/nayafia/contributing-template -->

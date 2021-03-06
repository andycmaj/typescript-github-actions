# Typescript Github Actions Monorepo

## What is this?

A template for creating projects that contain multiple github actions built with typescript. Contains a shared project that can be used by all action packages.

## How does it work?

### Repo layout

```bash
.
├── babel.config.js // contains config for running actions locally without building first
├── package.json // contains all `devDependencies` and yarn `workspaces` list
├── sample-action-1 // sample action package
│   ├── action.yml // defines github action name and input/output
│   ├── dist // (gitignored) transpiled action ready to publish
│   │   └── index.js // runnable action entrypoint referenced in `action.yml` 
│   ├── package.json // contains `dependencies` and scripts for `sample-action-1`
│   ├── src
│   │   └── main.ts // `sample-action-1` entrypoint src
│   └── tsconfig.json // typescript config for action packages. references `shared` as a project reference
├── shared
│   ├── dist
│   │   └── *.js // (gitignored) transpiled `shared` code. `ncc` build bundles this into each action's build output
│   ├── package.json
│   ├── src
│   │   └── *.ts // shared typescript source
│   ├── tsconfig.json
│   └── tsconfig.tsbuildinfo // (gitignored) generated by typescript project references
├── tsconfig.json // root dev environment typescript config
└── yarn.lock
```

### Running actions locally

```bash
# set up action inputs
export INPUT_ENVIRONMENT=dev

# Run the sample action
$ yarn dev:sample-action-1
yarn run v1.22.4
$ yarn workspace sample-action-1 dev
warning package.json: No license field
$ babel-node --root-mode upward --ignore ./node_modules --extensions ".ts,.tsx,.js,.jsx" src/main.ts
::debug::{"environment":"dev"}
[command]/usr/local/bin/git status -s
 M ../package.json
 M package.json
 M ../shared/package.json
 M ../yarn.lock
repo has changes
::set-output name=repoHasChanges::true
✨  Done in 1.31s.
```

### Publishing an NPM package

```bash
$ yarn workspace sample-action-1 publish

yarn workspace v1.22.4
yarn publish v1.22.4
warning package.json: No license field
warning package.json: No license field
[1/4] Bumping version...
info Current version: 0.0.1
question New version:
[2/4] Logging in...
[3/4] Publishing...
success Published.
[4/4] Revoking token...
info Not revoking login token, specified via config file.
✨  Done in 15.22s.
✨  Done in 15.49s.
```

## Reference

- [Github Actions workflow syntax](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Typescript project references doc](https://www.typescriptlang.org/docs/handbook/project-references.html)
  - [sample repo](https://github.com/RyanCavanaugh/project-references-demo)
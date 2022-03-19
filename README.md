<div align="center">

  <h1 style="font-size:60px;">Github Privatizer</h1>

  ##### change repositories visibility in batch 

</div>

## Why?
not?

## How to
**This script needs the github cmd `gh` to be in path and configured**
1. clone this repo and run `yarn install`
2. if you want, you can change the owner name in `config.js`. by default, it will be using the authenticated user with `gh`.
3. check the `listConfig` in `config.js` to match the repositories you want to change visibility
4. you can check the repository list by running `yarn list-repo`
5. if you don't want some of these to be changed, put them on `ignoreRepositories` in the `config.js` file
6. run `yarn start` or `node index.js` to change the visibility for your github projects.

## Options in config.js file
- **owner**: Repository owner (ex: `"thejoaov"`)
- **ignoreRepositories**: Array of repositories you **DON'T** want to change (ex: `["thejoaov", "installation-scripts"]`)
- **visibility**: The visibility to be changed to (ex: `"private"`)
- **listConfig**: Parameters to be passed to gh when listing repositories. You can check all the options available by running `gh repo list --help`.
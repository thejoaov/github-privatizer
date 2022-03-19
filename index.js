import { execaCommandSync } from "execa";
import config from "./config.js";

function getConfig() {
  const listingConfig = config.listConfig;

  const configToArguments = Object.keys(listingConfig).map((item) => {
    if (typeof listingConfig[item] === "boolean") return `--${item}`;
    return `--${item} ${listingConfig[item]}`;
  });

  const sanitizedArguments = configToArguments
    .filter((item) => item)
    .toString()
    .replaceAll(",", " ");

  return sanitizedArguments;
}

function getRepositoriesList() {
  const args = getConfig();

  const githubRepos = execaCommandSync(`gh repo list ${args}`);

  const repositoriesList = JSON.parse(githubRepos.stdout);

  return repositoriesList
    .map(({ name }) => {
      if (!config.ignoreRepositories.includes(name)) {
        return name;
      }
    })
    .filter((item) => item);
}

function setRepositoryVisibility(repositoriesList) {
  repositoriesList.map((repository) => {
    console.log(`⏺️ setting ${repository} to ${config.visibility}`);

    try {
      execaCommandSync(
        `
       gh repo edit "${config.owner}/${repository}" --visibility "${config.visibility}"
       `,
        { shell: true }
      );

      console.log(`✅ ${repository} is now ${config.visibility}`);
    } catch (error) {
      console.warn(
        `⛔ cannot set ${repository} to ${config.visibility}: ${error}`
      );
    }
  });
}

function execute() {
  const repositoriesList = getRepositoriesList();

  setRepositoryVisibility(repositoriesList);
}

if (process.argv.includes("--list")) {
  console.log(getRepositoriesList());
} else {
  execute();
}

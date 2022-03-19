export default {
  /** change repository owner */
  owner: "",
  /** Array with the repositories to ignore */
  ignoreRepositories: [],
  /** the visibility can be "private", "public" or "internal" */
  visibility: "private",
  /** options for gh repo list */
  listConfig: {
    json: "name",
    limit: 120,
    public: true,
    "no-archived": true,
  },
};

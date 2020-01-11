module.exports = function (api) {
  const isTest = api.env('test');
  api.cache(true);
  const presets = [[
    "@babel/preset-env",
    {
      targets: {
        node: "current"
      }
    }
  ],
    "@babel/preset-typescript",
    "angular"];
  let plugins = [
    ["@babel/plugin-proposal-decorators", {"legacy": true}]
  ];

  if (isTest) {
    plugins.push(["require-context-hook"]);
  }

  return {
    presets,
    plugins: plugins
  };

};

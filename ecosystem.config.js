module.exports = {
  apps: [
    {
      name: "hubs-frontend",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "./apps/erp",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};

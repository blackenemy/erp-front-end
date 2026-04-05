module.exports = {
  apps: [
    {
      name: "hubs-frontend",
      script: "node",
      args: "node_modules/.bin/next start",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};

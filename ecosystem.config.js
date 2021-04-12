const TOKEN_SECRET = require('./configuration.js').token.TOKEN_SECRET;

module.exports = {
  apps : [
      {
        name: "qna-api",
        script: "./app.js",
        watch: true,
        env: {
          "NODE_ENV": "development",
          "TOKEN_SECRET": TOKEN_SECRET,
        },
        env_production : {
          "NODE_ENV": "production",
          "TOKEN_SECRET": TOKEN_SECRET,
        }
      }
  ]
}


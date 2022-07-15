require('dotenv').config();

module.exports = {
  name: 'iframe',
  script: './app.js',
  env_production: {
    ...process.env,
  },
};

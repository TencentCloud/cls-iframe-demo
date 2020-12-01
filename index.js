const serverless = require('serverless-http')
const app = require('./app')

const handler = serverless(app)

module.exports.main_handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const result = await handler(event, context)
  return result
}
exports.main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const result = await handler(event, context)
  return result
}

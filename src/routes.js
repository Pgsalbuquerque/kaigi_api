const { Router } = require('express')
const User = require('./app/models/User');

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

const authMiddleware = require("./app/middlewares/auth")

const routes = new Router()

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users',authMiddleware, UserController.update)

module.exports = routes;
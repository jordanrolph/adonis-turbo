/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

// Lazy load the controllers
const HomeController = () => import('#controllers/home_controller')
const SessionController = () => import('#controllers/session_controller')
const RegistrationController = () => import('#controllers/registration_controller')

// Define the routes
router.get('/', [HomeController, "show"]).use(middleware.auth()).as('home.show')
router.get('/hotwire-example', [HomeController, 'hotwireExample']).use(middleware.auth()).as('home.hotwire-example')

router.get('/login', [SessionController, 'show']).use(middleware.guest()).as('auth.login.show')
router.post('/login', [SessionController, 'store']).as('auth.login.store')
router.post('/logout', [SessionController, 'destroy']).use(middleware.auth()).as('auth.logout')

router
    .get('/signup', [RegistrationController, 'show'])
    .use(middleware.guest())
    .as('auth.registration.show')
router.post('/signup', [RegistrationController, 'store']).as('auth.registration.store')


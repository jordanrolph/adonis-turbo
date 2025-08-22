/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const HomeController = () => import('#controllers/home_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const SessionController = () => import('#controllers/session_controller')
const RegistrationController = () => import('#controllers/registration_controller')

router.get('/', [HomeController]).use(middleware.auth()).as('home')

router.get('/login', [SessionController, 'show']).use(middleware.guest()).as('auth.login.show')
router.post('/login', [SessionController, 'store']).as('auth.login.store')
router.post('/logout', [SessionController, 'destroy']).use(middleware.auth()).as('auth.logout')

router
    .get('/signup', [RegistrationController, 'show'])
    .use(middleware.guest())
    .as('auth.registration.show')
router.post('/signup', [RegistrationController, 'store']).as('auth.registration.store')

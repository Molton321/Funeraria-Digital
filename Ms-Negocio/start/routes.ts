/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
//Carlos Routes
import './routes/services'
import './routes/burials'
import './routes/moves'
import './routes/plans'
import './routes/subscriptions'
import './routes/payments'
import './routes/planServices'

//Milton Routes
import './routes/users'
import './routes/clients'
import './routes/titulars'
import './routes/beneficiaries'
import './routes/drivers'
import './routes/administrators'

//Jacobo Routes
import './routes/campuses'
import './routes/chats'
import './routes/cities'
import './routes/comments'
import './routes/departments'
import './routes/halls'
import './routes/messages'

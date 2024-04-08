import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/users', 'UsersController.find') //Lsit all users
  Route.get('/users/:id', 'UsersController.find') //List a user by id
  Route.post('/users', 'UsersController.create') //Create a user
  Route.put('/users/:id', 'UsersController.update') //Update a user
  Route.delete('/users/:id', 'UsersController.delete') //Delete a user
})

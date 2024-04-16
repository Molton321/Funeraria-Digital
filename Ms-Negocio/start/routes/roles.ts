import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/roles', 'RolesController.find') //Lsit all roles
  Route.get('/roles/:id', 'RolesController.find') //List a rol by id
  Route.post('/roles', 'RolesController.create') //Create a rol
  Route.put('/roles/:id', 'RolesController.update') //Update a rol
  Route.delete('/roles/:id', 'RolesController.delete') //Delete a rol
})

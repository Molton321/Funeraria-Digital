import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/owners', 'OwnersController.find') //List all owners
  Route.get('/owners/:id', 'OwnersController.find') //List a owner by id
  Route.get('/owners/client/:client_id', 'OwnersController.findByClient') //List all owners by client_id
  Route.post('/owners', 'OwnersController.create') //Create a owner
  Route.put('/owners/:id', 'OwnersController.update') //Update a owner
  Route.delete('/owners/:id', 'OwnersController.delete') //Delete a owner
})
// .middleware(["security"])

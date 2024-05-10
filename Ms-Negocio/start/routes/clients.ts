import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/clients', 'ClientsController.find') //Lsit all clients
  Route.get('/clients/:id', 'ClientsController.find') //List a client by id
  Route.post('/clients', 'ClientsController.create') //Create a client
  Route.put('/clients/:id', 'ClientsController.update') //Update a client
  Route.delete('/clients/:id', 'ClientsController.delete') //Delete a client
})
// .middleware(["security"])

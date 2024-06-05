import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/titulars', 'TitularsController.find') //Lsit all titulars
  Route.get('/titulars/:id', 'TitularsController.find') //List a titular by id
  Route.get('/titulars/client/:client_id', 'TitularsController.findByClient') //List all titulars by client_id
  Route.post('/titulars', 'TitularsController.create') //Create a titular
  Route.put('/titulars/:id', 'TitularsController.update') //Update a titular
  Route.delete('/titulars/:id', 'TitularsController.delete') //Delete a titular
})
// .middleware(["security"])

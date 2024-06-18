import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/clients', 'ClientsController.find')
  Route.get('/clients/:id', 'ClientsController.find')
  Route.get('/clients/service/:service_id', 'ClientsController.findByService')
  Route.get('/clients/deceaseds', 'ClientsController.findDeceaseds')
  Route.post('/clients', 'ClientsController.create')
  Route.put('/clients/:id', 'ClientsController.update')
  Route.delete('/clients/:id', 'ClientsController.delete')
})
//.middleware(["security"])


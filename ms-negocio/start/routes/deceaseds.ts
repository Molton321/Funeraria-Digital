import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/deceaseds', 'deceasedsController.find') //List all deceaseds
  Route.get('/deceaseds/:id', 'deceasedsController.find') //List a beneficiarie by id
  Route.get('/deceaseds/client/:client_id', 'deceasedsController.findByClient') //List all deceaseds by client_id
  Route.post('/deceaseds', 'deceasedsController.create') //Create a beneficiarie
  Route.put('/deceaseds/:id', 'deceasedsController.update') //Update a beneficiarie
  Route.delete('/deceaseds/:id', 'deceasedsController.delete') //Delete a beneficiarie
})
// .middleware(["security"])

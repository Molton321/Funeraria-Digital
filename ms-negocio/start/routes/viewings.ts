import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/viewings', 'ViewingsController.find')
  Route.get('/viewings/:id', 'ViewingsController.find')
  Route.get('/viewings/service/:service_id', 'ViewingsController.findByService')
  Route.get('/viewings/room/:room_id', 'ViewingsController.findByRoom')
  Route.post('/viewings', 'ViewingsController.create')
  Route.put('/viewings/:id', 'ViewingsController.update')
  Route.delete('/viewings/:id', 'ViewingsController.delete')
})
// .middleware(["security"])

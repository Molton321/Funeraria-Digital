import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/blokedUser', 'BlokedUserController.find')
  Route.get('/blokedUser/:id', 'BlokedUserController.find')
  Route.post('/blokedUser', 'BlokedUserController.create')
  Route.put('/blokedUser/:id', 'BlokedUserController.update')
  Route.delete('/blokedUser/:id', 'BlokedUserController.delete')
})

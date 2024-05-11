import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/blockedUser', 'BlockedUserController.find')
  Route.get('/blockedUser/:id', 'BlockedUserController.find')
  Route.get('/blockedUser/chat/:chat_id', 'BlockedUserController.findByChat')
  Route.get('/blockedUser/user/:user_id', 'BlockedUserController.findByUser')
  Route.get('/blockedUser/chat/:chat_id/user/:user_id', 'BlockedUserController.findByChatAndUser')
  Route.post('/blockedUser', 'BlockedUserController.create')
  Route.put('/blockedUser/:id', 'BlockedUserController.update')
  Route.delete('/blockedUser/:id', 'BlockedUserController.delete')
})
// .middleware(["security"])

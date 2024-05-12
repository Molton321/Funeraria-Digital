import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/blockedUsers', 'BlockedUsersController.find')
  Route.get('/blockedUsers/:id', 'BlockedUsersController.find')
  Route.get('/blockedUsers/chat/:chat_id', 'BlockedUsersController.findByChat')
  Route.get('/blockedUsers/user/:user_id', 'BlockedUsersController.findByUser')
  Route.get('/blockedUsers/chat/:chat_id/user/:user_id', 'BlockedUsersController.findByChatAndUser')
  Route.post('/blockedUsers', 'BlockedUsersController.create')
  Route.put('/blockedUsers/:id', 'BlockedUsersController.update')
  Route.delete('/blockedUsers/:id', 'BlockedUsersController.delete')
})
// .middleware(["security"])

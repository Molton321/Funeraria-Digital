import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/administrators', 'AdministratorsController.find')
  Route.get('/administrator/:id', 'AdministratorsController.find')
  Route.get('/administrators/user/:user_id', 'AdministratorsController.findByUser')
  Route.post('/administrator', 'AdministratorsController.create')
  Route.put('/administrator/:id', 'AdministratorsController.update')
  Route.delete('/administrator/:id', 'AdministratorsController.delete')
})
// .middleware(["security"])

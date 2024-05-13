import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/administrators', 'AdministratorsController.find') //Lsit all administrators
  Route.get('/administrator/:id', 'AdministratorsController.find') //List a administrator by id
  Route.get('/administrators/user/:user_id', 'AdministratorsController.findByUser') //List all administrators by user_id
  Route.post('/administrator', 'AdministratorsController.create') //Create a administrator
  Route.put('/administrator/:id', 'AdministratorsController.update') //Update a administrator
  Route.delete('/administrator/:id', 'AdministratorsController.delete') //Delete a administrator
})
// .middleware(["security"])

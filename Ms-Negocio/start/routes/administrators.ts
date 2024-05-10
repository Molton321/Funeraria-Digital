import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/administrators', 'AdministratorsController.find') //Lsit all administrators
  Route.get('/administrators/:id', 'AdministratorsController.find') //List a administrator by id
  Route.post('/administrators', 'AdministratorsController.create') //Create a administrator
  Route.put('/administrators/:id', 'AdministratorsController.update') //Update a administrator
  Route.delete('/administrators/:id', 'AdministratorsController.delete') //Delete a administrator
})
// .middleware(["security"])

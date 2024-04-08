import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/Permissions', 'PermissionsController.find') //Lsit all Permissions
  Route.get('/Permissions/:id', 'PermissionsController.find') //List a Permission by id
  Route.post('/Permissions', 'PermissionsController.create') //Create a Permission
  Route.put('/Permissions/:id', 'PermissionsController.update') //Update a Permission
  Route.delete('/Permissions/:id', 'PermissionsController.delete') //Delete a Permission
})

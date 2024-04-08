import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/RolePermissions', 'RolePermissionsController.find') //Lsit all RolePermissions
  Route.get('/RolePermissions/:id', 'RolePermissionsController.find') //List a RolePermission by id
  Route.post('/RolePermissions', 'RolePermissionsController.create') //Create a RolePermission
  Route.put('/RolePermissions/:id', 'RolePermissionsController.update') //Update a RolePermission
  Route.delete('/RolePermissions/:id', 'RolePermissionsController.delete') //Delete a RolePermission
})

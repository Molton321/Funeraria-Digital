import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/drivers', 'DriversController.find') //Lsit all drivers
  Route.get('/drivers/:id', 'DriversController.find') //List a driver by id
  Route.post('/drivers', 'DriversController.create') //Create a driver
  Route.put('/drivers/:id', 'DriversController.update') //Update a driver
  Route.delete('/drivers/:id', 'DriversController.delete') //Delete a driver
})
// .middleware(["security"])

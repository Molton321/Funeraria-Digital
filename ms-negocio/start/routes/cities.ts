import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/cities", "CitiesController.find");
    Route.get("/city/:id", "CitiesController.find");
    Route.get("/cities/departament/:id", "CitiesController.findByDepartment");
    Route.post("/city", "CitiesController.create");
    Route.put("/city/:id", "CitiesController.update");
    Route.delete("/city/:id", "CitiesController.delete");
})
// .middleware(["security"])
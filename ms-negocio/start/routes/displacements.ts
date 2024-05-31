import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/displacements", "DisplacementsController.find");
    Route.get("/displacements/:id", "DisplacementsController.find");
    Route.get("/displacements/driver/:id", "DisplacementsController.findByDriver");
    Route.get("/displacements/coffin/:id", "DisplacementsController.findByCoffin");
    Route.get("/displacements/driver/:driver_id/coffin/:coffin_id", "DisplacementsController.findByDriverAndCoffin");
    Route.post("/displacements", "DisplacementsController.create");
})
// .middleware(["security"])
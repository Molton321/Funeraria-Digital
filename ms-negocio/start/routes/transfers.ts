import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/transfers", "TransfersController.find");
    Route.get("/transfers/:id", "TransfersController.find");
    Route.get("/transfers/service/:service_id", "TransfersController.findByService");
    Route.post("/transfers", "TransfersController.create");
    Route.put("/transfers/:id", "TransfersController.update");
    Route.delete("/transfers/:id", "TransfersController.delete");
})
// .middleware(["security"])
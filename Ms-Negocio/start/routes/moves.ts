import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/moves", "MovesController.find");
    Route.get("/moves/:id", "MovesController.find");
    Route.get("/moves/service/:service_id", "MovesController.findByService");
    Route.post("/moves", "MovesController.create");
    Route.put("/moves/:id", "MovesController.update");
    Route.delete("/moves/:id", "MovesController.delete");
})
// .middleware(["security"])
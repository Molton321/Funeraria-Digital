import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/moves", "MovesController.find");
    Route.get("/moves/:id", "MovesController.find");
    Route.post("/moves", "MovesController.create");
    Route.put("/moves/:id", "MovesController.update");
    Route.delete("/moves/:id", "MovesController.delete");
})
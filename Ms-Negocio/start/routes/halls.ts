import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/halls", "HallsController.find");
    Route.get("/halls/:id", "HallsController.find");
    Route.post("/halls", "HallsController.create");
    Route.put("/halls/:id", "HallsController.update");
    Route.delete("/halls/:id", "HallsController.delete");
})
// .middleware(["security"])
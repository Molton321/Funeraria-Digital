import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/halls", "HallsController.find");
    Route.get("/hall/:id", "HallsController.find");
    Route.get("/halls/campus/:campus_id", "HallsController.findByCampus");
    Route.post("/hall", "HallsController.create");
    Route.put("/hall/:id", "HallsController.update");
    Route.delete("/hall/:id", "HallsController.delete");
})
// .middleware(["security"])
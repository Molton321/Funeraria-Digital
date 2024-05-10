import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/campuses", "CampusesController.find");
    Route.get("/campuses/:id", "CampusesController.find");
    Route.post("/campuses", "CampusesController.create");
    Route.put("/campuses/:id", "CampusesController.update");
    Route.delete("/campuses/:id", "CampusesController.delete");
}).middleware(["security"])
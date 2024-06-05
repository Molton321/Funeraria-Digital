import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/campuses", "CampusesController.find");
    Route.get("/campus/:id", "CampusesController.find");
    Route.get("/campuses/city/:city_id", "CampusesController.findByCity");
    Route.post("/campus", "CampusesController.create");
    Route.put("/campus/:id", "CampusesController.update");
    Route.delete("/campus/:id", "CampusesController.delete");
})
//.middleware(["security"])
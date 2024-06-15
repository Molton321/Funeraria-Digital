import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/funeralHomes", "FuneralHomesController.find");
    Route.get("/funeralHome/:id", "FuneralHomesController.find");
    Route.get("/funeralHomes/city/:city_id", "FuneralHomesController.findByCity");
    Route.post("/funeralHome", "FuneralHomesController.create");
    Route.put("/funeralHome/:id", "FuneralHomesController.update");
    Route.delete("/funeralHome/:id", "FuneralHomesController.delete");
})
//.middleware(["security"])
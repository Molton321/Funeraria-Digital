import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/rooms", "RoomsController.find");
    Route.get("/room/:id", "RoomsController.find");
    Route.get("/rooms/funeralHome/:funeral_home_id", "RoomsController.findByFuneralHome");
    Route.post("/room", "RoomsController.create");
    Route.put("/room/:id", "RoomsController.update");
    Route.delete("/room/:id", "RoomsController.delete");
})
// .middleware(["security"])
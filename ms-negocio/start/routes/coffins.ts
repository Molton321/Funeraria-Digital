import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/coffins", "CoffinsController.find");
    Route.get("/coffins/:id", "CoffinsController.find");
    Route.post("/coffins", "CoffinsController.create");
})
// .middleware(["security"])
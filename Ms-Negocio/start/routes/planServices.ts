import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/planServices", "PlanServicesController.find");
    Route.get("/planServices/:id", "PlanServicesController.find");
    Route.post("/planServices", "PlanServicesController.create");
    Route.put("/planServices/:id", "PlanServicesController.update");
    Route.delete("/planServices/:id", "PlanServicesController.delete");
})
// .middleware(["security"])
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/planServices", "PlanServicesController.find");
    Route.get("/planServices/:id", "PlanServicesController.find");
    Route.get("/planServices/plan/:plan_id", "PlanServicesController.findByPlan");
    Route.get("/planServices/service/:service_id", "PlanServicesController.findByService");
    Route.post("/planServices", "PlanServicesController.create");
    Route.put("/planServices/:id", "PlanServicesController.update");
    Route.delete("/planServices/:id", "PlanServicesController.delete");
})
// .middleware(["security"])
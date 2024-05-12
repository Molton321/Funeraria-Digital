import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/serviceExecutions", "ServiceExecutionsController.find");
    Route.get("/serviceExecutions/:id", "ServiceExecutionsController.find");
    Route.get("/serviceExecutions/service/:service_id", "ServiceExecutionsController.findByService");
    Route.get("/serviceExecutions/client/:client_id", "ServiceExecutionsController.findByClient");
    Route.post("/serviceExecutions", "ServiceExecutionsController.create");
    Route.put("/serviceExecutions/:id", "ServiceExecutionsController.update");
    Route.delete("/serviceExecutions/:id", "ServiceExecutionsController.delete");
})
// .middleware(["security"])

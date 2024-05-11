import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/serviceExecution", "ServiceExecutionController.find");
    Route.get("/serviceExecution/:id", "ServiceExecutionController.find");
    Route.get("/serviceExecution/service/:service_id", "ServiceExecutionController.findByService");
    Route.get("/serviceExecution/client/:client_id", "ServiceExecutionController.findByClient");
    Route.post("/serviceExecution", "ServiceExecutionController.create");
    Route.put("/serviceExecution/:id", "ServiceExecutionController.update");
    Route.delete("/serviceExecution/:id", "ServiceExecutionController.delete");
})
// .middleware(["security"])
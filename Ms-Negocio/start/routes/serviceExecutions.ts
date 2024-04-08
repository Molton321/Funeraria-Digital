import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/serviceExecution", "ServiceExecutionController.find");
    Route.get("/serviceExecution/:id", "ServiceExecutionController.find");
    Route.post("/serviceExecution", "ServiceExecutionController.create");
    Route.put("/serviceExecution/:id", "ServiceExecutionController.update");
    Route.delete("/serviceExecution/:id", "ServiceExecutionController.delete");
})
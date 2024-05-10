import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/serviceExecution", "ServiceExecutionsController.find");
    Route.get("/serviceExecution/:id", "ServiceExecutionsController.find");
    Route.post("/serviceExecution", "ServiceExecutionsController.create");
    Route.put("/serviceExecution/:id", "ServiceExecutionsController.update");
    Route.delete("/serviceExecution/:id", "ServiceExecutionsController.delete");
})

import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/payments", "PaymentsController.find");
    Route.get("/payments/:id", "PaymentsController.find");
    Route.get("/payments/subscription/:subscription_id", "PaymentsController.findBySubscription");
    Route.get("/payments/client/:client_id", "PaymentsController.findByClient");
    Route.post("/payments", "PaymentsController.create");
    Route.put("/payments/:id", "PaymentsController.update");
    Route.delete("/payments/:id", "PaymentsController.delete");
})
// .middleware(["security"])
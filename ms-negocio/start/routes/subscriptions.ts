import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/subscriptions", "SubscriptionsController.find");
    Route.get("/subscriptions/:id", "SubscriptionsController.find");
    Route.get("/subscriptions/client/:client_id", "SubscriptionsController.findByClient");
    Route.get("/subscriptions/plan/:plan_id", "SubscriptionsController.findByPlan");
    Route.get("/subscriptions/client/:client_id/plan/:plan_id", "SubscriptionsController.findByClientAndPlan");
    Route.post("/subscriptions", "SubscriptionsController.create");
    Route.put("/subscriptions/:id", "SubscriptionsController.update");
    Route.delete("/subscriptions/:id", "SubscriptionsController.delete");
})
// .middleware(["security"])
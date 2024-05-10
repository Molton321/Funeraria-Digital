import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/message", "MessageController.find");
    Route.get("/message/:id", "MessageController.find");
    Route.post("/message", "MessageController.create");
    Route.put("/message/:id", "MessageController.update");
    Route.delete("/message/:id", "MessageController.delete");
})
// .middleware(["security"])
import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/message", "MessagesController.find");
    Route.get("/message/:id", "MessagesController.find");
    Route.post("/message", "MessagesController.create");
    Route.put("/message/:id", "MessagesController.update");
    Route.delete("/message/:id", "MessagesController.delete");
})

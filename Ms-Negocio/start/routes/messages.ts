import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/messages", "MessagesController.find");
    Route.get("/messages/:id", "MessagesController.find");
    Route.get("/messages/chat/:chat_id", "MessagesController.findByChat");
    Route.get("/messages/user/:user_id", "MessagesController.findByUser");
    Route.get("/messages/user/:user_id/chat/:chat_id", "MessagesController.findByUserAndChat");
    Route.post("/messages", "MessagesController.create");
    Route.put("/messages/:id", "MessagesController.update");
    Route.delete("/messages/:id", "MessagesController.delete");
})
// .middleware(["security"])
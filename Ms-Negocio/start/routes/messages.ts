import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/message", "MessageController.find");
    Route.get("/message/:id", "MessageController.find");
    Route.get("/message/chat/:chat_id", "MessageController.findByChat");
    Route.get("/message/user/:user_id", "MessageController.findByUser");
    Route.get("/message/user/:user_id/chat/:chat_id", "MessageController.findByUserAndChat");
    Route.post("/message", "MessageController.create");
    Route.put("/message/:id", "MessageController.update");
    Route.delete("/message/:id", "MessageController.delete");
})
// .middleware(["security"])

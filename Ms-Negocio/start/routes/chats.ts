import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/chat", "ChatsController.find");
    Route.get("/chat/:id", "ChatsController.find");
    Route.post("/chat", "ChatsController.create");
    Route.put("/chat/:id", "ChatsController.update");
    Route.delete("/chat/:id", "ChatsController.delete");
})
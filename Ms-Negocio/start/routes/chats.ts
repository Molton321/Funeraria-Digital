import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/chat", "ChatController.find");
    Route.get("/chat/:id", "ChatController.find");
    Route.post("/chat", "ChatController.create");
    Route.put("/chat/:id", "ChatController.update");
    Route.delete("/chat/:id", "ChatController.delete");
}).middleware(["security"])
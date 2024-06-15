import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/userChats", "UserChatsController.find");
    Route.get("/userChats/:id", "UserChatsController.find");
    Route.get("/userChats/user/:user_id", "UserChatsController.findByUser");
    Route.get("/userChats/chat/:chat_id", "UserChatsController.findByChat");
    Route.get("/userChats/chat/:chat_id/user/:user_id", "UserChatsController.findByChatAndUser");
    Route.post("/userChats", "UserChatsController.create");
    Route.put("/userChats/:id", "UserChatsController.update");
    Route.delete("/userChats/:id", "UserChatsController.delete");
})
// .middleware(["security"])
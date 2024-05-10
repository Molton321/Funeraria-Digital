import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/comment", "CommentsController.find");
    Route.get("/comment/:id", "CommentsController.find");
    Route.post("/comment", "CommentsController.create");
    Route.put("/comment/:id", "CommentsController.update");
    Route.delete("/comment/:id", "CommentsController.delete");
})
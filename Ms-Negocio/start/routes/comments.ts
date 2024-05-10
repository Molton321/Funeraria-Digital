import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/comment", "CommentController.find");
    Route.get("/comment/:id", "CommentController.find");
    Route.post("/comment", "CommentController.create");
    Route.put("/comment/:id", "CommentController.update");
    Route.delete("/comment/:id", "CommentController.delete");
})
// .middleware(["security"])
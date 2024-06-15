import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/comments", "CommentsController.find");
    Route.get("/comments/:id", "CommentsController.find");
    Route.get("/comments/serviceExecution/:serviceExecution_id", "CommentsController.findByServiceExecution");
    Route.get("/comments/deceased/:deceased_id", "CommentsController.findByDeceased");
    Route.get("/comments/client/:client_id", "CommentsController.findByClient");
    Route.get("/comments/service/:service_id", "CommentsController.findByService");
    Route.post("/comments", "CommentsController.create");
    Route.put("/comments/:id", "CommentsController.update");
    Route.delete("/comments/:id", "CommentsController.delete");
})
// .middleware(["security"])

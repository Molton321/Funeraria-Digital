import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/departments", "DepartmentsController.find");
    Route.get("/department/:id", "DepartmentsController.find");
    Route.post("/department", "DepartmentsController.create");
    Route.put("/department/:id", "DepartmentsController.update");
    Route.delete("/department/:id", "DepartmentsController.delete");
})
// .middleware(["security"])
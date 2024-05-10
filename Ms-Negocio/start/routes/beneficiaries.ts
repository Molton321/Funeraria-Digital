import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/beneficiaries', 'BeneficiariesController.find') //Lsit all beneficiaries
  Route.get('/beneficiaries/:id', 'BeneficiariesController.find') //List a beneficiarie by id
  Route.post('/beneficiaries', 'BeneficiariesController.create') //Create a beneficiarie
  Route.put('/beneficiaries/:id', 'BeneficiariesController.update') //Update a beneficiarie
  Route.delete('/beneficiaries/:id', 'BeneficiariesController.delete') //Delete a beneficiarie
}).middleware(["security"])

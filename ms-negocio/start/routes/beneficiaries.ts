import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/beneficiaries', 'BeneficiariesController.find')
  Route.get('/beneficiaries/:id', 'BeneficiariesController.find')
  Route.get('/beneficiaries/client/:client_id', 'BeneficiariesController.findByClient')
  Route.get('/beneficiaries/owner/:owner_id', 'BeneficiariesController.findByOwner')
  Route.get('/beneficiaries/client/:client_id/owner/:owner_id', 'BeneficiariesController.findByClientAndOwner')
  Route.post('/beneficiaries', 'BeneficiariesController.create')
  Route.put('/beneficiaries/:id', 'BeneficiariesController.update')
  Route.delete('/beneficiaries/:id', 'BeneficiariesController.delete')
})
// .middleware(["security"])

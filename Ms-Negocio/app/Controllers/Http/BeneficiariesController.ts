import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiary from 'App/Models/Beneficiary'
import BeneficiaryValidator from 'App/Validators/BeneficiaryValidator'

export default class BeneficiariesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theBeneficiary = await Beneficiary.find(params.id)
      await theBeneficiary?.load('titular')
      await theBeneficiary?.load('client')
      return theBeneficiary 
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let theBeneficiary = await Beneficiary.query().preload('titular').preload('client').paginate(page, perPage)
        return theBeneficiary
      } else {
        return await Beneficiary.query().preload('titular').preload('client')
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    // const body = request.body()
    const body = await request.validate(BeneficiaryValidator)
    const theBeneficiary: Beneficiary = await Beneficiary.create(body)
    return theBeneficiary
  }

  public async update({ params, request }: HttpContextContract) {
    const theBeneficiary: Beneficiary = await Beneficiary.findOrFail(params.id)
    // const body = request.body()
    const body = await request.validate(BeneficiaryValidator)
    theBeneficiary.beneficiary_phone = body.beneficiary_phone
    theBeneficiary.beneficiary_relationship = body.beneficiary_relationship
    theBeneficiary.beneficiary_is_active = body.beneficiary_is_active
    theBeneficiary.titular_id = body.titular_id
    theBeneficiary.client_id = body.client_id
    return theBeneficiary.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theBeneficiary: Beneficiary = await Beneficiary.findOrFail(params.id)
    response.status(204)
    return theBeneficiary.delete()
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiary from 'App/Models/Beneficiary'

export default class BeneficiariesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return Beneficiary.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Beneficiary.query().paginate(page, perPage)
      } else {
        return await Beneficiary.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body()
    const theBeneficiary: Beneficiary = await Beneficiary.create(body)
    return theBeneficiary
  }

  public async update({ params, request }: HttpContextContract) {
    const theBeneficiary: Beneficiary = await Beneficiary.findOrFail(params.id)
    const body = request.body()
    //TODO: Add the fields to update
    //theBeneficiary.Beneficiary_date = body.Beneficiary_date
    //theBeneficiary.Beneficiary_state = body.Beneficiary_state
    return theBeneficiary.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theBeneficiary: Beneficiary = await Beneficiary.findOrFail(params.id)
    response.status(204)
    return theBeneficiary.delete()
  }
}

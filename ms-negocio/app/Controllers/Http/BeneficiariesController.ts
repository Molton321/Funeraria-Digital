import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiary from 'App/Models/Beneficiary'
import BeneficiaryValidator from 'App/Validators/BeneficiaryValidator'

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

  public async findByClient({ params }: HttpContextContract) {
    return await Beneficiary.query().where("client_id", params.client_id)
  }

  public async findByOwner({ params }: HttpContextContract) {
    return await Beneficiary.query().where("owner_id", params.owner_id)
  }

  public async findByClientAndOwner({ params }: HttpContextContract) {
    return await Beneficiary.query().where("client_id", params.client_id).where("owner_id", params.owner_id)
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
    theBeneficiary.beneficiary_relationship = body.beneficiary_relationship
    theBeneficiary.beneficiary_state = body.beneficiary_state
    theBeneficiary.owner_id = body.owner_id
    theBeneficiary.client_id = body.client_id
    return theBeneficiary.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theBeneficiary: Beneficiary = await Beneficiary.findOrFail(params.id)
    response.status(204)
    return theBeneficiary.delete()
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Owner from 'App/Models/Owner'
import OwnerValidator from 'App/Validators/OwnerValidator'

export default class OwnersController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theOwner:Owner = await Owner.findOrFail(params.id);
      await theOwner?.load("client")
      await theOwner?.load("beneficiaries")
      return theOwner;
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Owner.query().preload('beneficiaries').paginate(page, perPage)
      } else {
        return await Owner.query().preload('beneficiaries')
      }
    }
  }

  public async findByClient({ params }: HttpContextContract) {
    return await Owner.query().where("client_id", params.client_id)
  }

  public async create({ request }: HttpContextContract) {
    // const body = request.body()
    const body = await request.validate(OwnerValidator)
    const theOwner: Owner = await Owner.create(body)
    return theOwner
  }

  public async update({ params, request }: HttpContextContract) {
    const theOwner: Owner = await Owner.findOrFail(params.id)
    // const body = request.body()
    const body = await request.validate(OwnerValidator)
    theOwner.owner_state = body.owner_state
    theOwner.client_id = body.client_id
    return theOwner.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theOwner: Owner = await Owner.findOrFail(params.id)
    await theOwner?.load("beneficiaries")
    if(theOwner.beneficiaries.length>0){
      response.status(400)
      return {message:"Cannot delete owner with beneficiaries"}
    }else{
      response.status(204)
      return theOwner.delete()
    }
  }
}

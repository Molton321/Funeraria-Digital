import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Titular from 'App/Models/Titular'
import TitularValidator from 'App/Validators/TitularValidator'

export default class TitularsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return Titular.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Titular.query().paginate(page, perPage)
      } else {
        return await Titular.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    // const body = request.body()
    const body = await request.validate(TitularValidator)
    const theTitular: Titular = await Titular.create(body)
    return theTitular
  }

  public async update({ params, request }: HttpContextContract) {
    const theTitular: Titular = await Titular.findOrFail(params.id)
    // const body = request.body()
    const body = await request.validate(TitularValidator)
    theTitular.titular_is_active = body.titular_is_active
    theTitular.client_id = body.client_id
    return theTitular.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theTitular: Titular = await Titular.findOrFail(params.id)
    response.status(204)
    return theTitular.delete()
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Viewing from 'App/Models/Viewing'

export default class ViewingsController {

  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let viewing = await Viewing.findOrFail(params.id)
      viewing.load("service")
      viewing.load("hall")
      return viewing
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Viewing.query().preload('service').preload('hall').paginate(page, perPage)
      } else {
        return await Viewing.query().preload('service').preload('hall')
      }
    }
  }

  public async findByService({ params }: HttpContextContract) {
    return await Viewing.query().where('service_id', params.service_id)
  }

  public async findByHall({ params }: HttpContextContract) {
    return await Viewing.query().where('hall_id', params.hall_id)
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body()
    const theViewing: Viewing = await Viewing.create(body)
    return theViewing
  }

  public async update({ params, request }: HttpContextContract) {
    const theViewing: Viewing = await Viewing.findOrFail(params.id)
    const body = request.body()
    theViewing.viewing_entry_date = body.viewing_entry_date
    theViewing.viewing_exit_date = body.viewing_exit_date
    theViewing.service_id = body.service_id
    theViewing.hall_id = body.hall_id
    return theViewing.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theViewing: Viewing = await Viewing.findOrFail(params.id)
    response.status(204)
    return theViewing.delete()
  }

}

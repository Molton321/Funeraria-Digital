import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Viewing from 'App/Models/Viewing'
import ViewingValidator from 'App/Validators/ViewingValidator'

export default class ViewingsController {

  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let viewing = await Viewing.findOrFail(params.id)
      await viewing.load("service")
      await viewing.load("room")
      await viewing.load("chat");
      return viewing
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Viewing.query().preload('service').preload('room').preload('chat').paginate(page, perPage)
      } else {
        return await Viewing.query().preload('service').preload('room').preload('chat')
      }
    }
  }

  public async findByService({ params }: HttpContextContract) {
    return await Viewing.query().where('service_id', params.service_id)
  }

  public async findByRoom({ params }: HttpContextContract) {
    return await Viewing.query().where('room_id', params.room_id)
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(ViewingValidator)
    const theViewing: Viewing = await Viewing.create(body)
    return theViewing
  }

  public async update({ params, request }: HttpContextContract) {
    const theViewing: Viewing = await Viewing.findOrFail(params.id)
    const body = await request.validate(ViewingValidator)
    theViewing.viewing_entry_date = body.viewing_entry_date
    theViewing.viewing_exit_date = body.viewing_exit_date
    theViewing.service_id = body.service_id
    theViewing.room_id = body.room_id
    return theViewing.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theViewing: Viewing = await Viewing.findOrFail(params.id)
    await theViewing.load("chat")
    if (theViewing.chat) {
      response.status(400);
      return { "message": "Cannot be deleted because it has associated chat"}
    } else {
        response.status(204)
        return theViewing.delete()
    }
  }

}

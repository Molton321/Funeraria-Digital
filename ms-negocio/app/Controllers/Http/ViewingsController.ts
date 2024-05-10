import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Viewing from 'App/Models/Viewing'
import ViewingValidator from 'App/Validators/ViewingValidator'

export default class ViewingsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return Viewing.findOrFail(params.id)
        } else {
          const data = request.all()
          if ('page' in data && 'per_page' in data) {
            const page = request.input('page', 1)
            const perPage = request.input('per_page', 20)
            return await Viewing.query().paginate(page, perPage)
          } else {
            return await Viewing.query()
          }
        }
      }
    
      public async create({ request }: HttpContextContract) {
        // const body = request.body()
        const body = await request.validate(ViewingValidator)
        const theViewing: Viewing = await Viewing.create(body)
        return theViewing
      }
    
      public async update({ params, request }: HttpContextContract) {
        const theViewing: Viewing = await Viewing.findOrFail(params.id)
        // const body = request.body()
        const body = await request.validate(ViewingValidator)
        theViewing.viewing_entry_date = body.viewing_entry_date
        theViewing.viewing_exit_date = body.viewing_exit_date
        theViewing.service_id = body.service_id
        return theViewing.save()
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const theViewing: Viewing = await Viewing.findOrFail(params.id)
        response.status(204)
        return theViewing.delete()
      }

}

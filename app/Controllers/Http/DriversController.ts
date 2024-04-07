import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver'

export default class DriversController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return Driver.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Driver.query().paginate(page, perPage)
      } else {
        return await Driver.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body()
    const theDriver: Driver = await Driver.create(body)
    return theDriver
  }

  public async update({ params, request }: HttpContextContract) {
    const theDriver: Driver = await Driver.findOrFail(params.id)
    const body = request.body()
    //TODO: Add the fields to update
    //theDriver.Driver_date = body.Driver_date
    //theDriver.Driver_state = body.Driver_state
    return theDriver.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theDriver: Driver = await Driver.findOrFail(params.id)
    response.status(204)
    return theDriver.delete()
  }
}

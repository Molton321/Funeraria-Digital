import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

export default class ClientsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return Client.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Client.query().paginate(page, perPage)
      } else {
        return await Client.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body()
    const theClient: Client = await Client.create(body)
    return theClient
  }

  public async update({ params, request }: HttpContextContract) {
    const theClient: Client = await Client.findOrFail(params.id)
    const body = request.body()
    theClient.client_address = body.client_address
    theClient.client_is_alive = body.client_is_alive
    theClient.client_is_active = body.client_is_active
    theClient.user_id = body.user_id
    return theClient.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theClient: Client = await Client.findOrFail(params.id)
    await theClient.load("subscriptions")
    await theClient.load("serviceExecutions")
    await theClient.load("titular")
    await theClient.load("beneficiary")
    if (theClient.subscriptions) {
      response.status(400);
      return { "message": "Cannot be deleted because it has associated subscriptions"}
    } else if (theClient.serviceExecutions) {
        response.status(400);
        return { "message": "Cannot be deleted because it has associated service executions"}
    } else if (theClient.titular) {
        response.status(400);
        return { "message": "Cannot be deleted because it has associated titular"}
    } else if (theClient.beneficiary) {
        response.status(400);
        return { "message": "Cannot be deleted because it has associated beneficiary"}
    } else {
        response.status(204)
        return theClient.delete()
    }
  }
  
}

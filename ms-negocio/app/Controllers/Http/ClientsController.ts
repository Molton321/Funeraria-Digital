import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import axios from 'axios'
import env from '@ioc:Adonis/Core/Env'
import ClientValidator from 'App/Validators/ClientValidator'

export default class ClientsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      // return Client.findOrFail(params.id)
      return await this.fetchClientDataUser(Client.findOrFail(params.id))
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        // return await Client.query().paginate(page, perPage)
        return await this.fetchClientDataUsers(Client.query().preload('serviceExecutions').preload('subscriptions').paginate(page, perPage))
      } else {
        // return await Client.query()
        return await this.fetchClientDataUsers(Client.query().preload('serviceExecutions').preload('owner').preload('beneficiary').preload('subscriptions'))
      }
    }
  }

  public async findByUser({ params }: HttpContextContract) {
    return await Client.query().preload('serviceExecutions').preload('subscriptions').preload('owner').preload('beneficiary').where("user_id", params.user_id)
  }

  public async create({ request }: HttpContextContract) {
    // const body = request.body()
    const body = await request.validate(ClientValidator)
    const theClient: Client = await Client.create(body)
    return theClient
  }

  public async update({ params, request }: HttpContextContract) {
    const theClient: Client = await Client.findOrFail(params.id)
    // const body = request.body()
    const body = await request.validate(ClientValidator)
    theClient.client_address = body.client_address
    theClient.client_phone = body.client_phone
    theClient.client_state = body.client_state
    theClient.user_id = body.user_id
    return theClient.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theClient: Client = await Client.findOrFail(params.id)
    await theClient?.load("subscriptions")
    await theClient?.load("serviceExecutions")
    await theClient?.load("owner")
    await theClient?.load("beneficiary")
    if (theClient.subscriptions) {
      response.status(400);
      return { "message": "Cannot be deleted because it has associated subscriptions"}
    } else if (theClient.serviceExecutions) {
        response.status(400);
        return { "message": "Cannot be deleted because it has associated service executions"}
    } else if (theClient.owner) {
        response.status(400);
        return { "message": "Cannot be deleted because it has associated owner"}
    } else if (theClient.beneficiary) {
        response.status(400);
        return { "message": "Cannot be deleted because it has associated beneficiary"}
    } else {
        response.status(204)
        return theClient.delete()
    }
  }

  public async fetchClientDataUsers(clientQuery: Promise<Client[]>): Promise<any[]> {
    let auxClients: any[] = [];
    let originalClients: Client[] = await clientQuery;

    for (let client of originalClients) {
        let api_response = await axios.get(`${env.get('MS_SECURITY_URL')}/api/users/${client.user_id}`);
        let data = {
            "id": client.id,
            "client_address": client.client_address,
            "client_phone": client.client_phone,
            "client_state": client.client_state,
            "serviceExecutions": client.serviceExecutions,
            "subscriptions": client.subscriptions,
            "user_id": client.user_id,
            "user": api_response.data.name,
            "email": api_response.data.email,
            "is_owner": client.owner? true: false,
            "is_beneficiary": client.beneficiary? true: false,
            "is_deceased": client.deceased? true: false

        };
        auxClients.push(data);
    }

    return auxClients;
  }

  public async fetchClientDataUser(clientQuery: Promise<Client>): Promise<any> {
    let originalClient: Client = await clientQuery
    originalClient?.load('serviceExecutions')
    originalClient?.load('subscriptions')
    originalClient?.load('owner')
    originalClient?.load('beneficiary')
    let api_response = await axios.get(`${env.get('MS_SECURITY_URL')}/api/users/${originalClient.user_id}`)
    let data = {
      "id": originalClient.id,
      "client_address": originalClient.client_address,
      "client_phone": originalClient.client_phone,
      "client_state": originalClient.client_state,
      "serviceExecutions": originalClient.serviceExecutions,
      "subscriptions": originalClient.subscriptions,
      "user_id": originalClient.user_id,
      "user": api_response.data.name,
      "email": api_response.data.email,
      "is_owner": originalClient.owner? true: false,
      "is_beneficiary": originalClient.beneficiary? true: false,
      "is_deceased": originalClient.deceased? true: false
    }
    return data
  }
  
}

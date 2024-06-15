import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrator from 'App/Models/Administrator'
import axios from 'axios'
import env from '@ioc:Adonis/Core/Env'
import AdministratorValidator from 'App/Validators/AdministratorValidator'

export default class AdministratorsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      // return Administrator.findOrFail(params.id)
      return await this.fetchAdministratorDataUser(Administrator.findOrFail(params.id))
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        // return await Administrator.query().paginate(page, perPage)
        return await this.fetchAdministratorDataUsers(Administrator.query().paginate(page, perPage))
      } else {
        // return await Administrator.query()
        return await this.fetchAdministratorDataUsers(Administrator.query())
      }
    }
  }

  public async findByUser({ params }: HttpContextContract) {
    return await Administrator.query().where("user_id", params.user_id)
  }

  public async create({ request }: HttpContextContract) {
    // const body = request.body()
    const body = await request.validate(AdministratorValidator)
    const theAdministrator: Administrator = await Administrator.create(body)
    return theAdministrator
  }

  public async update({ params, request }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(params.id)
    // const body = request.body()
    const body = await request.validate(AdministratorValidator)
    theAdministrator.administrator_state = body.administrator_state
    theAdministrator.user_id = body.user_id
    return theAdministrator.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(params.id)
    response.status(204)
    return theAdministrator.delete()
  }

  public async fetchAdministratorDataUsers(administratorQuery: Promise<Administrator[]>): Promise<any[]> {
    let auxAdministrators: any[] = [];
    let originalAdministrators: Administrator[] = await administratorQuery;

    for (let Administrator of originalAdministrators) {
        let api_response = await axios.get(`${env.get('MS_SECURITY_URL')}/api/users/${Administrator.user_id}`);
        let data = {
            "id": Administrator.id,
            "administrator_state": Administrator.administrator_state,
            "user_id": Administrator.user_id,
            "name": api_response.data.name,
            "email": api_response.data.email
        };
        auxAdministrators.push(data);
    }

    return auxAdministrators;
  }

  public async fetchAdministratorDataUser(administratorQuery: Promise<Administrator>): Promise<any> {
    let originalAdministrator: Administrator = await administratorQuery
    let api_response = await axios.get(`${env.get('MS_SECURITY_URL')}/api/users/${originalAdministrator.user_id}`)
    let data = {
      "id": originalAdministrator.id,
      "administrator_state": originalAdministrator.administrator_state,
      "user_id": originalAdministrator.user_id,
      "name": api_response.data.name,
      "email": api_response.data.email,
    }
    return data
  }
}

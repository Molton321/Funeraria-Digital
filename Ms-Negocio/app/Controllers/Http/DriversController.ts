import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver'
import axios from 'axios'
import env from '@ioc:Adonis/Core/Env'

export default class DriversController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      // return Driver.findOrFail(params.id)
      return await this.fetchDriverDataUser(Driver.findOrFail(params.id))
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        // return await Driver.query().paginate(page, perPage)
        return await this.fetchDriverDataUsers(Driver.query().paginate(page, perPage))
      } else {
        // return await Driver.query()
        return await this.fetchDriverDataUsers(Driver.query())
      }
    }
  }

  public async findByUser({ params }: HttpContextContract) {
    return await Driver.query().where("user_id", params.user_id)
  }

  public async create({ request }: HttpContextContract) {
    // const body = request.body()
    const body = await request.validate(DriverValidator)
    const theDriver: Driver = await Driver.create(body)
    return theDriver
  }

  public async update({ params, request }: HttpContextContract) {
    const theDriver: Driver = await Driver.findOrFail(params.id)
    // const body = request.body()
    const body = await request.validate(DriverValidator)
    theDriver.driver_license = body.driver_license
    theDriver.driver_license_category = body.driver_license_category
    theDriver.driver_license_expiration = body.driver_license_expiration
    theDriver.user_id = body.user_id
    return theDriver.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theDriver: Driver = await Driver.findOrFail(params.id)
    response.status(204)
    return theDriver.delete()
  }

  public async fetchDriverDataUsers(driverQuery: Promise<Driver[]>): Promise<any[]> {
    let auxDrivers: any[] = [];
    let originalDrivers: Driver[] = await driverQuery;

    for (let driver of originalDrivers) {
        let api_response = await axios.get(`${env.get('MS_SECURITY')}/api/users/${driver.user_id}`);
        let data = {
            "id": driver.id,
            "driver_license": driver.driver_license,
            "driver_license_category": driver.driver_license_category,
            "driver_license_expiration": driver.driver_license_expiration,
            "user_id": driver.user_id,
            "user": api_response.data.name
        };
        auxDrivers.push(data);
    }

    return auxDrivers;
  }

  public async fetchDriverDataUser(driverQuery: Promise<Driver>): Promise<any> {
    let originalDriver: Driver = await driverQuery
    let api_response = await axios.get(`${env.get('MS_SECURITY')}/api/users/${originalDriver.user_id}`)
    let data = {
      "id": originalDriver.id,
      "driver_license": originalDriver.driver_license,
      "driver_license_category": originalDriver.driver_license_category,
      "driver_license_expiration": originalDriver.driver_license_expiration,
      "user_id": originalDriver.user_id,
      "user": api_response.data.name
    }
    return data
  }
}

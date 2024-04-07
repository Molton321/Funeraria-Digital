import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return User.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await User.query().paginate(page, perPage)
      } else {
        return await User.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body()
    const theUser: User = await User.create(body)
    return theUser
  }

  public async update({ params, request }: HttpContextContract) {
    const theUser: User = await User.findOrFail(params.id)
    const body = request.body()
    //TODO: Add the fields to update
    //theUser.User_date = body.User_date
    //theUser.User_state = body.User_state
    return theUser.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theUser: User = await User.findOrFail(params.id)
    response.status(204)
    return theUser.delete()
  }
}

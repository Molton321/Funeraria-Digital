import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return Permission.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Permission.query().paginate(page, perPage)
      } else {
        return await Permission.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body()
    const thePermission: Permission = await Permission.create(body)
    return thePermission
  }

  public async update({ params, request }: HttpContextContract) {
    const thePermission: Permission = await Permission.findOrFail(params.id)
    const body = request.body()
    //TODO: Add the fields to update
    //thePermission.Permission_date = body.Permission_date
    //thePermission.Permission_state = body.Permission_state
    return thePermission.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const thePermission: Permission = await Permission.findOrFail(params.id)
    response.status(204)
    return thePermission.delete()
  }
}

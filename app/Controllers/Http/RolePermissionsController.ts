import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RolePermission from 'App/Models/RolePermission'

export default class RolePermissionsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return RolePermission.findOrFail(params.id)
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await RolePermission.query().paginate(page, perPage)
      } else {
        return await RolePermission.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body()
    const theRolePermission: RolePermission = await RolePermission.create(body)
    return theRolePermission
  }

  public async update({ params, request }: HttpContextContract) {
    const theRolePermission: RolePermission = await RolePermission.findOrFail(params.id)
    const body = request.body()
    //TODO: Add the fields to update
    //theRolePermission.RolePermission_date = body.RolePermission_date
    //theRolePermission.RolePermission_state = body.RolePermission_state
    return theRolePermission.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theRolePermission: RolePermission = await RolePermission.findOrFail(params.id)
    response.status(204)
    return theRolePermission.delete()
  }
}

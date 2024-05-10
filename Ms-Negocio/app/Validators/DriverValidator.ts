import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number([rules.unique({ table: 'drivers', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    driver_license: schema.string([rules.minLength(0), rules.maxLength(300)]),
    driver_license_category: schema.string([rules.minLength(0), rules.maxLength(300)]),
    driver_license_expiration: schema.boolean([rules.after('today')]),
    user_id: schema.string([rules.required])
  })

  public messages: CustomMessages = {}
}

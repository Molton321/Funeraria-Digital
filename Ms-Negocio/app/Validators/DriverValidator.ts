import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number([rules.unique({ table: 'drivers', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    driver_license: schema.string([rules.minLength(10)]),
    driver_license_category: schema.string([rules.regex(/[A-C]|[1-2]/)]),
    driver_license_expiration: schema.date({format:"yyyy-MM-dd"},[rules.after('today')]),
    user_id: schema.string()
  })

  public messages: CustomMessages = {}
}

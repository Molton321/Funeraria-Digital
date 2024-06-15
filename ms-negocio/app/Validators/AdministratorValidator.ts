import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'administrators', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    administrator_state: schema.boolean(),
    user_id: schema.string([rules.unique({ table: 'drivers', column: 'user_id', where: { user_id: this.ctx.request.input('user_id') } }), rules.unique({ table: 'clients', column: 'user_id', where: { user_id: this.ctx.request.input('user_id')} }), rules.unique({ table: 'administrators', column: 'user_id' })]),
  })


  public messages: CustomMessages = {}
}

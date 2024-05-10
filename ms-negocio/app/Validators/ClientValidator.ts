import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id: schema.number([rules.unique({ table: 'clients', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    client_address:  schema.string([rules.minLength(10), rules.required()]),
    client_is_alive: schema.boolean([rules.required()]),
    client_is_active: schema.boolean([rules.required()]),
    user_id : schema.string([rules.required()])
  })

 
  public messages: CustomMessages = {}
}

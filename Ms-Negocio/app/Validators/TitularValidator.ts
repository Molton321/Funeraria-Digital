import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TitularValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number([rules.unique({ table: 'titulars', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    titular_is_active: schema.boolean([rules.required()]),
    client_id: schema.number([rules.unique({ table: 'clients', column: 'id' , where:{id: this.ctx.request.input('id')}})])
  })

  public messages: CustomMessages = {}
}

import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BurialValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
      id : schema.number([rules.unique({ table: 'burials', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
      burial_date: schema.number([rules.before('today')]),
      service_id: schema.number([rules.unique({ table: 'services', column: 'id' , where:{id: this.ctx.request.input('id')}})])
  })


  public messages: CustomMessages = {}
}
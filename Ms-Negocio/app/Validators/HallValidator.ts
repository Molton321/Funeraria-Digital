import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HallValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number([rules.unique({table: 'halls', column: 'id', where: {id: this.ctx.request.input('id')}}), rules.range(0,100000)]),
    hall_name : schema.string([rules.minLength(4)]),
    hall_is_active : schema.boolean([rules.required()]),
    hall_capacity : schema.number([rules.range(10,40)]),
    campus_id : schema.number([rules.exists({table: 'campuses', column:'id'})]) 
    })

  public messages: CustomMessages = {}
}

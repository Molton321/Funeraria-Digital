import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HallValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number([rules.exists({table: 'halls', column: 'id'})]),
    hall_name : schema.string([rules.minLength(4)]),
    hall_capacity : schema.number([rules.minLength(10), rules.maxLength(40)]),
    campus_id : schema.number([rules.exists({table: 'campuses', column:'id'})]) 
    })

  public messages: CustomMessages = {}
}

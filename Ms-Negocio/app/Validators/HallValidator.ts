import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const positiveNumberRule = (value: number) => {
  if (value < 0) {
    return 'El número debe ser mayor o igual a cero';
  }
}

export default class HallValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number([rules.exists({table: 'halls', column: 'id'}), rules.range(0,100000)]),
    hall_name : schema.string([rules.minLength(4)]),
    hall_capacity : schema.number([rules.minLength(10), rules.maxLength(40)]),
    campus_id : schema.number([rules.exists({table: 'campuses', column:'id'}), rules.range(0,100000)]) 
    })

  public messages: CustomMessages = {}
}

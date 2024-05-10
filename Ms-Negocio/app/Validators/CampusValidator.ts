import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const positiveNumberRule = (value: number) => {
  if (value < 0) {
    return 'El número debe ser mayor o igual a cero';
  }
}

export default class CampusValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number([rules.exists({table: 'campuses', column: 'id'}), rules.range(0,100000)]),
    campus_name : schema.string([rules.minLength(4)]),
    city_id : schema.number([rules.exists({table: 'cities', column:'id'}), rules.range(0,100000)])
  })


  public messages: CustomMessages = {}
}

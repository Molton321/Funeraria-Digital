import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CityValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number([rules.exists({table: 'cities', column: 'id'}), rules.range(0,100000)]),  
    city_name : schema.string([rules.minLength(4)]),
    department_id : schema.number([rules.exists({table: 'department', column: 'id'})])
  })

  public messages: CustomMessages = {}
}

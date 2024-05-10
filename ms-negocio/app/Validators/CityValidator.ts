import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'
import { column } from '@ioc:Adonis/Lucid/Orm'

const positiveNumberRule = (value: number) => {
  if (value < 0) {
    return 'El número debe ser mayor o igual a cero';
  }
}

export default class CityValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number([rules.exists({table: 'cities', column: 'id'}), rules.range(0,100000)]),  
    city_name : schema.string([rules.minLength(4)]),
    department_id : schema.number([rules.exists({table: 'department', column: 'id'}), rules.range(0,100000)])
  })

  public messages: CustomMessages = {}
}

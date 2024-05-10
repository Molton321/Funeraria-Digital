import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartmentValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number([rules.exists({table: 'department', column: 'id'}), rules.range(0,100000)]),
    department_name : schema.string([rules.minLength(4)])
  })

  public messages: CustomMessages = {}
}

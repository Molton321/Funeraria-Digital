import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartmentValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    department_id : schema.number([rules.exists({table: 'department', column: 'id'})]),
  })

  public messages: CustomMessages = {}
}

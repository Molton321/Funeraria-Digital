import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CoffinValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional(
      [
        rules.unique({ table: 'coffins', column: 'id' , where:{id: this.ctx.request.input('id')}})
      ]),
    coffin_weight: schema.number(
      [
        rules.range(1, 100)
      ]
    ),
  })

  public messages: CustomMessages = {}
}

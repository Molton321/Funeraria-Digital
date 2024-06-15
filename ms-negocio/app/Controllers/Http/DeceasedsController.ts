import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Deceased from 'App/Models/Deceased'
import DeceasedValidator from 'App/Validators/DeceasedValidator'

export default class DeceasedsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let deceased = await Deceased.findOrFail(params.id)
            await deceased?.load("client")
            await deceased?.load("serviceExecutions", async actualScreening=>{
              await actualScreening?.preload("comments")
              await actualScreening?.preload("chat")
            })
            return deceased
        } else {
          const data = request.all()
          if ('page' in data && 'per_page' in data) {
            const page = request.input('page', 1)
            const perPage = request.input('per_page', 20)
            return await Deceased.query().preload('client').paginate(page, perPage)
          } else {
            return await Deceased.query().preload('client')
          }
        }
      }
    
      public async findByClient({ params }: HttpContextContract) {
        return await Deceased.query().where("client_id", params.client_id)
      }
    
      public async create({ request }: HttpContextContract) {
        // const body = request.body()
        const body = await request.validate(DeceasedValidator)
        const theDeceased: Deceased = await Deceased.create(body)
        return theDeceased
      }
    
      public async update({ params, request }: HttpContextContract) {
        const theDeceased: Deceased = await Deceased.findOrFail(params.id)
        // const body = request.body()
        const body = await request.validate(DeceasedValidator)
        theDeceased.deceased_death_date = body.deceased_death_date
        theDeceased.deceased_location = body.deceased_location
        theDeceased.client_id = body.client_id
        return theDeceased.save()
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const theDeceased: Deceased = await Deceased.findOrFail(params.id)
        await theDeceased?.load("serviceExecutions")
        if(theDeceased.serviceExecutions.length>0){
          response.status(400)
          return {message:"Cannot delete deceased with serviceExecutions"}
        }else{
          response.status(204)
          return theDeceased.delete()
        }
      }
}

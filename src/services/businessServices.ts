import * as businessRepository from "../repositories/businessRepository.js"


export async function checkBusiness(businessId: number, cardDb:any) {
    const business = await businessRepository.findById(businessId)
    if(!business){
        throw {
            type: "not_found",
            message: "business not found"
        };
    }
    if(cardDb.type !== business.type){
        throw {
            type: "unauthorized",
            message: "business and card incompatible types"
        };
    }
}
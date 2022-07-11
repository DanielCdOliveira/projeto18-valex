import * as companyRepository from "../repositories/companyRepository.js"

export default async function tokenValidation(apiKey ) {
    if (!apiKey) {
        throw {
            type: "unauthorized",
            message: " x-api-key not found"
        };
    }
    const token : string = apiKey
    const company = await companyRepository.findByApiKey(token)
    if(!company){
        throw {
            type: "unauthorized",
            message: " x-api-key not found"
        };
    }
    return company
}

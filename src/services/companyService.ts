import * as companyRepository from "../repositories/companyRepository.js"

// function notFoundError(entity) {
// 	return {
// 		type: "error_not_found",
// 		message: `Could not find specified "${entity}"!`
// 	};
// }

export default async function tokenValidation(apiKey :any) {
    if (!apiKey) {
        throw {
            type: "invalid_token",
            message: " x-api-key not found"
        };
    }
    const token : string = apiKey
    const company = await companyRepository.findByApiKey(token)
    if(!company){
        throw {
            type: "invalid_token",
            message: " x-api-key not found"
        };
    }
    console.log("2");
    
    return company

}

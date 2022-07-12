import * as paymentRepository from "../repositories/paymentRepository.js"

export async function checkPurchase(balance, payment) {
    if(balance<payment){
        throw{
            type:"unauthorized",
            message:"insufficient funds"
        }

    }
}
export async function insertPayment (cardInfo){
await paymentRepository.insert(cardInfo)
}
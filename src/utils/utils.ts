import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"

export async function getHistory(cardId: number) {
    const recharges = await rechargeRepository.findByCardId(cardId)
    const payments = await paymentRepository.findByCardId(cardId)
    const balance = await getBalance(recharges, payments)
    return { balance,recharges, payments }
}

async function getBalance(recharges: any, payments: any) {
    const rechargesSum = recharges.reduce((previousValue, currentValue) =>
        previousValue += currentValue.amount, 0)
    const paymentsSum = payments.reduce((previousValue, currentValue) =>
        previousValue += currentValue.amount, 0)
    const balance = rechargesSum - paymentsSum
    return balance
}
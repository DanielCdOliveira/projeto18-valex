import { faker } from '@faker-js/faker';
import dayjs from "dayjs"
import Cryptr from "cryptr"
import * as cardRepository from "../repositories/cardRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"

export async function checkCard(employeeId: number, type) {
    const employee = await employeeRepository.findById(employeeId)
    if (!employee) {
        throw {
            type: "unauthorized",
            message: "unregistered employee"
        };
    }

    const cardExists = await cardRepository.findByTypeAndEmployeeId(type, employeeId)
    if (cardExists) {
        throw {
            type: "unauthorized",
            message: "card type already registered"
        };
    }
    return employee
}

export async function createCard(employee: any, type: any) {
    const cryptr = new Cryptr(process.env.CRYPTKEY)
    const number = faker.finance.creditCardNumber('#### #### #### ###L')
    const securityCode = cryptr.encrypt(faker.finance.creditCardCVV())
    let { fullName } = employee;
    fullName = fullName.toUpperCase().split(" ")
    const cardholderName = []
    fullName.forEach((item: any, index: number) => {
        if (index > 0 && index < fullName.length - 1) {
            if (item.length > 3)
                cardholderName.push(item[0])
        } else cardholderName.push(item)
    })
    const expirationDate = dayjs().add(5, 'years').format('MM/YY')
    return { employeeId: employee.id, number, cardholderName: cardholderName.join(" "), expirationDate, securityCode, type, isVirtual: false, isBlocked: true }
}

export async function checkCardActivation(cardInfo: any) {
    const card = await cardRepository.findById(cardInfo.cardId)
    if (!card) {
        throw {
            type: "not_found",
            message: "unregistered card"
        }
    }
    const today = dayjs().format("MM/YY").split("/")
    const expirationDateArray = card.expirationDate.split("/")
    if (((parseInt(expirationDateArray[0]) < parseInt(today[0])) &&
        (parseInt(expirationDateArray[1]) <= parseInt(today[1]))) || (parseInt(expirationDateArray[1]) < parseInt(today[1]))) {
        throw {
            type: "unauthorized",
            message: "expired card"
        }
    }
    if (card.password) {
        throw {
            type: "unauthorized",
            message: "card already activated"
        }
    }
    const cryptr = new Cryptr(process.env.CRYPTKEY)
    const securityCode = cryptr.decrypt(card.securityCode)
    console.log(securityCode);
    
    if (securityCode !== cardInfo.securityCode) {
        throw {
            status: 401,
            message: "security code incorrect"
        }
    }
}
export async function activateCard(cardInfo: any) {
    const cryptr = new Cryptr(process.env.CRYPTKEY)
    const encryptedPassword = cryptr.encrypt(cardInfo.password)
    console.log(typeof encryptedPassword);
    
    await cardRepository.activateCardDb(cardInfo.cardId, encryptedPassword)
}
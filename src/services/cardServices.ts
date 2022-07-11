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

export async function createCard(employee:any, type:any ) {
    const cryptr = new Cryptr(process.env.CRYPTKEY)
    const number = faker.finance.creditCardNumber('#### #### #### ###L')
    const securityCode = cryptr.encrypt(faker.finance.creditCardCVV())
    let { fullName } = employee;
    fullName = fullName.toUpperCase().split(" ")
    const cardholderName = []
    fullName.forEach((item:any, index:number) => {
        if (index > 0 && index < fullName.length - 1) {
            if (item.length > 3)
                cardholderName.push(item[0])
        } else cardholderName.push(item)
    })
    const expirationDate = dayjs().add(5, 'years').format('MM/YY')
    return { employeeId:employee.id ,number, cardholderName: cardholderName.join(" "), expirationDate, securityCode ,type,  isVirtual:false, isBlocked:true}
}
<div align="center"><img style = "width:100%;"src="https://i.imgur.com/xYicCqv.png"></img></div>
<hr>
<h2 align=center>Valex (Back-End)</h2>
<h3 align=center>Web development Project</h3>
<hr>
<h4 align=center>A benefits Card API</h4>
<h4 align=center>The API will be responsible for creating, reloading, activating, as well as processing purchases.</h4>
<h4 align=center>First project made with TypeScript</h4>
<hr>

# DATABASE

- Bank diagram

 <div align="center"><img style = "width:100%;"src="https://i.imgur.com/JrMJi4Q.png"></img></div>
    
- Subtitle:
    
    - Key: `PRIMARY KEY` field
    - Snowflake: `UNIQUE` field
    - Type ending with question mark: `NULLABLE` field (without `NOT NULL`)
     - Type: enum with values `'groceries', 'restaurants', 'transport', 'education', 'health'`
     - 3 “legs connected” to a column by a row: 1-N ratio (one to many)

## SEED

```sql
INSERT INTO companies ("id", "name", "apiKey")
VALUES (1, 'Driven', 'zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0');

INSERT INTO employees ("id", "fullName", "cpf", "email", "companyId")
VALUES (1, 'Fulano Rubens da Silva', '47100935741', 'fulano.silva@gmail.com', 1);
INSERT INTO employees ("id", "fullName", "cpf", "email", "companyId")
VALUES (2,'Ciclana Maria Madeira', '08434681895', 'ciclaninha@gmail.com', 1);

INSERT INTO businesses ("id", "name", "type")
VALUES (1, 'Responde Aí', 'education');
INSERT INTO businesses ("id", "name", "type")
VALUES (2, 'Extra', 'groceries');
INSERT INTO businesses ("id", "name", "type")
VALUES (3, 'Driven Eats', 'restaurant');
INSERT INTO businesses ("id", "name", "type")
VALUES (4, 'Uber', 'transport');
INSERT INTO businesses ("id", "name", "type")
VALUES (5, 'Unimed', 'health');
```

# Requirements

## Cards

- Creation

  **Description:**
  In this route, companies with a valid API key can create cards for their employees. For a card to be created we need the employee identifier and the card type.
  **There is already a company registered with the bank with a valid API Key.**
  **Validations:**

  - The API key must be received in the `x-api-key` header
  - Card type must only be one of the following options: `'groceries', 'restaurants', 'transport', 'education', 'health'`
    **Business rules:**
  - The API key must be owned by some company
  - Only registered employees must have cards
  - Employees cannot have more than one card of the same type
  - Use the [faker](https://fakerjs.dev/guide/#overview) library to generate the card number
  - The name on the card must be in the format `first name + middle initials + last name` (all capital letters).
    - Only consider middle names that have 3 letters or more
    - Ex: for the name José da Silva Rodrigues the following name must be generated
    - `JOSÉ S RODRIGUES`
  - The expiration date must be the current day 5 years ahead and in `MM/YY` format
    - Ex: for the date `02/04/2022` the following expiration date must be generated
    - `04/27`
  - The security code (CVC) must be persisted in an encrypted form as it is sensitive data
    - Use the [faker](https://fakerjs.dev/guide/#overview) library to generate the CVC
      - We can't use bcrypt to encrypt the CVC, because we'll need it later and the way bcrypt uses to encrypt is impossible to decrypt. Use the [cryptr](https://fakerjs.dev/guide/#overview) library instead

- Card activation

  **Description:**
  In this route, employees can create and activate their cards, that is, generate a password for the card. For a card to be activated, we need the identifier, its CVC and the password that will be registered.
  **Business rules:**

  - Only registered cards must be activated
  - Only non-expired cards should be activated
  - Cards already activated (with registered password) must not be able to be activated again
  - The CVC must be received and verified to ensure the security of the request
  - The card password must consist of 4 numbers
  - The card password must be persisted in an encrypted form as it is sensitive data

- Viewing balance and transactions
  **Description:**
  In this route, employees can view a card balance and card transactions. For this we need the card identifier.
  **Expected Return:**
  ```json
  {
    "balance": 35000,
    "transactions": [
  { "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "2022/01/22", "amount": 5000 }
  ]
    "recharges": [
  { "id": 1, "cardId": 1, "timestamp": "2022/01/21", "amount": 40000 }
  ]
  }
  ```
  **Business rules:**
  - Only registered cards should be viewable
  - The balance of a card is equivalent to the sum of its recharges minus the sum of its purchases
- Card lock
  **Description:**
  On this route, employees can block cards. For a card to be blocked, we need its identifier and password.
  **Business rules:**
  - Only registered cards should be blocked
  - Only unexpired cards should be blocked
  - Only unblocked cards should be blocked
  - The card password must be received and verified to ensure the security of the request
- Card unlocking
  **Description:**
  On this route, employees can unlock cards. For a card to be unlocked, we need its identifier and password.
  **Business rules:**
  - Only registered cards must be unlocked
  - Only unexpired cards should be unlocked
  - Only locked cards should be unlocked
  - The card password must be received and verified to ensure the security of the request

## Refills

- Recharge
  **Description:**
  In this route, companies with a valid API key can reload their employees' cards. For a card to be recharged, we need its identifier.
  **Validations:**
  - Only values greater than 0 should be accepted
    **Business rules:**
  - Only registered cards should receive recharges
  - Only active cards should receive top-ups
  - Only non-expired cards should receive top-ups
  - Recharge must be persisted

## Shopping

- Purchase at POS
  **Description:**
  On this route, employees can buy at _Points of Sale_ (machines). For a purchase at a POS to be made, we need the identifier of the card used and its password, the identifier of the establishment and the amount of the purchase.
  **Validations:**
  - Only amounts greater than 0 should be accepted
    **Business rules:**
  - Only registered cards should be able to buy
  - Only active cards should be able to buy
  - Only unexpired cards should be able to buy
  - Only unblocked cards should be able to buy
  - The card password must be received and verified to ensure the security of the request
  - Only registered establishments should be able to transact
  - Only establishments of the same type as the card should be able to transact with it
  - The card must have enough balance to cover the purchase amount
  - The purchase must be persisted

# API Reference

#### SIGN-UP

```http
POST /sign-up
```

#### Request:

| Body       | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `name`     | `string` | **Required**. name        |
| `email`    | `string` | **Required**. valid email |
| `password` | `string` | **Required**. password    |
| `imageUrl` | `string` | **Required**. image url   |

#

#### SIGN-IN

### Authorization

| Headers         | Type     | Description               |
| :-------------- | :------- | :------------------------ |
| `Authorization` | `string` | **Required**. valid token |

`Authorization format: Bearer jsonwebtoken`

<br/>

- **POST** /card/creation
- Route to register a new card
- headers:

```json
  {
  "name": "x-api-key",
  "value": "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"
  }
```

- Body

  | Body         | Type     | Description               |
  | :----------- | :------- | :------------------------ |
  | `employeeId` | `number` | **Required**. employee ID |
  | `type`       | `string` | **Required**. valid type  |

- **POST** /card/activate

  - Route to activate card
  - headers: {}
  - body:

  | Body           | Type     | Description                          |
  | :------------- | :------- | :----------------------------------- |
  | `cardId`       | `number` | **Required**. card ID                |
  | `securityCode` | `string` | **Required**. security card number   |
  | `password`     | `string` | **Required**. security card password |

- **PUT** /card/unlock

  - Route to unlock card
  - headers: {}
  - body:

  | Body       | Type     | Description                          |
  | :--------- | :------- | :----------------------------------- |
  | `cardId`   | `number` | **Required**. card ID                |
  | `password` | `string` | **Required**. security card password |

- **PUT** /card/block

  - Route to make block card
  - headers: {}
  - body:

  | Body       | Type     | Description                          |
  | :--------- | :------- | :----------------------------------- |
  | `cardId`   | `number` | **Required**. card ID                |
  | `password` | `string` | **Required**. security card password |

- **POST** /card/recharge
  - Route to reload card
  - headers:

```json
{
  "name": "x-api-key",
  "value": "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"
}
```

- body:

  | Body     | Type     | Description           |
  | :------- | :------- | :-------------------- |
  | `cardId` | `number` | **Required**. card ID |
  | `amount` | `number` | **Required**. amount  |

{
"cardId":1,
"amount":500
}

- **POST** /card/purchase

  - Route to buy with the card
  - headers: {}
  - body:

  | Body         | Type     | Description                 |
  | :----------- | :------- | :-------------------------- |
  | `cardId`     | `number` | **Required**. card ID       |
  | `businessId` | `number` | **Required**. business ID   |
  | `amount`     | `number` | **Required**. amount        |
  | `password`   | `string` | **Required**. card password |

  {
  "cardId":1,
  "businessId":2,
  "amount":1000,
  "password":"4651"
  }

- **GET** /cards/:id
  - Route to buy with the card
  - headers: {}
  - body: {}

## Usage

Install my project with npm

> Clone the repository:

```bash
  git clone git@github.com:DanielCdOliveira/projeto18-valex.git
```

> Install dependences:

```bash
  npm install
```

> Create a .env file like the .env.example file

> Run aplication:

```bash
  npm run dev
```

### Built with

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

### Contact

[![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/danielcdoliveira/

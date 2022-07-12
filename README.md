<p align="center">
  <a href="https://github.com/DanielCdOliveira/projeto18-valex">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    projeto18-valex
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/DanielCdOliveira/projeto18-valex

$ cd projeto18-valex

$ npm install

$ npm run dev
```

API: https://valex-driven-2022.herokuapp.com/

```
- POST /card/creation
    - Rota para cadastrar um novo cartao
    - headers: {{
          "name": "x-api-key",
          "value": "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"
        }
    - body:{
     "employeeId":1,
     "type":"groceries"
     }	
      
    
- POST /card/activate
    - Rota para ativar cartao
    - headers: {}
    - body: {
    "cardId":1,
    "securityCode":"119",
    "password":"4651"
    }
    
- PUT /card/unlock
    - Rota para fazer desbloquear cartao
    - headers: {}
    - body: {
    "cardId":1,
     "password":"4651"
     }
     
- PUT /card/block
    - Rota para fazer bloquear cartao
    - headers: {}
    - body: {
    "cardId":1,
     "password":"4651"
     }
     
- POST /card/recharge
    - Rota para recarregar cartao
    - headers:   {
          "name": "x-api-key",
          "value": "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"
        }
    - body: {
    "cardId":1, 
    "amount":500
    }
    
- POST /card/purchase
    - Rota para comprar com o cartao
    - headers: {}
    - body: {
    "cardId":1,
    "businessId":2,
    "amount":1000,
    "password":"4651"
    }
- GET /cards/:id
    - Rota para comprar com o cartao
    - headers: {}
    - body: {}

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


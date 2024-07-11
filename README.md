# API de Cadastro e Login de usuários

Esta API é para o cadastro de usuários com cargo, utilizando um sistema de autenticação JWT e hash de senha com Bcrypt.

## Endpoints

### POST /user
Esse endpoint e responsavel por fazer o cadastro do usuário

#### Parâmetros

name: Nome do usuário

email: E-mail do usuário.

password: Senha do usuário.


Exemplo de Requisição:

```

{
    "name": "Victor"
    "email": "victor@teste.com",
    "password": "12345"

}




```

#### Respostas

##### OK! 200
Caso essa resposta ocorra, seu usuário foi cadastrado com sucesso.

##### Falha no Cadastro! 400
Caso essa resposta ocorra, seu E-mail e invalido.

##### Falha no Cadastro! 406
Caso essa resposta ocorra, seu E-mail ja esta cadastrado.


### POST /login
Esse endpoint e responsavel por fazer o login do usuário e retornara o token jwt

#### Parâmetros


email: E-mail do usuário.

password: Senha do usuário.


Exemplo de Requisição:

```

{

    "email": "victor@teste.com",
    "password": "12345"

}




```

#### Respostas

##### OK! 200
Caso essa resposta ocorra, seu usuário foi logado com sucesso e retornara o token jwt.


##### Falha no Login! 406
Caso essa resposta ocorra, sua senha esta incorreta.

Exemplo de Resposta:

```

{
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ2aWN0b3JsaW1hQGdtYWlsLmNvbSIsImlhdCI6MTcxODI4NjQ1MCwiZXhwIjoxNzE4MjkwMDUwfQ.Tr45yG9pjB6h9VaTYvUEMiCtbefqc4afETb3olD2Fto"
}

```


### GET /user
Este endpoint é responsável por retornar a listagem de todos os usuarios cadastrados no banco de dados.

#### Parâmetros

Token: Use o token recebido na rota /login na requisição para obter acesso. Exemplo de token:
`eyJhbGciOiJIUzI1kaIsInR5daI12kpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ2aWN0b3JsaW1hQGdtYWlsLmNvbSIsImlhdCI6MTcyMDE5ODk4NSwiZXhwIjoxNzIwMjAyNTg1fQ.BlbSiW_uc7EAaKXQsNs-3a9PJA0dQtGrBDCB_DvO2dw`

#### Respostas

##### OK! 200
Caso essa resposta ocorra, você receberá a listagem de todos os usuarios.

#### Respostas

##### Falha! 403
Caso essa resposta ocorra, você inseriou token jwt invalido.


Exemplo de Resposta:

```

[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "1"
    },
    {
        "id": 2,
        "name": "Victor",
        "email": "victor@teste.com",
        "role": "1"
    }
]


```

### PUT /user

#### Parâmetros

TOKEN: E necessário informar o token jwt.
ID: Id do usuario deve ser passador no body rota ex:


`{

    "id": "1",
    "name" "victor" <= novo nome
    "email": "victor@teste.com" <= novo email,
    "password": "1234" <= nova senha

}`

#### Respostas

##### OK! 200
Caso essa resposta ocorra, a atualização ocorreu com sucesso.

##### Falha! 406
Caso essa resposta ocorra, novo email ja existe no banco de dados.


Exemplo de Resposta:

`
OK
`

### DELETE /user

#### Parâmetros

TOKEN: E necessário informar o token jwt.
ID: Id do user deve ser passador na rota ex: `http://localhost:8080/user/:id`

#### Respostas

##### OK! 200
Caso essa resposta ocorra, a atualização ocorreu com sucesso.

##### Falha! 406
Caso essa resposta ocorra, o id informado e invalido.

Exemplo de Resposta:

`
OK
`


### POST /recoverypassword

#### Parâmetros

email: E-mail do usuário

`
{


    "email": "victor@teste.com"


}

`


#### Respostas

##### OK! 200
Caso essa resposta ocorra, retornara o token jwt para acessar a rota changepassword.

##### Falha! 406
Caso essa resposta ocorra, o email informado e invalido.

Exemplo de Resposta:

`
{
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ2aWN0b3JsaW1hQGdtYWlsLmNvbSIsImlhdCI6MTcxODI4NjQ1MCwiZXhwIjoxNzE4MjkwMDUwfQ.Tr45yG9pjB6h9VaTYvUEMiCtbefqc4afETb3olD2Fto"
}
`

### POST /changePassword

#### Parâmetros

TOKEN: E necessário informar o token jwt.
password: Senha do usuário.

Exemplo de Requisição:

```

{

    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ2aWN0b3JsaW1hQGdtYWlsLmNvbSIsImlhdCI6MTcxODI4NjQ1MCwiZXhwIjoxNzE4MjkwMDUwfQ.Tr45yG9pjB6h9VaTYvUEMiCtbefqc4afETb3olD2Fto"
    "password": "12345" <= nova senha

}




```

#### Respostas

##### OK! 200
Caso essa resposta ocorra, a atualização ocorreu com sucesso.

##### Falha! 406
Caso essa resposta ocorra, o token informado e invalido.

Exemplo de Resposta:

`
Senha Alterada
`










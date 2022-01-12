# Mini Instagram

<!--
## Login
![](https://i.imgur.com/bhoXDN7.png)
- Formulário para autenticar
    - Estado no front
    - Validação no front
    - Validação no back: Requisições back
- Redirects
    - Cadastro
    - Logar caso sucesso
- Requisições
    - **POST** para back
- Erros
    - Resposta do back
##

## Cadastro
![](https://i.imgur.com/0UsyYqh.png)
- Formulário para cadastrar
    - Estado no front
    - Validação no front
    - Validação no back: Requisições back
- Redirects
    - Login
    - Logar caso sucesso
- Requisições
    - **POST** para back
- Erros
    - Resposta do back

## Perfil
![](https://i.imgur.com/MDbz5Vh.png)
- Formulário para editar profile
    - Estado no front
    - Validação no front
    - Validação no back: Requisições back
- Redirects
    - Feed
- Requisições
    - PUT para back
- Erros
    - Resposta do back
- Autenticação: true


## Feed
![](https://i.imgur.com/3R1VKas.png)
- Estados de curtidas e quantidade
    - Estado no front
    - Requisições back de conteúdo
- Redirects
    - Logout
    - Editar profile
- Requisições
    - Obter postagens: GET
    - Curtir: POST
    - Comentar: POST
    - :x: Curtir e comentar comentários
    - :x: Ver localização da postagem
    - :x: Ver quem curtiu postagem
- Erros
    - Resposta do back
- Autenticação: true
-->

# Endpoints

## POST - Login

### Objetivos

- Validar username e senha
- Buscar usuario no banco
- Verificar se a senha está correta
- Gerar o token de autenticação
- Retornar o token de autenticação

### Dados enviados

- username
- senha

```json
{
  "username": "taffarel55",
  "senha": 12345
}
```

### Dados retornados:

- :heavy_check_mark: Sucesso 200

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

- :x: Erro 400

```json
{
  "erro": "É obrigatório usuário e senha"
}
```

- :x: Erro 404

```json
{
  "erro": "Usuário ou senha incorretos"
}
```

## POST - Cadastro

### Objetivos

- Validar username e senha
- Buscar usuario no banco
- Criptografar a senha
- Cadastrar usuário
- Retornar sucesso ou erro

### Dados enviados

- username (obrigatório)
- senha (obrigatório)

```json
{
  "username": "taffarel55",
  "senha": 12345
}
```

### Dados retornados:

- :heavy_check_mark: Sucesso 201

```
    No Body
```

- :x: Erro 404

```json
{
  "erro": "Não foi possível realizar o cadastro"
}
```

- :x: Erro 403

```json
{
  "erro": "A senha deve conter no mínimo 5 caracteres"
}
```

- :x: Erro 400

```json
{
  "erro": "É obrigatório usuário e senha"
}
```

- :x: Erro 409

```json
{
  "erro": "Usuário já existe"
}
```

## GET - Obter dados perfil

### Objetivos

- Validar o token do usuário
- Buscar cadastro do usuário do token
- Retornar os dados do usuário

### Dados enviados

```
    No Body
    // Token Bearer
```

### Dados retornados:

- :heavy_check_mark: Sucesso 201

```json
{
    // Token Bearer
    "nome": "Maurício"
    "username": "taffarel55",
    "site": "www.mauricio.com",
    "bio": "Esta é uma bio",
    "email": "mauricio@taffarel.com",
    "tel": "+55071987654321"
    "gender": "male",
    "img": "https://imagemperfil.png"
}
```

- :x: Erro 404

```json
{
  "erro": "Não foi possível encontrar o usuário"
}
```

- :x: Erro 403

```json
{
  "erro": "Autenticação é necessária"
}
```

:::

## PATCH - Atualizar dados do perfil

### Objetivos

- Validar o token do usuário
- Buscar cadastro do usuário do token
- Exigir ao menos um campo para atualizar
- Verificar unicidade do email e username
- Criptografar senha, se informada
- Atualizar registro do usuário
- Retornar status

### Dados enviados

```json
{
  "nome": "Maurício",
  "username": "taffarel55",
  "site": "www.mauricio.com",
  "bio": "Esta é uma bio",
  "email": "mauricio@taffarel.com",
  "tel": "+55071987654321",
  "gender": "male",
  "img": "https://imagemperfil.png"
}
```

### Dados retornados:

- :heavy_check_mark: Sucesso 202

```json
No body
```

- :x: Erro 404

```json
{
  "erro": "Não foi possível encontrar o usuário"
}
```

- :x: Erro 409

```json
{
  "erro": "Já existe este usuário/email cadastrado"
}
```

- :x: Erro 403

```json
{
  "erro": "Autenticação é necessária"
}
```

- :x: Erro 400

```json
{
  "erro": "Informe ao menos um campo para atualização"
}
```

## GET - Obter postagens

### Objetivos

- Validar o token do usuário
- Buscar cadastro do usuário do token
- Retornar postagens de outras pessoas

### Dados enviados

```
    No Body
    // Token Bearer
    ?offset=x

```

### Dados retornados:

- :heavy_check_mark: Sucesso 200

```json
[
    {
        "id": 2,
        "texto": "Sol, verão e mar",
        "usuario": {
            "username": "meninoengraçado123"
            "img": "https://img.png"
        },
        "liked": true,
        "fotos": [
            "https://img.png",
            "https://img.png",
            "https://img.png"
        ]
        "curtidas": 7,
        "comentarios": [
            {
                "usuario": "taffarel55",
                "texto": "Que lindo!"
            }
        ],
        "data": "21-10-2021"

    }
]
```

- :x: Erro 403

```json
{
  "erro": "Autenticação é necessária"
}
```

## POST - Cadastrar postagens

### Objetivos

- Validar o token do usuário
- Buscar cadastro do usuário do token
- Exigir pelo menos 1 foto no array
- Exigir legenda da imagem
- Cadastrar postagem para o usuário logado
- Cadastrar fotos daquela postagem
- Retornar resposta

### Dados enviados

```json
{
    "texto": "Este sou eu lindo"
    "fotos":
        [
            "https://img1.png",
            "https://img1.png",
            "https://img1.png"
        ]
}
// Token Bearer

```

### Dados retornados:

- :heavy_check_mark: Sucesso 201

```json
{
  "id": 2
}
```

- :x: Erro 400

```json
{
  "erro": "Não foi possível cadastrar postagem"
}
```

- :x: Erro 400

```json
{
  "erro": "É preciso enviar ao menos uma foto"
}
```

- :x: Erro 403

```json
{
  "erro": "Autenticação é necessária"
}
```

## POST - Curtir postagens

### Objetivos

- Validar o token do usuário
- Buscar cadastro do usuário do token
- Buscar a postagem pelo id
- Verificar se usuário curtiu
- Cadastrar curtida da postagem no banco de dados

### Dados enviados

```json
{
  "id": 1
}
// Token Bearer
```

### Dados retornados:

- :heavy_check_mark: Sucesso 202

```json
    No body
```

- :x: Erro 404

```json
{
  "erro": "Não foi possível encontrar postagem"
}
```

- :x: Erro 403

```json
{
  "erro": "Autenticação é necessária"
}
```

- :x: Erro 400

```json
{
  "erro": "Não foi possível curtir postagem"
}
```

## POST - Comentar postagens

### Objetivos

- Validar o token do usuário
- Buscar cadastro do usuário do token
- Validar texto
- Buscar a postagem pelo id informado
- Cadastrar comentário da postagem
- Retornar status

### Dados enviados

```json
{
  "id": 1,
  "texto": "Nossa que lindo! Amei <3"
}
// Token Bearer
```

### Dados retornados:

- :heavy_check_mark: Sucesso 202

```json
    No body
```

- :x: Erro 404

```json
{
  "erro": "Não foi possível encontrar postagem"
}
```

- :x: Erro 403

```json
{
  "erro": "Autenticação é necessária"
}
```

- :x: Erro 400

```json
{
  "erro": "Não foi possível comentar postagem"
}
```

# Banco de dados:

## Usuários

```sql
create table usuarios(
    id serial primary key,
    nome text,
    img text,
    username text not null unique,
    email text unique,
    site text,
    bio text,
    tel text,
    gender text,
    senha text not null,
    verificado boolean default false
);
```

## Postagens

```sql
create table postagens(
    id serial primary key,
    usuario_id int not null,
    data timestamptz default now(),
    texto text,
    foreign key (usuario_id) references usuarios(id)
);
```

## Fotos

```sql
create table postagem_fotos(
    id serial primary key,
    postagem_id int not null,
    imagem text not null
    foreign key (postagem_id) references postagens(id)
);
```

## Comentários

```sql
create table postagem_comentarios(
    id serial primary key,
    texto text not null,
    data timestamptz default now(),
    postagem_id int not null,
    usuario_id int not null,
    foreign key (postagem_id) references postagens(id),
    foreign key (usuario_id) references usuarios(id)
);
```

## Curtidas

```sql
create table postagem_curtidas(
    usuario_id int not null,
    postagem_id int not null,
    data timestamptz default now(),
    foreign key (postagem_id) references postagens(id),
    foreign key (usuario_id) references usuarios(id)
);
:::
```

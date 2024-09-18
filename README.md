# ![In.Orbit](https://github.com/user-attachments/assets/8f568834-a9de-47a9-b408-c2021ec5aad5)  in.orbit
 in.orbit - Back-End

Bem-vindo ao repositório do back-end do projeto **in.orbit**! Este projeto foi desenvolvido durante o evento **NLW Pocket** da Rocketseat. Abaixo, você encontrará informações sobre as rotas disponíveis e como utilizar a API.

## Rotas da API

```markdown
### 1. Criar Meta

**Endpoint:** `/goals`  
**Método:** `POST`

**Descrição:** Cria uma nova meta.

**Body da Requisição:**

{
  "title": "Título da Meta",
  "desiredWeeklyFrequency": 3
}
```
Parâmetros:

title: O título da meta (string).<br/>
desiredWeeklyFrequency: A frequência desejada por semana (número).

```markdown
### 2. Completar Etapa de uma Meta
Endpoint: /completion
Método: POST

Descrição: Marca uma etapa de uma meta como concluída.

**Body da Requisição:**
```json
{
  "id": "ID da Meta"
}
```
Parâmetros:

id: O ID da meta a ser completada (string).

```markdown
### 3. Buscar Metas Pendentes
Endpoint: /pending-goals
Método: GET

Descrição: Recupera a lista de metas pendentes.

**Resposta da Requisição:**
[
  {
    "id": "id da meta",
    "title": "titulo da meta",
    "desiredWeeklyFrequency": 3,
    "completionCount": 2
  }
]
```

```markdown
### 4. Buscar Resumo de Metas Concluídas
Endpoint: /summary
Método: GET

Descrição: Recupera o resumo das metas concluídas.

Resposta:
{
  "completed": 5,
  "total": 10,
  "goalsPerDay": {
    "2024-09-17": [
      {
        "id": "ID da Meta",
        "title": "Título da Meta",
        "completedAt": "2024-09-17T12:34:56Z"
      }
    ]
  }
}
```

## Tecnologias Utilizadas

- **Node.js**
- **Fastify**
- **Drizzle ORM**
- **PostgreSQL**
- **Zod** para validações
- **Biome.js** para qualidade do código

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Krollitte/in.orbit-server.git
   ```
2. Inicie o docker rodando
   ```bash
   docker compose up -d 
   ```
3. Instale as dependencias
  ```bash
  npm i
  ```
4. Gere as migrations
  ```bash
  npx drizzle-kit generate   
  ```

5. Rode as migrations
  ```bash
  npx drizzle-kit migrate   
  ```

6. Povoe o bando de dados
   ```bash
   npm run seed  
   ```

6. Rode o projeto
  ```bash
  npm run dev  
  ```



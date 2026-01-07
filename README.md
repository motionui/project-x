# project-x
OpenAI Node.js backend

# To run on local environment
npx ts-node src/index.ts

# To quickly test the API
curl -X POST http://localhost:3000/api/role/generateRoleDescription \
  -H "Content-Type: application/json" \
  -d '{"role":"frontend engineer"}'
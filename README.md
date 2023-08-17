# RPG-Backend

Welcome to the RPG-Backend, a powerful Javascript and Express-based backend application designed to bring your RPG gaming experience to the next level. This application leverages PostgreSQL as the robust database system, combined with Prisma as the seamless ORM solution.


### Initial Set-Up

1. Clone down the repo.
2. You must have Node installed on your computer.
3. Open a terminal, navigate to the root directory of the project.
4. Run the command `npm i` or `npm install`.
5. You need to create an env with a `DATABASE_URL`, `PORT`, `JWT_SECRET`, `JWT_LIFETIME`.

### Scripts Available:

Using `npm run`

- `dev`: starts local deployment using nodemon.
- `lint`: runs a linting check over your code.
- `prettier`: formats your code to match rules set up in `.prettierrc.json`.
- `test`: runs any tests that may be set up.
- `studio`: runs prisma studio.
- `migration`: runs a database migration.
- `commit`: runs commitizen.
- `seed:create`: creates Super Admin users.

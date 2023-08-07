# RPG-Backend

Welcome to the RPG-Backend, a powerful Javascript and Express-based backend application designed to bring your RPG gaming experience to the next level. This application leverages PostgreSQL as the robust database system, combined with Prisma as the seamless ORM solution.

## Endpoints

### Registration

- **Endpoint:** `/auth/register`
- **Method:** POST
- **Description:** Allow new users to create an account for logging in and connecting characters to their accounts.

### Login

- **Endpoint:** `/auth/login`
- **Method:** POST
- **Description:** User login. Requires the token returned for accessing other features.

### Create Character

- **Endpoint:** `/character/create`
- **Method:** POST
- **Description:** Craft a unique character for a user. Users have the flexibility to create multiple characters.

### Browse Builds

- **Endpoint:** `/builds`
- **Method:** GET
- **Description:** Retrieve a comprehensive list of all available character builds accessible to the user.

### Create Builds (Admin)

- **Endpoint:** `/builds/create`
- **Method:** GET
- **Description:** Specifically designed for admin users, this endpoint facilitates the seeding of a foundational set of character builds.

Embark on your RPG adventure with RPG-Backend, where registration, character creation, and build exploration await!

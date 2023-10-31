//Test Item 4.1.12 /items/create 
//Description: Logs in

let token; //Used to pass a token between login and checking character name 

describe("Log in BASIC user", () => {
    it("BASIC_ROLE user login and get token", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/auth/login",
            body: {
                username: "Freddy Testman",
                password: "Ft3st123",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("token");
            token = response.body.token;
        });
    });
});

describe("Invalid item create", () => {
    it("Try add item as BASIC user role", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/items/create",
            body: {
                "name": "CypressTestItem",
                "type": "weapon",
                "level": 2
            },
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            console.log(response);
            expect(response.status).to.eq(401);
            expect(response.body.error).to.eq("You are not authorized to create an item");
        });
    });
});

describe("Log in an ADMIN user", () => {
    it("SUPER_ADMIN user Login and get token", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/auth/login",
            body: {
                username: "admin",
                password: "test",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("token");
            token = response.body.token;
        });
    });
});

describe("Valid item create", () => {
    it("Try add item as SUPER_ADMIN user role", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/items/create",
            body: {
                "name": "CypressTestItem",
                "type": "weapon",
                "level": 2,
                "rarity": "Uncommon",
                "buyCost": 12,
                "sellPrice": 6
            },
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            console.log(response);
            expect(response.status).to.eq(200);
            expect(response.body.data.name).to.eq("CypressTestItem");
            expect(response.body.data.id).to.be.at.least(1);
        });
    });
});
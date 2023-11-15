//Test Item 4.1.07 /character/inventory/add
//Description: Logs in as a user, creates a fresh character and add a correct/incorrect item to the inventory

let token; //Used to pass a token between login and checking character name 
let charId; //ID as variable due to multiple checks through tests

describe("Log in user", () => {
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

describe("Create character", () => {
    it("Create unique character name for future endpoint test", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/character/create",
            body: {
                "name": "Thomas Shanklin",
                "gender": "MALE",
                "buildId": 2
            },
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.have.property("id");
            charId = response.body.data.id;
        });
    });
});

describe("Add item to inventory", () => {
    it("Updates the character and adds a new item (with known characterId)", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/character/inventory/add",
            body: {
                "characterId": charId,
                "itemId": 1
            },
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("data");
            expect(response.body.message).to.eq("Item added");
        });
    });
});

describe("Add incorrect item to inventory", () => {
    it("Updates the character and tries to add a new item (with incorrect itemId)", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/character/inventory/add",
            body: {
                "characterId": charId,
                "itemId": 1000
            },
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property("error");
            expect(response.body.error).to.eq("Item not found");
        });
    });
});
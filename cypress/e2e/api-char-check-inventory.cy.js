//Test Item 4.1.06 /character/update:characterId
//Description: Logs in as a user, creates a fresh character and add a correct/incorrect item to the inventory

//Required Variables for character auth + updates
let token; //Used to pass a token between login and checking character name 
let charId;

describe("Log in user", () => {
    it("Admin user Login and get token", () => {
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
    it("Create unique character name for future inventory check", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/character/create",
            body: {
                "name": "Stephanie",
                "gender": "FEMALE",
                "buildId": 1
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
    it("Updates the character and adds a new item", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/character/inventory/add",
            body: {
                "characterId": charId,
                "itemId": 2
            },
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            console.log(response)
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("data");
            expect(response.body.message).to.eq("Item added");
        });
    });
});


describe("GET /character/inventory/:characterId", () => {
    it("Retrieves a list of items that belong to the users character", () => {
        cy.request({
            method: "GET",
            url: `http://localhost:3001/api/v1/character/inventory/${charId}`,
            body: {
                "characterId": charId,
            },
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            console.log(response)
            expect(response.status).to.eq(200);
            expect(response.body.data.length).to.be.greaterThan(0);
            expect(response.body.data[0].item.id).to.eq(2);
        });
    });
});
//Test Item 4.1.06 /character/update:characterId
let token; //Used to pass a token between login and checking character name 
let charName = "Steve";
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
    it("Create unique character name for future endpoint test", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/character/create",
            body: {
                "name": charName,
                "gender": "FEMALE",
                "buildId": 2
            },
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("data");
            expect(response.body.data.gender).to.eq("FEMALE");
            expect(response.body.data).to.have.property("userId");
            charId = response.body.data.userId;
        });
    });
});

describe("Update Character", () => {
    it("Updates the characters genders using characterId", () => {
        cy.request({
            method: "PUT",
            url: `http://localhost:3001/api/v1/character/update/${charId}`,
            body: {
                "gender": "MALE",
            },
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            console.log(response)
            expect(response.status).to.eq(200);
            expect(response.body.data.gender).to.eq("MALE");
        });
    });
});
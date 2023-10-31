//Test Item 4.1.05 /character:name
let token; //Used to pass a token between login and checking character name 
let charName = "Jimmy"; //Name as variable due to multiple checks through code

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
                "gender": "MALE",
                "buildId": 2
            },
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("data");
        });
    });
});

describe("Check character name", () => {
    it("Tests endpoint to return character data", () => {
        cy.request({
            method: "GET",
            url: `http://localhost:3001/api/v1/character/${charName}`,
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("data");
            expect(response.body.data.name).to.eq(`${charName}`);
            expect(response.body.data.gender).to.eq("MALE");
            expect(response.body.data.buildId).to.eq(2);
        });
    });
});
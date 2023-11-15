let token; //Used to pass a login token between tests

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

describe("Check API data types", () => {
    it("Adds new item with correct data types and checks return", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/items/create",
            body: {
                "name": "ValidItem",
                "type": "Test",
                "level": 1000,
                "rarity": "TestRarity",
                "buyCost": 200,
                "sellPrice": 100
            },
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            console.log(response);
            expect(response.status).to.eq(200);
            expect(response.body.data.name).to.eq("ValidItem");
            expect(response.body.data.name).to.be.a("string");
            expect(response.body.data.type).to.be.a("string");
            expect(response.body.data.level).to.be.a("number");
            expect(response.body.data.rarity).to.be.a("string");
            expect(response.body.data.buyCost).to.be.a("number");
            expect(response.body.data.sellPrice).to.be.a("number");
        });
    });
});
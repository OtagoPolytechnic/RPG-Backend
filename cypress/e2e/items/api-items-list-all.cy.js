//Test Item 4.1.11 /items
//Description: Displays all of the available items that a user can choose from

let token; //Used to pass a token between login and checking character name 

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

describe("Show items", () => {
    it("Gets all possible items available for characters", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3001/api/v1/items",
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("data");
            expect(response.body.data.length).to.be.at.least(4);
            expect(response.body.data[3].name).to.eq("Lightsaber");
            console.log(response);
        });
    });
});
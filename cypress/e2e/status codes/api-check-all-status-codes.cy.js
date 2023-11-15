let token; //Used to pass a token between login and checking character name 

describe("Get 200 code", () => {
    it("Registers to get code: 201", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/v1/auth/register",
        body: {
            username: "RegisterCodeTest",
            password: "Hello1234",
        },
      }).then((response) => {
            expect(response.status).to.eq(201);
      });
    });
});

describe("Get 200 code", () => {
    it("Logs in to get code: 200", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/auth/login",
            body: {
                username: "RegisterCodeTest",
                password: "Hello1234",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            token = response.body.token;
        });
    });
});
let token;
describe("Log in user", () => {
  let userId;
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
})

});

describe("character get", () => {
    // Fetches a character
    it("Fetches a character", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:3001/api/v1/character",
        body: {
          "name": "bob_test",
          "gender": "MALE",
          "buildId": 1
          },
          headers: {
            Authorization: `Bearer ${token}` // Set the Authorization header with the token
          }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
        expect(response.body.data[0].name).to.eq("bob_test");
        expect(response.body.data[0].gender).to.eq("MALE");
        expect(response.body.data[0].buildId).to.eq(1);
      });
    }); // END OF Fetches a character
  });
  
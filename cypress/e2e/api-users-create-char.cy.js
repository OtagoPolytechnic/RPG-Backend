describe("Log in user", () => {
  let userId;
  let token;
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

describe("character create", () => {
    // Creates a character
    it("Creates a character", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/v1/character/create",
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
        expect(response.body.data.name).to.eq("bob_test");

      });
    }); // END OF Creates a character
  });
  
});
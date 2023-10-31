//Test Item 4.1.02 /auth/login
//Description: Logs in as a previously created user and store the token

describe("Log in user", () => {
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
      expect(response.body.msg).to.eq("Freddy Testman successfully logged in");
      expect(response.body).to.have.property("token");
      token = response.body.token;
    });
  })
});
  
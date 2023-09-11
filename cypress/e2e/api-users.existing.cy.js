describe("existing users", () => {
  let userId;
  let token;

  // Checks that user "Freddy Testman" already exists
  it("Checks that user 'Freddy Testman' already exists", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/v1/auth/username",
      body: {
        username: "Freddy Testman",
        password: "Ft3st123",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body).to.have.property("msg", "User already exists");
    });
  });
});

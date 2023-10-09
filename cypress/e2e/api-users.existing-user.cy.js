describe("existing users", () => {
  let userId;
  let token;

  // Checks that user "Beetle Juice" already exists
  it("Checks that user 'Beetle Juice' already exists", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/v1/auth/username",
      body: {
        username: "Beetle Juice",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body).to.have.property("msg", "User already exists");
    });
  });
  // END OF Checks that user "Beetle Juice" already exists
});

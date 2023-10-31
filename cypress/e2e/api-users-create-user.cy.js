//Test Item 4.1.01 /auth/register

describe("user create", () => {
  // Registers a new user
  it("Registers a user", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/v1/auth/register",
      body: {
        username: "Freddy Testman",
        password: "Ft3st123",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("msg");
      expect(response.body.msg).to.eq("User successfully registered");
    });
  }); // END OF Registers a new user

  // Registers a second user to database
  it("Registers another user", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/v1/auth/register",
      body: {
        username: "Beetle Juice",
        password: "BeetlejuiceX3",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("msg");
      expect(response.body.msg).to.eq("User successfully registered");
    });
  });
  // END OF Registers a second user to database
});
  
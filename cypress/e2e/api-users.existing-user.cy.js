// THis test is to be edited in the future and as of right now there is no method to retrieve the user database.

describe("existing users", () => {
  let userId;
  let token;

  // Checks that user "Beetle Juice" already exists
  it("Checks that user 'Beetle Juice' already exists", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/v1/auth/register",
      body: {
        username: "Test_test",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body).to.have.property("msg", "User already exists");
    });
  });
  // END OF Checks that user "Beetle Juice" already exists
});

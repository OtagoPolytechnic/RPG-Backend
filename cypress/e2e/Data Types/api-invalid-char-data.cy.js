let token; //Used to pass a login token between tests

describe("Log in user", () => {
  it("BASIC_ROLE user login and get token", () => {
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

describe("Try create a character with Invalid Data", () => {
  // Creates a character
  it("Creates a character with buildID set to a string and username set to int", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/v1/character/create",
      body: {
        "name": 33,
        "gender": "MALE",
        "buildId": "fighter"
      },
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}` // Set the Authorization header with the token
      }
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.contain("Provided Float, expected Int.");
    });
  }); // END OF Creates a character
});
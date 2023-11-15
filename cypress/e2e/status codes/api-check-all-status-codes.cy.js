let token; //Used to pass a token between login and checking character name

describe("Get 201 code", () => {
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

describe("Get 400 code", () => {
  it("enter no data to get code: 400", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/v1/auth/register",
      body: {
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});

describe("Get 401 code", () => {
  it("log in to a non-existent user to get code: 401", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/v1/auth/login",
      body: {
        username: "IdontExist",
        password: "nonsense",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});

describe("Get 401 code", () => {
  it("use incorrect password to get code: 401", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/v1/auth/login",
      body: {
        username: "RegisterCodeTest",
        password: "nonsense",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});

describe("Get 409 code", () => {
  it("Tries to create a user that already exists to get code: 409", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/v1/auth/register",
      body: {
        username: "RegisterCodeTest",
        password: "Hello1234",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(409);
    });
  });
});

describe("Log in an ADMIN user", () => {
    it("SUPER_ADMIN user Login and get token", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/auth/login",
            body: {
                username: "admin",
                password: "test",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            token = response.body.token;
        });
    });
});

  

describe("Get 500 code", () => {
    it("Trys adding new item with incorrect data for strings to get code: 500", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/items/create",
            body: {
                "name": 100,
                "type": 200,
                "level": 5,
                "rarity": 100,
                "buyCost": 2,
                "sellPrice": 1
            },
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            expect(response.status).to.eq(500);
        });
    });
});


describe("Get 200 code", () => {
    it("Creates a character to get code: 200", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/v1/character/create",
        body: {
            name: "bob",
            gender: "MALE",
            stats: {
                "mana": 1,
                "attack": 6,
                "health": 6,
                "agility": 2,
                "defense": 4
            },
            buildId: 1,
            userId: 1, // Assign the user id to the character
            locationId: 1,
            currency: 100,
            XP: 0,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
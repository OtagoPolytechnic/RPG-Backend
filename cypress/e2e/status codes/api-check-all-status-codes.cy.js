let token; //Used to pass a token between login and checking character name

// Auth error checking

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
        // username: "",
        // password: "",
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

// Build error checking

describe("Get 200 code", () => {
    it("gets build to get code: 200", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3001/api/v1/builds/create",
            body: {
                "title": "Necromancer",
                "description": "The Necromancer class fights with an undead army and is adept at fighting in hellish conditions.",
                "stats" : {
                    "health": 5,
                    "attack": 1,
                    "defense": 9,
                    "mana": 8,
                    "agility": 1
                }
            },
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            console.log(response);
            expect(response.status).to.eq(200);
            expect(response.body.data.title).to.eq("Necromancer");
            expect(response.body.stats.heath).to.be.at.least(1).and.to.be.lessThan(50);
        });
    });
});
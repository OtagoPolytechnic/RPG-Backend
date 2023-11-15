//Test Item 4.1.04 /character
//Description: Logs in and creates two new characters. Test that these characters return from endpoint with correct datatypes
 
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
    });
});

describe("Create character", () => {
    it("Create 1st unique character for future endpoint test", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/character/create",
            body: {
                "name": "Shane",
                "gender": "MALE",
                "buildId": 3
            },
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("data");
        });
    });
});

describe("Create character", () => {
  it("Create 2nd unique character for future endpoint test", () => {
      cy.request({
          method: "POST",
          url: "http://localhost:3001/api/v1/character/create",
          body: {
              "name": "Susan",
              "gender": "FEMALE",
              "buildId": 1
          },
          headers: {
              Authorization: `Bearer ${token}` // Set the Authorization header with the token
          }
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("data");
      });
  });
});

describe("GET /characters", () => {
    // Fetches a character
    it("Fetches all user characters", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:3001/api/v1/character",
          headers: {
            Authorization: `Bearer ${token}` // Set the Authorization header with the token
          }
      }).then((response) => {
        console.log(response);
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data").and.be.an("array");
        if (response.body.data.length > 0) {
          const character = response.body.data[0];
          expect(character).to.have.property("name").and.be.a("string");
          expect(character).to.have.property("gender").and.be.a("string");
          expect(character).to.have.property("build").and.be.an("object");
        }
      });
    }); // END OF Fetches a character
  });
  
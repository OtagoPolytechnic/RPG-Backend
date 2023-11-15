let token; //Used to pass a login token between tests
let locationId; // Used to store the created location id

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

describe("Get all available locations", () => {
    // Test getting all locations
    it("Gets all locations", () => {
        cy.request({
        method: "GET",
        url: "http://localhost:3001/api/v1/location",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }).then((response) => {
            console.log("GET ALL:")
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.be.an("array");
            console.log(response.body.data[0].id)
            locationId = response.body.data[0].id;
            console.log(locationId);
            console.log("\n");
        });
    });
});

describe("Get Correct LocationID", () => {
    // Test getting a specific location
    it("Gets a specific location", () => {
        cy.request({
            method: "GET",
            url: `http://localhost:3001/api/v1/location/${locationId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("data");
            expect(response.body.data.name).to.eq("Tutorial Island.");
            expect(response.body.data.items).to.be.an("array");
        });
    });
});

//D: Location should not be returned as the data is null but it is returned. Issue with the API
describe("Get Incorrect LocationID", () => {
    // Test getting a specific location
    it("Gets a specific location", () => {
        cy.request({
            method: "GET",
            url: `http://localhost:3001/api/v1/location/${locationId+500}`,
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            switch (response.status){
                case 200:
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property("data");
                    
                    if (response.body.data == null){
                        console.log("Issue with backend route")
                    }
                    else{
                        console.log("location found")
                    }
                    console.log(response.body.data)
                    expect(response.body.data).to.eq(!null);
                    break;
                case 500:
                    expect(response.status).to.eq(500);
                    expect(response.body).to.have.property("data");
                    
                    if (response.body.data == null){
                        console.log("Backend acted correctly")
                    }
                    else{
                        console.log("Issue with backend on 500")
                    }
                    expect(response.body.data).to.eq(null);
                    break;
                default:
                    break;
            }
        });
    });
});
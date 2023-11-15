let token; //Used to pass a login token between tests

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
            expect(response.body).to.have.property("token");
            token = response.body.token;
        });
    });
});

describe("Check API data types", () => {
    it("Adds new item with correct data types and checks return", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/items/create",
            body: {
                "name": "ValidItem",
                "type": "Test",
                "level": 1000,
                "rarity": "TestRarity",
                "buyCost": 200,
                "sellPrice": 100
            },
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            console.log(response);
            expect(response.status).to.eq(200);
            expect(response.body.data.name).to.eq("ValidItem");
            expect(response.body.data.name).to.be.a("string");
            expect(response.body.data.type).to.be.a("string");
            expect(response.body.data.level).to.be.a("number");
            expect(response.body.data.rarity).to.be.a("string");
            expect(response.body.data.buyCost).to.be.a("number");
            expect(response.body.data.sellPrice).to.be.a("number");
        });
    });
});

describe("Invalid item data - All Strings", () => {
    it("Trys adding new item with incorrect data for integers (string) and checks for status response code", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3001/api/v1/items/create",
            body: {
                "name": "InvalidItem1",
                "type": "Test",
                "level": "1000",
                "rarity": "TestRarity",
                "buyCost": "200",
                "sellPrice": "100"
            },
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            //Create a JSON object for response unsuccessful checking
            let requestBody;
            if (typeof response.requestBody === 'string') {
                requestBody = JSON.parse(response.requestBody);
            } 
            else {
                requestBody = response.requestBody;
            }
            console.log(response.body.error);
            expect(response.body.error)//more code here
            //Check if the API has done any internal error checking to change data types
            switch (response.status){

                case 200://Check to see if strings convert to int in API
                    expect(response.status).to.eq(200);
                    expect(response.requestBody.name).to.eq("InvalidItem1");
                    expect(response.requestBody.level).to.be.a("number"); 
                    expect(response.requestBody.buyCost).to.be.a("number");
                    expect(response.requestBody.sellPrice).to.be.a("number"); 
                    break;

                case 500://Check to see if stayed as string
                    expect(response.status).to.eq(500);
                    if (response.requestBody) {
                        expect(requestBody.name).to.eq("InvalidItem1");
                        expect(requestBody.level).to.be.a("string"); 
                        expect(requestBody.buyCost).to.be.a("string");
                        expect(requestBody.sellPrice).to.be.a("string");
                        //console.log(response)
                    } 
                    else {
                        cy.log("Request body is undefined for status 500");
                    }
                    break;

                default:
                    break;
            }
        });
    });
});

describe("Invalid item data - All Integers", () => {
    it("Trys adding new item with incorrect data for strings (integers) and checks for status response code", () => {
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
            //Create a JSON object for response unsuccessful checking
            let requestBody;
            if (typeof response.requestBody === 'string') {
                requestBody = JSON.parse(response.requestBody);
            } 
            else {
                requestBody = response.requestBody;
            }

            //Check if the API has done any internal error checking to change data types
            switch (response.status){

                case 200://Check to see if non-strings convert in API
                    expect(response.status).to.eq(200);
                    expect(response.requestBody.name).to.eq("100");
                    expect(response.requestBody.name).to.be.a("string");
                    expect(response.requestBody.type).to.be.a("string"); 
                    expect(response.requestBody.rarity).to.be.a("string");
                    break;

                case 500://Check to see if stayed as int
                    expect(response.status).to.eq(500);
                    if (response.requestBody) {
                        expect(requestBody.name).to.eq(100);
                        expect(requestBody.name).to.be.a("number"); 
                        expect(requestBody.type).to.be.a("number");
                        expect(requestBody.rarity).to.be.a("number");
                    } 
                    else {
                        cy.log("Request body is undefined for status 500");
                    }
                    break;

                default:
                    break;
            }
        });
    });
});
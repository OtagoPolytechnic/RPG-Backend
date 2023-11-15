//Test Item 4.1.10 /builds/create
//Description: Logs in as a basic user trys to create build (invalid). Then logs in as ADMIN and creates a build successfully

//NOTE: THIS TEST DOES NOT CURRENTLY WORK AS THE CODE FOR CREATING BUILDS IS NOT PRESENT (GET /builds/create)

let token; //Used to pass a token between login and checking character name 

describe("Log in BASIC user", () => {
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

describe("Invalid build create", () => {
    it("Try add a new build as BASIC user role", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3001/api/v1/builds/create",
            body: {
                title: "Necromancer",
                description: "The Necromancer class fights with an undead army and is adept at fighting in hellish conditions.",
                stats : {
                    health: 5,
                    attack: 1,
                    defense: 9,
                    mana: 8,
                    agility: 1
                }
            },
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            console.log(response);
            expect(response.status).to.eq(401);
            expect(response.body.error).to.eq("You are not authorized to create an item");
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
            expect(response.body).to.have.property("token");
            token = response.body.token;
        });
    });
});

describe("Valid build create", () => {
    it("Try add item as SUPER_ADMIN user role", () => {
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
//Test Item 4.1.09 /builds
//Description: Displays all of the available builds that a user can choose from

let token; //Used to pass a token between login and checking character name 

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

describe("Show Builds", () => {
    it("Get all builds available for characters", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3001/api/v1/builds",
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header with the token
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("data");
            if (response.body.data.length > 0) {
                let build1 = response.body.data[0];
                let build2 = response.body.data[1];
                let build3 = response.body.data[2];
                expect(build1.title).to.eq("Fighter");
                expect(build1.description).to.eq("The Fighter class is a skilled and fearless warrior, specializing in close combat and protecting allies with their strength and martial abilities.");
                expect(build1.id).to.eq(1);
                expect(build2.title).to.eq("Ranged");
                expect(build2.description).to.eq("The Ranger class is a skilled archer and tracker, adept at ranged combat and nature-based abilities.");
                expect(build2.id).to.eq(2);
                expect(build3.title).to.eq("Mage");
                expect(build3.description).to.eq("The Mage is a spellcasting character specializing in arcane magic, wielding a diverse range of spells for offense, defense, and utility, while relying on their profound magical knowledge and often foregoing physical prowess.");
                expect(build3.id).to.eq(3);
              }
        });
    });
});

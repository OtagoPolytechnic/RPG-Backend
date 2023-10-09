describe("character create", () => {
    // Creates a character
    it("Creates a character", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/v1/character/create",
        body: {
          "name": "bob_test",
          "gender": "MALE",
          "buildId": 1
          },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("msg");
        expect(response.body.msg).to.eq("Character successfully created");
      });
    }); // END OF Creates a character
  });
  
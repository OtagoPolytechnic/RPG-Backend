describe("character get", () => {
    // Fetches a character
    it("Fetches a character", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:3001/api/v1/character",
        body: {
          "name": "bob_test",
          "gender": "MALE",
          "buildId": 1
          },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("msg");
        expect(response.body.msg).to.eq("Character retrieved");
      });
    }); // END OF Fetches a character
  });
  
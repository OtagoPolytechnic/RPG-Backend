describe("Auth testing", () => {
  let userId;
  let token;

  // Registers a new user
  it("Registers a user", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/v1/auth/register",
      body: {
        // username: 'Freddy Testman',
        // password: 'Ft3st123'
        username: "Beetle Juice",
        password: "BeetlejuiceX3"
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("msg");
      expect(response.body.msg).to.eq("User successfully registered");
    });
  });
  // END OF Registers a new user

  // // Registers a second user to database
  // it("Registers another user", () => {
  //     cy.request({
  //         method: 'POST',
  //         url: 'http://localhost:3001/api/v1/auth/register',
  //         body: {
  //             username: 'Beetle Juice',
  //             password: 'BeetlejuiceX3'
  //         }
  //     }).then((response) => {
  //         expect(response.status).to.eq(201);
  //         expect(response.body).to.have.property('msg');
  //         expect(response.body.msg).to.eq('User successfully registered');
  //     })
  // })
  // // END OF Registers a second user to database

  // // Checks that user already exists
  // it("Checks that user already exists", () => {
  //     cy.request({
  //         method: 'POST',
  //         url: 'http://localhost:3001/api/v1/auth/register',
  //         body: {
  //             username: 'Freddy Testman',
  //             password: 'Ft3st123'
  //         },
  //         failOnStatusCode: false,
  //     }).then((response) => {
  //         expect(response.status).to.eq(409);
  //         expect(response.body).to.have.property("msg", "User already exists");
  //     })
  // })
  // // END OF Checks that user already exists

  // // Deletes a user
  // it("Deletes a user", () => {

  //     cy.request({
  //         method: "DELETE",
  //         url: `http://localhost:3001/api/v1/users/${userId}`,
  //         headers: {
  //             Authorization: `Bearer ${token}`,
  //         },
  //     }).then((response) => {
  //         expect(response.status).to.eq(200);
  //     });
  // })
  // // END OF Deletes a user
});

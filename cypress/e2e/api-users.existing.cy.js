
describe("existing users", () => {
  let userId;
  let token;

  // Checks that user "Freddy Testman" already exists
  it("Checks that user 'Freddy Testman' already exists", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/v1/auth/register",
      body: {
        username: "Freddy Testman",
        // password: 'Ft3st123'
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body).to.have.property("msg", "User already exists");
    });
  });
  // END OF Checks that user already exists

  // // Gets all users in the database
  // it("Gets all users in the database", () => {
  //   cy.request({
  //     method: "GET",
  //     url: "http://localhost:3001/api/v1/users",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body).to.have.property("data");
  //     const users = response.body.data;
  //     userId = users[0].id;
  //   });
  });
  // END OF Gets all users in the database

  // // Retrieve users in database
  //   it("Gets all seeded users in the database", () => {
  //     cy.request({
  //         method: "GET",
  //         url: "http://localhost:3001/api/v1/auth/register",
  //         headers: {
  //             Authorization: `Bearer ${token}`,
  //         },
  //     }).then(
  //         (response) => {
  //             expect(response.status).to.eq(200);
  //             expect(response.body).to.have.property("data");
  //             const userData = response.body.data;
  //             // expect users data to contain names of seeded users
  //             const names = ["Beetle Juice", "Freddy Testman"];
  //             expect(userData).to.be.an("array");
  //             expect(userData.map(user => user.name)).to.include.members(names);
  //         }
  //     );
  // })// END OF Retrieve users in database

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
// });

// describe("user delete", () => {
//     let userId;
//     let token;
  
//     // Registers a new user
//     it("Registers a user to delete", () => {
//       cy.request({
//         method: "POST",
//         url: "http://localhost:3001/api/v1/auth/register",
//         body: {
//           username: "Delete this user",
//           password: "D3l3t3",
//         },
//       }).then((response) => {
//         expect(response.status).to.eq(201);
//         expect(response.body).to.have.property("msg");
//         expect(response.body.msg).to.eq("User successfully registered");
//       });
//     }); // END OF Registers a new user
// });S
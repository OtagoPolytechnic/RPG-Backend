describe('Auth testing', () => {
  it("Admin user Login and get token", () => {
    cy.request({
        method: "POST",
        url: "http://localhost:3001/api/v1/auth/login",
        body: {
            email: "Testman@gmail.com",
            password: "P@ssw0rd"
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
        token = response.body.token;
    });
})
})
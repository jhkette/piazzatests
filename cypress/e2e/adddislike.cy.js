const finalURL = `http://localhost:3000/piazza/posts/655b4fb2f82ee941ee1dd9e9/dislike`;

/*This test only works once - as you can only dislike something once per user */
describe("Piazza dislke test", () => {
  // here i save the url as an alias @google
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: finalURL,
      headers: {
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWI0ZjViZjgyZWU5NDFlZTFkZDlkZCIsImlhdCI6MTcwMDc0MzY5MiwiZXhwIjoxNzAxMDAyODkyfQ.J88jj3NqZVYC_HhJ6BZI7cOuVubd8kDakvs9dGJAOPg",
      },
    }).as("piazza");
  });
  // check for 200 status and data returned
  it("dislike returns correct data", () => {
    cy.get("@piazza").then((response) => {
      expect(response.body).to.have.property("dislike");
      expect(response.body).to.have.property("post");

      cy.log(response.body);
    });
  });
});

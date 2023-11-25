const TOKEN = Cypress.env('TOKEN') 
const finalURL = `34.42.98.72/piazza/posts/6560af604e75e77b4e44cc32/dislike`;

/*This test only works when user has already disliked the post */
describe("Piazza dislke test", () => {
  // here i save the url as an alias @google
  beforeEach(() => {
    cy.request({ // define the request
      method: "POST",
      url: finalURL,
      headers: {
        authtoken: TOKEN
	  }
    }).as("piazza");
  });
  // check for 200 status and data returned
  it("dislike returns correct data", () => { // check for correct data returned
    cy.get("@piazza").then((response) => {
		expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message"); // we should recieve a message as this user has already liked this post
    });
  });
});

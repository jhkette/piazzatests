const TOKEN = Cypress.env('TOKEN') 
const finalURL = `34.42.98.72/piazza/posts`;
describe('Piazza login test', () => {

	beforeEach(() => { // set up a post request on for a new post
        cy.request({
			method: 'POST',
			url: finalURL,
            headers: {
            authtoken: TOKEN
            },
            body: {
                "title": "test",
                "message": "just another test",
                "topic": "health"
            },
		}).as('piazza');
	});
	// check for 201 status and data returned
	it('returns posts with appropriate data', () => {
		cy.get('@piazza').then((response) => {
            cy.log(response)
			expect(response.status).to.eq(201);
            expect(response.body.postToSave.title).to.equal("test")
            expect(response.body.postToSave.message).to.equal("just another test")
            cy.log(response.body)
		});
	});
})
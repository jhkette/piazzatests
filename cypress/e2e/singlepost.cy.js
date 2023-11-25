const TOKEN = Cypress.env('TOKEN') 

const finalURL = `34.42.98.72/piazza/posts/6560af604e75e77b4e44cc32`;



describe('Get single post', () => {
	
	beforeEach(() => { // set up single post GET request
        cy.request({
			method: 'GET',
			url: finalURL,

			headers: {
				authtoken: TOKEN
			},
		}).as('piazza');
	});
	// check for 200 status and data returned
	it('returns posts with appropriate data', () => {
		cy.get('@piazza').then((response) => {
			expect(response.status).to.eq(200);
            cy.log(response.body)
            expect(response.body.post).to.have.property("topic")
            expect(response.body.post).to.have.property("title")     
		});
	});
});


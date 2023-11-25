const TOKEN = Cypress.env('TOKEN') 
const finalURL = `34.42.98.72/piazza/posts/topic/tech/expired`;



describe('GET  piazza posts by topic', () => {
	
	beforeEach(() => {  // set up getting all posts GET  request
        cy.request({
			method: 'GET',
			url: finalURL,

			headers: {
				authtoken: TOKEN,
			},
		}).as('piazza');
	});
	// check for 200 status and accurate data returned
	it('returns posts with appropriate data', () => {
		cy.get('@piazza').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.length).to.be.greaterThan(1); // should be more than one post
			assert.isArray(response.body[0].likes, 'Like values is an array')
			assert.isArray(response.body[0].dislikes, 'disLike values is an array')
			expect(response.body[0]).to.have.property("title")
			expect(response.body[0]).to.have.property("message")
		});
	});
});


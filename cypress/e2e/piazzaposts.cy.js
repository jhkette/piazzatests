const TOKEN = Cypress.env('TOKEN') 
const finalURL = `http://localhost:3000/piazza/posts`;

// https://docs.cypress.io/guides/core-concepts/variables-and-aliases

describe('Google calender api test', () => {
	// here i save the url as an alias @google
	beforeEach(() => {
        cy.request({
			method: 'GET',
			url: finalURL,

			headers: {
				authtoken: TOKEN,
			},
		}).as('piazza');
	});
	// check for 200 status and data returned
	it('returns posts with appropriate data', () => {
		cy.get('@piazza').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.length).to.be.greaterThan(1);
			assert.isString(response.body[0].message, 'Message is a string')
			assert.isArray(response.body[0].likes, 'Like values is an array')
			assert.isArray(response.body[0].dislikes, 'Like values is an array')
            
		});
	});
});


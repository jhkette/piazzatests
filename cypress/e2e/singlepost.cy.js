
const finalURL = `http://localhost:3000/piazza/posts/655b4fb2f82ee941ee1dd9e9`;

// https://docs.cypress.io/guides/core-concepts/variables-and-aliases

describe('Google calender api test', () => {
	// here i save the url as an alias @google
	beforeEach(() => {
        cy.request({
			method: 'GET',
			url: finalURL,

			headers: {
				authtoken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWY0YWMyMzU1MjYzNGQ4NGQwN2NkZSIsImlhdCI6MTcwMDc1NDAzMCwiZXhwIjoxNzExMTIyMDMwfQ.dhIzHTKLvJLH2wMipdlcYqamLmockgvbVbp0axMqMd4`
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


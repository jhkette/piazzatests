const finalURL = `http://localhost:3000/piazza/posts/`;
describe('Piazza login test', () => {
	// here i save the url as an alias @google
	beforeEach(() => {
        cy.request({
			method: 'POST',
			url: finalURL,
            headers: {
            authtoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWY0YWMyMzU1MjYzNGQ4NGQwN2NkZSIsImlhdCI6MTcwMDc1NDAzMCwiZXhwIjoxNzExMTIyMDMwfQ.dhIzHTKLvJLH2wMipdlcYqamLmockgvbVbp0axMqMd4",
            },
            body: {
                "title": "test",
                "message": "just another test",
                "topic": "health"
            },
		}).as('piazza');
	});
	// check for 200 status and data returned
	it('returns posts with appropriate data', () => {
		cy.get('@piazza').then((response) => {
			expect(response.status).to.eq(201);
            expect(response.body.title).to.equal("test")
            expect(response.body.message).to.equal("just another test")
            // expect(response.body).to.have.property("authtoken")
            // expect(response.body).to.have.property("refreshtoken")
            // expect(response.body.expires).to.equal("72h")
	
            cy.log(response.body)
		});
	});
})
const TOKEN = Cypress.env('TOKEN') 

const finalURL = `http://localhost:3000/piazza/posts/655b4fb2f82ee941ee1dd9e9/comment`;
describe('Piazza login test', () => {
	beforeEach(() => {
        cy.request({ // define request for comment
            method: 'POST',
            url: finalURL,
            body: {
                "text": "test",
            },
            headers: {
            authtoken: TOKEN
            },
           
		}).as('piazza');
	});
	// check for 200 status and data returned
	it('returns posts with appropriate data', () => {
		cy.get('@piazza').then((response) => {
			
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("text")
            expect(response.body).to.have.property("userId")
            expect(response.body).to.have.property("postId")
		});
	});
})
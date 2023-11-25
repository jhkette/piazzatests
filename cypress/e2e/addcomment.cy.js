const TOKEN = Cypress.env('TOKEN') 

const finalURL = `34.42.98.72/piazza/posts/6560af604e75e77b4e44cc32/comment`;
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
	// check for 200 status hard to check for data as you can only like once
	it('returns posts with appropriate data', () => {
		cy.get('@piazza').then((response) => {
			
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("msg"); // we should recieve a message as this is expired post
            
		});
	});
})
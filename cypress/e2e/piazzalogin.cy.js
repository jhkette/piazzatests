const TOKEN = Cypress.env('TOKEN') 
const finalURL = `http://localhost:3000/piazza/user/login`;
describe('Piazza login test', () => {
	// here i save the url as an alias @google
	beforeEach(() => {
        cy.request({
			method: 'POST',
			url: finalURL,

			body: {
                "email": "joeketterer@bbk.com",
                "password": "Hell0joe"
            },
		}).as('piazza');
	});
	
	it('logsi and returns data', () => {
		cy.get('@piazza').then((response) => {
			expect(response.status).to.eq(200);
            expect(response.body).to.have.property("authtoken")
            expect(response.body).to.have.property("refreshtoken")
            expect(response.body.expires).to.equal("120d")
		});
	});
})

describe('Piazza login test for login error', () => {
	// here i save the url as an alias @google
	beforeEach(() => {
        cy.request({
			method: 'POST',
			url: finalURL,
            failOnStatusCode: false,
			body: {
                "email": "joeketterer@hotmail.com",
                "password": "Gue55wh0sadsad"
            },
		}).as('piazza');
	});
	// check for 200 status and data returned
	it('returns posts with appropriate data', () => {
		cy.get('@piazza').then((response) => {
			expect(response.status).to.eq(401);
             expect(response.body).to.have.property("message")
		});
	});
})
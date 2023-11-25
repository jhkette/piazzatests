const TOKEN = Cypress.env('TOKEN') 
const finalURL = `34.42.98.72/piazza/user/login`;
describe('Piazza login test', () => {
	
	beforeEach(() => { // here i set up a login request
        cy.request({
			method: 'POST',
			url: finalURL,

			body: {
                "email": "joeketterer@bbk.com",
                "password": "Hell0joe"
            },
		}).as('piazza');
	});
	// check for 200 status and data returned
	it('logsin and returns data', () => {
		cy.get('@piazza').then((response) => {
			expect(response.status).to.eq(200);
            expect(response.body).to.have.property("authtoken")
            expect(response.body).to.have.property("refreshtoken")
            expect(response.body.expires).to.equal("120d")
		});
	});
})

describe('Piazza login test for login error', () => {
	
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
	// check for 401 status and data returned (login should fail)
	it('returns data for failed login', () => {
		cy.get('@piazza').then((response) => {
			expect(response.status).to.eq(401);
             expect(response.body).to.have.property("message")
		});
	});
})
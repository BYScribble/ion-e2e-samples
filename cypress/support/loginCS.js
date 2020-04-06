// This code snippet prevent noisy exception on NON LOCAL environment
Cypress.on('uncaught:exception', (err) => {
    // returning false here prevents Cypress from
    // failing the test

    // New Relic issue
    if (err.message &&
        (
            err.message.startsWith('Cannot set property \'status\' of undefined') || // Chrome
            err.message.includes('t.params is undefined'))// Firefox
        ) {
            return false;
        }
    return true;
});

before(function () {
    // Cypress very rare can persist cookies when you re-run test manually
    cy.clearCookie('ASP.NET_SessionId');
    cy.clearCookie('LiveBallAuth');

    cy.visit(Cypress.env('ROOT_URL'));

    // Hide accept cookie banner
    const acceptCookieBanner = cy.get('.notification-banner .notification-banner-dismiss.notification-banner__button');

    if (acceptCookieBanner) {
        acceptCookieBanner.click()
    }
    // Log in Studio
    cy.get('#loginUsername').type(Cypress.env('USER_LOGIN'));
    cy.get('#loginPassword').type(Cypress.env('USER_PASSWORD'));
    cy.get('#loginSubmit').click();
});

beforeEach(function () {
    // Do not clear auth cookies
    Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'LiveBallAuth');
});

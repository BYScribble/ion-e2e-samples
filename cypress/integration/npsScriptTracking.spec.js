import {adminPages} from '../configs/pages';

// Aliases
const _ = Cypress._;
const $ = Cypress.$;

describe('NPS Script Tracking should exist on all Admin Pages', function () {
    adminPages.forEach(pageUrl => {
        it(pageUrl, function () {
            cy.visit(pageUrl);
            cy.window().then(window => {
                expect('HubSpotConversations' in window).to.be.true;
                expect(typeof window.HubSpotConversations).to.equal('object');
                expect(typeof window.HubSpotConversations.widget).to.equal('object');
            })

        })
    })
});

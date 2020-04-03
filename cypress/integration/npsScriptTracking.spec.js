import {adminPages} from '../configs/pages';

// Aliases
const _ = Cypress._;
const $ = Cypress.$;

// const links = new Set([...adminPages]);

describe('NPS Script Tracking should exist on all Admin Pages', function () {
    [...new Set(adminPages)].sort().forEach(pageUrl => {
        it(pageUrl, function () {
            cy.visit(pageUrl);

            // $('a')
            //     .filter(function () {
            //         return this.href.indexOf(Cypress.config().baseUrl) > -1 && this.href.indexOf('admin') > -1;
            //     })
            //     .each(function () {
            //         links.add(this.href.replace(Cypress.config().baseUrl, ''))
            //     });


            cy.window().then(window => {
                expect('HubSpotConversations' in window).to.be.true;
                expect(typeof window.HubSpotConversations).to.equal('object');
                expect(typeof window.HubSpotConversations.widget).to.equal('object');
            })

        })
    })
});

// after(function () {
//    console.log(links);
// });

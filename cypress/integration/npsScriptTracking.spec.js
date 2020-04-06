import {adminPages} from '../configs/pages';

// Aliases
const _ = Cypress._;
const $ = Cypress.$;

// const links = new Set([...adminPages]);

const filterPages = (pageUrl) => {
    return pageUrl.indexOf('logout') === -1 // Do not visit logout page
        && pageUrl.indexOf('previewpath') === -1; // preview path request login
};

const pagesToTest = [...new Set(adminPages)].filter(filterPages).sort();

describe('NPS Script Tracking should exist on all Admin Pages', function () {
    pagesToTest
        .forEach(pageUrl => {
                it(pageUrl, function () {
                    cy.visit(pageUrl);

                    // Links aggregation
                    // $('a')
                    //     .filter(function () {
                    //         return this.href.indexOf(Cypress.config().baseUrl) > -1 && (
                    //             this.href.indexOf('admin') > -1 || this.href.indexOf('Admin')
                    //         )
                    //     })
                    //     .each(function () {
                    //
                    //         let normalizedHref =  this.href
                    //             .replace(Cypress.config().baseUrl, '')
                    //             .replace('/admin/', '/Admin/');
                    //
                    //         if (_.last(normalizedHref) === '#') {
                    //             normalizedHref = normalizedHref.slice(0, -1); // Remove last '#'
                    //         }
                    //
                    //         const hrefArr = normalizedHref.split('?');
                    //
                    //         if (hrefArr.length === 2) {
                    //             hrefArr[0] = hrefArr[0].toLowerCase();
                    //
                    //             normalizedHref = hrefArr.join('?');
                    //         }
                    //
                    //
                    //         links.add(normalizedHref);
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
//    console.log(_.difference(pagesToTest, [...links]));
// });

// https://docs.newrelic.com/docs/browser/new-relic-browser/getting-started/compatibility-requirements-new-relic-browser#frameworks
// https://github.com/bahmutov/stop-script/blob/master/cypress/integration/spec.js


// Issue still exist should patch server for compatibility with new relic
export const removeNewRelicScript = (win) => {
    console.log({ win })
    win.querySelectorAll('script')
        .forEach(function (node) {
            if (node.src.includes('newrelic')) {
                node.remove();
            }// === 'https://js-agent.newrelic.com/nr-1167.min.js'
        });
};

export const visitOptions = {
    onBeforeLoad(win) {
        const original = win.document.head.appendChild;
        cy.stub(win.document.head, 'appendChild').callsFake(child => {
            if (child.type === 'text/javascript') {
                console.log(child.innerHTML);
            }

            if (
                child.type === 'text/javascript' &&
                (
                    child.innerHTML.includes('NREUM') ||
                    child.innerHTML.includes('relic') ||
                    child.innerHTML.includes('nr-data')
                )
            ) {
                // do not include this script
                return
            }
            original(child)
        })
    }
}

/// <reference types="Cypress" />

describe('Traffic By API Dashboard Automation', ()=>{

    const apiURL = "https://prometheus.axp.com/api/v1/query?query=sum by (api_name) (rate(axp_gw_request_total{application_name=~'.*', api_name=~'.*', job='kubernetes-pods',api_version=~'.*'}[60s]))";

    beforeEach(() =>{
        cy.request({
            method: 'GET',
            url: apiURL
        }).then((trafficRes) =>{
            cy.wrap(trafficRes).as('apiResponse');
        })
    })

    it('Status code validation in Traffic By API Dashboard', ()=>{
        cy.get('@apiResponse').should((response) =>{
            expect(response.status).to.eq(200);
        })
    });

    it('Array length validation in Traffic By API Dashboard', () =>{
        cy.get('@apiResponse').then((response) =>{
            const values = response.body.data.result[0].value;
            cy.wrap(values).should('have.length.greaterThan', 0);
        })
    });

    it('Array element values validation in Traffic By API Dashboard', () =>{
        cy.get('@apiResponse').then((response) => {
            const results = response.body.data.result;
        
            results.forEach((result) => {
              const values = result.value;
        
              values.forEach((value) => {
                // Convert the value to a number (assuming it's a string)
                const numericValue = parseFloat(value);

                expect(numericValue).to.be.gte(0);
              });
            });
        });       
    });
})
/// <reference types="Cypress" />


describe('JVM Load Classes Dashboard Automation', ()=>{

    const apiURL = "https://prometheus.axp.com/api/v1/query?query=sum(jvm_classes_loaded_total{job=~'.*'})";

    beforeEach(() =>{
        cy.request({
            method: 'GET',
            url: apiURL
        }).then((promRes) =>{
            cy.wrap(promRes).as('apiResponse')
        })
    })

    it('Status Code validation in JVM Load Classes Dashboard', () =>{
        /* cy.get('@apiResponse').then((response) => {
            expect(response.status).to.equal(200);
        }); */
        cy.validateStatusCode();
    });

    it('Array length validation in JVM Load Classes Dashboard', () =>{
        cy.get('@apiResponse').then((response) =>{
            const values = response.body.data.result[0].value;
            cy.wrap(values).should('have.length.greaterThan', 0);
        })
    });

    it('Array element value validation in JVM Load Classes Dashboard', () =>{
        cy.get('@apiResponse').then((response) =>{
            const values = response.body.data.result[0].value;
            // Assuming the integer value is at index 1 in the 'value' array
            const integerValue = parseFloat(values[1]);
            cy.wrap(integerValue).should('be.gt', 0);
        })            
    });
})
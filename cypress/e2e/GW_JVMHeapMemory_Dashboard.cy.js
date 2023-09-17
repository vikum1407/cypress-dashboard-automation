/// <reference types="Cypress" />

describe('JVM Heap Memory Dashboard Automation', ()=>{

    const apiURL = "https://prometheus.axp.com/api/v1/query?query=sum(jvm_memory_bytes_max{area='heap', job=~'.*'})";

    beforeEach(() =>{
        cy.request({
            method: 'GET',
            url: apiURL
        }).then((headRes) =>{
            cy.wrap(headRes).as('apiResponse')
        })
    })

    it('Status Code validation in JVM Heap Memory Dashboard',()=>{
        cy.get('@apiResponse').then((response) =>{
            expect(response.status).to.equal(200);
        })
    });

    it('Array length validation in JVM Heap Memory Dashboard', () =>{
        cy.get('@apiResponse').then((response) =>{
            const values = response.body.data.result[0].value;
            cy.wrap(values).should('have.length.greaterThan', 0);
        })
    });

    it('Array element value validation in JVM Heap Memory Dashboard', () =>{
        cy.get('@apiResponse').then((response) =>{
            const values = response.body.data.result[0].value;
            // Assuming the integer value is at index 1 in the 'value' array
            const integerValue = parseFloat(values[1]);
            cy.wrap(integerValue).should('be.gt', 0);
        })            
    });
})
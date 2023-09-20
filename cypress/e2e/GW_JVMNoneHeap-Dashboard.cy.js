/// <reference types="Cypress" />

describe('JVM None Heap Dashboard Automation', () =>{

    const apiURL = "https://prometheus.axp.com/api/v1/query?query=sum(jvm_memory_bytes_max{area='nonheap', job=~'gateway-jvm'})";

    beforeEach(() =>{
        cy.request({
            method: 'GET',
            url: apiURL
        }).then((heapRes) =>{
            cy.wrap(heapRes).as('apiResponse');
        })
    });

    it('Status Code validation in JVM None Heap Dashboard', () =>{
        cy.get('@apiResponse').should((response) =>{
            expect(response.status).to.eq(200);
        })
    });

    it('Array length validation in JVM None Heap Dashboard', ()=>{
        cy.get('@apiResponse').should((response) =>{
            const values = response.body.data.result[0].value;
            expect(values).to.have.length.gt(0);
        })
    })

    it('Array element value validation in JVM Live Thread Dashboard', () =>{
        cy.get('@apiResponse').then((response) =>{
            const values = response.body.data.result[0].value;
            // Assuming the integer value is at index 1 in the 'value' array
            const integerValue = parseFloat(values[1]);
            cy.wrap(integerValue).should('be.gt', 0);
        })            
    });
})
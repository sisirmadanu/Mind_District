import {logIN} from "../support/neededFun";

describe("As a user I add a self-help module from Catalogue", () => {
    const searchTerm = "Self-Help";
    const moduleTitle ="Self-help: Build your self-esteem";
    const moduleLabel = "training";

    beforeEach(() => {
        logIN();
    })

    it("When User navigates to Catalogue and adds a module by using search field ", () => {
        cy.get('[class*="header"]',{timeout:20000}).eq(9).should('exist').click({force:true})                              //User clicks on Module from Header
        cy.get('[id="catalogue-searchform"]',{timeout:20000}).find('input[type="text"]').type(searchTerm).wait(3000) //User types in search field
        cy.get('[class="catalogue-card"]>:nth-child(2)>:nth-child(1)>:nth-child(1)',{timeout:20000}).should('exist').click({force:true}) //User clicks on the found item from the list
        cy.get('button[type="submit"]',{timeout:20000}).click({force:true}).wait(5000) //User clicks on start on the module    
    })

    it("Assert module is added to home screen ", () => {
        cy.visit('/')
        //cy.get('[class*="header"]',{timeout:20000}).eq(9).should('exist').click({force:true})                              //User clicks on Module from Header
        cy.get('[id="primary-tools"]>:nth-child(1)>:nth-child(1)').invoke("attr","title").then((invokedModuleTitle) =>{
            cy.log(invokedModuleTitle)
            expect(invokedModuleTitle).eq(moduleTitle)  
         })
    })

    it("Assert module in the catalogue is labled as TRAINING ", () => {
        cy.get('[class*="header"]',{timeout:20000}).eq(8).should('exist').click({force:true})  //User clicks on Module from Header
        cy.get('[id="catalogue-searchform"]',{timeout:20000}).find('input[type="text"]').type(searchTerm).wait(3000) //User types in search field
        cy.get('[class="catalogue-card"]>:nth-child(2)>:nth-child(1)>:nth-child(1)',{timeout:20000}).invoke('text').then((invokedTitle) =>{
            cy.log(invokedTitle)
            expect(invokedTitle).eq(moduleTitle)
        })
        cy.get('[class*="catalogue-card"]>:nth-child(4)>:nth-child(2)').invoke("text").then((invokedLabel) =>{
            cy.log(invokedLabel)
            const triminvokedLabel = invokedLabel.slice(30,-13)
            expect(triminvokedLabel).eq(moduleLabel)
        })
    })
})


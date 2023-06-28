import {logIN} from "../support/neededFun";
import "cypress-file-upload";

describe("As a user I add Diary from Catalogue", () => {
    const searchTerm = "diary";
    let date = new Date().toLocaleDateString();
    const diaryLabel = "Diary";
    var today = new Date() 
    const formSituation = "Completing the coding task for MindDistrict"
    const formPositive = "Challenging Task"
    const formThoughts = "Ideas to try something new"
    const formFeelings = "Exciting"
    var time = today.getHours() + ":" + today.getMinutes() +

    beforeEach(() => {
        logIN();
    })

    it("When User adds diary and fill in the data ", () => {
        cy.get('[class*="header"]',{timeout:20000}).eq(9).should('exist').click({force:true}) // User clicks on Catalogue from Header
        cy.get('[id="catalogue-searchform"]',{timeout:20000}).find('input[type="text"]').type(searchTerm).wait(3000) // User types 'Diary' in search field
        cy.get('[class="catalogue-card"]>:nth-child(2)>:nth-child(1)>:nth-child(1)',{timeout:20000}).should('exist').click({force:true}) // User clicks on the found item from the list
        cy.get('button[type="submit"]',{timeout:20000}).click({force:true}).wait(1000) // User clicks on start on the diary item   
        //------------- User Fills the data in the Diary------------//
        cy.get('[id="form.dt.date.repl"]').clear().type(date)   // User enters current date
        cy.get('[id="form.dt.time"]').clear().type(time) // User enters current time
        cy.get('[id="form.situation"]').type(formSituation) // User enters form situation field
        cy.get('[file-upload-select="file-upload-select"]').click({force:true}).wait(500) // User uploads profile image
        cy.get('[type="file"]')
            .attachFile({
            filePath: "images/Prime.jpeg",
            encoding: "binary",
            })
        cy.wait(500)
        cy.get('[class="btn btn-primary"]').eq(0).click({force:true}) // User clicks on crop      
        cy.get('[id="form.positive"]').type(formPositive) // User enters form positive field
        cy.get('[id="form.thoughts"]').type(formThoughts) // User enters form thoughts field
        cy.get('[id="form.feelings"]').type(formFeelings) // User enters form feelings field
        cy.get('[type="submit"]').click({force:true}) // User clicks on save
        })
        
    it("Assert Diary is added in the home page under modules ", () => {
        cy.get('[id="secondary-tools"]').find('[class="media-body"]>:nth-child(1)').invoke('text').then((invokedLabel)=> { // Invokes label 'Diary' from the item in home page
        cy.log(invokedLabel)
            const trimInvokedLabel = invokedLabel.slice(22,-9) // Trims the unwanted characters from the invoked text -> in this text /n/n and spaces are invoked
            expect(trimInvokedLabel).eq(diaryLabel) // Asserts the Trimmed invoked text and the hardcoded text are equal
        })
    })

})

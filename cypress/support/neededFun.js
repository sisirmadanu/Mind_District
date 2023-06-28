//import cypress from "cypress"

const username = Cypress.env("credentials")[0].username;
const password = Cypress.env("credentials")[0].password;

export const logIN = () => {
    cy.visit('/');    
    cy.get('[id="login"]', {timeout:20000}).type(username).wait(1000) // enters email
    cy.get('[id="password"]', {timeout:20000}).type(password).wait(1000) // enters password
    cy.get('[action="submit"]', {timeout:20000}).find('button[type="submit"]').click({force:true}).wait(5000) // clicks on Login button
}

    
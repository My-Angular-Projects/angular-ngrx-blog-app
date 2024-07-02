describe('Feed', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('BlogApp')
  })
})

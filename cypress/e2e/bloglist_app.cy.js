describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'hellas',
      password: '12345',
      name: 'Arto Hellas'
    })
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.get('h2').should('contain', 'log in to application')
    cy.get('form').should('exist')
    cy.get('input[name="username"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.get('button').should('contain', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="username"]').type('hellas')
      cy.get('input[name="password"]').type('12345')
      cy.get('button').click()
      cy.contains('Arto Hellas logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="username"]').type('wronguser')
      cy.get('input[name="password"]').type('1111111')
      cy.get('button').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input[name="username"]').type('hellas')
      cy.get('input[name="password"]').type('12345')
      cy.get('button').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('Test')
      cy.get('input[name="author"]').type('Test Test')
      cy.get('input[name="url"]').type('https://test.com')
      cy.get('#create-button').click()
      cy.contains('A new blog - Test by Test Test added!')
    })
  })


})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user1 = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: '12345'
    }

    const user2 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.request('POST', 'http://localhost:3003/api/users', user2)


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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input[name="username"]').type('hellas')
      cy.get('input[name="password"]').type('12345')
      cy.get('button').click()
    })

    it('A blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('Test')
      cy.get('input[name="author"]').type('Test Test')
      cy.get('input[name="url"]').type('https://test.com')
      cy.get('#create-button').click()
      cy.contains('A new blog - Test by Test Test added!')

      cy.get('#show_hide-button').click()

      cy.get('.title_author').contains('Test Test').parent().as('blogItem')

      cy.get('@blogItem').contains('like').click()

      cy.contains('Arto Hellas')
      cy.get('#delete-button')


      cy.get('@blogItem').contains('likes: 1')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input[name="username"]').type('hellas')
      cy.get('input[name="password"]').type('12345')
      cy.get('button').click()
    })

    it('A blog can be deleted', function () {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('Test')
      cy.get('input[name="author"]').type('Test Test')
      cy.get('input[name="url"]').type('https://test.com')
      cy.get('#create-button').click()

      cy.get('#show_hide-button').click()

      cy.get('.title_author').contains('Test Test').parent().as('blogItem')

      cy.get('@blogItem').contains('delete').click()

      cy.wait(5000);
      cy.contains('Test Test').should('not.exist');

    })

    it('A blog cannot be deleted by a user who is not the creator', function () {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('Test1')
      cy.get('input[name="author"]').type('Test Test1')
      cy.get('input[name="url"]').type('https://test1.com')
      cy.get('#create-button').click()
      cy.wait(5000);
      cy.contains('logout').click()

      cy.get('input[name="username"]').type('mluukkai')
      cy.get('input[name="password"]').type('salainen')
      cy.get('button').click()

      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('Test2')
      cy.get('input[name="author"]').type('Test Test2')
      cy.get('input[name="url"]').type('https://test2.com')
      cy.get('#create-button').click()

      cy.get('#show_hide-button').click()

      cy.get('.title_author').contains('Test Test1').parent().as('blogItem')

      cy.get('@blogItem').contains('delete').should('not.exist')
    })
  })

  describe('When logged in and add blogs', function () {
    beforeEach(function () {
      cy.get('input[name="username"]').type('hellas')
      cy.get('input[name="password"]').type('12345')
      cy.get('button').click()

      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('The title with the most likes')
      cy.get('input[name="author"]').type('Most Like')
      cy.get('input[name="url"]').type('https://like.com')
      cy.get('#create-button').click()


      cy.contains('new blog').click()
      cy.wait(2000);
      cy.get('input[name="title"]').type('The title with the second most likes')
      cy.get('input[name="author"]').type('Second Most')
      cy.get('input[name="url"]').type('https://like2.com')
      cy.get('#create-button').click()

      cy.wait(2000);
    })

    it('Blogs are ordered by likes', function () {
      cy.get('#show_hide-button').click()

      cy.get('.title_author').eq(0).should('contain', 'The title with the most likes').parent().as('firstBlog')
      cy.get('@firstBlog').find('.like-button').click()
      cy.wait(1000);
      cy.get('@firstBlog').find('.like-button').click()
      cy.wait(1000);
      cy.get('@firstBlog').find('.like-button').click()


      cy.wait(2000);

      cy.contains('show').click()

      cy.get('.title_author').eq(1).should('contain', 'The title with the second most likes').parent().as('secondBlog')
      cy.get('@secondBlog').find('.like-button').click()
      cy.wait(1000);
      cy.get('@secondBlog').find('.like-button').click()
      cy.wait(1000);

      cy.reload();
      cy.get('#show_hide-button').click()
      cy.contains('show').click()


      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')

      cy.get('.like-count').eq(0).then(($likes1) => {
        const likes1 = parseInt($likes1.text())
        cy.get('.like-count').eq(1).then(($likes2) => {
          const likes2 = parseInt($likes2.text())
          expect(likes1).to.be.greaterThan(likes2)
        })
      })
    })
  })
})
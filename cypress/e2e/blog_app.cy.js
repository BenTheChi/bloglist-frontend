/* global cy*/

describe('Blog app', function() {
	beforeEach(function() {
		const body = { username: 'testUser', name: 'testName', password: 'testPassword' }
		cy.request('POST', 'http://localhost:3001/api/reset')
		cy.request('POST', 'http://localhost:3001/api/users', body)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('username')
		cy.contains('password')
		cy.contains('login')
	})

	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			cy.contains('login').click()
			cy.get('#username').type('testUser')
			cy.get('#password').type('testPassword')
			cy.get('#login-button').click()
			cy.contains('testUser logged in')
		})

		it('fails with wrong credentials', function() {
			cy.contains('login').click()
			cy.get('#username').type('testUser')
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()
			cy.contains('Wrong credentials')
		})
	})

	describe('When logged in', function() {

		beforeEach(function(){
			cy.get('#username').type('testUser')
			cy.get('#password').type('testPassword')
			cy.get('#login-button').click()
		})

		it('A blog can be created', function() {
			cy.get('#new-blog').click()
			cy.get('.url').type('testUrl')
			cy.get('.author').type('testAuthor')
			cy.get('.title').type('testTitle')
			cy.get('.create').click()
			cy.contains('TITLE: testTitle AUTHOR: testAuthor')
		})

		it('A blog can be liked', function() {
			cy.get('#new-blog').click()
			cy.get('.url').type('testUrl')
			cy.get('.author').type('testAuthor')
			cy.get('.title').type('testTitle')
			cy.get('.create').click()
			cy.contains('TITLE: testTitle AUTHOR: testAuthor')

			cy.get('.detailsButton').click()
			cy.get('.likeButton').click()
			cy.contains('LIKES: 1')
		})

		it('A blog can be deleted', function() {
			cy.get('#new-blog').click()
			cy.get('.url').type('testUrl')
			cy.get('.author').type('testAuthor')
			cy.get('.title').type('testTitle')
			cy.get('.create').click()

			cy.get('#deleteButton').click()
			cy.contains('TITLE: testTitle AUTHOR: testAuthor').should('not.exist')
		})

		it('Blogs are listed by most likes descending ', function() {
			cy.get('#new-blog').click()

			cy.get('#title').type('testTitle')
			cy.get('#url').type('testUrl')
			cy.get('#author').type('testAuthor')
			cy.get('.create').click()

			cy.get('#title').type('testTitle2')
			cy.get('#url').type('testUrl2')
			cy.get('#author').type('testAuthor2')
			cy.get('.create').click()

			cy.get('#title').type('testTitle3')
			cy.get('#url').type('testUrl3')
			cy.get('#author').type('testAuthor3')
			cy.get('.create').click()

			cy.get('.detailsButton').eq(0).click()
			cy.get('.detailsButton').eq(1).click()
			cy.get('.detailsButton').eq(2).click()

			cy.get('.likeButton').eq(2).click()
			setTimeout(() => {}, 500)
			cy.get('.blog').eq(0).should('contain', 'testTitle3')

			cy.get('.likeButton').eq(0).click()
			setTimeout(() => {}, 500)

			cy.get('.likeButton').eq(2).click()
			setTimeout(() => {}, 500)
			cy.get('.blog').eq(1).should('contain', 'testTitle2')
		})
	})
})
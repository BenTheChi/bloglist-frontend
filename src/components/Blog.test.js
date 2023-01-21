import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
	let container
	const handleLike = jest.fn()
	const handleDelete = jest.fn()

	beforeEach(() => {
		const blog = {
			title: 'TestTitle',
			author: 'TestAuthor',
			url: 'TestUrl',
			likes: 1,
			key: 100
		}

		container = render(
			<Blog key={blog.id} title={blog.title} author={blog.author} likes={blog.likes} url={blog.url} handleLike={() => {handleLike(blog)}} handleDelete={() => {handleDelete(blog)}}/>
		).container
	})

	test('likes and url not shown by default, but author and title are', async () => {
		const title = container.querySelector('.title')
		expect(title).toBeDefined()
		const author = container.querySelector('.author')
		expect(author).toBeDefined()

		const detailsDiv = container.querySelector('.details')
		expect(detailsDiv).toHaveStyle('display: none;')
	})

	test('clicking the show button shows likes and url', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('SHOW')
		await user.click(button)

		const div = container.querySelector('.details')
		expect(div).not.toHaveStyle('display: none;')
	})

	test('clicking the like button twice makes it get called twice', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('LIKE')
		await user.click(button)
		await user.click(button)

		expect(handleLike.mock.calls).toHaveLength(2)
	})

})
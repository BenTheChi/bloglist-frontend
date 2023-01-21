import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {

	test('addBlog is called with title, author, and url', async () => {
		const addBlog = jest.fn()
		const user = userEvent.setup()

		let container = (render(<BlogForm addBlog={addBlog}/>)).container

		const title = container.querySelector('.title')
		const author = container.querySelector('.author')
		const url = container.querySelector('.url')
		const sendButton = container.querySelector('.create')

		await user.type(title, 'TestTitle')
		await user.type(author, 'TestAuthor')
		await user.type(url, 'TestUrl')

		await user.click(sendButton)

		expect(addBlog.mock.calls[0][0]).toBe('TestTitle')
		expect(addBlog.mock.calls[0][1]).toBe('TestAuthor')
		expect(addBlog.mock.calls[0][2]).toBe('TestUrl')
	})

})
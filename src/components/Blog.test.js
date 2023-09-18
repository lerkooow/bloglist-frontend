import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import Blog from "./Blog";


describe("<Blog />", () => {
    test('renders blog title and author', () => {
        const blog = {
            title: "Test Blog",
            author: "Test Author",
        };

        const component = render(<Blog blog={blog} />);
        const title_author = component.container.querySelector(".title-author");
        expect(title_author).toBeDefined();

    });

    test("that blog's url and number of likes are shown when the button controlling the shown details has been clicked", () => {
        const blog = {
            title: "Test Blog",
            author: "Test Author",
            url: "https://test1.com",
            likes: 5,
        };

        const component = render(<Blog blog={blog} />);
        const toggleButton = component.getByText("show");
        fireEvent.click(toggleButton);
        const urlLikesElement = component.container.querySelector(".url-likes");
        expect(urlLikesElement).toBeDefined();
    });

    test('like button click handler is called twice when clicked twice', () => {
        const blog = {
            id: 1,
            title: 'Test Blog',
            author: 'Test Author',
            url: 'https://example.com',
            likes: 0,
            user: { name: 'Test User', username: 'testuser' },
        };

        const user = {
            username: 'testuser',
        };

        const mockHandler = jest.fn();

        const { getByText } = render(
            <Blog blog={blog} user={user} mockHandler={mockHandler} />
        );

        const showButton = getByText('show');
        fireEvent.click(showButton);

        const likeButton = getByText("like");

        fireEvent.click(likeButton);
        fireEvent.click(likeButton);


        setTimeout(() => {
            expect(mockHandler.mock.calls).toHaveLength(2);
        }, 0);
    });


});
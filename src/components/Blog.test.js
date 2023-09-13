import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Blog from "./Blog";

test('renders blog title and author', () => {
    const blog = {
        title: 'Test Blog',
        author: 'Test Author',
    };

    const component = render(<Blog blog={blog} />);
    const title_author = component.container.querySelector(".title-author");
    expect(title_author).toBeDefined();

});



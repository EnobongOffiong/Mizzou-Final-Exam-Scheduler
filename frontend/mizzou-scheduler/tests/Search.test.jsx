import React from 'react';
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom/vitest";
import Search from '../src/components/Search';
import { BrowserRouter } from 'react-router-dom';


describe('Search', () => {
    it('should render the search page', () => {
        render( <BrowserRouter>
            <Search />
          </BrowserRouter>)

        expect(screen.getByText(/SEARCH BY COURSE|SEARCH BY MEETING TIME/i)).toBeInTheDocument()
        expect(screen.getByRole('button', {name: /ADD TO CALENDAR/i})).toBeInTheDocument()
        expect(screen.getByRole('link', {name: /view calendar/i})).toBeInTheDocument()
    })
})
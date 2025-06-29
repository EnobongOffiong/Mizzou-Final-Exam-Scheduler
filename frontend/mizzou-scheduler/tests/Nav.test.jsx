import React from 'react';
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom/vitest";
import Nav from '../src/components/Nav.jsx';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'

describe('group', () => {
   
    it('should render navigation links', async () => {
        render(
            <BrowserRouter>
                <Nav/>
            </BrowserRouter>
        )

        expect(screen.getByText(/Home/)).toBeInTheDocument();
        expect(screen.getByText(/Search/)).toBeInTheDocument()
        expect(screen.getByText(/Calendar/)).toBeInTheDocument()

       expect(screen.getByRole('img', {name: /Mizzou Logo/i})).toBeInTheDocument()
        
        
        const button = screen.getByRole('link', {name: /view exam schedules/i})
    
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('href', expect.stringContaining('registrar.missouri.edu'))

    })
})
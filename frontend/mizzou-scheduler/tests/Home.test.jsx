import React from 'react';
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom/vitest";
import Home from '../src/components/Home';
import Calendar from '../src/components/Calendar';

describe('Home', () => {
    it('should render the home page', () => {
        render(<Home/>);
       
         expect(screen.getByText(/Welcome to Mizzou Exam Scheduler!/)).toBeInTheDocument();
         expect(screen.getByText(/Find your exam date by searching with the course name or class time.Then, export it to your personal calendar with ease!/))
            .toBeInTheDocument()
         const button = screen.getByRole('link', {name: /GET STARTED/i})
         expect(button).toBeInTheDocument()

    });
});
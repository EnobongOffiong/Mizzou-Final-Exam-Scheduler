import React from 'react';
import {render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom/vitest";
import Calendar from '../src/components/Calendar';

describe('Calendar', () => {
    it('should render the default calendar page', async () => {
         render(<Calendar/>)

        expect(screen.getByText(/CALENDAR/i)).toBeInTheDocument()
        
    })
})
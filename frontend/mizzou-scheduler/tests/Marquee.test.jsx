import React from 'react';
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom/vitest";
import Marquee from '../src/components/Marquee';

describe('Marquee', () => {
    it('should render Marquee', () => {
        render(<Marquee/>)

        expect(screen.getByText("CONFIRM EXAM TIMES WITH YOUR PROFESSOR OR FROM SYLLABUS!!!")).toBeInTheDocument()
    })
})
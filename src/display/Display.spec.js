import React from 'react';
import Display from './Display';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(rtl.cleanup)

let wrapper;

beforeEach(()=>{
    wrapper = rtl.render(<Display />)
})

describe('Display Component', ()=>{
    it('Displays if gate is open/closed, locked/unlocked', ()=>{
        expect(wrapper.queryByText(/unlocked/i)).toBeInTheDocument();
        expect(wrapper.queryByText(/open/i)).toBeInTheDocument();
    })

    it('Displays closed when closed prop is true', ()=>{
        expect(wrapper.queryByText(/open/i)).toBeInTheDocument();
        let wrapper2 = rtl.render(<Display closed={true}/>)
        expect(wrapper2.queryByText(/closed/i)).toBeInTheDocument();
    })

    it('Displays locked when locked prop is true', ()=>{
        expect(wrapper.queryByText(/unlocked/i)).toBeInTheDocument();
        rtl.cleanup();
        let wrapper2 = rtl.render(<Display locked={true}/>)
        expect(wrapper2.queryByText(/locked/i)).toBeInTheDocument();
    })

    it('when locked or closed use the red-led class', ()=>{
        rtl.cleanup();
        let wrapper2 = rtl.render(<Display locked={true} closed={true}/>)
        let lockedDiv = wrapper2.getByText(/locked/i)
        let closedDiv = wrapper2.getByText(/closed/i)
        expect(lockedDiv.classList.contains('red-led')).toBe(true);
        expect(closedDiv.classList.contains('red-led')).toBe(true);
    })

    it('when unlocked or open use the green-led class', ()=>{
        let unlockedDiv = wrapper.getByText(/unlocked/i)
        let openDiv = wrapper.getByText(/open/i)
        expect(unlockedDiv.classList.contains('green-led')).toBe(true);
        expect(openDiv.classList.contains('green-led')).toBe(true);
    })
})
import React from 'react';
import Dashboard from './Dashboard';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(rtl.cleanup)

let wrapper, closeButton, lockButton;

beforeEach(()=>{
    wrapper = rtl.render(<Dashboard />);
    closeButton = wrapper.queryByText(/close gate/i);
    lockButton = wrapper.queryByText(/lock gate/i);
})

describe('Dashboard Component', ()=>{
    it('Shows controls and Display', ()=>{
        expect(wrapper.queryByText(/unlocked/i)).toBeInTheDocument();
        expect(wrapper.queryByText(/open/i)).toBeInTheDocument();
        expect(wrapper.queryByText(/close gate/i)).toBeInTheDocument();
        expect(wrapper.queryByText(/lock gate/i)).toBeInTheDocument();
    })

    it('Defaults to Unlocked and Open', ()=>{
        expect(wrapper.queryByText(/unlocked/i)).toBeInTheDocument();
        expect(wrapper.queryByText(/open/i)).toBeInTheDocument();
    })

    it('Cannot be closed or opened if locked', ()=>{
        rtl.fireEvent.click(closeButton)
        rtl.fireEvent.click(lockButton)
        expect(wrapper.queryByText(/locked/i)).toBeInTheDocument();
    })
})
import React from 'react';
import Dashboard from '../dashboard/Dashboard';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(rtl.cleanup)

let wrapper, closeButton, lockButton;

const toggleLocked = () => {
    return { locked: true };
  };

// const toggleClosed = () => {
//     this.setState(prev => ({ closed: !prev.closed }));
//   };

beforeEach(()=>{
    wrapper = rtl.render(<Dashboard />);
    closeButton = wrapper.queryByText(/close gate/i);
    lockButton = wrapper.queryByText(/lock gate/i);
})

describe('Controls Component', ()=>{
    it('provides buttons to toggle the closed and locked states', ()=>{
        expect(closeButton).toBeInTheDocument();
        expect(lockButton).toBeInTheDocument();
    })

    it('changes button text to reflect the state the door will be in if clicked',()=>{
        rtl.fireEvent.click(wrapper.queryByText(/close gate/i));
        expect(wrapper.queryByText(/close gate/i)).not.toBeInTheDocument();
        expect(wrapper.queryByText(/open gate/i)).toBeInTheDocument();

        rtl.fireEvent.click(wrapper.queryByText(/lock gate/i));
        expect(wrapper.queryByText(/Lock Gate/)).not.toBeInTheDocument();
        expect(wrapper.queryByText(/unlock gate/i)).toBeInTheDocument();
    })

    it('the closed toggle button is disabled if the gate is locked',()=>{
        rtl.fireEvent.click(wrapper.queryByText(/close gate/i));
        rtl.fireEvent.click(wrapper.queryByText(/lock gate/i));

        expect(wrapper.queryByText(/open gate/i)).toBeDisabled();
    })

    it('the locked toggle button is disabled if the gate is open',()=>{
        expect(wrapper.queryByText(/lock gate/i)).toBeDisabled();
    })
})
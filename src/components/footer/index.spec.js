import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Footer from './index'

describe('Footer', () => {
  it('renders a button to open the add transaction modal', () => {
    const onAdd = jest.fn()
    const { container } = render(<Footer onAdd={onAdd} />)
    const button = container.querySelector('#footer__add-transaction')

    fireEvent.click(button)

    expect(onAdd).toHaveBeenCalledTimes(1)
  })
})

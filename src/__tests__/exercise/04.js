// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
// import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'

// test('submitting the form calls onSubmit with username and password', () => {
//   let submittedData = null
//   const handleSubmit = data => {
//     submittedData = data
//   }

//   render(<Login onSubmit={handleSubmit} />)

//   const usernameField = screen.getByLabelText(/username/i)
//   const passwordField = screen.getByLabelText(/password/i)
//   const submitButton = screen.getByRole('button', {name: /submit/i})

//   userEvent.type(usernameField, 'Kody the Koala')
//   userEvent.type(passwordField, 'veryHelpful')
//   userEvent.click(submitButton)

//   expect(submittedData).toEqual({
//     username: 'Kody the Koala',
//     password: 'veryHelpful',
//   })
// })

// const buildLoginForm = overrides => {
//   return {
//     username: faker.internet.userName(),
//     password: faker.internet.password(),
//     ...overrides,
//   }
// }

// test('submitting the form calls onSubmit with username and password', () => {
//   const handleSubmit = jest.fn()

//   render(<Login onSubmit={handleSubmit} />)

//   const usernameField = screen.getByLabelText(/username/i)
//   const passwordField = screen.getByLabelText(/password/i)
//   const submitButton = screen.getByRole('button', {name: /submit/i})

//   const {username, password} = buildLoginForm({
//     username: 'kody',
//   })

//   userEvent.type(usernameField, username)
//   userEvent.type(passwordField, password)
//   userEvent.click(submitButton)

//   expect(handleSubmit).toHaveBeenCalledWith({
//     username: 'kody',
//     password: password,
//   })
// })

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})

  const {username, password} = buildLoginForm()

  userEvent.type(usernameField, username)
  userEvent.type(passwordField, password)
  userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

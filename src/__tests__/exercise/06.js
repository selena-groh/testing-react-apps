// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

window.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
}

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 2,
      longitude: 8,
    },
  }
  const {promise, resolve, reject} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(callback =>
    promise.then(() => {
      callback(fakePosition)
    }),
  )

  render(<Location />)
  const loadingSpinner = screen.getByLabelText(/loading/i)
  expect(loadingSpinner).toBeInTheDocument()

  await act(async () => {
    resolve()
    await promise
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i).textContent).toMatchInlineSnapshot(
    `"Latitude: 2"`,
  )
  expect(screen.getByText(/longitude/i).textContent).toMatchInlineSnapshot(
    `"Longitude: 8"`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/

import React from 'react'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Image from './Image'

describe('Image component', () => {
  it('renders an image from a local source', () => {
    const { getByAltText } = render(
      <Image
        src="../../public/profile.svg"
        alt="profile image"
        width={200}
        height={200}
      />
    )
    const imgElement = getByAltText('profile image')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', '../../public/profile.svg')
  })

  it('renders an image from a remote URL', async () => {
    const { getByAltText } = render(
      <Image
        src="http://source.unsplash.com/photos/green-leaves-with-white-background-hVlf2TDEXV8"
        alt="monstera leaf"
        width={400}
        height={600}
        overrideSrc="http://source.unsplash.com/photos/green-leaves-with-white-background-hVlf2TDEXV8"
      />
    )
    const imgElement = getByAltText('monstera leaf')

    await waitFor(() => {
      expect(imgElement).toBeInTheDocument()
      expect(imgElement).toHaveAttribute(
        'src',
        'http://source.unsplash.com/photos/green-leaves-with-white-background-hVlf2TDEXV8'
      )
    })
  })

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Image
        src="https://placehold.co/150x350"
        alt="placeholder"
        width={150}
        height={350}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

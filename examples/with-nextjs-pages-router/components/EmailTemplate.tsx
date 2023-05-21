import React from 'react'

export default function EmailTemplate(props) {
  const { firstName, product } = props

  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>Thanks for trying {product}. We’re thrilled to have you on board.</p>
    </div>
  )
}
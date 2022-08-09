import React from 'react'

export default function EmailTemplate(props) {
  const { name, product } = props

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>Thanks for trying {product}. We’re thrilled to have you on board.</p>
    </div>
  )
}
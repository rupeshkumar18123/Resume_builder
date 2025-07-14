import React from 'react'

function CreativeTemplate(data) {
  return (
    <div className="border p-3">
      <h2>{data.name}</h2>
      <p>{data.email} | {data.phone}</p>
      {/* Render education, experience, skills */}
      <h4>Education</h4>
      {/* ... */}
      <h4>Experience</h4>
      {/* ... */}
      <h4>Skills</h4>
      {/* ... */}
    </div>
  )
}

export default CreativeTemplate
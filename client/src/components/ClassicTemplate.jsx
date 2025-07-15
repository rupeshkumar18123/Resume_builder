export default function ClassicTemplate({ data }) {
  return (
    <div id="resume-preview" className="font-sans text-gray-800 max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header with professional gradient */}
      <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{data.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.email && (
            <div className="flex items-center">
              <span className="mr-2 opacity-80">✉️</span>
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center">
              <span className="mr-2 opacity-80">📱</span>
              <span>{data.phone}</span>
            </div>
          )}
          {data.linkedin && (
            <div className="flex items-center">
              <span className="mr-2 opacity-80">🔗</span>
              <span>{data.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Summary Section */}
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-3">PROFESSIONAL SUMMARY</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-3">EDUCATION</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                  <p className="text-blue-700 font-medium">
                    {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : edu.startDate ? "- Present" : ""}
                  </p>
                </div>
                <p className="text-gray-700">{edu.degree}</p>
              </div>
            ))}
          </section>
        )}

        {/* Experience Section */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-3">PROFESSIONAL EXPERIENCE</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-5">
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-bold text-gray-800">{exp.company}</h3>
                  <p className="text-blue-700 font-medium">
                    {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : exp.startDate ? "- Present" : ""}
                  </p>
                </div>
                <p className="text-gray-600 font-medium mb-2">{exp.role}</p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-3">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-3">PROJECTS</h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-bold text-gray-800">{proj.title}</h3>
                {proj.link && (
                  <a href={proj.link} className="text-blue-600 hover:underline text-sm block mb-1">
                    {proj.link}
                  </a>
                )}
                <p className="text-gray-700">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-3">CERTIFICATIONS</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {data.certifications.map((cert, i) => (
                <li key={i} className="mb-1">
                  {cert}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Hobbies Section */}
        {data.hobbies && (
          <section>
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-100 pb-2 mb-3">HOBBIES & INTERESTS</h2>
            <p className="text-gray-700">{data.hobbies}</p>
          </section>
        )}
      </div>
    </div>
  );
}
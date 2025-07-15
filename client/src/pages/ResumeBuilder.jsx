import { useState } from "react";
// import ClassicTemplate from "./components/ClassicTemplate";
import ClassicTemplate from "../components/ClassicTemplate";
import { FaPlus, FaSave, FaTrash, FaEye } from "react-icons/fa";
import html2pdf from "html2pdf.js";

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    hobbies: "",
    template: "classic"
  });


   function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleArrayChange(key, index, field, value) {
    const updatedArray = [...form[key]];
    updatedArray[index][field] = value;
    setForm({ ...form, [key]: updatedArray });
  }

  function addArrayItem(key, defaultObject) {
    setForm({ ...form, [key]: [...form[key], defaultObject] });
  }

  function handleTemplateChange(e) {
    setForm({ ...form, template: e.target.value });
  }

  function removeArrayItem(key, index) {
  const updatedArray = [...form[key]];
  updatedArray.splice(index, 1);
  setForm({ ...form, [key]: updatedArray });
}


  // async function handleSave(e) {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:5000/api/resumes", form, { withCredentials: true });
  //     alert("Resume saved!");
  //   } catch {
  //     alert("Save failed");
  //   }
  // }
 async function handleSave(e) {
  e.preventDefault();

  const previewElement = document.getElementById("resume-preview");
  if (previewElement) {
    const opt = {
      margin: 0,
      filename: `${form.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };

    // Instant download
    html2pdf().set(opt).from(previewElement).save();
  }

  try {
    await axios.post("http://localhost:5000/api/resumes", form, { withCredentials: true });
    console.log("Resume data saved on server.");
  } catch (err) {
    console.log("Server save failed.");
  }
}


  // Handler functions remain the same as before
  // (handleChange, handleArrayChange, addArrayItem, removeArrayItem, handleTemplateChange, handleSave)

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 min-h-screen bg-gray-50">
      {/* Form Section */}
      <form onSubmit={handleSave} className="lg:w-2/5 bg-white p-6 rounded-xl shadow-lg border border-gray-200 overflow-y-auto max-h-screen">
        <div className="sticky top-0 bg-white py-4 z-10 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-2 rounded-lg">
                <FaEye />
              </span>
              Resume Builder
            </h1>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Template:</label>
              <select 
                value={form.template} 
                onChange={handleTemplateChange} 
                className="border px-3 py-1.5 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
                <option value="creative">Creative</option>
              </select>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">Fill in your details below</p>
        </div>

        <div className="space-y-6 pt-4">
          {/* Personal Information */}
          <SectionCard 
            title="Personal Information" 
            step={1}
            color="blue"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
              <FormInput
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                type="email"
                required
              />
              <FormInput
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
              <FormInput
                label="LinkedIn"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
          </SectionCard>

          {/* Profile Summary */}
          <SectionCard 
            title="Profile Summary" 
            step={2}
          >
            <TextArea
              label="Summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="Experienced professional with expertise in..."
              rows={3}
            />
          </SectionCard>

          {/* Skills */}
          <SectionCard 
            title="Skills" 
            step={3}
          >
            <FormInput
              label="Skills (comma separated)"
              name="skills"
              value={form.skills.join(",")}
              onChange={e => setForm({ ...form, skills: e.target.value.split(",") })}
              placeholder="Project Management, JavaScript, UI/UX Design"
              helperText="Separate skills with commas"
            />
          </SectionCard>

          {/* Education */}
          <ArraySection 
            title="Education"
            step={4}
            items={form.education}
            onAdd={() => addArrayItem("education", { institution: "", degree: "", startDate: "", endDate: "" })}
            onRemove={(index) => removeArrayItem("education", index)}
            renderItem={(edu, i) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Institution"
                  value={edu.institution}
                  onChange={e => handleArrayChange("education", i, "institution", e.target.value)}
                  placeholder="University Name"
                />
                <FormInput
                  label="Degree"
                  value={edu.degree}
                  onChange={e => handleArrayChange("education", i, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                />
                <FormInput
                  label="Start Date"
                  value={edu.startDate}
                  onChange={e => handleArrayChange("education", i, "startDate", e.target.value)}
                  placeholder="2015"
                />
                <FormInput
                  label="End Date"
                  value={edu.endDate}
                  onChange={e => handleArrayChange("education", i, "endDate", e.target.value)}
                  placeholder="2019 or Present"
                />
              </div>
            )}
          />

          {/* Experience */}
          <ArraySection 
            title="Experience"
            step={5}
            items={form.experience}
            onAdd={() => addArrayItem("experience", { company: "", role: "", startDate: "", endDate: "", description: "" })}
            onRemove={(index) => removeArrayItem("experience", index)}
            renderItem={(exp, i) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Company"
                  value={exp.company}
                  onChange={e => handleArrayChange("experience", i, "company", e.target.value)}
                  placeholder="Company Name"
                />
                <FormInput
                  label="Role"
                  value={exp.role}
                  onChange={e => handleArrayChange("experience", i, "role", e.target.value)}
                  placeholder="Job Title"
                />
                <FormInput
                  label="Start Date"
                  value={exp.startDate}
                  onChange={e => handleArrayChange("experience", i, "startDate", e.target.value)}
                  placeholder="Jan 2020"
                />
                <FormInput
                  label="End Date"
                  value={exp.endDate}
                  onChange={e => handleArrayChange("experience", i, "endDate", e.target.value)}
                  placeholder="Present"
                />
                <div className="md:col-span-2">
                  <TextArea
                    label="Description"
                    value={exp.description}
                    onChange={e => handleArrayChange("experience", i, "description", e.target.value)}
                    placeholder="Responsibilities and achievements..."
                    rows={2}
                  />
                </div>
              </div>
            )}
          />

          {/* Projects */}
          <ArraySection 
            title="Projects"
            step={6}
            items={form.projects}
            onAdd={() => addArrayItem("projects", { title: "", link: "", description: "" })}
            onRemove={(index) => removeArrayItem("projects", index)}
            renderItem={(proj, i) => (
              <div className="space-y-4">
                <FormInput
                  label="Project Title"
                  value={proj.title}
                  onChange={e => handleArrayChange("projects", i, "title", e.target.value)}
                  placeholder="Project Name"
                />
                <FormInput
                  label="Project Link"
                  value={proj.link}
                  onChange={e => handleArrayChange("projects", i, "link", e.target.value)}
                  placeholder="https://example.com"
                />
                <TextArea
                  label="Description"
                  value={proj.description}
                  onChange={e => handleArrayChange("projects", i, "description", e.target.value)}
                  placeholder="Project details and outcomes..."
                  rows={2}
                />
              </div>
            )}
          />

          {/* Certifications & Hobbies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Certifications */}
            <ArraySection 
              title="Certifications"
              step={7}
              items={form.certifications}
              onAdd={() => addArrayItem("certifications", "")}
              onRemove={(index) => removeArrayItem("certifications", index)}
              renderItem={(cert, i) => (
                <div className="flex items-center gap-2 mb-2">
                  <input 
                    value={cert} 
                    onChange={e => {
                      const updated = [...form.certifications];
                      updated[i] = e.target.value;
                      setForm({ ...form, certifications: updated });
                    }} 
                    placeholder="Certification Name" 
                    className="border px-3 py-1.5 rounded-md w-full text-sm" 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeArrayItem("certifications", i)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              )}
            />

            {/* Hobbies */}
            <SectionCard 
              title="Hobbies & Interests" 
              step={8}
            >
              <TextArea
                name="hobbies"
                value={form.hobbies}
                onChange={handleChange}
                placeholder="Photography, Hiking, Reading..."
                rows={3}
              />
            </SectionCard>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaSave /> Save Resume
          </button>
        </div>
      </form>

      {/* Preview Section */}
      <div className="lg:w-3/5 flex flex-col">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Resume Preview</h2>
          <p className="text-gray-600 text-sm">Changes update in real-time</p>
        </div>
        <div className="flex-1 overflow-auto bg-gray-100 rounded-xl shadow-inner p-4 min-h-[80vh]">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto w-full max-w-4xl transform scale-90 origin-top">
            <ClassicTemplate data={form}  />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components for better organization
function SectionCard({ title, children, step, color = "gray" }) {
  const colors = {
    blue: "bg-blue-50 border-blue-100 text-blue-800",
    gray: "bg-gray-50 border-gray-200 text-gray-800"
  };
  
  return (
    <div className={`p-4 rounded-lg border ${colors[color]}`}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className={`bg-${color === "blue" ? "blue" : "gray"}-600 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm`}>
          {step}
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function FormInput({ label, helperText, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input 
        className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
        {...props} 
      />
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
}

function TextArea({ label, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <textarea 
        className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
        {...props} 
      />
    </div>
  );
}

function ArraySection({ title, step, items, onAdd, onRemove, renderItem }) {
  return (
    <SectionCard title={title} step={step}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">{title} ({items.length})</h3>
        <button 
          type="button" 
          onClick={onAdd}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
        >
          <FaPlus size={12} /> Add
        </button>
      </div>
      
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 relative">
            <button 
              type="button" 
              onClick={() => onRemove(i)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
            >
              <FaTrash size={14} />
            </button>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
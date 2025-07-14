import { useState } from "react";
import ClassicTemplate from "../components/ClassicTemplate";
import ModernTemplate from "../components/ModernTemplate";
import CreativeTemplate from "../components/CreativeTemplate";
import axios from "axios";

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    education: [],
    experience: [],
    skills: [],
    template: "classic"
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleTemplateChange(e) {
    setForm({ ...form, template: e.target.value });
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/resumes", form, { withCredentials: true });
      alert("Resume saved!");
    } catch (err) {
      alert("Save failed");
    }
  }

  return (
    <div className="d-flex p-4">
      <form style={{ flex: 1 }} onSubmit={handleSave}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="form-control mb-2" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="form-control mb-2" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="form-control mb-2" />
        {/* Add education, experience, skills fields as needed */}
        <select value={form.template} onChange={handleTemplateChange} className="form-select mb-2">
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
          <option value="creative">Creative</option>
        </select>
        <button type="submit" className="btn btn-success w-100">Save Resume</button>
      </form>
      <div style={{ flex: 1, marginLeft: '20px' }}>
        {form.template === "classic" && <ClassicTemplate data={form} />}
        {form.template === "modern" && <ModernTemplate data={form} />}
        {form.template === "creative" && <CreativeTemplate data={form} />}
      </div>
    </div>
  );
}
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  projectLink: { type: String },
  projectSummary: { type: String },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;

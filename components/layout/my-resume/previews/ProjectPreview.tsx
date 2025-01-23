import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";

const validateDate = (date: string) => {
  return isNaN(Date.parse(date)) ? "Invalid Date" : new Date(date).toLocaleDateString();
};

const ProjectPreview = () => {
  const { formData } = useFormContext();

  console.log("formData from preview page -->>-->>-->>-->", formData);

  if (!formData?.project?.length) {
    return <p>No projects to display.</p>;
  }

  return (
    <div className="my-6">
      <h2
        className="text-left font-extrabold text-sm mb-1"
        style={{
          color: formData?.themeColor || themeColors[0],
        }}
      >
        PROJECTS
      </h2>
      <hr
        style={{
          borderColor: formData?.themeColor || themeColors[0],
        }}
      />

      {formData?.project?.map((project: any, index: number) => {
        const startDate = validateDate(project?.startDate);
        const endDate = project?.endDate ? validateDate(project?.endDate) : "Present";

        // Ensure projectSummary is a string or fallback to an empty string
        const projectSummary = typeof project?.projectSummary === "string" 
        ? project.projectSummary.trim() 
        : "";
      

        return (
          <div key={index} className="my-5">
            <h2
              className="text-sm font-bold"
              style={{
                color: formData?.themeColor || themeColors[0],
              }}
            >
              {project?.title || "Untitled Project"}
            </h2>
            <h2 className="text-xs flex justify-between">
              {startDate}
              {project?.endDate && <span>{" to "}{endDate}</span>}
            </h2>
            {projectSummary && (
              <div
                className="text-xs my-2 form-preview"
                dangerouslySetInnerHTML={{
                  __html: projectSummary,
                }}
              />
            )}
            {project?.projectLink?.trim() && (
              <div className="text-xs my-2">
                <strong>Project Link: </strong>
                <a
                  href={project?.projectLink.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: formData?.themeColor || themeColors[0],
                  }}
                  aria-label={`Visit project link: ${project?.title}`}
                >
                  {project?.projectLink.trim()}
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProjectPreview;

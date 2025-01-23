"use client";

import RichTextEditor from "@/components/common/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { generateProjectDescription } from "@/lib/actions/gemini.actions";
import { addProjectToResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { Brain, Loader2, Minus, Plus } from "lucide-react";
import React, { useRef, useState } from "react";

interface Project {
  title: string;
  projectLink: string;
  startDate: string;
  endDate: string;
  projectSummary: string;
}

const ProjectForm = ({ params }: { params: { id: string } }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { formData, handleInputChange } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState<
    { title: string; description: string }[]
  >([]);
  const [projectList, setProjectList] = useState<Project[]>(
    formData?.project || [
      {
        title: "",
        projectLink: "",
        startDate: "",
        endDate: "",
        projectSummary: "",
      },
    ]
  );
  const [currentAiIndex, setCurrentAiIndex] = useState(0);
  const { toast } = useToast();

  const handleChange = (
    index: number,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const newEntries = [...projectList];
    const { name, value } = event.target;
    newEntries[index][name as keyof Project] = value;
    setProjectList(newEntries);

    handleInputChange({
      target: {
        name: "projects",
        value: newEntries,
      },
    });
  };

  const handleRichTextChange = (index: number, value: string) => {
    const newEntries = [...projectList];
    newEntries[index].projectSummary = value;
    setProjectList(newEntries);

    handleInputChange({
      target: {
        name: "projects",
        value: newEntries,
      },
    });
  };

  const AddNewProject = () => {
    const newEntries = [
      ...projectList,
      {
        title: "",
        projectLink: "",
        startDate: "",
        endDate: "",
        projectSummary: "",
      },
    ];
    setProjectList(newEntries);

    handleInputChange({
      target: {
        name: "project",
        value: newEntries,
      },
    });
  };

  const RemoveProject = () => {
    const newEntries = projectList.slice(0, -1);
    setProjectList(newEntries);

    if (currentAiIndex > newEntries.length - 1) {
      setCurrentAiIndex(newEntries.length - 1);
    }

    handleInputChange({
      target: {
        name: "projects",
        value: newEntries,
      },
    });
  };

  const generateProjectDescriptionFromAI = async (index: number) => {
    const project = projectList[index];

    if (
      !project.title ||
      !project.projectLink ||
      !project.startDate ||
      !project.endDate
    ) {
      toast({
        title: "Uh Oh! Something went wrong.",
        description:
          "Please enter the project title, live link, start date, and end date to generate summary.",
        variant: "destructive",
        className: "bg-white border-2",
      });
      return;
    }

    setCurrentAiIndex(index);
    setIsAiLoading(true);

    try {
      const result = await generateProjectDescription(
        `${project.title} at ${project.projectLink} from ${project.startDate} to ${project.endDate}`
      );
      setAiGeneratedSummaryList(result || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate description using AI.",
        variant: "destructive",
      });
    } finally {
      setIsAiLoading(false);
      setTimeout(() => {
        listRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const result = await addProjectToResume(params.id, projectList);

      if (result.success) {
        toast({
          title: "Information saved.",
          description: "Project experience updated successfully.",
          className: "bg-white",
        });
      } else {
        throw new Error(result?.error || "Error saving project.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      toast({
        title: "Uh Oh! Something went wrong.",
        description: errorMessage,
        variant: "destructive",
        className: "bg-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiSuggestionSelect = (index: number, description: string) => {
    handleRichTextChange(index, description);
    toast({
      title: "AI Suggestion applied.",
      description: "The summary has been updated.",
    });
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          Project Experience
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Add your previous project experiences
        </p>

        <div className="mt-5">
          {projectList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="space-y-2">
                  <label className="text-slate-700 font-semibold">
                    Project Title:
                  </label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    value={item.title}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-700 font-semibold">
                    Live Link:
                  </label>
                  <Input
                    name="projectLink"
                    onChange={(event) => handleChange(index, event)}
                    value={item.projectLink}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-700 font-semibold">
                    Start Date:
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item.startDate}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-700 font-semibold">
                    End Date:
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item.endDate}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-slate-700 font-semibold">
                      Summary:
                    </label>
                    <Button
                      variant="outline"
                      onClick={() => generateProjectDescriptionFromAI(index)}
                      type="button"
                      size="sm"
                      className="border-primary text-primary flex gap-2"
                      disabled={isAiLoading && currentAiIndex === index}
                    >
                      {isAiLoading && currentAiIndex === index ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Brain className="h-4 w-4" />
                      )}
                      Generate from AI
                    </Button>
                  </div>
                  {/* <RichTextEditor
                    defaultValue={item.projectSummary}
                    onRichTextEditorChange={(value) =>
                      handleRichTextChange(index, value)
                    }
                  /> */}
                  <Textarea
                    value={item.projectSummary}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2 justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewProject}
              className="text-primary"
            >
              <Plus className="size-4 mr-2" /> Add More
            </Button>
            <Button
              variant="outline"
              onClick={RemoveProject}
              className="text-primary"
            >
              <Minus className="size-4 mr-2" /> Remove
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={onSave}
            className="bg-primary-700 hover:bg-primary-800 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>

      {/* AI Suggestions */}
      {aiGeneratedSummaryList.length > 0 && (
        <div
          ref={listRef}
          className="mt-10 bg-primary/5 rounded-lg p-5 border-primary-300 border"
        >
          <h3 className="text-lg font-semibold">AI Suggestions</h3>
          <div className="space-y-3 mt-3">
            {aiGeneratedSummaryList.map((suggestion, idx) => (
              <div
                key={idx}
                onClick={() =>
                  handleAiSuggestionSelect(
                    currentAiIndex,
                    suggestion.description
                  )
                }
                className="p-2 border border-primary-300 rounded-lg shadow hover:bg-primary/10 cursor-pointer"
              >
                <h4 className="text-sm font-semibold">{suggestion.title}</h4>
                <p className="text-sm">{suggestion.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectForm;

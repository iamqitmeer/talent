import { useFormContext } from "@/lib/context/FormProvider";
import React from "react";
import { themeColors } from "@/lib/utils";

const SummaryPreview = () => {
  const { formData } = useFormContext();

  return (
    <div className="my-6">
      <h2
        className="text-left font-extrabold text-sm mb-1"
        style={{
          color: formData?.themeColor || themeColors[0],
        }}
      >
        SUMMARY
      </h2>
      <hr
      
        style={{
          borderColor: formData?.themeColor || themeColors[0],
        }}
      />{" "}
      <p className="text-xs text-justify mt-4">{formData?.summary}</p>{" "}
    </div>
  );
};

export default SummaryPreview;

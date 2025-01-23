import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";
import "remixicon/fonts/remixicon.css";

function PersonalDetailsPreview() {
  const { formData } = useFormContext();

  return (
    <div>
      <h2 className="font-extrabold text-4xl uppercase text-left">
        {formData?.firstName} {formData?.lastName}
      </h2>

      <h2
        className="text-left text-lg font-medium"
        style={{
          color: formData?.themeColor || themeColors[0],
        }}
      >
        {formData?.jobTitle}
      </h2>

      <div className="flex justify-between mt-2">
        <h2
          className="text-left font-normal text-xs"
          style={{
            color: formData?.themeColor || themeColors[0],
          }}
        >
          <i
            style={{
              backgroundColor: formData?.themeColor || themeColors[0],
              color: "white",
              padding: "3px",
              borderRadius: "5px",
              fontSize: "0.8rem",
            }}
            className="ri-home-9-line"
          ></i>{" "}
          {formData?.address}
        </h2>
        <h2
          className="font-normal text-xs"
          style={{
            color: formData?.themeColor || themeColors[0],
          }}
        >
          <i
            style={{
              backgroundColor: formData?.themeColor || themeColors[0],
              color: "white",
              padding: "3px",
              borderRadius: "5px",
              fontSize: "0.8rem",
            }}
            className="ri-phone-line"
          ></i>{" "}
          {formData?.phone}
        </h2>

        <h2
          className="font-normal text-xs"
          style={{
            color: formData?.themeColor || themeColors[0],
          }}
        >
          <i
            style={{
              backgroundColor: formData?.themeColor || themeColors[0],
              color: "white",
              padding: "3px",
              borderRadius: "5px",
              fontSize: "0.8rem",
            }}
            className="ri-mail-line"
          ></i>{" "}
          {formData?.email}
        </h2>
      </div>

      {/* <hr
        className="border-[1.5px] my-2 mb-5"
        style={{
          borderColor: formData?.themeColor || themeColors[0],
        }}
      /> */}
    </div>
  );
}

export default PersonalDetailsPreview;

"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { RWebShare } from "react-web-share";
import { FormProvider, useFormContext } from "@/lib/context/FormProvider";
import Header from "@/components/layout/Header";
import ResumePreview from "@/components/layout/my-resume/ResumePreview";
import PageWrapper from "@/components/common/PageWrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DownloadIcon,
  Share2Icon,
  CopyIcon,
  CheckIcon,
  EyeIcon,
  PenToolIcon,
  StarIcon,
  TrendingUpIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  AwardIcon,
  BarChartIcon,
  FileTextIcon,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
// @ts-ignore
import html2pdf from "html2pdf.js";

const FinalResumeView = ({
  params,
  isOwnerView,
}: {
  params: { id: string };
  isOwnerView: boolean;
}) => {
  const path = usePathname();
  const { formData } = useFormContext();
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    // Select the element to export as PDF
    const element = document.getElementById("content-to-download"); // Match this ID with your content

    if (!element) {
      console.error("Content element not found!");
      return;
    }

    // Options for html2pdf
    const options = {
      margin: 10, // Adjust margins as needed
      filename: "resume.pdf", // File name for the downloaded PDF
      image: { type: "jpeg", quality: 0.98 }, // High-quality images
      html2canvas: { scale: 2 }, // Higher scale for better resolution
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // A4 size in portrait
    };

    // Generate and save the PDF
    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        // Trigger confetti after successful download
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      })
      .catch((err: unknown) => console.error("PDF generation failed: ", err));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${process.env.BASE_URL}${path}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resumeStats = {
    atsScore: 92,
    keywordMatch: 85,
    readability: 95,
    uniqueness: 88,
  };

  const achievements = [
    {
      icon: BriefcaseIcon,
      title: "5+ years of experience",
      description: "Solid track record in the industry",
    },
    {
      icon: GraduationCapIcon,
      title: "Master's Degree",
      description: "Advanced education in the field",
    },
    {
      icon: AwardIcon,
      title: "3 Industry Certifications",
      description: "Recognized expertise and skills",
    },
  ];
  const user = useUser();
  console.log("user", user);

  return (
    <PageWrapper>
      <FormProvider params={params}>
        <div
          id="no-print"
          className="bg-gradient-to-br from-primary-50 to-primary-100 min-h-screen pb-12"
        >
          <Header />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto px-4 py-8"
          >
            <Card className="mb-8">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage
                        src={user?.user?.imageUrl || "/placeholder-avatar.png"}
                        alt={`${user?.user?.fullName} ${user?.user?.lastName}`}
                      />
                      <AvatarFallback>
                        {formData?.firstName?.[0]}
                        {formData?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary-800">
                        {formData?.firstName} {formData?.lastName}
                      </CardTitle>
                      <CardDescription className="text-xl text-primary-600">
                        {formData?.jobTitle}
                      </CardDescription>
                    </div>
                  </div>
                  {isOwnerView && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <PenToolIcon className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="stats">Resume Stats</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <FileTextIcon className="w-5 h-5 text-primary-600" />
                            Resume Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            {formData?.summary ||
                              "A brief summary of your professional experience and skills."}
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <TrendingUpIcon className="w-5 h-5 text-primary-600" />
                            Career Highlights
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside text-gray-600">
                            <li>Led a team of 10+ developers</li>
                            <li>Increased company revenue by 25%</li>
                            <li>Implemented AI-driven solutions</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="stats">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <BarChartIcon className="w-5 h-5 text-primary-600" />
                          Resume Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(resumeStats).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-700 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <span className="text-sm font-semibold text-primary-700">
                                {value}%
                              </span>
                            </div>
                            <Progress value={value} className="w-full" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="achievements">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {achievements.map((achievement, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                              {React.createElement(achievement.icon, {
                                className: "w-5 h-5 text-primary-600",
                              })}
                              {achievement.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600">
                              {achievement.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="flex items-center justify-center gap-2 py-3 px-6 rounded-md bg-primary-600 hover:bg-primary-700 text-white transition-all duration-300 transform hover:scale-105"
                        onClick={handleDownload}
                      >
                        <DownloadIcon className="w-5 h-5" />
                        Download Resume
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download your resume as a PDF</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <RWebShare
                        data={{
                          text: "Check out my professional resume crafted with AI!",
                          url: `${process.env.BASE_URL}${path}`,
                          title: `${formData?.firstName} ${formData?.lastName}'s Resume`,
                        }}
                        onClick={() => console.log("Shared successfully!")}
                      >
                        <Button className="flex items-center justify-center gap-2 py-3 px-6 rounded-md bg-primary-200 hover:bg-primary-300 text-primary-800 transition-all duration-300 transform hover:scale-105">
                          <Share2Icon className="w-5 h-5" />
                          Share Resume
                        </Button>
                      </RWebShare>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share your resume on social media</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary-800">
                  Resume Preview
                </CardTitle>
                <CardDescription>
                  Get a quick look at your polished resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <Button
                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-primary-100 hover:bg-primary-200 text-primary-800 transition-all duration-300"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <EyeIcon className="w-4 h-4" />
                    {showPreview ? "Hide Preview" : "Show Preview"}
                  </Button>
                </div>
                <AnimatePresence>
                  {showPreview && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="border border-primary-200 rounded-lg p-4 max-h-[600px] overflow-y-auto">
                        <ResumePreview />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary-800">
                  Why This Resume Stands Out
                </CardTitle>
                <CardDescription>
                  Powered by cutting-edge AI and industry best practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: StarIcon,
                      title: "AI-Powered",
                      description:
                        "Optimized content using advanced AI algorithms",
                    },
                    {
                      icon: CheckIcon,
                      title: "ATS-Optimized",
                      description:
                        "Engineered to pass Applicant Tracking Systems",
                    },
                    {
                      icon: PenToolIcon,
                      title: "Professionally Designed",
                      description: "Sleek, modern layout that catches the eye",
                    },
                  ].map((feature, index) => (
                    <Card key={index} className="bg-primary-50">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          {React.createElement(feature.icon, {
                            className: "w-5 h-5 text-primary-600",
                          })}
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-primary-800">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Badge
                  variant="outline"
                  className="text-primary-800 border-primary-300"
                >
                  100% Satisfaction Guaranteed
                </Badge>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div id="content-to-download">
          {/* Resume content */}
          <ResumePreview />
        </div>
      </FormProvider>
    </PageWrapper>
  );
};

export default FinalResumeView;

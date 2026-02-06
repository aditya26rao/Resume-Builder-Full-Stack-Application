import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";

import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  /* ===============================
     STATE
  =============================== */
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    education: [],
    experience: [],
    projects: [],
    skills: [],
    template: "classic",
    accentColor: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  /* ===============================
     LOAD EXISTING RESUME
  =============================== */
  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  }, [resumeId]);

  /* ===============================
     SECTIONS
  =============================== */
  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];
  if (!activeSection) {
    return <div className="p-10 text-center text-red-500">Error: Invalid section index</div>;
  }

  /* ===============================
     ACTIONS
  =============================== */

  const changeResumeVisibility = () => {
    setResumeData((prev) => ({ ...prev, public: !prev.public }));
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;

    if (navigator.share) {
      navigator.share({
        url: resumeUrl,
        text: "Check out my resume",
      });
    } else {
      alert("Share not supported on this browser");
    }
  };

  const downloadResume = () => {
    window.print();
  };

  const handleSave = () => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    alert("Resume saved successfully!");
  };

  const goNext = () => {
    setActiveSectionIndex((prev) =>
      Math.min(prev + 1, sections.length - 1)
    );
  };

  const goPrev = () => {
    setActiveSectionIndex((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  /* ===============================
     RENDER
  =============================== */
  return (
    <div>
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 py-6 print:hidden">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8 print:p-0 print:max-w-none">
        <div className="grid lg:grid-cols-12 gap-8 print:block">

          {/* ================= LEFT PANEL ================= */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden print:hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

              {/* Template + Color */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
                <div className="flex items-center gap-3">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accentColor}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accentColor: color,
                      }))
                    }
                  />
                </div>
              </div>


              {/* ================= NAVIGATION ================= */}
              <div className="flex justify-between mb-6">
                <button
                  disabled={activeSectionIndex === 0}
                  onClick={goPrev}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 rounded disabled:opacity-40"
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                {activeSectionIndex === sections.length - 1 ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Finish <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-100 text-blue-600 rounded disabled:opacity-40"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                )}

              </div>

              {/* Section Title */}
              <h2 className="text-lg font-semibold mb-4">
                {activeSection.name}
              </h2>

              {/* ================= FORMS ================= */}
              <div className="space-y-6">

                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.projects}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        projects: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>

              {/* Save */}
              <button
                onClick={handleSave}
                className="w-full mt-6 bg-green-500 text-white rounded-md py-2"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="lg:col-span-7 max-lg:mt-6 relative print:w-full print:m-0">

            <div className="absolute top-3 right-3 flex gap-2 print:hidden z-10">

              {resumeData.public && (
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 text-xs bg-blue-100 text-blue-600 rounded"
                >
                  <Share2Icon className="size-4" /> Share
                </button>
              )}

              <button
                onClick={changeResumeVisibility}
                className="flex items-center gap-2 px-4 py-2 text-xs bg-purple-100 text-purple-600 rounded"
              >
                {resumeData.public ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                {resumeData.public ? "Public" : "Private"}
              </button>

              <button
                onClick={downloadResume}
                className="flex items-center gap-2 px-4 py-2 text-xs bg-green-100 text-green-600 rounded"
              >
                <DownloadIcon size={16} /> Download
              </button>
            </div>

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accentColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

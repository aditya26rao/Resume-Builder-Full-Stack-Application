import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";
import { ArrowLeft } from "lucide-react";
import api from "../configs/api";

const Preview = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/get/public/' + resumeId)
     setResumeData(data.resume)
    } catch (error) {
      console.log(error.message)
    }finally{
      setIsLoading(false)
    }
  }


  useEffect(() => {
    loadResume()
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-2xl text-slate-400 font-medium">
          Resume not found
        </p>

        <Link
          to="/"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-10 flex items-center transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accentColor}
        />

      </div>
    </div>
  );
};

export default Preview;

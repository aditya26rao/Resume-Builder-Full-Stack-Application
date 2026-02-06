import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data = {}, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      {/* ================= HEADER ================= */}
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              {data.personal_info.email}
            </div>
          )}

          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              {data.personal_info.phone}
            </div>
          )}

          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              {data.personal_info.location}
            </div>
          )}

          {data.personal_info?.linkedin && (
            <a
              href={data.personal_info.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
          )}

          {data.personal_info?.website && (
            <a
              href={data.personal_info.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <Globe className="size-4" />
              Website
            </a>
          )}
        </div>
      </header>

      {/* ================= SUMMARY ================= */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: accentColor }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p>{data.professional_summary}</p>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-4 pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>

                  <p className="text-sm text-gray-500">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current
                      ? "Present"
                      : formatDate(exp.end_date)}
                  </p>
                </div>

                {exp.description && (
                  <p className="mt-2 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROJECTS
          </h2>

          <ul className="space-y-3">
            {data.projects.map((proj, index) => (
              <li
                key={index}
                className="border-l-4 pl-4"
                style={{ borderColor: accentColor }}
              >
                <p className="font-semibold">{proj.name}</p>
                <p className="text-gray-600">{proj.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            EDUCATION
          </h2>

          {data.education.map((edu, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <p className="font-semibold">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </p>
                <p className="text-gray-600">{edu.institution}</p>
              </div>

              <p className="text-sm text-gray-500">
                {formatDate(edu.graduation_date)}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {data.skills?.length > 0 && (
        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            CORE SKILLS
          </h2>

          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span key={index}>• {skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;

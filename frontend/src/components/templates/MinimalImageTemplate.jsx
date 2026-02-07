import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data = {}, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800">
      <div className="grid grid-cols-3">

        {/* LEFT IMAGE */}
        <div className="col-span-1 py-10">
          {data.personal_info?.image && typeof data.personal_info.image === "string" ? (
            <div className="mb-6">
              <img
                src={data.personal_info.image}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto"
                style={{ background: `${accentColor}70` }}
              />
            </div>
          ) : data.personal_info?.image &&
            typeof data.personal_info.image === "object" ? (
            <div className="mb-6">
              <img
                src={URL.createObjectURL(data.personal_info.image)}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          ) : null}
        </div>

        {/* NAME + TITLE */}
        <div className="col-span-2 flex flex-col justify-center py-10 px-8">
          <h1 className="text-4xl font-bold tracking-widest">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          <p className="uppercase text-zinc-600 font-medium text-sm tracking-widest">
            {data?.personal_info?.profession || "Profession"}
          </p>
        </div>

        {/* SIDEBAR */}
        <aside className="col-span-1 border-r border-zinc-300 p-6 pt-0">

          {/* CONTACT */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold tracking-widest mb-3">CONTACT</h2>

            <div className="space-y-2 text-sm">
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color: accentColor }} />
                  {data.personal_info.phone}
                </div>
              )}

              {data.personal_info?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} style={{ color: accentColor }} />
                  {data.personal_info.email}
                </div>
              )}

              {data.personal_info?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: accentColor }} />
                  {data.personal_info.location}
                </div>
              )}
            </div>
          </section>

          {/* EDUCATION */}
          {data.education?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest mb-3">EDUCATION</h2>

              {data.education.map((edu, i) => (
                <div key={i} className="mb-3 text-sm">
                  <p className="font-semibold uppercase">{edu.degree}</p>
                  <p className="text-zinc-600">{edu.institution}</p>
                  <p className="text-xs text-zinc-500">
                    {formatDate(edu.graduation_date)}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* SKILLS */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold tracking-widest mb-3">SKILLS</h2>
              {data.skills.map((skill, i) => (
                <div key={i} className="text-sm">{skill}</div>
              ))}
            </section>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-span-2 p-8 pt-0">

          {data.professional_summary && (
            <section className="mb-8">
              <h2 style={{ color: accentColor }} className="font-semibold mb-2">
                SUMMARY
              </h2>
              <p>{data.professional_summary}</p>
            </section>
          )}

          {/* PROJECTS */}
          {data.projects?.length > 0 && (
            <section className="mb-8">
              <h2 style={{ color: accentColor }} className="font-semibold mb-4">
                PROJECTS
              </h2>

              {data.projects.map((proj, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-semibold">{proj.name}</h3>
                  {proj.type && (
                    <p className="text-xs text-gray-600 mb-1">{proj.type}</p>
                  )}
                  {proj.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {data.experience?.length > 0 && (
            <section>
              <h2 style={{ color: accentColor }} className="font-semibold mb-4">
                EXPERIENCE
              </h2>

              {data.experience.map((exp, i) => (
                <div key={i} className="mb-6">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <span className="text-xs">
                      {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

                  <p style={{ color: accentColor }}>{exp.company}</p>

                  {exp.description && (
                    <ul className="list-disc list-inside text-sm">
                      {exp.description.split("\n").map((line, j) => (
                        <li key={j}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;

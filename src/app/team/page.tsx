import Navbar from "@/components/Navbar";
export default function TeamPage() {
  const members = [
    {
      name: "Varuniga B V",
      role: "President",
      emoji: "👑",
      description:
        "Leads the club and oversees all activities and initiatives.",
    },
    {
      name: "Karthik S",
      role: "Vice President",
      emoji: "⭐",
      description:
        "Supports leadership and manages club operations.",
    },
    {
      name: "Rahul Kumar",
      role: "Technical Lead",
      emoji: "💻",
      description:
        "Guides technical projects and development activities.",
    },
    {
      name: "Priya Sharma",
      role: "Design Lead",
      emoji: "🎨",
      description:
        "Creates UI/UX designs and branding materials.",
    },
    {
      name: "Nisha R",
      role: "Event Coordinator",
      emoji: "📢",
      description:
        "Organizes workshops, hackathons and club events.",
    },
    {
      name: "Arun S",
      role: "Operations Lead",
      emoji: "⚙️",
      description:
        "Handles logistics and internal club operations.",
    },
  ];

  return (
     <>
    <Navbar />

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h1 className="text-4xl font-extrabold text-slate-800">
                👥 Club Team
              </h1>

              <p className="text-slate-500 mt-2">
                Meet the leadership team behind
                DevChart Student Club Workspace.
              </p>
            </div>

            <div className="bg-indigo-100 text-indigo-700 px-5 py-3 rounded-2xl font-semibold w-fit">
              {members.length} Members
            </div>

          </div>

        </div>

        {/* Team Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="flex items-center gap-4 mb-4">

                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">
                  {member.emoji}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {member.name}
                  </h2>

                  <span className="inline-block mt-1 text-sm font-medium text-indigo-600">
                    {member.role}
                  </span>
                </div>

              </div>

              <p className="text-slate-600 leading-6 text-sm">
                {member.description}
              </p>

            </div>
          ))}

        </div>

      </div>

       </div>
  </>
);
}
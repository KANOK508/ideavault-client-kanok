import { FiEdit3, FiUsers, FiZap } from "react-icons/fi";

const steps = [
  {
    icon: <FiEdit3 size={28} />,
    title: "Share Your Idea",
    desc: "Submit your startup concept with a clear problem statement, proposed solution, and target audience.",
    number: "01",
    color: "bg-indigo-600",
  },
  {
    icon: <FiUsers size={28} />,
    title: "Get Community Feedback",
    desc: "Receive comments, suggestions, and likes from entrepreneurs and innovators worldwide.",
    number: "02",
    color: "bg-purple-600",
  },
  {
    icon: <FiZap size={28} />,
    title: "Validate & Launch",
    desc: "Use community insights to refine your idea, find co-founders, and take your vision to the next level.",
    number: "03",
    color: "bg-pink-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="section-title mt-2">How IdeaVault Works</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
            From raw concept to validated startup idea in three easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 z-0 -translate-y-1/2" style={{ width: "calc(100% - 80px)", left: "80px" }}></div>
              )}
              <div className="card p-8 text-center relative z-10 group-hover:-translate-y-1 transition-transform duration-300">
                <div className={`${step.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                  {step.icon}
                </div>
                <div className="text-5xl font-black text-gray-100 dark:text-gray-800 absolute top-4 right-6 leading-none select-none">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

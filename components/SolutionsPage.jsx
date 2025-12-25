
import React from 'react';
import { Cloud, Shield, Cpu, Briefcase } from 'lucide-react';

const SolutionsPage = () => {
  const solutions = [
    { title: "Hybrid Cloud Infrastructure", desc: "Scalable server solutions combining on-premise reliability with cloud flexibility.", icon: Cloud },
    { title: "Zero-Trust Security", desc: "Multi-layered encryption modules for protecting corporate data in remote environments.", icon: Shield },
    { title: "High-Performance Compute", desc: "Custom workstation clusters for data science and AI development.", icon: Cpu },
    { title: "Managed IT Logistics", desc: "End-to-end device lifecycle management and secure decommissioning.", icon: Briefcase }
  ];

  return (
    <div className="bg-white">
      <div className="bg-[#002B5B] py-24 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Enterprise Solutions</h1>
        <p className="text-xl text-blue-100/70">Strategic hardware services for global scalability.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10">
        {solutions.map((s, i) => (
          <div key={i} className="flex gap-6 p-10 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="w-16 h-16 bg-teal-50 text-[#20B2AA] flex items-center justify-center rounded-2xl flex-shrink-0">
              <s.icon className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#002B5B]">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsPage;

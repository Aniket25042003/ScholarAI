import { 
  Search, 
  LayoutList, 
  MessageSquare, 
  Clock, 
  Network, 
  Edit3, 
  BookOpenCheck, 
  Users 
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <Search size={32} />,
    title: "Literature Retrieval",
    description: "Automatically search, retrieve, and summarize top-cited academic papers using AI."
  },
  {
    icon: <LayoutList size={32} />,
    title: "AI-Powered Report",
    description: "Generate a well-structured academic research report in Markdown format—ready for review or export."
  },
  {
    icon: <Clock size={32} />,
    title: "Word Count & Read Time",
    description: "Instantly see word count and estimated read time for each generated report."
  },
  {
    icon: <MessageSquare size={32} />,
    title: "Contextual Q&A",
    description: "Chat with your AI assistant—ask follow-ups based on the generated report and get detailed answers."
  }
];

const comingSoon = [
  {
    icon: <Network size={32} />,
    title: "Memory/Knowledge Graph",
    description: "Visualize and explore relationships between research topics and papers. Edit and grow your knowledge graph. (Coming soon!)"
  },
  {
    icon: <Edit3 size={32} />,
    title: "Editable Report",
    description: "Edit, annotate, or expand generated research reports directly in the app. (Coming soon!)"
  },
  {
    icon: <BookOpenCheck size={32} />,
    title: "Reference Management",
    description: "Organize and cite your collected sources, export to BibTeX, and streamline academic referencing. (Coming soon!)"
  },
  {
    icon: <Users size={32} />,
    title: "Peer Collaborations",
    description: "Invite peers to collaborate on research projects in real time, share notes, and co-edit reports. (Coming soon!)"
  }
];

export default function FeaturesSection() {
  return (
    <>
      <section className="py-16 bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-violet-100 mb-4">Why ScholarAI?</h2>
          <p className="text-violet-400 mb-12">
            Simplify academic workflows — from discovery to dialogue.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map(f => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-violet-100 mb-4">Coming Soon</h2>
          <p className="text-violet-400 mb-12">
            We’re building more powerful tools to make your research workflow even smarter and more connected.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {comingSoon.map(f => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

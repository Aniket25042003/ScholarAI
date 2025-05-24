import { Eye, LayoutList, MessageSquare, Clock, Network, Users, Sparkles } from "lucide-react";

export default function ExampleOutputSection() {
  return (
    <section
      id="examples"
      className="py-16 bg-gradient-to-r from-purple-950 via-indigo-900 to-indigo-800"
    >
      <div className="container mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-6 text-violet-100">See ScholarAI in Action</h2>

        <div className="bg-indigo-950 p-8 rounded-lg shadow-lg max-w-2xl mx-auto mb-12 border border-purple-900">
          <p className="text-xs text-violet-400 mb-2">Sample topic:</p>
          <h3 className="text-2xl font-semibold text-violet-300 mb-4">
            machine learning in agriculture
          </h3>
          <div className="space-y-4 text-left">
            <div className="flex items-center">
              <Eye className="text-violet-400 mr-2" />
              <span className="font-medium text-violet-100">Literature fetched:</span>
              <span className="ml-2 text-violet-200">Top 3 papers automatically retrieved and summarized</span>
            </div>
            <div className="flex items-center">
              <LayoutList className="text-blue-300 mr-2" />
              <span className="font-medium text-violet-100">Report generated:</span>
              <span className="ml-2 text-violet-200">Full markdown academic report created</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-yellow-400 mr-2" />
              <span className="font-medium text-violet-100">Word count & read time:</span>
              <span className="ml-2 text-violet-200">1,234 words • 6 min read</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="text-green-400 mr-2" />
              <span className="font-medium text-violet-100">Chat enabled:</span>
              <span className="ml-2 text-violet-200">Ask follow-up questions in context</span>
            </div>
          </div>

          <div className="mt-8 text-left space-y-3">
            <div className="border-l-4 border-violet-600 pl-4">
              <div className="text-xs text-violet-400 mb-1">Example Research Report:</div>
              <div className="text-violet-100 whitespace-pre-line font-mono bg-indigo-900 rounded p-3 text-sm">
{`What the Research Is About

The selected literature explores the use of machine learning for optimizing crop yield, predicting soil moisture, and automating disease detection in agriculture.

What the Research Found

- Machine learning models significantly improved crop yield prediction accuracy.
- Deep learning methods outperformed traditional algorithms for early disease detection.
- Integrating IoT sensors with ML led to real-time, adaptive irrigation systems.

What Methodology Was Used

Researchers applied supervised learning, CNNs, and regression models to multi-year, sensor-driven datasets collected from agricultural test beds.

What Were the Conclusions

AI-powered tools drive productivity, reduce water waste, and enable precision farming but require robust, domain-specific datasets.

What Are the Future Enhancements or Gaps

Challenges remain in generalizing models across climates, integrating heterogeneous data sources, and addressing explainability in real-world deployments.
`}
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 mt-4">
              <div className="text-xs text-green-300 mb-1">Example Chat Q&A:</div>
              <div className="bg-green-950 rounded p-3 text-sm text-green-100">
                <span className="font-semibold text-green-300">You:</span> What are the future research gaps in this field?<br />
                <span className="font-semibold text-green-300">ScholarAI:</span> Future gaps include generalizing models to different crops and climates, improving model transparency, and developing standards for integrating IoT and ML systems at scale. Collaboration between domain experts and ML engineers will be key to progress.
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon features */}
        <div className="bg-indigo-950 p-8 rounded-lg shadow-lg max-w-3xl mx-auto border border-purple-900">
          <h4 className="text-xl font-bold mb-4 flex items-center justify-center gap-2 text-violet-100">
            <Sparkles className="text-yellow-400" /> Coming Soon
          </h4>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-violet-800 rounded-lg p-4 flex flex-col items-start bg-indigo-900">
              <div className="flex items-center mb-2">
                <Network className="text-violet-400 mr-2" />
                <span className="font-medium text-violet-100">Memory/Knowledge Graph</span>
                <span className="ml-2 text-xs px-2 py-0.5 bg-violet-900 text-violet-300 rounded">Preview</span>
              </div>
              <div className="text-violet-300 text-sm mb-2">
                Visualize connections between your research topics, papers, and insights.
              </div>
              <img 
                src="src/assets/demo-knowledge-graph.png"
                alt="Knowledge graph mockup"
                className="rounded border border-violet-800 mt-2 w-full"
                style={{ minHeight: 90, objectFit: "cover", background: "#262045" }}
              />
            </div>
            <div className="border border-blue-800 rounded-lg p-4 flex flex-col items-start bg-indigo-900">
              <div className="flex items-center mb-2">
                <Users className="text-blue-300 mr-2" />
                <span className="font-medium text-blue-100">Peer Collaborations</span>
                <span className="ml-2 text-xs px-2 py-0.5 bg-blue-900 text-blue-300 rounded">Preview</span>
              </div>
              <div className="text-blue-200 text-sm mb-2">
                Invite classmates or colleagues, share research projects, and co-edit reports in real time.
              </div>
              <img 
                src="src/assets/demo-collaboration.png"
                alt="Peer collaboration mockup"
                className="rounded border border-blue-800 mt-2 w-full"
                style={{ minHeight: 90, objectFit: "cover", background: "#23263a" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

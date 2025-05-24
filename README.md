# ScholarAI

![ScholarAI Banner](src/assets/banner-demo.png)

> **ScholarAI** is your AI-powered academic research dashboard designed to streamline your workflow—from literature search and summarization to research report generation and interactive Q&A. ScholarAI doesn’t just summarize papers; it remembers your research context, builds a knowledge graph, and enables deep, contextual conversations with your personal research assistant.

---

## 🚀 Features

- **📚 Literature Retrieval**
    - Automatically discover, fetch, and summarize the top-cited academic papers for any topic using AI-powered agents.

- **📝 Research Report Generation**
    - Instantly generate well-structured academic research reports in Markdown format, ready for further editing, sharing, or export.

- **🔢 Word Count & Read Time**
    - Get instant insights into report length and estimated read time for every research output.

- **💬 Contextual Q&A (Chat with Memory!)**
    - Ask in-depth, follow-up questions about your report. ScholarAI’s assistant retains context from your previous research and provides detailed, relevant, and document-grounded answers—no more repetitive copy-pasting!

- **🧠 Persistent Memory & Knowledge Graph (Coming Soon)**
    - ScholarAI will soon allow you to view, edit, and expand a visual knowledge graph representing the connections between your topics, papers, and insights.
        - Your research sessions, chats, and reports are stored for future context—enabling rich, multi-turn dialogues.
        - Seamlessly revisit, update, and extend past research without losing context.

        - Visualize and edit your academic “memory,” building a knowledge graph over time.

- **👥 Peer Collaboration (Coming Soon)**
    - Invite collaborators, share research projects, and co-edit reports in real time.

- **Dark Purple Theme**  
    - Enjoy a visually stunning, accessibility-minded interface with a deep purple gradient and modern UI.

---

## 🖼️ Demo

![ScholarAI Dashboard](src/assets/demo-dashboard.png)

**Try ScholarAI locally:**
```bash
# Clone the github repository
git clone https://github.com/yourusername/scholarai.git

# Run the backend
python -m venv venv && source venv/bin/activate
cd scholarai_backend
pip install -r requirements.txt
cp .env.example .env # Update API keys as needed
uvicorn app.main:app --reload

# Run the frontend (in a new terminal)
cd ../frontend
npm install
npm run dev
cd scholarai
```
Open http://localhost:5173 in your browser.

**Sample Workflow:**
1. Enter a research topic (e.g., “machine learning in agriculture”)
2. ScholarAI fetches, analyzes, and summarizes top academic papers.
3. Review a detailed Markdown report, check word count/read time, and download/copy results.
4. Ask follow-up questions in the chat panel for deeper exploration.

---
## 💡 How ScholarAI’s Memory & Contextual Q&A Work
- **Session Memory:** Every research topic, its summary, generated reports, and chat history are stored with your user profile. This enables “follow-up” conversations that actually reference your prior work.

- **Long-Term Memory:** ScholarAI uses Mem0 AI for persistent, cross-session memory, storing your research context, questions, and assistant answers.

- **Knowledge Graph (Preview):** Future versions will let you visualize, traverse, and edit the web of concepts, papers, and insights you’ve built—unlocking next-level literature review and idea management.

## 🌟 Coming Soon

- **Memory / Knowledge Graph**  
  Visualize, edit, and explore the relationships between research topics, papers, and concepts.

- **Editable Reports**  
  Annotate, highlight, or expand AI-generated reports directly in the app.

- **Reference Management**  
  Organize your sources, export citations to BibTeX, and manage your bibliography.

- **Peer Collaboration**  
  Invite classmates or colleagues, share projects, and co-edit research in real time.

---

## 🛠️ Tech Stack

- **Frontend:**  
  - [React + Vite](https://vite.dev/guide/)
  - [Tailwind CSS 4](https://tailwindcss.com/blog/tailwindcss-v4)
  - [Lucide React Icons](https://lucide.dev/)
  
  

- **Backend:**  
  - [FastAPI (Python) REST API](https://fastapi.tiangolo.com/)
  - [CrewAI Agents](https://github.com/joaomdmoura/crewAI)
  - [OpenAI GPT-4 API](https://openai.com/api/) (or any LLM with compatible API)
  - [Mem0](https://mem0.ai/) for long-term conversational memory

- **Other Tools:**  
  - [Serper API](https://serper.dev/?utm_term=serpapi&gad_source=1&gad_campaignid=18303173259&gbraid=0AAAAAo4ZGoHu351f-rQlKcAxScykRw3A1&gclid=CjwKCAjw3MXBBhAzEiwA0vLXQakni35cibcqvZfh1VMMdZGuUrXHIhXfxqnErRGdWkK9F1w2WvHmUxoCzy0QAvD_BwE) (Google Scholar scraping)
  - Docker-ready (add your own `Dockerfile` if needed)

---

## Roadmap
 - Literature retrieval & summarization (Implemented)

 - Markdown report generation (Implemented)

 - Contextual Q&A with memory (Implemented)

 - Research Report Export in .md format (Implemented)

 - Knowledge graph UI (edit/view relationships) (Coming Soon)

 - Editable reports with annotations (Coming Soon)

 - Peer collaboration (multi-user sessions) (Coming Soon)

 - Reference management and BibTeX export


## 📢 Feedback & Contribution
- This project is built for a Hackathon and in early active development!

- Found a bug? Open an issue.

- Want a feature? Start a discussion or PR.

## License
MIT License

Built with ❤️ by [Aniket Patel] — ScholarAI, 2025

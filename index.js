const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Centralized Portfolio Data
const PORTFOLIO_DATA = {
  experience: [
    {
      id: 1,
      role: 'Software Development Engineer -- I',
      company: 'PeopleStrong',
      location: 'Gurugram, India',
      period: 'Nov 2025 -- Present',
      team: 'Recruit & Onboarding Team',
      achievements: [
        'Actively driving backend development for high-volume recruitment workflows as an SDE-1 in the Recruit & Onboarding team following Scrum methodologies.',
        'Conceptualized and deployed scalable backend services using Java and Spring Boot, creating optimized RESTful APIs that reduced request processing time by 20%.',
        'Partnered on Angular frontend integration to support backend-driven features, streamlining the onboarding flow and decreasing page load time by 15%.',
        'Fortified application security by remediating 15+ critical vulnerabilities identified by Snyk (including DoS, RCE, SQL Injection, and XSS).'
      ],
      skills: ['Java', 'Spring Boot', 'Angular', 'Microservices', 'RESTful APIs', 'Snyk Security', 'Scrum']
    }
  ],
  skills: [
    { name: 'Java', svgPath: 'assets/icons/skills/java.svg', category: 'Backend', proficiency: 92, description: 'Object-oriented programming, multithreading, and core DSA foundation' },
    { name: 'Spring Boot', svgPath: 'assets/icons/skills/spring-boot.svg', category: 'Backend', proficiency: 90, description: 'Microservices, RESTful APIs, Spring Security, JPA, TaskExecutors' },
    { name: 'LangGraph & CrewAI', svgPath: 'assets/icons/skills/python.svg', category: 'AI/GenAI', proficiency: 88, description: 'Multi-agent AI pipelines, persistent state graphs, and autonomous workflows' },
    { name: 'LangChain & RAG', svgPath: 'assets/icons/skills/python.svg', category: 'AI/GenAI', proficiency: 88, description: 'Hybrid search (BM25 + dense vector RRF fusion), Cohere reranking' },
    { name: 'Python & FastAPI', svgPath: 'assets/icons/skills/python.svg', category: 'Programming', proficiency: 85, description: 'Asynchronous streaming web frameworks, ChromaDB, Pinecone' },
    { name: 'Angular', svgPath: 'assets/icons/skills/angularjs.svg', category: 'Frontend', proficiency: 84, description: 'RxJS, Standalone components, state management, enterprise UI' },
    { name: 'React.js & Redux', svgPath: 'assets/icons/skills/React.svg', category: 'Frontend', proficiency: 88, description: 'Component architectures, Redux Toolkit, real-time WebSocket UI' },
    { name: 'Redis', svgPath: 'assets/icons/skills/redis.svg', category: 'Database', proficiency: 82, description: 'High-concurrency caching layer for sub-100ms API response times' },
    { name: 'MySQL & PostgreSQL', svgPath: 'assets/icons/skills/mysql.svg', category: 'Database', proficiency: 85, description: 'Relational data modeling, schema indexing, and JPA ORM' },
    { name: 'MongoDB', svgPath: 'assets/icons/skills/mongodb.svg', category: 'Database', proficiency: 82, description: 'NoSQL document database for flexible scale applications' },
    { name: 'Docker & Kubernetes', svgPath: 'assets/icons/skills/docker.svg', category: 'DevOps', proficiency: 80, description: 'Containerization, microservices deployment, and orchestration' },
    { name: 'Kafka', svgPath: 'assets/icons/skills/kafka.svg', category: 'DevOps', proficiency: 75, description: 'Distributed event streaming platform for high-throughput pipelines' },
    { name: 'Node.js & Express', svgPath: 'assets/icons/skills/Nodedotjs.svg', category: 'Backend', proficiency: 85, description: 'Server-side JavaScript runtime environment' },
    { name: 'Tailwind CSS', svgPath: 'assets/icons/skills/tailwind-css.svg', category: 'Frontend', proficiency: 90, description: 'Utility-first CSS framework for responsive UI' },
    { name: 'C++', svgPath: 'assets/icons/skills/cpp3.svg', category: 'Programming', proficiency: 80, description: 'System programming, SFML, data structures and algorithms' },
    { name: 'Snyk & Security', svgPath: 'assets/icons/skills/github.svg', category: 'Tools', proficiency: 85, description: 'Vulnerability remediation (DoS, RCE, SQLi, XSS) and SAST' }
  ],
  certifications: [
    { id: 1, title: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023', credentialId: 'AWS-SAA-2023-001', verificationUrl: 'https://aws.amazon.com/verification', description: 'Demonstrates expertise in designing distributed systems on AWS platform.', skills: ['AWS', 'Cloud Architecture', 'EC2', 'S3', 'Lambda', 'RDS'], badgeUrl: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png' },
    { id: 2, title: 'Google Cloud Professional Developer', issuer: 'Google Cloud', date: '2023', credentialId: 'GCP-PD-2023-002', verificationUrl: 'https://cloud.google.com/certification/verify', description: 'Validates ability to design, build, and deploy applications on GCP.', skills: ['Google Cloud', 'Kubernetes', 'App Engine', 'Cloud Functions', 'BigQuery'], badgeUrl: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/12345' },
    { id: 3, title: 'Microsoft Azure Fundamentals', issuer: 'Microsoft', date: '2022', credentialId: 'AZ-900-2022-003', verificationUrl: 'https://docs.microsoft.com/en-us/learn/certifications/verify', description: 'Foundational knowledge of cloud services with Microsoft Azure.', skills: ['Azure', 'Cloud Computing', 'Virtual Machines', 'Storage', 'Networking'], badgeUrl: 'https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png' },
    { id: 4, title: 'Certified Kubernetes Administrator', issuer: 'CNCF', date: '2023', credentialId: 'CKA-2023-004', verificationUrl: 'https://training.linuxfoundation.org/certification/verify', description: 'Demonstrates skills required to be a successful Kubernetes Administrator.', skills: ['Kubernetes', 'Docker', 'Container Orchestration', 'DevOps', 'Linux'], badgeUrl: 'https://images.credly.com/size/340x340/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png' },
    { id: 5, title: 'Angular Certified Developer', issuer: 'Angular', date: '2023', credentialId: 'ANG-DEV-2023-005', description: 'Comprehensive understanding of Angular framework and TypeScript.', skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Testing', 'PWA'], badgeUrl: 'https://angular.io/assets/images/logos/angular/angular.png' },
    { id: 6, title: 'MongoDB Certified Developer', issuer: 'MongoDB University', date: '2022', credentialId: 'MDB-DEV-2022-006', verificationUrl: 'https://university.mongodb.com/verify_certificate', description: 'Proficiency in MongoDB database design and development.', skills: ['MongoDB', 'NoSQL', 'Database Design', 'Aggregation', 'Indexing'], badgeUrl: 'https://webimages.mongodb.com/_com_assets/cms/kuzt9r42or1fxvlq2-Meta_Generic.png' }
  ],
  education: [
    { id: 1, title: 'College (B.Tech)', subtitle: 'Electronics & Communication', institution: 'NITK Surathkal', period: '2021 - 2025', achievements: ['NITK Racing Member', 'Robotics & Embedded Systems'], dotColor: 'blue' },
    { id: 2, title: '12th Grade', subtitle: 'Senior Secondary (PCM)', institution: 'JNV Bengaluru Urban', period: '2018 - 2020', percentage: '90%', achievements: ['JEE-Advanced Qualified', 'School Topper'], dotColor: 'emerald' },
    { id: 3, title: '10th Grade', subtitle: 'Higher Secondary (PCM)', institution: 'JNV Mau', period: '2017 - 2018', percentage: '91%', achievements: ['Dakshana Scholar Selection'], dotColor: 'purple' },
    { id: 4, title: 'School Education', subtitle: 'Class 6th - 9th', institution: 'JNV Mau', period: '2013 - 2017', achievements: ['🏆 National Chess Champion (U-17)'], dotColor: 'amber' }
  ],
  projects: [
    {
      id: 1,
      title: 'CareSync',
      description: 'HIPAA-compliant healthcare system featuring Multi-LLM clinical diagnosis assistant, LLM symptom doctor recommendation engine, Java 21 thread-safe multithreading pipeline, WebSocket alerts, and sub-100ms Redis caching.',
      techStack: ['Spring Boot', 'Angular', 'Multi LLM AI', 'WebSocket', 'Redis', 'Supabase', 'Java 21'],
      liveUrl: 'https://caresync-vikrant.vercel.app/',
      githubUrl: 'https://github.com/vikrant48/careSync',
      iconType: 'heart',
      gradientClass: 'from-orange-500 to-red-500',
      hoverBorderClass: 'hover:border-orange-500/50',
      hoverTitleClass: 'group-hover:text-orange-300',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-doctor-typing-on-a-computer-43187-large.mp4',
      highlights: ['Multi-LLM Clinical Assistant & Doctor Booking', 'Java 21 Thread-Safe Multithreading Pipeline', 'HIPAA AES-256 Encryption & Sub-100ms Redis Cache']
    },
    {
      id: 2,
      title: 'CogniDocs',
      description: 'Agentic document intelligence Q&A platform built with LangGraph multi-agent pipeline (Extractor, Analyser, Q&A), production RAG (hybrid vector + BM25 search with Cohere reranking), and real-time WebSocket token streaming.',
      techStack: ['Python', 'LangChain', 'LangGraph', 'ChromaDB', 'FastAPI', 'WebSocket', 'Cohere'],
      liveUrl: 'https://github.com/vikrant48/pdf-rag-pipeline',
      githubUrl: 'https://github.com/vikrant48/pdf-rag-pipeline',
      iconType: 'video',
      gradientClass: 'from-blue-500 to-indigo-500',
      hoverBorderClass: 'hover:border-blue-500/50',
      hoverTitleClass: 'group-hover:text-blue-300',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-working-in-a-lab-42797-large.mp4',
      highlights: ['Multi-Agent LangGraph Pipeline (Extractor, Analyser, Q&A)', 'Hybrid RAG Search (Dense Vector + BM25 + Cohere Reranking)', 'Real-Time WebSocket Token Streaming UX']
    },
    {
      id: 3,
      title: 'VideoMela',
      description: 'Full-stack video streaming platform supporting 1000+ daily active users with RESTful APIs, JWT/Bcrypt security, Cloudinary media processing (30% upload latency reduction), and Redux Toolkit state management.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'Redux Toolkit'],
      liveUrl: 'https://video-mela.vercel.app/',
      githubUrl: 'https://github.com/vikrant48/Video_Mela_backend',
      iconType: 'video',
      gradientClass: 'from-red-500 to-pink-500',
      hoverBorderClass: 'hover:border-red-500/50',
      hoverTitleClass: 'group-hover:text-red-300',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-41554-large.mp4',
      highlights: ['1000+ Daily Active Users & RESTful APIs', 'Cloudinary Integration (30% Latency Reduction)', 'Redux Toolkit (25% Faster Page Rendering)']
    },
    {
      id: 4,
      title: 'NewsMela',
      description: 'A modern news application that fetches real-time news from various sources with category filtering and ultra-fast client-side rendering.',
      techStack: ['React', 'News API', 'Responsive UI'],
      liveUrl: 'https://news-mela-vikrants-projects-a97203d3.vercel.app/',
      githubUrl: 'https://github.com/vikrant48/NewsMela',
      iconType: 'news',
      gradientClass: 'from-green-500 to-emerald-500',
      hoverBorderClass: 'hover:border-green-500/50',
      hoverTitleClass: 'group-hover:text-green-300',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-working-on-a-laptop-computer-in-an-office-42796-large.mp4',
      highlights: ['Real-time News API Integration', 'Category Filtering & Instant Search', 'Ultra-fast Client Rendering']
    },
    {
      id: 5,
      title: 'Graph Algorithms Visualizer',
      description: 'Interactive visualization tool for graph algorithms including BFS, DFS, Dijkstra\'s, and shortest path finding.',
      techStack: ['C++', 'SFML', 'Algorithms'],
      liveUrl: 'https://graph-algo-visualizer.netlify.app',
      githubUrl: 'https://github.com/vikrant48/Graph_Algorithms_Visualizer',
      iconType: 'graph',
      gradientClass: 'from-purple-500 to-indigo-500',
      hoverBorderClass: 'hover:border-purple-500/50',
      hoverTitleClass: 'group-hover:text-purple-300',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41551-large.mp4',
      highlights: ['BFS & DFS Step-by-Step Visualization', 'Dijkstra Shortest Pathfinding', 'Custom Interactive Node Creation']
    }
  ]
};

const SYSTEM_PROMPT = `
You are the AI Assistant for Vikrant Chauhan's professional portfolio. 

About Vikrant Chauhan:
- Role: Software Development Engineer -- I at PeopleStrong (Recruit & Onboarding Team, Gurugram, India).
- Specialization: Java, Spring Boot, Microservices, Angular, and GenAI / LangGraph Agentic Systems.
- Background: Graduate of National Institute of Technology Karnataka (NITK) Surathkal (B.Tech in ECE, 2021-2025). 
- Contact: vikrantchauhan9794@gmail.com | +91-6386696764 | GitHub: vikrant48
- Key Achievements: Reduced backend request processing by 20%, decreased page load time by 15%, remediated 15+ Snyk security vulnerabilities, National Chess Champion (U-17).

Work Experience:
${PORTFOLIO_DATA.experience.map(exp => `- ${exp.role} at ${exp.company} (${exp.period}, ${exp.location}, Team: ${exp.team}):\n  ${exp.achievements.map(a => `• ${a}`).join('\n  ')}\n  Key Tech: ${exp.skills.join(', ')}`).join('\n\n')}

Technical Expertise:
${PORTFOLIO_DATA.skills.map(s => `- ${s.name} (${s.proficiency}%): ${s.description}`).join('\n')}

Certifications:
${PORTFOLIO_DATA.certifications.map(c => `- ${c.title} (${c.issuer}, ${c.date})`).join('\n')}

Key Projects:
${PORTFOLIO_DATA.projects.map(p => `${p.id}. ${p.title} (${p.techStack ? p.techStack.join(', ') : ''}):\n  - ${p.description}\n  - Highlights: ${p.highlights ? p.highlights.join('; ') : ''}\n  - Code: ${p.githubUrl || ''} | Live: ${p.liveUrl || ''}`).join('\n\n')}

Education Highlights:
${PORTFOLIO_DATA.education.map(e => `- ${e.title} from ${e.institution} (${e.period}) - ${e.grade || ''}`).join('\n')}

Guidelines for your responses:
- Tone: Professional, helpful, enthusiastic, and concise.
- Goal: Help visitors understand why Vikrant is a great hire or collaborator.
- Highlight his SDE-1 role at PeopleStrong, GenAI/LLM project CogniDocs, and production systems CareSync & VideoMela whenever relevant.
- If asked about his resume, mention it's available for download/preview in the "Resume" or "Projects" section.
`;

// Root & Health Check Endpoint
app.get(['/', '/api/health'], (req, res) => {
  const hasGroq = !!process.env.GROQ_API_KEY;
  const hasGemini = !!process.env.GEMINI_API_KEY;
  res.json({
    status: 'online',
    message: 'Vikrant Portfolio Backend Server is running!',
    resumeUrl: process.env.RESUME_URL || '',
    aiServices: {
      groqConfigured: hasGroq,
      geminiConfigured: hasGemini,
      activeEngine: hasGroq ? 'Groq API (groq/compound-mini)' : (hasGemini ? 'Gemini AI (gemini-2.5-flash)' : 'None')
    },
    timestamp: new Date().toISOString()
  });
});

// Endpoint to fetch all portfolio data
app.get('/api/portfolio-data', (req, res) => {
  res.json(PORTFOLIO_DATA);
});

// Endpoint to fetch dynamic configuration (like resume URL)
app.get('/api/config', (req, res) => {
  res.json({
    resumeUrl: process.env.RESUME_URL || ''
  });
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages format.' });
  }

  // 1. Try Primary: Groq API
  const groqApiKey = process.env.GROQ_API_KEY;
  if (groqApiKey) {
    try {
      console.log('Sending request to Groq API (Primary)...');
      const groqMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.filter(m => m.role !== 'system')
      ];

      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'groq/compound-mini',
          messages: groqMessages,
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      const groqData = await groqResponse.json();

      if (groqResponse.ok && groqData.choices && groqData.choices[0]) {
        const aiText = groqData.choices[0].message.content;
        return res.json({
          choices: [
            {
              message: {
                content: aiText
              }
            }
          ],
          provider: 'groq',
          statusMessage: '⚡ Connected to Groq API (groq/compound-mini)'
        });
      } else {
        console.warn('Groq API Error Response:', groqData);
      }
    } catch (groqError) {
      console.warn('Groq API failed or timed out. Falling back to Gemini AI...', groqError.message);
    }
  }

  // 2. Fallback: Gemini API
  if (process.env.GEMINI_API_KEY) {
    try {
      console.log('Sending request to Gemini API (Fallback)...');
      const contents = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

      const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: contents,
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          }
        })
      });

      const geminiData = await geminiResponse.json();

      if (geminiResponse.ok && geminiData.candidates && geminiData.candidates[0]) {
        const aiText = geminiData.candidates[0].content.parts[0].text;
        return res.json({
          choices: [
            {
              message: {
                content: aiText
              }
            }
          ],
          provider: 'gemini',
          statusMessage: '⚠️ Groq not connected. Using Gemini AI Fallback'
        });
      } else {
        console.error('Gemini API Error Response:', geminiData);
      }
    } catch (geminiError) {
      console.error('Gemini API Error:', geminiError.message);
      return res.status(500).json({
        error: 'Both Groq and Gemini AI services failed.',
        details: geminiError.message
      });
    }
  }

  return res.status(500).json({
    error: 'Neither GROQ_API_KEY nor GEMINI_API_KEY are configured on the server.'
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
  });
}

module.exports = app;

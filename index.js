const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Centralized Portfolio Data
const PORTFOLIO_DATA = {
  skills: [
    { name: 'JavaScript', svgPath: 'assets/icons/skills/Javascript.svg', category: 'Frontend', proficiency: 90, description: 'Modern ES6+ JavaScript for dynamic web applications' },
    { name: 'TypeScript', svgPath: 'assets/icons/skills/Typescript.svg', category: 'Frontend', proficiency: 85, description: 'Type-safe JavaScript for scalable applications' },
    { name: 'React', svgPath: 'assets/icons/skills/React.svg', category: 'Frontend', proficiency: 88, description: 'Component-based UI library for interactive interfaces' },
    { name: 'Angular', svgPath: 'assets/icons/skills/angularjs.svg', category: 'Frontend', proficiency: 82, description: 'Full-featured framework for enterprise applications' },
    { name: 'Tailwind CSS', svgPath: 'assets/icons/skills/tailwind-css.svg', category: 'Frontend', proficiency: 90, description: 'Utility-first CSS framework for rapid UI development' },
    { name: 'Node.js', svgPath: 'assets/icons/skills/Nodedotjs.svg', category: 'Backend', proficiency: 85, description: 'Server-side JavaScript runtime environment' },
    { name: 'Express.js', svgPath: 'assets/icons/skills/express.svg', category: 'Backend', proficiency: 88, description: 'Fast and minimalist web framework for Node.js' },
    { name: 'MongoDB', svgPath: 'assets/icons/skills/mongodb.svg', category: 'Database', proficiency: 80, description: 'NoSQL document database for flexible data storage' },
    { name: 'MySQL', svgPath: 'assets/icons/skills/mysql.svg', category: 'Database', proficiency: 75, description: 'Relational database management system' },
    { name: 'Redis', svgPath: 'assets/icons/skills/redis.svg', category: 'Database', proficiency: 70, description: 'In-memory data structure store for caching' },
    { name: 'Java', svgPath: 'assets/icons/skills/java.svg', category: 'Backend', proficiency: 78, description: 'Object-oriented programming language for enterprise solutions' },
    { name: 'Spring Boot', svgPath: 'assets/icons/skills/spring-boot.svg', category: 'Backend', proficiency: 75, description: 'Java framework for building microservices' },
    { name: 'Kafka', svgPath: 'assets/icons/skills/kafka.svg', category: 'DevOps', proficiency: 72, description: 'Distributed event streaming platform for high-throughput pipelines' },
    { name: 'GitHub', svgPath: 'assets/icons/skills/github.svg', category: 'Tools', proficiency: 90, description: 'Version control and collaborative development platform' },
    { name: 'Docker', svgPath: 'assets/icons/skills/docker.svg', category: 'DevOps', proficiency: 72, description: 'Containerization platform for application deployment' },
    { name: 'Postman', svgPath: 'assets/icons/skills/postman.svg', category: 'Tools', proficiency: 85, description: 'API development and testing tool' },
    { name: 'VS Code', svgPath: 'assets/icons/skills/vs-code.svg', category: 'Tools', proficiency: 95, description: 'Powerful code editor with extensive extensions' },
    { name: 'C++', svgPath: 'assets/icons/skills/cpp3.svg', category: 'Programming', proficiency: 80, description: 'High-performance programming language for system development' },
    { name: 'Cloudinary', svgPath: 'assets/icons/skills/Cloudinary.svg', category: 'Cloud', proficiency: 75, description: 'Cloud-based image and video management service' },
    { name: 'Vercel', svgPath: 'assets/icons/skills/vercel.svg', category: 'Cloud', proficiency: 80, description: 'Frontend deployment platform with global CDN' }
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
    { id: 1, title: 'Bachelor of Technology', subtitle: 'Electronics and Communication Engineering', institution: 'NITK Surathkal', period: '2021 - 2025', achievements: ['NITK Racing'], dotColor: 'blue' },
    { id: 2, title: '12th Grade', subtitle: 'Science (PCM)', institution: 'JNV Bengaluru Urban', period: '2018 - 2020', percentage: '90%', achievements: ['JEE-Advanced Qualified'], dotColor: 'green' },
    { id: 3, title: '10th Grade', subtitle: 'Secondary Education', institution: 'JNV Mau', period: '2017 - 2018', percentage: '91%', achievements: ['Dakshana Qualified'], dotColor: 'orange' },
    { id: 4, title: '6th - 9th Grade', subtitle: 'Secondary Education', institution: 'JNV Mau', period: '2013 - 2017', achievements: ['🏆 National Chess Champion (U-17)'], dotColor: 'purple' }
  ],
  projects: [
    {
      id: 1,
      title: 'VideoMela',
      description: 'A comprehensive video streaming platform with user authentication, video upload, and real-time comments.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Docker'],
      liveUrl: 'https://video-mela.vercel.app/',
      githubUrl: 'https://github.com/vikrant48/Video_Mela_backend',
      iconType: 'video',
      gradientClass: 'from-red-500 to-pink-500',
      hoverBorderClass: 'hover:border-red-500/50',
      hoverTitleClass: 'group-hover:text-red-300'
    },
    {
      id: 2,
      title: 'CareSync',
      description: 'Comprehensive healthcare management system with patient data management and appointment scheduling.',
      techStack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Docker'],
      liveUrl: 'https://caresync-vikrant.vercel.app/',
      githubUrl: 'https://github.com/vikrant48/careSync',
      iconType: 'heart',
      gradientClass: 'from-orange-500 to-red-500',
      hoverBorderClass: 'hover:border-orange-500/50',
      hoverTitleClass: 'group-hover:text-orange-300'
    },
    {
      id: 3,
      title: 'NewsMela',
      description: 'A modern news application that fetches real-time news from various sources with category filtering.',
      techStack: ['React', 'News API', 'Responsive'],
      liveUrl: 'https://news-mela-vikrants-projects-a97203d3.vercel.app/',
      githubUrl: 'https://github.com/vikrant48/NewsMela',
      iconType: 'news',
      gradientClass: 'from-green-500 to-emerald-500',
      hoverBorderClass: 'hover:border-green-500/50',
      hoverTitleClass: 'group-hover:text-green-300'
    },
    {
      id: 4,
      title: 'Graph Algorithms Visualizer',
      description: 'Interactive visualization tool for graph algorithms including BFS, DFS, Dijkstra\'s, and more.',
      techStack: ['C++', 'SFML', 'Algorithms'],
      liveUrl: 'https://graph-algo-visualizer.netlify.app',
      githubUrl: 'https://github.com/vikrant48/Graph_Algorithms_Visualizer',
      iconType: 'graph',
      gradientClass: 'from-purple-500 to-indigo-500',
      hoverBorderClass: 'hover:border-purple-500/50',
      hoverTitleClass: 'group-hover:text-purple-300'
    }
  ]
};

// System prompt giving Gemini context about Vikrant
const SYSTEM_PROMPT = `
You are the AI Assistant for Vikrant Chauhan's professional portfolio. 

About Vikrant Chauhan:
- Background: Graduate of National Institute of Technology Karnataka (NITK) Surathkal (Class of 2025). 
- Role: Full Stack Developer & Problem Solver with 2+ years of experience.
- Location: Gurugram, India.
- Notable Achievement: National Chess Champion (U-17).

Technical Expertise:
${PORTFOLIO_DATA.skills.map(s => `- ${s.name} (${s.proficiency}%): ${s.description}`).join('\n')}

Certifications:
${PORTFOLIO_DATA.certifications.map(c => `- ${c.title} (${c.issuer}, ${c.date})`).join('\n')}

Key Projects:
${PORTFOLIO_DATA.projects.map(p => `${p.id}. ${p.title}: ${p.description}`).join('\n')}

Education Highlights:
${PORTFOLIO_DATA.education.map(e => `- ${e.title} from ${e.institution} (${e.period})`).join('\n')}

Guidelines for your responses:
- Tone: Professional, helpful, enthusiastic, and concise.
- Goal: Help visitors understand why Vikrant is a great hire or collaborator.
- If asked about his resume, mention it's available for download/preview in the "Resume" or "Projects" section.
`;

// Endpoint to fetch all portfolio data
app.get('/api/portfolio-data', (req, res) => {
  res.json(PORTFOLIO_DATA);
});

// Endpoint to fetch dynamic configuration (like resume URL)
app.get('/api/config', (req, res) => {
  res.json({
    resumeUrl: process.env.RESUME_URL || 'assets/resume/vikrant_resume_NITK.pdf'
  });
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key not configured on server.' });
  }

  try {
    // Translate OpenAI-style messages to Gemini-style contents
    const contents = messages
      .filter(m => m.role !== 'system') // Gemini uses system_instruction for system role
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(geminiUrl, {
      contents: contents,
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      }
    });

    // Translate Gemini response back to OpenAI-style for the frontend
    const aiText = response.data.candidates[0].content.parts[0].text;

    // We mock the OpenAI response structure to keep frontend changes minimal
    const mockOpenAIResponse = {
      choices: [
        {
          message: {
            content: aiText
          }
        }
      ]
    };

    res.json(mockOpenAIResponse);
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to communicate with Gemini AI.',
      details: error.response?.data || error.message
    });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
  });
}

module.exports = app;

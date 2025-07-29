import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import openaiService from '../openaiService';
import PDFViewer from './PDFViewer';

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [chatInput, setChatInput] = useState('');
  const [chatContent, setChatContent] = useState(null);
  const [showChatResponse, setShowChatResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    '/asset/photo.jpeg',
    '/asset/photo_1.jpg',
    '/asset/photo_2.jpg',
    '/asset/photo_3.png',
    '/asset/photo_4.png',
    '/asset/photo_5.png'
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 500);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading || isStreaming) return;

    const question = chatInput.trim();
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingContent('');
    setChatInput('');
    
    // Set up the initial chat content with the question
    setChatContent({
      type: 'ai_response',
      question: question,
      answer: '',
      formattedAnswer: ''
    });
    setShowChatResponse(true);
    setIsLoading(false);

    try {
      const response = await openaiService.askQuestion(question);
      setChatContent(prev => ({
        ...prev,
        answer: response.raw,
        formattedAnswer: response.formatted
      }));
    } catch (error) {
      console.error('Error getting AI response:', error);
      setChatContent(prev => ({
        ...prev,
        answer: 'Sorry, I encountered an error while processing your question. Please try again later.',
        formattedAnswer: 'Sorry, I encountered an error while processing your question. Please try again later.'
      }));
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleChatSubmit(e);
    }
  };

  return (
    <div className="bg-black h-screen w-full max-h-screen max-w-full overflow-hidden relative">
      {/* SEO-friendly navigation */}
      <nav className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowPDFViewer(true)}
            className="inline-flex items-center px-3 py-2 bg-white hover:bg-gray-100 text-black text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="View Mojila's portfolio resume"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </button>
          <Link 
            to="/about"
            className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Learn more about Mojila's portfolio"
          >
            About Me
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <img 
            src="/asset/logo.jpg" 
            alt="Mojila Logo" 
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-12 md:h-12 rounded-full object-cover shadow-lg border-2 border-white"
            loading="lazy"
          />
        </div>
      </nav>

      {/* Mouse Following Background Effects */}
      <div 
        className="absolute pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div 
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, rgba(147, 51, 234, 0.04) 50%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div 
        className="absolute pointer-events-none transition-all duration-700 ease-out"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      
      {/* Video Resume - Hidden on mobile, bottom-left on desktop */}
      <div className="hidden md:block absolute md:bottom-4 md:left-4 z-10">
        <video 
          className="w-32 h-24 sm:w-40 sm:h-30 md:w-48 md:h-36 rounded-lg shadow-lg"
          controls
          preload="metadata"
          aria-label="Mojila's portfolio video resume"
        >
          <source src="/asset/video-resume.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Main Content */}
       <main className="h-full flex items-center justify-center">
         <div className="text-white text-center px-4 sm:px-6 md:px-8 max-w-2xl w-full">
            <header>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                 Mojila Portfolio
               </h1>
            </header>
             
            {/* Portfolio Overview Section */}
            <section>
              <h2 className="sr-only">Portfolio Overview</h2>
              {/* Photo Slideshow */}
              <div className="mb-6 flex justify-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                     src={images[currentImageIndex]}
                     alt={`Mojila portfolio photo ${currentImageIndex + 1}`}
                     className="w-full h-full object-cover transition-opacity duration-300"
                     style={{
                       opacity: 1
                     }}
                     loading="lazy"
                   />
                </div>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-8">
                Full-Stack Developer & Technical Leader - Resume & Ask Questions
              </p>
            </section>
            
            {/* Interactive Chat Section */}
            <section>
              <h2 className="sr-only">Interactive Chat</h2>
              <form onSubmit={handleChatSubmit} className="mb-6 relative">
                <label htmlFor="chat-input" className="sr-only">Ask me anything about my portfolio and resume</label>
                <input
                  id="chat-input"
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about my portfolio & resume... 🚀"
                  disabled={isLoading || isStreaming}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button 
                  type="submit"
                  disabled={isLoading || isStreaming || !chatInput.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-md transition-colors duration-200"
                  aria-label="Submit question"
                >
                  {(isLoading || isStreaming) ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : '🚀'}
                </button>
              </form>
              
              {/* Quick Actions */}
              <div>
                <h3 className="sr-only">Quick Actions - Ask About Portfolio & Resume</h3>
                <div className="flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => {
                    setChatContent({
                      type: 'about',
                      photo: '/asset/photo.jpeg',
                      text: "I'm Mojila alias Moch. Aji Laksono, a passionate Technical Leader and Full-Stack Developer with over 6 years of experience in building scalable web applications, backend systems, and developer infrastructure. I've led engineering teams in both startup and enterprise environments, with a strong focus on clean architecture, DevOps automation, and system reliability. My expertise includes Go, Node.js, GCP, CI/CD, and microservices.\n\nI've delivered critical solutions in fintech, real estate, and industrial automation—ranging from payroll systems for 10,000+ users to automated bank payment verification using SMS banking. I thrive on mentoring developers, solving complex problems, and continuously learning new technologies."
                    });
                    setShowChatResponse(true);
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-gray-100 rounded-full text-black text-sm font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                  aria-label="Learn about Mojila"
                >
                  About Me
                </button>
                <button 
                  onClick={() => {
                    setChatContent({
                      type: 'skills',
                      text: `I'm a passionate Backend & Full-Stack Developer with 6+ years of experience building scalable, high-performance systems. My expertise spans across multiple programming languages and technologies:\n\n🚀 Programming Languages: Go (Golang), Node.js, Rust, Dart\n💾 Databases: PostgreSQL, MongoDB, MySQL, Redis\n🛠️ Tools & Technologies: Docker, Git, CI/CD, GitHub Copilot\n☁️ Cloud Platforms: Google Cloud Platform (GCP), AWS\n\n💡 What sets me apart:\n• Strong problem-solving skills with a focus on clean, maintainable code\n• Experience leading technical teams and mentoring junior developers\n• Proven track record of optimizing system performance and scalability\n• Passionate about staying current with emerging technologies\n• Excellent collaboration skills working with cross-functional teams\n\nI thrive in fast-paced environments where I can combine technical expertise with strategic thinking to deliver robust solutions that drive business growth.`
                    });
                    setShowChatResponse(true);
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-gray-100 rounded-full text-black text-sm font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                  aria-label="View Mojila's skills"
                >
                  Skills
                </button>
                <button 
                  className="px-3 py-1.5 bg-white hover:bg-gray-100 rounded-full text-black text-sm font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    setChatContent({
                      type: 'work',
                      experiences: [
                        {
                          company: 'Deall Jobs (Dealls.com & Kantorku.id)',
                          position: 'Technical Leader & Back-End Specialist',
                          location: 'Remote',
                          period: 'May 2022 – July 2025',
                          description: 'At Deall Jobs, I served as a Technical Leader responsible for system architecture, backend scalability, and engineering team performance across two platforms. My role combined hands-on coding with high-level technical strategy and team leadership.',
                          achievements: [
                            { icon: '🚀', text: 'Led the architecture and maintenance of scalable development environments, reducing new developer onboarding time by 30%.' },
                            { icon: '💰', text: 'Owned mission-critical payroll systems serving 10,000+ employees, achieving 99.99% uptime and full compliance with financial regulations.' },
                            { icon: '🐛', text: 'Resolved 100% of high-priority bugs within SLA deadlines; implemented proactive alerting and monitoring using Google Cloud Platform (GCP) to reduce system downtime by 25%.' },
                            { icon: '⚡', text: 'Drove Agile practices including sprint planning and backlog grooming, aligning engineering with Product, UX, and QA teams.' },
                            { icon: '🧪', text: 'Spearheaded the migration to automated testing, improving processing speed by 40% and eliminating 90% of manual errors.' },
                            { icon: '✨', text: 'Introduced company-wide standards for clean code, reviews, and SonarQube integration, increasing overall code quality by 35%.' },
                            { icon: '📦', text: 'Accelerated delivery pipelines by 20% through reusable templates, Golang CI Lint, and integration of GitHub Copilot.' },
                            { icon: '👨‍🏫', text: 'Mentored 8+ junior engineers, promoting clean architecture, debugging best practices, and system design fundamentals.' }
                          ]
                        },
                        {
                          company: 'Machine Vision Indonesia',
                          position: 'Technical Leader',
                          location: 'Surabaya',
                          period: 'August 2018 – May 2022',
                          description: 'As a Technical Leader at Machine Vision Indonesia, I led the Core Services Division, managing backend architecture and cloud infrastructure for industrial machine vision solutions.',
                          achievements: [
                            { icon: '🏗️', text: 'Architected and implemented microservice-based systems to improve modularity, scalability, and code maintainability across product lines.' },
                            { icon: '🔄', text: 'Led a full DevOps transformation by introducing CI/CD pipelines, containerization, and infrastructure management on AWS and on-premise environments.' },
                            { icon: '⚡', text: 'Reduced deployment time by 60% by automating build and release processes across environments.' },
                            { icon: '📋', text: 'Standardized the technology stack and development practices, significantly improving team efficiency and onboarding experience.' },
                            { icon: '🏆', text: 'Recognized company-wide as the "Most Inspirational Person" for leadership, innovation, and team development impact.' },
                            { icon: '🌱', text: 'Fostered a learning-oriented engineering culture through ongoing mentorship, code reviews, and internal workshops.' }
                          ]
                        }
                      ]
                    });
                    setShowChatResponse(true);
                  }}
                  aria-label="View Mojila's work experience"
                >
                  Work Experiences
                </button>
                <button 
                  className="px-3 py-1.5 bg-white hover:bg-gray-100 rounded-full text-black text-sm font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    setChatContent({
                      type: 'projects',
                      projects: [
                        {
                          title: 'Omni-Channel CRM for Real Estate Company',
                          role: 'Freelance Full-Stack Developer',
                          location: 'Remote',
                          period: 'Mar 2022 – May 2022',
                          description: 'Built a custom communication platform to unify Gmail and WhatsApp messaging channels for a real estate sales team, enabling faster and more efficient customer engagement.',
                          features: [
                            { icon: '📧', text: 'Integrated Gmail and WhatsApp APIs to provide a centralized interface for managing client conversations.' },
                            { icon: '👥', text: 'Developed agent assignment logic and unified customer profiles with full message history tracking.' },
                            { icon: '⚡', text: 'Enabled real-time notifications and templated auto-responses, reducing agent response time by 40%.' },
                            { icon: '🚀', text: 'Built using Node.js, React, MongoDB, and Express, deployed via Docker on a cloud server.' }
                          ]
                        },
                        {
                          title: 'Automated Bank Transfer Verification System',
                          role: 'Freelance Full-Stack Developer',
                          location: 'Remote',
                          period: 'Mar 2022',
                          description: 'Designed a webhook-based auto-verification tool that connects SMS banking via a 3G modem to a custom online bookstore platform, enabling real-time transaction confirmation without manual input.',
                          features: [
                            { icon: '📱', text: 'Used a 3G modem to receive and parse incoming SMS banking notifications.' },
                            { icon: '🔍', text: 'Created a matching system to reconcile SMS messages with pending orders via transaction ID, amount, and timestamp.' },
                            { icon: '✅', text: 'Automatically updated order status upon verified payments, reducing manual verification workload by 90%.' },
                            { icon: '🛠️', text: 'Built with PHP and MariaDB, integrated with a custom CMS and admin dashboard for payment logging.' }
                          ]
                        }
                      ]
                    });
                    setShowChatResponse(true);
                  }}
                >
                  Projects
                </button>
                <button 
                  className="px-3 py-1.5 bg-white hover:bg-gray-100 rounded-full text-black text-sm font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    setChatContent({
                      type: 'contacts',
                      contacts: {
                        location: 'Surabaya, Indonesia',
                        phone: '+62 858 9290 9639',
                        email: 'me.mojila@gmail.com',
                        linkedin: 'linkedin.com/in/mojila',
                        github: 'github.com/mojila'
                      }
                    });
                    setShowChatResponse(true);
                  }}
                  aria-label="View Mojila's contact information"
                >
                  Contacts
                </button>
                </div>
              </div>
            </section>
         </div>
        </main>
        
        {/* Chat Response Interface - keeping the existing implementation */}
        {showChatResponse && (
          <section>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-fade-in-up">
                {/* Chat Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <h2 className="text-white text-lg font-semibold">Chat Response</h2>
                  <button 
                    onClick={() => setShowChatResponse(false)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label="Close chat response"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              
              {/* Chat Content - keeping all existing chat content implementations */}
               <div className="p-6">
                 {/* All existing chat content implementations remain the same */}
                 {chatContent && chatContent.type === 'about' && (
                   <div className="animate-fade-in">
                     <div className="flex flex-col md:flex-row gap-6 items-start">
                       {/* Photo */}
                       <div className="flex-shrink-0">
                         <img 
                           src={chatContent.photo}
                           alt="Mojila Photo"
                           className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg animate-fade-in"
                           loading="lazy"
                         />
                       </div>
                       
                       {/* Text Content */}
                       <div className="flex-1">
                         <div className="bg-gray-800 rounded-lg p-4 text-white animate-slide-in-right">
                           <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">
                             {chatContent.text}
                           </p>
                         </div>
                       </div>
                     </div>
                       
                     {/* Bottom Close Button */}
                     <div className="mt-6 flex justify-between items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
                       <span className="text-gray-400 text-sm font-medium">
                         Supported by Deepseek R1 🐳 (free 🤣)
                       </span>
                       <button
                         onClick={() => setShowChatResponse(false)}
                         className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                       >
                         ✕ Close
                       </button>
                     </div>
                   </div>
                 )}
                 
                 {chatContent && chatContent.type === 'skills' && (
                   <div className="animate-fade-in">
                     {/* Header */}
                     <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-4 text-white mb-6">
                       <h4 className="text-lg md:text-xl font-bold mb-2 flex items-center">
                       <span className="mr-2">🚀</span>
                       Technical Skills & Expertise
                     </h4>
                       <p className="text-green-100">My technical arsenal for building scalable solutions</p>
                     </div>
                     
                     {/* Skills Content */}
                     <div className="bg-gray-800 rounded-lg p-4 text-white animate-slide-in-left">
                       <p className="text-sm md:text-base leading-relaxed whitespace-pre-line mb-6">
                         {chatContent.text}
                       </p>
                       
                       {/* Technology Icons Grid */}
                       <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mt-6">
                         {[
                           { name: 'Go', icon: '🐹' },
                           { name: 'Node.js', icon: '🟢' },
                           { name: 'React', icon: '⚛️' },
                           { name: 'PostgreSQL', icon: '🐘' },
                           { name: 'MongoDB', icon: '🍃' },
                           { name: 'Docker', icon: '🐳' },
                           { name: 'GCP', icon: '☁️' },
                           { name: 'Git', icon: '📝' },
                           { name: 'Redis', icon: '🔴' },
                           { name: 'Rust', icon: '🦀' },
                           { name: 'Dart', icon: '🎯' },
                           { name: 'AWS', icon: '🌩️' }
                         ].map((tech, index) => (
                           <div key={tech.name} className="bg-gray-700 rounded-lg p-3 text-center hover:bg-gray-600 transition-colors animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                             <div className="text-2xl mb-1">{tech.icon}</div>
                             <div className="text-xs text-gray-300">{tech.name}</div>
                           </div>
                         ))}
                       </div>
                     </div>
                     
                     {/* Bottom Close Button */}
                     <div className="mt-6 flex justify-between items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
                       <span className="text-gray-400 text-sm font-medium">
                         Supported by Deepseek R1 🐳
                       </span>
                       <button
                         onClick={() => setShowChatResponse(false)}
                         className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                       >
                         ✕ Close
                       </button>
                     </div>
                   </div>
                 )}
                 
                 {chatContent && chatContent.type === 'work' && (
                   <div className="animate-fade-in">
                     {/* Header */}
                     <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 text-white mb-6">
                       <h4 className="text-lg md:text-xl font-bold mb-2 flex items-center">
                       <span className="mr-2">💼</span>
                       Professional Experience
                     </h4>
                       <p className="text-purple-100">My journey as a Technical Leader and Full-Stack Developer</p>
                     </div>
                     
                     {/* Experience Cards */}
                     <div className="space-y-6">
                       {chatContent.experiences.map((exp, index) => (
                         <div key={index} className="bg-gray-800 rounded-lg p-6 animate-slide-in-left" style={{animationDelay: `${index * 0.2}s`}}>
                           {/* Company Header */}
                           <div className="border-b border-gray-700 pb-4 mb-4">
                             <h5 className="text-white text-lg font-bold">{exp.company}</h5>
                             <p className="text-blue-400 font-semibold">{exp.position}</p>
                             <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-300">
                               <span>📍 {exp.location}</span>
                               <span>📅 {exp.period}</span>
                             </div>
                           </div>
                           
                           {/* Description */}
                           <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                             {exp.description}
                           </p>
                           
                           {/* Key Achievements */}
                           <div className="space-y-3">
                             <h6 className="text-white font-semibold text-sm mb-3">🏆 Key Achievements:</h6>
                             {exp.achievements.map((achievement, achIndex) => (
                               <div key={achIndex} className="flex items-start gap-3 text-sm animate-fade-in" style={{animationDelay: `${(index * 0.2) + (achIndex * 0.1)}s`}}>
                                 <span className="text-lg flex-shrink-0">{achievement.icon}</span>
                                 <p className="text-gray-300 leading-relaxed">{achievement.text}</p>
                               </div>
                             ))}
                           </div>
                         </div>
                       ))}
                     </div>
                     
                     {/* Bottom Close Button */}
                     <div className="mt-6 flex justify-between items-center animate-fade-in" style={{animationDelay: '0.6s'}}>
                       <span className="text-gray-400 text-sm font-medium">
                         Supported by Deepseek R1 🐳
                       </span>
                       <button
                         onClick={() => setShowChatResponse(false)}
                         className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                       >
                         ✕ Close
                       </button>
                     </div>
                   </div>
                 )}
                 
                 {chatContent && chatContent.type === 'projects' && (
                   <div className="animate-fade-in">
                     {/* Header */}
                     <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-4 text-white mb-6">
                       <h4 className="text-lg md:text-xl font-bold mb-2 flex items-center">
                       <span className="mr-2">🚀</span>
                       Featured Projects
                     </h4>
                       <p className="text-orange-100">Real-world solutions I've built for clients</p>
                     </div>
                     
                     {/* Project Cards */}
                     <div className="space-y-6">
                       {chatContent.projects.map((project, index) => (
                         <div key={index} className="bg-gray-800 rounded-lg p-6 animate-slide-in-left" style={{animationDelay: `${index * 0.2}s`}}>
                           {/* Project Header */}
                           <div className="border-b border-gray-700 pb-4 mb-4">
                             <h5 className="text-white text-lg font-bold">{project.title}</h5>
                             <p className="text-orange-400 font-semibold">{project.role}</p>
                             <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-300">
                               <span>📍 {project.location}</span>
                               <span>📅 {project.period}</span>
                             </div>
                           </div>
                           
                           {/* Description */}
                           <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                             {project.description}
                           </p>
                           
                           {/* Key Features */}
                           <div className="space-y-3">
                             <h5 className="text-white font-semibold text-sm mb-3">✨ Key Features:</h5>
                             {project.features.map((feature, featIndex) => (
                               <div key={featIndex} className="flex items-start gap-3 text-sm animate-fade-in" style={{animationDelay: `${(index * 0.2) + (featIndex * 0.1)}s`}}>
                                 <span className="text-lg flex-shrink-0">{feature.icon}</span>
                                 <p className="text-gray-300 leading-relaxed">{feature.text}</p>
                               </div>
                             ))}
                           </div>
                         </div>
                       ))}
                     </div>
                     
                     {/* Bottom Close Button */}
                     <div className="mt-6 flex justify-between items-center animate-fade-in" style={{animationDelay: '0.6s'}}>
                       <span className="text-gray-400 text-sm font-medium">
                         Supported by Deepseek R1 🐳
                       </span>
                       <button
                         onClick={() => setShowChatResponse(false)}
                         className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                       >
                         ✕ Close
                       </button>
                     </div>
                   </div>
                 )}
                 
                 {chatContent && chatContent.type === 'contacts' && (
                   <div className="animate-fade-in">
                     {/* Header */}
                     <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white mb-6">
                       <h4 className="text-lg md:text-xl font-bold mb-2 flex items-center">
                       <span className="mr-2">📞</span>
                       Let's Connect!
                     </h4>
                       <p className="text-purple-100">I'm always open to discussing new opportunities, collaborations, or just having a tech chat!</p>
                     </div>
                     
                     {/* Contact Cards */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {/* Location */}
                       <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors animate-slide-in-left">
                         <div className="flex items-center gap-3">
                           <div className="text-2xl">📍</div>
                           <div>
                             <h5 className="text-white font-semibold">Location</h5>
                             <p className="text-gray-300 text-sm">{chatContent.contacts.location}</p>
                           </div>
                         </div>
                       </div>
                       
                       {/* Phone */}
                       <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors animate-slide-in-right">
                         <div className="flex items-center gap-3">
                           <div className="text-2xl">📱</div>
                           <div>
                             <h5 className="text-white font-semibold">Phone</h5>
                             <a href={`tel:${chatContent.contacts.phone}`} className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                               {chatContent.contacts.phone}
                             </a>
                           </div>
                         </div>
                       </div>
                       
                       {/* Email */}
                       <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors animate-slide-in-left" style={{animationDelay: '0.1s'}}>
                         <div className="flex items-center gap-3">
                           <div className="text-2xl">📧</div>
                           <div>
                             <h5 className="text-white font-semibold">Email</h5>
                             <a href={`mailto:${chatContent.contacts.email}`} className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                               {chatContent.contacts.email}
                             </a>
                           </div>
                         </div>
                       </div>
                       
                       {/* LinkedIn */}
                       <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors animate-slide-in-right" style={{animationDelay: '0.1s'}}>
                         <div className="flex items-center gap-3">
                           <div className="text-2xl">💼</div>
                           <div>
                             <h5 className="text-white font-semibold">LinkedIn</h5>
                             <a href={`https://${chatContent.contacts.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                               {chatContent.contacts.linkedin}
                             </a>
                           </div>
                         </div>
                       </div>
                       
                       {/* GitHub */}
                       <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors animate-slide-in-left md:col-span-2" style={{animationDelay: '0.2s'}}>
                         <div className="flex items-center gap-3">
                           <div className="text-2xl">💻</div>
                           <div>
                             <h5 className="text-white font-semibold">GitHub</h5>
                             <a href={`https://${chatContent.contacts.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                               {chatContent.contacts.github}
                             </a>
                           </div>
                         </div>
                       </div>
                     </div>
                     
                     {/* Call to Action */}
                     <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
                       <p className="text-white mb-3">Ready to start a conversation?</p>
                       <div className="flex flex-col sm:flex-row gap-3 justify-center">
                         <a 
                           href={`mailto:${chatContent.contacts.email}?subject=Let's Connect!&body=Hi Mojila, I'd love to discuss...`}
                           className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                         >
                           📧 Send Email
                         </a>
                         <a 
                           href={`https://${chatContent.contacts.linkedin}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                         >
                           💼 Connect on LinkedIn
                         </a>
                       </div>
                     </div>
                     
                     {/* Bottom Close Button */}
                     <div className="mt-6 flex justify-between items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
                       <span className="text-gray-400 text-sm font-medium">
                         Supported by Deepseek R1 🐳
                       </span>
                       <button
                         onClick={() => setShowChatResponse(false)}
                         className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                       >
                         ✕ Close
                       </button>
                     </div>
                   </div>
                 )}
                 
                 {chatContent && chatContent.type === 'ai_response' && (
                   <div className="animate-fade-in">
                     {/* Question */}
                     <div className="bg-blue-600 rounded-lg p-4 text-white mb-4 animate-slide-in-right">
                       <div className="flex items-start gap-3">
                         <div className="text-xl flex-shrink-0 mt-0.5">❓</div>
                         <div>
                           <h5 className="font-semibold mb-2">Your Question:</h5>
                           <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                             {chatContent.question}
                           </p>
                         </div>
                       </div>
                     </div>
                     
                     {/* AI Response */}
                     <div className="bg-gray-800 rounded-lg p-4 text-white animate-slide-in-left">
                       <div className="flex items-start gap-3">
                         <div className="text-xl flex-shrink-0 mt-0.5">🤖</div>
                         <div className="flex-1">
                           <h5 className="font-semibold mb-2 text-green-400 flex items-center gap-2">
                             AI Assistant:
                             {isStreaming && (
                               <div className="flex items-center gap-1">
                                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                               </div>
                             )}
                           </h5>
                           <div 
                             className="text-gray-200 text-sm md:text-base leading-relaxed prose prose-invert prose-sm md:prose-base max-w-none"
                             dangerouslySetInnerHTML={{ __html: chatContent.formattedAnswer || chatContent.answer }}
                           />
                           {isStreaming && !chatContent.answer && (
                             <div className="text-gray-400 italic text-sm flex items-center gap-2">
                               <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                               </svg>
                               Thinking...
                             </div>
                           )}
                         </div>
                       </div>
                     </div>
                     
                     {/* Bottom Close Button */}
                     <div className="mt-6 flex justify-between items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
                       <span className="text-gray-400 text-sm font-medium">
                         Supported by Deepseek R1 🐳
                       </span>
                       <button
                         onClick={() => setShowChatResponse(false)}
                         className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                       >
                         ✕ Close
                       </button>
                     </div>
                   </div>
                 )}
               </div>
              </div>
            </div>
          </section>
        )}
        
        {/* PDF Viewer Modal */}
        {showPDFViewer && (
          <PDFViewer
            pdfUrl="/asset/resume.pdf"
            fileName="Mojila_Resume.pdf"
            onClose={() => setShowPDFViewer(false)}
          />
        )}
    </div>
  );
};

export default HomePage;

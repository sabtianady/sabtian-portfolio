import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PDFViewer from './PDFViewer';

const About = () => {
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* SEO-friendly header */}
        <section>
          <header className="text-center mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1"></div>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                About Mojila Portfolio
              </h1>
              <div className="flex-1 flex justify-end">
                <Link 
                  to="/" 
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Full-Stack Developer & Technical Leader Resume - Ask Questions About My Experience
            </p>
          </header>
        </section>

        {/* Main content */}
        <section>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Photo and basic info */}
            <div className="text-center md:text-left">
            <div className="relative inline-block mb-6">
              <img 
                src="/asset/photo.jpeg"
                alt="Mojila - Full-Stack Developer and Technical Leader"
                className="w-64 h-64 rounded-full object-cover border-4 border-blue-500 shadow-2xl mx-auto md:mx-0"
                loading="lazy"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-black flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Moch. Aji Laksono</h2>
              <h3 className="text-blue-400 font-medium">Technical Leader & Backend Specialist</h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">📍 Surabaya, Indonesia</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">🌐 Remote Available</span>
              </div>
            </div>
            </div>

            {/* Detailed description */}
            <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Professional Summary</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm Mojila, a passionate Technical Leader and Full-Stack Developer with over 6 years of experience 
                in building scalable web applications, backend systems, and developer infrastructure. I've led 
                engineering teams in both startup and enterprise environments, with a strong focus on clean 
                architecture, DevOps automation, and system reliability.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My expertise includes Go, Node.js, GCP, CI/CD, and microservices. I've delivered critical 
                solutions in fintech, real estate, and industrial automation—ranging from payroll systems 
                for 10,000+ users to automated bank payment verification using SMS banking.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Core Expertise</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-400">Backend Technologies</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Go (Golang)</li>
                    <li>• Node.js</li>
                    <li>• Rust</li>
                    <li>• Microservices</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-400">Cloud & DevOps</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Google Cloud Platform</li>
                    <li>• AWS</li>
                    <li>• Docker & CI/CD</li>
                    <li>• Infrastructure as Code</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-400">Databases</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• PostgreSQL</li>
                    <li>• MongoDB</li>
                    <li>• MySQL</li>
                    <li>• Redis</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-400">Leadership</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Team Leadership</li>
                    <li>• Mentoring</li>
                    <li>• System Architecture</li>
                    <li>• Agile Practices</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-yellow-400">What Drives Me</h2>
              <p className="text-gray-300 leading-relaxed">
                I thrive on mentoring developers, solving complex problems, and continuously learning new 
                technologies. My approach combines technical expertise with strategic thinking to deliver 
                robust solutions that drive business growth. I'm passionate about building scalable systems 
                that can handle real-world challenges while maintaining code quality and team productivity.
              </p>
            </section>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section>
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Ask Questions & Download Resume</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Ask questions about my portfolio, download my resume, or discuss new opportunities. 
                Whether you need a technical leader, a backend specialist, or a full-stack developer, let's connect!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:me.mojila@gmail.com?subject=Let's Connect!&body=Hi Mojila, I'd love to discuss..."
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                  aria-label="Send email to ask Mojila about portfolio"
                >
                  📧 Get In Touch
                </a>
                <button 
                  onClick={() => setShowPDFViewer(true)}
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                  aria-label="View Mojila's portfolio resume"
                >
                  📄 View Resume
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      
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

export default About;
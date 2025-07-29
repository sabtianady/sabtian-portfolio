# Mojila Portfolio - SEO-Friendly React Portfolio Website

🚀 A modern, interactive, and SEO-optimized portfolio website built with React.js, featuring dynamic routing, responsive design, and engaging user interactions.

## ✨ Features

### 🎯 SEO Optimization
- **Dynamic Meta Tags**: Automatic title, description, and keywords management
- **Canonical URLs**: Proper URL canonicalization for search engines
- **Sitemap & Robots.txt**: Complete search engine indexing setup
- **Structured Data**: Enhanced search engine understanding
- **Social Media Tags**: Open Graph and Twitter Card support
- **Clean URLs**: SEO-friendly routing structure

### 🎨 Interactive UI/UX
- **Mouse-Following Effects**: Dynamic background animations
- **Photo Slideshow**: Automated image carousel
- **Interactive Chat Interface**: Preset chat options for different sections
- **Smooth Animations**: CSS transitions and keyframe animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Gradient Design**: Beautiful color schemes and visual effects

### 🔧 Technical Features
- **React Router**: Client-side routing for SPA experience
- **Component-Based Architecture**: Modular and maintainable code structure
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Docker Support**: Containerized deployment with Nginx
- **Environment Configuration**: Flexible setup for different environments

## 🛠️ Technologies Used

- **Frontend**: React.js, JavaScript (ES6+)
- **Styling**: Tailwind CSS, Custom CSS animations
- **Routing**: React Router DOM
- **Build Tool**: Create React App
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (for production)
- **Package Manager**: npm

## 📁 Project Structure

```
mojila-portofolio/
├── public/
│   ├── asset/                 # Static assets (images, resume, video)
│   ├── index.html            # Main HTML template with SEO meta tags
│   ├── sitemap.xml           # Search engine sitemap
│   └── robots.txt            # Search engine crawling instructions
├── src/
│   ├── components/
│   │   ├── About.js          # About page component
│   │   └── HomePage.js       # Main homepage component
│   ├── App.js                # Main app with routing setup
│   ├── index.js              # React app entry point
│   ├── index.css             # Global styles and animations
│   └── openaiService.js      # AI chat service integration
├── docker-compose.yml        # Docker composition for easy deployment
├── Dockerfile               # Docker container configuration
├── nginx.conf               # Nginx server configuration
└── package.json             # Project dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mojila-portofolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Serve the build locally (optional)
npx serve -s build
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up --build

# Run in detached mode
docker-compose up -d --build
```

### Manual Docker Build

```bash
# Build the Docker image
docker build -t mojila-portfolio .

# Run the container
docker run -p 80:80 mojila-portfolio
```

The application will be available at `http://localhost` (port 80).

## 🎨 Key Components

### HomePage Component
- Interactive chat interface with preset options
- Dynamic content rendering for different sections
- Mouse-following background effects
- Photo slideshow with automatic transitions
- Skills, experience, projects, and contact information

### About Component
- Dedicated about page with detailed information
- Navigation back to homepage
- SEO-optimized meta tags

### SEO Features
- Dynamic meta tag management
- Canonical URL setup
- Structured data implementation
- Social media optimization

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:

```env
# Add your environment-specific variables here
REACT_APP_API_URL=your_api_url
REACT_APP_SITE_URL=https://mojila.my.id
```

### SEO Configuration
Update the canonical URLs in:
- `public/index.html`
- `src/App.js`
- `public/sitemap.xml`
- `public/robots.txt`

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🎯 SEO Best Practices Implemented

- ✅ Meta title and description optimization
- ✅ Keyword targeting and placement
- ✅ Canonical URL implementation
- ✅ XML sitemap generation
- ✅ Robots.txt configuration
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card implementation
- ✅ Structured data markup
- ✅ Fast loading times
- ✅ Mobile-first responsive design

## 🚀 Performance Features

- **Code Splitting**: Automatic code splitting with React
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Compressed and properly sized assets
- **Minimal Bundle Size**: Efficient dependency management
- **Fast Rendering**: Optimized React components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mojila Jilaksono**
- Website: [https://mojila.my.id](https://mojila.my.id)
- LinkedIn: [linkedin.com/in/mojila](https://linkedin.com/in/mojila)
- GitHub: [github.com/mojila](https://github.com/mojila)
- Email: mojila.jilaksono@gmail.com

## 🙏 Acknowledgments

- React.js community for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Create React App for the build tooling
- All open-source contributors who made this project possible

---

⭐ **Star this repository if you found it helpful!**

🐳 **Powered by React.js and optimized for modern web standards**
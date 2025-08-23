# WebRaptor 🕸️

A comprehensive web reconnaissance and security assessment platform built with Next.js, React, and TypeScript. WebRaptor provides a modern, user-friendly interface for conducting OSINT (Open Source Intelligence) gathering and web security testing.

## 🌐 Live Demo
🔗 **[Click here to try the webraptor](https://webraptor.vercel.app/)**

---

## 🚀 Features

### Core Scanning Modules

- **🌐 Subdomain Discovery**: Find subdomains using multiple reconnaissance techniques
- **🔍 Port Scanning**: Identify open ports and running services
- **⚙️ Technology Detection**: Identify web technologies, frameworks, and CMS platforms
- **🐛 Vulnerability Scanning**: Test for common web security vulnerabilities
- **📁 Directory Bruteforce**: Discover hidden directories and files
- **🔒 SSL/TLS Analysis**: Analyze SSL/TLS configuration and security

### Advanced Features

- **📊 Real-time Progress Tracking**: Live scan progress with detailed phase information
- **📈 Interactive Dashboard**: Modern, responsive UI with dark/light theme support
- **📄 PDF Report Generation**: Export detailed scan results to professional PDF reports
- **🎯 Modular Architecture**: Enable/disable specific scanning modules as needed
- **🔍 OSINT Integration**: Comprehensive open-source intelligence gathering
- **⚡ Concurrent Scanning**: Efficient parallel processing for faster results

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form + Zod validation
- **Package Manager**: pnpm

## 🏁 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/webraptor.git
   cd webraptor
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Basic Scanning

1. **Enter Target**: Input the domain or URL you want to scan
2. **Select Modules**: Choose which scanning modules to enable
3. **Start Scan**: Click the scan button to begin reconnaissance
4. **View Results**: Monitor real-time progress and review findings
5. **Export Report**: Generate a comprehensive PDF report

### Scanning Modules

#### Subdomain Discovery
- Passive DNS enumeration
- Certificate transparency logs
- Search engine dorking
- Brute force techniques

#### Port Scanning
- TCP/UDP port discovery
- Service version detection
- Banner grabbing
- Common port profiling

#### Vulnerability Assessment
- SQL Injection testing
- Cross-Site Scripting (XSS)
- CSRF vulnerabilities
- Directory traversal
- File inclusion attacks
- SSL/TLS security analysis

#### Technology Detection
- Web server identification
- CMS detection
- Framework analysis
- JavaScript library enumeration
- Database technology discovery

## 📁 Project Structure

```
webraptor/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main dashboard
│   └── modules/           # Scanning modules pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── scan-modules/     # Scanning module components
│   └── theme-provider.tsx
├── lib/                  # Utility libraries
│   ├── osint-service.ts  # OSINT data gathering
│   ├── pdf-service.ts    # PDF report generation
│   ├── reporting-service.ts # Report utilities
│   └── utils.ts          # General utilities
├── hooks/               # Custom React hooks
├── public/             # Static assets
└── styles/             # Additional stylesheets
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: API keys for enhanced scanning capabilities
SHODAN_API_KEY=your_shodan_api_key
VIRUSTOTAL_API_KEY=your_virustotal_api_key
CENSYS_API_ID=your_censys_api_id
CENSYS_API_SECRET=your_censys_secret
```

### Scanning Configuration

Modify scanning parameters in the respective service files:
- `lib/osint-service.ts` - OSINT gathering settings
- Components in `components/scan-modules/` - Module-specific configurations

## 🚨 Security & Legal Disclaimer

⚠️ **IMPORTANT**: WebRaptor is designed for authorized security testing and educational purposes only.

- Only test systems you own or have explicit permission to test
- Unauthorized scanning may violate local laws and regulations
- Users are responsible for compliance with applicable laws
- The developers assume no liability for misuse of this software

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new functionality

## 🏆 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by the cybersecurity and OSINT community

---

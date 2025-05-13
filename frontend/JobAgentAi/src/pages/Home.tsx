import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  ChevronRight,
  Play,
  Upload,
  Search,
  FileCheck,
  Bell,
  Linkedin,
} from "lucide-react";
import "./Home.css"; // Create this CSS file (see below)
import heroImage from '@/assets/header.png'; // or '../assets/hero-image.jpg'

const Home = () => {
  return (
    <main className="Home-main">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  Let Your AI Agent Find Jobs and Create Tailored CVs
                </h1>
                <p className="hero-description">
                  Upload your CV and let your agent search job sites, create
                  custom resumes, and send you matches.
                </p>
              </div>
              <div className="hero-cta">
                <Button className="primary-cta">
                  Try for Free
                </Button>
                <Button variant="outline" className="secondary-cta">
                  <Play className="h-4 w-4" /> Watch How It Works
                </Button>
              </div>
              <div className="google-signin">
                <Button variant="outline" size="sm" className="secondary-cta">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />
                    <path
                      fill="#FF3D00"
                      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                    />
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </div>
            <div className="hero-image-container">
              <img
                src={heroImage}
                alt="AI Agent scanning job platforms"
                className="hero-image"
                width={500}
                height={500}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1B2A4E]">
                How It Works
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Your AI agent works tirelessly to find the perfect job matches
                and create tailored CVs
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-5 gap-8 mt-12">
            {[
              {
                title: "Upload CV",
                description: "Upload your CV or create a profile manually",
                icon: <Upload className="h-10 w-10 text-[#21CE99]" />,
              },
              {
                title: "Agent Scans",
                description: "Agent scans job boards for opportunities",
                icon: <Search className="h-10 w-10 text-[#21CE99]" />,
              },
              {
                title: "Matches Jobs",
                description: "Matches jobs to your skills and experience",
                icon: <FileCheck className="h-10 w-10 text-[#21CE99]" />,
              },
              {
                title: "Creates CVs",
                description: "AI creates a tailored CV for each job found",
                icon: <FileCheck className="h-10 w-10 text-[#21CE99]" />,
              },
              {
                title: "Get Alerts",
                description: "Receive alerts and apply instantly",
                icon: <Bell className="h-10 w-10 text-[#21CE99]" />,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2 relative"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1B2A4E]">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500">{step.description}</p>
                {index < 4 && (
                  <div className="hidden md:block absolute top-10 left-[calc(100%_-_10px)] w-[calc(100%_-_20px)] h-0.5 bg-gray-200">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1B2A4E]">
                Key Features
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Our AI-powered platform streamlines your job search with these
                powerful features
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Automated Job Discovery",
                description:
                  "Scans multiple job platforms to find the best matches for your skills",
                icon: <Search className="h-10 w-10 text-[#21CE99]" />,
              },
              {
                title: "AI Resume Tailoring",
                description:
                  "Creates customized resumes for each job application to increase your chances",
                icon: <FileCheck className="h-10 w-10 text-[#21CE99]" />,
              },
              {
                title: "Smart Alerts",
                description:
                  "Receive timely notifications about new job matches via email and dashboard",
                icon: <Bell className="h-10 w-10 text-[#21CE99]" />,
              },
              {
                title: "Resume Templates",
                description:
                  "Choose from a variety of professional templates for your tailored resumes",
                icon: <FileCheck className="h-10 w-10 text-[#21CE99]" />,
              },
              {
                title: "One-Click Apply",
                description:
                  "Apply to jobs instantly with your tailored resume and track applications",
                icon: <Check className="h-10 w-10 text-[#21CE99]" />,
              },
              {
                title: "Interview Optimization",
                description:
                  "Get AI feedback to optimize your resume for interview success",
                icon: <Check className="h-10 w-10 text-[#21CE99]" />,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2 p-6 bg-gray-50 rounded-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1B2A4E]">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Rule Integration */}
      <section className="py-12 md:py-16 bg-[#1B2A4E] text-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Tailored Resumes = Higher Interview Chances
            </h2>
            <p className="mt-4 text-xl text-gray-200">
              One resume doesn't fit all. We create one that does.
            </p>
            <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center">
              <Card className="w-full md:w-[350px] bg-white/10 backdrop-blur-sm border-none text-white">
                <CardHeader>
                  <CardTitle className="text-xl">
                    How Our AI Tailors Your CV
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-left">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#21CE99] mt-0.5" />
                      <span>
                        Analyzes job descriptions for key requirements
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#21CE99] mt-0.5" />
                      <span>
                        Highlights your most relevant skills and experiences
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#21CE99] mt-0.5" />
                      <span>Adjusts language to match company culture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#21CE99] mt-0.5" />
                      <span>
                        Optimizes for ATS (Applicant Tracking Systems)
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1B2A4E]">
                Pricing Plans
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Choose the plan that fits your job search needs
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Free",
                price: "$0",
                description: "Perfect for casual job seekers",
                features: [
                  "5 job matches per day",
                  "Basic resume tailoring",
                  "Email notifications",
                  "1 resume template",
                  "Standard support",
                ],
                cta: "Get Started",
                popular: false,
              },
              {
                title: "Pro",
                price: "$10",
                period: "/month",
                description: "For serious job hunters",
                features: [
                  "20 job matches per day",
                  "Advanced resume tailoring",
                  "Real-time notifications",
                  "5 resume templates",
                  "Priority support",
                  "Application tracking",
                ],
                cta: "Get Started",
                popular: true,
              },
              {
                title: "Ultimate",
                price: "$39",
                period: "/month",
                description: "For career professionals",
                features: [
                  "Unlimited job matches",
                  "Premium resume tailoring",
                  "Real-time notifications",
                  "All resume templates",
                  "24/7 priority support",
                  "Advanced application tracking",
                  "Interview preparation",
                ],
                cta: "Get Started",
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`flex flex-col ${plan.popular ? "border-[#21CE99] shadow-lg" : ""}`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.title}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-sm text-gray-500">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#21CE99] mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-[#21CE99] hover:bg-[#1db989] text-white" : ""}`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1B2A4E]">
                Dashboard Preview
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                See how your AI agent works for you behind the scenes
              </p>
            </div>
          </div>
          <div className="mt-12 rounded-xl border bg-gray-50 p-4 md:p-8 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#1B2A4E]">
                    Job Matches
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Senior Frontend Developer",
                        company: "TechCorp Inc.",
                        match: "92%",
                        location: "Remote",
                        posted: "2 hours ago",
                      },
                      {
                        title: "UI/UX Designer",
                        company: "Design Studio",
                        match: "87%",
                        location: "New York, NY",
                        posted: "1 day ago",
                      },
                      {
                        title: "Full Stack Developer",
                        company: "Startup Hub",
                        match: "85%",
                        location: "San Francisco, CA",
                        posted: "3 days ago",
                      },
                    ].map((job, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white rounded-lg border"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-gray-500">
                            {job.company} • {job.location}
                          </p>
                          <p className="text-xs text-gray-400">
                            Posted {job.posted}
                          </p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-2 md:mt-0">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {job.match} Match
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            View Tailored CV
                          </Button>
                          <Button
                            size="sm"
                            className="text-xs bg-[#21CE99] hover:bg-[#1db989] text-white"
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#1B2A4E]">
                    Agent Activity
                  </h3>
                  <div className="space-y-3 p-4 bg-white rounded-lg border">
                    {[
                      {
                        action: "Scanned LinkedIn",
                        time: "10 minutes ago",
                        result: "Found 3 new matches",
                      },
                      {
                        action: "Created tailored CV",
                        time: "2 hours ago",
                        result: "For Senior Frontend Developer position",
                      },
                      {
                        action: "Scanned Indeed",
                        time: "3 hours ago",
                        result: "Found 5 new matches",
                      },
                      {
                        action: "Updated your profile",
                        time: "1 day ago",
                        result: "Added new skills from your latest project",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                          <Search className="h-4 w-4 text-[#1B2A4E]" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.result}
                          </p>
                          <p className="text-xs text-gray-400">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login & Profile Setup */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#1B2A4E]">
                  Get Started in Minutes
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Create your profile and let your AI agent start working for
                  you
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="lg"
                    className="justify-start gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                      />
                      <path
                        fill="#FF3D00"
                        d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                      />
                    </svg>
                    Sign in with Google
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="justify-start gap-2"
                  >
                    <Linkedin className="h-5 w-5 text-[#0077B5]" />
                    Import from LinkedIn
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-50 px-2 text-gray-500">Or</span>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      placeholder="m@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                  </div>
                  <Button className="bg-[#21CE99] hover:bg-[#1db989] text-white">
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="p-4 bg-white rounded-xl shadow-sm border">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#1B2A4E]">
                    Upload your CV
                  </h3>
                  <p className="text-sm text-gray-500">
                    We'll extract your skills and experience to create your
                    profile
                  </p>
                </div>
                <div className="mt-4 border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Drag and drop your CV here, or{" "}
                    <span className="text-[#21CE99] font-medium cursor-pointer">
                      browse
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Supports PDF, DOCX, up to 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-[#1B2A4E] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Job Search?
              </h2>
              <p className="max-w-[700px] text-gray-300 md:text-xl">
                Let your AI agent find the perfect job and create tailored CVs
                for you
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-[#21CE99] hover:bg-[#1db989] text-white">
                Get Started for Free
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

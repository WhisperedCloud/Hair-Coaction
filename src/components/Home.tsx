"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import {
  Calendar,
  Heart,
  TrendingUp,
  Clock,
  CheckCircle,
  Droplets,
  BarChart3,
  Users,
  Play,
  Award,
  BookOpen,
  Sparkles,
  Scissors,
  Plus,
  Share,
  Eye,
  Bell,
  Shield,
  Mail,
  Phone,
  Settings,
  UserCheck,
  Upload,
  Video,
} from "lucide-react"

interface RoutineStep {
  id: number
  step: string
  product: string
  completed: boolean
  time: string
}

interface HairGoal {
  id: number
  goal: string
  progress: number
  target: string
}

interface QuickStat {
  title: string
  value: string
  icon: React.ReactNode
  trend: string
  color: string
}

interface Caregiver {
  id: string
  name: string
  relationship: string
  email: string
  phone: string
  permissions: string[]
  lastActive: string
  status: "active" | "pending" | "inactive"
}

const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const photos = [
    {
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=400&fit=crop",
      title: "Healthy Hair Journey",
      description: "Beautiful, nourished hair with proper care",
    },
    {
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=400&fit=crop",
      title: "Hair Treatment Session",
      description: "Professional deep conditioning treatment",
    },
    {
      url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=400&fit=crop",
      title: "Natural Hair Care",
      description: "Embracing your natural texture and beauty",
    },
    {
      url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=400&fit=crop",
      title: "Hair Styling Session",
      description: "Professional styling and care techniques",
    },
    {
      url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=400&fit=crop",
      title: "Hair Health Consultation",
      description: "Expert advice for optimal hair health",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [photos.length])

  return (
    <div className="relative h-96 overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-3xl border border-pink-200/50 shadow-xl mb-8 animate-fadeIn">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-rose-200/30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.2),transparent_50%)]"></div>
      </div>

      {/* Photo Cards Container */}
      <div className="relative h-full flex items-center justify-center perspective-1000">
        <div className="relative w-full max-w-7xl mx-auto px-28">
          <div className="flex items-center justify-center space-x-14">
            {photos.map((photo, index) => {
              const offset = index - currentIndex
              const isActive = offset === 0
              const isNext = offset === 1 || offset === -photos.length + 1
              const isPrev = offset === -1 || offset === photos.length - 1

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-1000 ease-in-out transform-gpu ${
                    isActive
                      ? "scale-110 z-30 opacity-100 translate-x-0 rotate-0"
                      : isNext
                        ? "scale-75 z-20 opacity-70 translate-x-80 rotate-12"
                        : isPrev
                          ? "scale-75 z-20 opacity-70 -translate-x-80 -rotate-12"
                          : "scale-50 z-10 opacity-30 translate-x-96"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative w-96 h-80 rounded-2xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-sm border border-pink-200/50">
                    <img
                      src={photo.url || "/placeholder.svg"}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{photo.title}</h3>
                      <p className="text-sm opacity-90 drop-shadow-md">{photo.description}</p>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-pink-300/40 pointer-events-none"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-pink-600 scale-125 shadow-lg" : "bg-pink-400/70 hover:bg-pink-500/80"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const VideoDemo: React.FC = () => {
  const [hasVideo, setHasVideo] = useState(false)

  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-3xl p-8 border border-pink-200/50 shadow-xl mb-8 animate-fadeIn transform hover:scale-102 transition-all duration-500">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center space-x-3 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          <Video className="w-8 h-8 text-pink-500" />
          <span>HairCare Tutorial</span>
        </h2>
        <p className="text-gray-600 text-lg">Learn professional hair care techniques and routines</p>
      </div>

      {!hasVideo ? (
        <div className="group relative h-96 bg-gradient-to-br from-pink-100/50 to-rose-100/50 rounded-2xl border-2 border-dashed border-pink-300/50 flex flex-col items-center justify-center transition-all duration-500 hover:border-pink-400 hover:bg-gradient-to-br hover:from-pink-100 hover:to-rose-100 hover:shadow-xl hover:-translate-y-2">
          <div className="text-center space-y-6 animate-slideInUp">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-pink-200/50">
              <Upload className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                Upload Your Hair Tutorial
              </h3>
              <p className="text-gray-600 mb-6 text-lg group-hover:text-gray-700 transition-colors duration-300">
                Share your hair care routine and styling techniques
              </p>
              <button
                onClick={() => setHasVideo(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-xl hover:shadow-pink-200/50 group-hover:shadow-2xl"
              >
                Choose Video File
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 animate-slideInUp">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button className="group w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-500 transform hover:scale-125 hover:rotate-12 shadow-2xl hover:shadow-white/20">
              <Play className="w-10 h-10 text-white ml-1 group-hover:scale-125 transition-all duration-300" />
            </button>
          </div>
          <div className="absolute bottom-6 left-6 z-20 text-white animate-slideInUp">
            <h3 className="text-xl font-bold mb-2">Hair Care Tutorial</h3>
            <p className="text-sm opacity-90">Learn effective hair care techniques</p>
          </div>
          <div className="w-full h-full bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 opacity-90 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="flex space-x-1">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-white rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 60 + 20}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Play,
            title: "Hair Care Routine",
            description: "Step-by-step daily hair care guide",
            color: "from-pink-400 to-rose-400",
            bgColor: "bg-pink-50",
          },
          {
            icon: Scissors,
            title: "Styling Techniques",
            description: "Professional styling and cutting tips",
            color: "from-rose-400 to-pink-400",
            bgColor: "bg-rose-50",
          },
          {
            icon: Sparkles,
            title: "Hair Treatments",
            description: "Deep conditioning and repair methods",
            color: "from-pink-500 to-rose-500",
            bgColor: "bg-pink-50",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl hover:bg-white/80 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl border border-pink-200/50 hover:border-pink-300/50 animate-slideInUp"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div
              className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-pink-200/30`}
            >
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-gray-900 transition-colors duration-300">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showAddForm, setShowAddForm] = useState(false)
  const [routineSteps, setRoutineSteps] = useState<RoutineStep[]>([
    { id: 1, step: "Shampoo", product: "Moisturizing Shampoo", completed: true, time: "2 min" },
    { id: 2, step: "Condition", product: "Deep Conditioner", completed: true, time: "5 min" },
    { id: 3, step: "Hair Mask", product: "Protein Treatment", completed: false, time: "15 min" },
    { id: 4, step: "Leave-in Treatment", product: "Argan Oil Serum", completed: false, time: "1 min" },
  ])

  const hairGoals: HairGoal[] = [
    { id: 1, goal: "Reduce Hair Breakage", progress: 75, target: "90% reduction" },
    { id: 2, goal: "Increase Hair Length", progress: 65, target: "6 inches growth" },
    { id: 3, goal: "Improve Hair Moisture", progress: 85, target: "Optimal hydration" },
    { id: 4, goal: "Strengthen Hair Roots", progress: 70, target: "Stronger follicles" },
  ]

  const [caregivers, setCaregivers] = useState<Caregiver[]>([
    {
      id: "1",
      name: "Emma Rodriguez",
      relationship: "Hair Stylist",
      email: "emma@salon.com",
      phone: "+1 (555) 123-4567",
      permissions: ["routine-logs", "progress-alerts", "appointment-booking"],
      lastActive: "2 hours ago",
      status: "active",
    },
    {
      id: "2",
      name: "Dr. Sarah Chen",
      relationship: "Trichologist",
      email: "dr.chen@hairclinic.com",
      phone: "+1 (555) 987-6543",
      permissions: ["routine-logs", "hair-analysis", "progress-reports", "treatment-notes"],
      lastActive: "1 day ago",
      status: "active",
    },
  ])

  const [newCaregiver, setNewCaregiver] = useState({
    name: "",
    relationship: "",
    email: "",
    phone: "",
    permissions: [] as string[],
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const quickStats: QuickStat[] = [
    {
      title: "Hair Treatments",
      value: "24",
      icon: <Sparkles className="w-6 h-6" />,
      trend: "+3 this week",
      color: "text-pink-600",
    },
    {
      title: "Hair Health Score",
      value: "8.5/10",
      icon: <Heart className="w-6 h-6" />,
      trend: "+0.5 this month",
      color: "text-rose-600",
    },
    {
      title: "Moisture Level",
      value: "92%",
      icon: <Droplets className="w-6 h-6" />,
      trend: "Excellent hydration",
      color: "text-pink-500",
    },
    {
      title: "Care Streak",
      value: "15",
      icon: <Award className="w-6 h-6" />,
      trend: "Personal best!",
      color: "text-rose-500",
    },
  ]

  const availablePermissions = [
    { id: "routine-logs", label: "Hair Care Routine", description: "View daily hair care tracking data" },
    { id: "hair-analysis", label: "Hair Analysis", description: "Access hair health assessments" },
    { id: "progress-reports", label: "Progress Reports", description: "View and download hair progress reports" },
    { id: "treatment-notes", label: "Treatment Notes", description: "Access stylist notes and recommendations" },
    { id: "progress-alerts", label: "Progress Alerts", description: "Receive hair milestone notifications" },
    { id: "appointment-booking", label: "Appointment Booking", description: "Schedule hair appointments" },
  ]

  const toggleRoutineStep = (id: number) => {
    setRoutineSteps((steps) => steps.map((step) => (step.id === id ? { ...step, completed: !step.completed } : step)))
  }

  const handleAddCaregiver = (e: React.FormEvent) => {
    e.preventDefault()
    const caregiver: Caregiver = {
      id: Date.now().toString(),
      ...newCaregiver,
      lastActive: "Never",
      status: "pending",
    }
    setCaregivers([...caregivers, caregiver])
    setNewCaregiver({ name: "", relationship: "", email: "", phone: "", permissions: [] })
    setShowAddForm(false)
  }

  const togglePermission = (permission: string) => {
    setNewCaregiver((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Photo Carousel Section */}
      <PhotoCarousel />

      {/* Video Demo Section */}
      <VideoDemo />

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slideInLeft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 font-medium text-sm">Hair Health Score</p>
              <p className="text-4xl font-bold mt-2">8.5/10</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div
          className="bg-gradient-to-br from-orange-400 to-orange-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slideInLeft"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 font-medium text-sm">Hydration Level</p>
              <p className="text-4xl font-bold mt-2">92%</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Droplets className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div
          className="bg-gradient-to-br from-pink-400 to-rose-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slideInLeft"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 font-medium text-sm">Growth Rate</p>
              <p className="text-4xl font-bold mt-2">0.5"/mo</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div
          className="bg-gradient-to-br from-orange-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slideInLeft"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 font-medium text-sm">Routine Streak</p>
              <p className="text-4xl font-bold mt-2">12 days</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Header with 3D Effect */}
      <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-xl transform hover:scale-102 transition-all duration-300">
        <div className="transform hover:translate-x-2 transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Sarah!</h2>
          <p className="text-gray-600">Your hair is looking amazing! Here's your hair care overview.</p>
        </div>
        <div className="text-right transform hover:scale-110 transition-all duration-300">
          <div className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-sm text-gray-500">{currentTime.toLocaleDateString()}</div>
        </div>
      </div>

      {/* Enhanced 3D Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 hover:border-pink-300/50 transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 perspective-1000 shadow-xl hover:shadow-pink-200/50 animate-slideInUp"
            style={{
              animationDelay: `${index * 200}ms`,
              transform: "rotateX(5deg) rotateY(5deg)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-rose-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-4 rounded-xl bg-gradient-to-br ${
                    stat.color.includes("pink-6")
                      ? "from-pink-100 to-pink-200 border border-pink-300/50"
                      : stat.color.includes("rose-6")
                        ? "from-rose-100 to-rose-200 border border-rose-300/50"
                        : stat.color.includes("pink-5")
                          ? "from-pink-100 to-pink-200 border border-pink-300/50"
                          : "from-rose-100 to-rose-200 border border-rose-300/50"
                  } transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                >
                  <span className={stat.color}>{stat.icon}</span>
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-500 animate-pulse group-hover:scale-125 transition-all duration-300" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 group-hover:text-4xl transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-600 group-hover:bg-clip-text group-hover:text-transparent">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                {stat.title}
              </p>
              <p
                className={`text-xs ${stat.color} font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
              >
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Hair Routine */}
      <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 animate-slideInUp">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Today's Hair Routine</h2>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
            {routineSteps.filter((step) => !step.completed).length} steps remaining
          </span>
        </div>
        <div className="space-y-4">
          {routineSteps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleRoutineStep(step.id)}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                  step.completed
                    ? "bg-gradient-to-r from-pink-500 to-orange-500 border-pink-500 text-white shadow-lg"
                    : "border-gray-300 hover:border-pink-400 hover:bg-pink-50"
                }`}
              >
                {step.completed && <CheckCircle className="w-4 h-4" />}
              </button>
              <div className="flex-1">
                <p
                  className={`font-semibold transition-all duration-200 ${step.completed ? "text-gray-500 line-through" : "text-gray-800"}`}
                >
                  {step.step}
                </p>
                <p className="text-sm text-gray-600 mt-1">{step.product}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500 bg-white px-3 py-1 rounded-lg">
                <Clock className="w-4 h-4 mr-1" />
                {step.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hair Goals Progress */}
      <div
        className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 animate-slideInUp"
        style={{ animationDelay: "0.2s" }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Hair Goals Progress</h2>
        <div className="space-y-6">
          {hairGoals.map((goal, index) => (
            <div key={goal.id} className="space-y-3 animate-slideInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">{goal.goal}</span>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
                  {goal.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm animate-progressBar"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">Target: {goal.target}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hair Care Tips Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Daily Hair Care Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Stay Hydrated</h3>
            <p className="text-sm text-gray-600">Deep condition weekly for optimal moisture</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Regular Trims</h3>
            <p className="text-sm text-gray-600">Trim every 6-8 weeks to prevent split ends</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Gentle Care</h3>
            <p className="text-sm text-gray-600">Use silk pillowcases and avoid harsh brushing</p>
          </div>
        </div>
      </div>

      {/* Enhanced Recent Activity */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 shadow-xl">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center space-x-3">
          <Clock className="w-6 h-6 text-pink-500" />
          <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Recent Hair Activity
          </span>
        </h3>
        <div className="space-y-6">
          {[
            { action: "Deep conditioning treatment completed", time: "2 hours ago", type: "treatment" },
            { action: "Hair mask application", time: "5 hours ago", type: "mask" },
            { action: "Weekly progress photos taken", time: "1 day ago", type: "progress" },
            { action: "Stylist consultation scheduled", time: "2 days ago", type: "consultation" },
          ].map((activity, index) => (
            <div
              key={index}
              className="group flex items-center space-x-6 p-6 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/80 transition-all duration-500 transform hover:scale-105 hover:translate-x-2 hover:shadow-xl border border-pink-200/30 hover:border-pink-300/50 animate-slideInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl ${
                  activity.type === "treatment"
                    ? "bg-gradient-to-br from-pink-400 to-pink-600 shadow-pink-200/50"
                    : activity.type === "mask"
                      ? "bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-200/50"
                      : activity.type === "progress"
                        ? "bg-gradient-to-br from-pink-400 to-rose-600 shadow-pink-200/50"
                        : "bg-gradient-to-br from-rose-400 to-pink-600 shadow-rose-200/50"
                } text-white`}
              >
                {activity.type === "treatment" ? (
                  <Sparkles className="w-8 h-8" />
                ) : activity.type === "mask" ? (
                  <Droplets className="w-8 h-8" />
                ) : activity.type === "progress" ? (
                  <BarChart3 className="w-8 h-8" />
                ) : (
                  <BookOpen className="w-8 h-8" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-semibold text-lg group-hover:text-gray-900 transition-colors duration-300">
                  {activity.action}
                </p>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {activity.time}
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCaregivers = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2 flex items-center space-x-3">
            <Users className="w-10 h-10 text-pink-500" />
            <span>Hair Care Team</span>
          </h1>
          <p className="text-gray-600 text-lg">Manage your hair care professional network</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-3 group"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-semibold">Add Hair Professional</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            icon: Users,
            value: caregivers.length,
            label: "Hair Professionals",
            sublabel: `${caregivers.filter((c) => c.status === "active").length} active`,
            color: "from-pink-400 to-rose-400",
            bgColor: "bg-pink-50",
          },
          {
            icon: Share,
            value: 8,
            label: "Progress Shared",
            sublabel: "Auto-sync enabled",
            color: "from-rose-400 to-pink-400",
            bgColor: "bg-rose-50",
          },
          {
            icon: Bell,
            value: 2,
            label: "Pending Invites",
            sublabel: "Awaiting response",
            color: "from-amber-400 to-orange-400",
            bgColor: "bg-amber-50",
          },
          {
            icon: Shield,
            value: "High",
            label: "Privacy Level",
            sublabel: "Encrypted sharing",
            color: "from-purple-400 to-pink-400",
            bgColor: "bg-purple-50",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-7 h-7 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 font-medium">{stat.label}</p>
            <p className="text-sm text-pink-600 font-medium">{stat.sublabel}</p>
          </div>
        ))}
      </div>

      {/* Hair Care Team Members List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
          <Heart className="w-7 h-7 text-pink-500" />
          <span>Your Hair Care Team</span>
        </h2>
        <div className="space-y-6">
          {caregivers.map((caregiver, index) => (
            <div
              key={caregiver.id}
              className="bg-gradient-to-r from-white to-pink-50/50 rounded-2xl p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-pink-100/50 animate-slideInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {caregiver.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{caregiver.name}</h3>
                    <p className="text-pink-600 font-medium">{caregiver.relationship}</p>
                    <div className="flex items-center space-x-6 mt-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{caregiver.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{caregiver.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(caregiver.status)}`}>
                    {caregiver.status}
                  </span>
                  <button className="p-3 text-gray-600 hover:bg-pink-100 rounded-xl transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Access Permissions:</p>
                <div className="flex flex-wrap gap-2">
                  {caregiver.permissions.map((permission) => {
                    const permissionData = availablePermissions.find((p) => p.id === permission)
                    return (
                      <span
                        key={permission}
                        className="px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-sm font-medium border border-pink-200"
                      >
                        {permissionData?.label || permission}
                      </span>
                    )
                  })}
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Last active: {caregiver.lastActive}</span>
                </span>
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>View Activity</span>
                  </button>
                  <button className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 font-medium transition-colors">
                    <Share className="w-4 h-4" />
                    <span>Share Update</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100 flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Custom CSS for animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes progressBar {
            from { width: 0%; }
            to { width: var(--target-width); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
          
          .animate-slideInLeft {
            animation: slideInLeft 0.6s ease-out;
          }
          
          .animate-slideInRight {
            animation: slideInRight 0.6s ease-out;
          }
          
          .animate-slideInUp {
            animation: slideInUp 0.6s ease-out;
          }
          
          .animate-progressBar {
            animation: progressBar 1.5s ease-out;
          }

          .perspective-1000 {
            perspective: 1000px;
          }
        `}</style>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "caregivers" && renderCaregivers()}
        </main>
      </div>

      {/* Add Caregiver Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slideInUp">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Add Hair Professional
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-2xl"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddCaregiver} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                  <input
                    type="text"
                    value={newCaregiver.name}
                    onChange={(e) => setNewCaregiver((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Professional Role</label>
                  <input
                    type="text"
                    value={newCaregiver.relationship}
                    onChange={(e) => setNewCaregiver((prev) => ({ ...prev, relationship: e.target.value }))}
                    placeholder="e.g., Hair Stylist, Trichologist, Colorist"
                    className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                  <input
                    type="email"
                    value={newCaregiver.email}
                    onChange={(e) => setNewCaregiver((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
                  <input
                    type="tel"
                    value={newCaregiver.phone}
                    onChange={(e) => setNewCaregiver((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-6">Access Permissions</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availablePermissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100"
                    >
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={newCaregiver.permissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        className="mt-1 w-5 h-5 text-pink-600 border-pink-300 rounded focus:ring-pink-500"
                      />
                      <div>
                        <label htmlFor={permission.id} className="text-sm font-semibold text-gray-700 cursor-pointer">
                          {permission.label}
                        </label>
                        <p className="text-xs text-gray-600 mt-1">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 font-semibold"
                >
                  <UserCheck className="w-6 h-6" />
                  <span>Send Invitation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

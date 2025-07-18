"use client"

import type React from "react"
import { useState } from "react"
import {
  Calendar,
  Droplets,
  Heart,
  TrendingUp,
  User,
  Bell,
  Settings,
  Search,
  Plus,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react"

interface HairProduct {
  id: number
  name: string
  brand: string
  type: string
  rating: number
  lastUsed: string
}

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

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard")
  const [routineSteps, setRoutineSteps] = useState<RoutineStep[]>([
    { id: 1, step: "Shampoo", product: "Moisturizing Shampoo", completed: true, time: "2 min" },
    { id: 2, step: "Condition", product: "Deep Conditioner", completed: true, time: "5 min" },
    { id: 3, step: "Hair Mask", product: "Protein Treatment", completed: false, time: "15 min" },
    { id: 4, step: "Leave-in Treatment", product: "Argan Oil Serum", completed: false, time: "1 min" },
  ])

  const hairProducts: HairProduct[] = [
    { id: 1, name: "Hydrating Shampoo", brand: "HairLux", type: "Shampoo", rating: 4.5, lastUsed: "2 days ago" },
    {
      id: 2,
      name: "Repair Conditioner",
      brand: "SilkStrands",
      type: "Conditioner",
      rating: 4.8,
      lastUsed: "2 days ago",
    },
    { id: 3, name: "Keratin Hair Mask", brand: "ProHair", type: "Treatment", rating: 4.3, lastUsed: "1 week ago" },
    { id: 4, name: "Argan Oil Serum", brand: "NaturalGlow", type: "Serum", rating: 4.7, lastUsed: "1 day ago" },
  ]

  const hairGoals: HairGoal[] = [
    { id: 1, goal: "Reduce Hair Breakage", progress: 75, target: "90% reduction" },
    { id: 2, goal: "Increase Hair Length", progress: 45, target: "6 inches growth" },
    { id: 3, goal: "Improve Hair Moisture", progress: 85, target: "Optimal hydration" },
    { id: 4, goal: "Strengthen Hair Roots", progress: 60, target: "Stronger follicles" },
  ]

  const toggleRoutineStep = (id: number) => {
    setRoutineSteps((steps) => steps.map((step) => (step.id === id ? { ...step, completed: !step.completed } : step)))
  }

  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn">
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

      {/* Today's Routine */}
      <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 animate-slideInUp">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Today's Hair Routine</h2>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
            4 steps remaining
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
    </div>
  )

  const renderProducts = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">My Hair Products</h2>
        <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:from-pink-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hairProducts.map((product, index) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slideInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                <p className="text-gray-600 font-medium">{product.brand}</p>
                <span className="inline-block bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 text-xs px-3 py-1 rounded-full mt-3 font-medium">
                  {product.type}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 transition-all duration-200 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-700 ml-2 font-semibold">{product.rating}</span>
            </div>

            <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              Last used: <span className="font-medium">{product.lastUsed}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-800">Hair Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 animate-slideInLeft">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Hair Health Trend</h3>
          <div className="space-y-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
              <div
                key={day}
                className="flex items-center space-x-4 animate-slideInLeft"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="w-12 text-sm text-gray-700 font-medium">{day}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-400 to-orange-400 h-4 rounded-full transition-all duration-1000 ease-out animate-progressBar"
                    style={{ width: `${Math.random() * 40 + 60}`, animationDelay: `${index * 0.2}s` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-700 font-semibold w-8">{(Math.random() * 2 + 8).toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 animate-slideInRight">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Product Usage This Month</h3>
          <div className="space-y-4">
            {["Shampoo", "Conditioner", "Hair Mask", "Serum", "Oil Treatment"].map((product, index) => (
              <div
                key={product}
                className="flex items-center justify-between animate-slideInRight"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-gray-800 font-medium">{product}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all duration-1000 ease-out animate-progressBar"
                      style={{ width: `${Math.random() * 60 + 40}`, animationDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-700 font-semibold w-8">{Math.floor(Math.random() * 15 + 5)}x</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 animate-slideInUp">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Hair Care Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-6 rounded-xl border-l-4 border-pink-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slideInUp">
            <h4 className="font-bold text-gray-800 mb-3 text-lg">Deep Conditioning</h4>
            <p className="text-gray-700 leading-relaxed">
              Use a deep conditioning treatment once a week to maintain moisture and prevent breakage.
            </p>
          </div>
          <div
            className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-xl border-l-4 border-orange-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slideInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <h4 className="font-bold text-gray-800 mb-3 text-lg">Heat Protection</h4>
            <p className="text-gray-700 leading-relaxed">
              Always apply heat protectant before using styling tools to prevent damage.
            </p>
          </div>
          <div
            className="bg-gradient-to-br from-pink-100 to-orange-100 p-6 rounded-xl border-l-4 border-pink-400 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slideInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <h4 className="font-bold text-gray-800 mb-3 text-lg">Scalp Massage</h4>
            <p className="text-gray-700 leading-relaxed">
              Regular scalp massages improve blood circulation and promote healthy hair growth.
            </p>
          </div>
          <div
            className="bg-gradient-to-br from-orange-100 to-pink-100 p-6 rounded-xl border-l-4 border-orange-400 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slideInUp"
            style={{ animationDelay: "0.3s" }}
          >
            <h4 className="font-bold text-gray-800 mb-3 text-lg">Silk Pillowcase</h4>
            <p className="text-gray-700 leading-relaxed">
              Sleep on silk pillowcases to reduce friction and prevent hair breakage while sleeping.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100">
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
      `}</style>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-pink-500 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                HairCare Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, tips..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-pink-500 transition-all duration-200 hover:bg-pink-50 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-pink-500 transition-all duration-200 hover:bg-pink-50 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: TrendingUp },
              { id: "products", label: "My Products", icon: Droplets },
              { id: "analytics", label: "Analytics", icon: Calendar },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? "border-pink-500 text-pink-600 bg-pink-50/50"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "products" && renderProducts()}
        {activeTab === "analytics" && renderAnalytics()}
      </main>
    </div>
  )
}

export default Home
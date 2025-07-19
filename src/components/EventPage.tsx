import React, { useState } from 'react';

import { Users, Calendar, Brain, Star, BookOpen, Award, Clock, UserCheck, Trophy } from 'lucide-react';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const eventCategories = [
    {
      title: 'Workshops',
      description: 'Online sessions led by dermatologists and trichologists',
      icon: Users,
      color: 'from-pink-400 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100',
      tab: 'workshops'
    },
    {
      title: 'Seminars',
      description: 'Virtual events discussing research and trends',
      icon: Calendar,
      color: 'from-peach-400 to-orange-500',
      bgColor: 'from-peach-50 to-orange-100',
      tab: 'seminars'
    },
    {
      title: 'Quizzes',
      description: 'Recap and reinforce learning from seminars and workshops',
      icon: Brain,
      color: 'from-pink-500 to-peach-500',
      bgColor: 'from-pink-50 to-peach-100',
      tab: 'quizzes'
    }
  ];

  const highlights = [
    {
      icon: Star,
      title: 'Expert Knowledge',
      description: 'Learn from leading dermatologists and trichologists worldwide'
    },
    {
      icon: BookOpen,
      title: 'Hands-on Learning',
      description: 'Interactive workshops with practical demonstrations and case studies'
    },
    {
      icon: Award,
      title: 'Latest Research',
      description: 'Stay updated with cutting-edge research and industry innovations'
    }
  ];

  const workshops = [
    {
      title: 'Interactive Hair Analysis Techniques',
      speaker: 'Dr. Sarah Chen',
      speakerTitle: 'Lead Trichologist, Hair Health Institute',
      date: 'March 15, 2025',
      time: '2:00 PM - 4:00 PM EST',
      rating: 4.8,
      topics: ['Hair Microscopy', 'Scalp Analysis', 'Diagnostic Tools', 'Case Studies'],
      participants: 145
    },
    {
      title: 'Advanced Dermatoscopy for Hair Disorders',
      speaker: 'Prof. Michael Rodriguez',
      speakerTitle: 'Professor of Dermatology, Medical University',
      date: 'March 22, 2025',
      time: '10:00 AM - 12:00 PM EST',
      rating: 4.9,
      topics: ['Dermatoscopy Basics', 'Pattern Recognition', 'Alopecia Diagnosis', 'Digital Imaging'],
      participants: 187
    },
    {
      title: 'Hands-on Hair Transplant Planning',
      speaker: 'Dr. Jennifer Park',
      speakerTitle: 'Hair Restoration Surgeon, Elite Hair Clinic',
      date: 'March 29, 2025',
      time: '3:00 PM - 5:00 PM EST',
      rating: 4.7,
      topics: ['Surgical Planning', 'Graft Calculation', 'Hairline Design', 'Patient Consultation'],
      participants: 203
    }
  ];

  const seminars = [
    {
      title: 'Future of Hair Restoration: 2025 Innovations',
      speaker: 'Dr. Alexander Martinez',
      credentials: 'MD, PhD, Hair Restoration Specialist',
      date: 'March 18, 2025',
      time: '1:00 PM - 2:30 PM EST',
      registeredUsers: 324,
      rating: 4.9,
      topics: ['Robotic Hair Transplants', 'Stem Cell Therapy', 'AI Diagnostics', '3D Hair Modeling', 'Gene Therapy']
    },
    {
      title: 'Hormonal Hair Loss: Latest Research Findings',
      speaker: 'Prof. David Thompson',
      credentials: 'PhD, Endocrinology & Trichology Research',
      date: 'March 25, 2025',
      time: '11:00 AM - 12:30 PM EST',
      registeredUsers: 412,
      rating: 4.8,
      topics: ['Hormonal Pathways', 'PCOS Hair Loss', 'Thyroid Effects', 'Treatment Protocols', 'Clinical Studies']
    },
    {
      title: 'Alopecia Areata: New Treatment Approaches',
      speaker: 'Dr. Lisa Chang',
      credentials: 'MD, Dermatology & Autoimmune Disorders',
      date: 'April 1, 2025',
      time: '4:00 PM - 5:30 PM EST',
      registeredUsers: 267,
      rating: 4.7,
      topics: ['JAK Inhibitors', 'Immunotherapy', 'Patient Care', 'Quality of Life', 'Research Updates']
    },
    {
      title: 'Scalp Microbiome and Hair Health',
      speaker: 'Prof. Robert Kim',
      credentials: 'PhD, Microbiology & Dermatological Research',
      date: 'April 8, 2025',
      time: '2:00 PM - 3:30 PM EST',
      registeredUsers: 156,
      rating: 4.6,
      topics: ['Microbiome Analysis', 'Bacterial Balance', 'Probiotic Treatments', 'Scalp Health', 'Future Directions']
    }
  ];

  const quizzes = [
    {
      title: 'Hair Analysis Fundamentals',
      description: 'Test your knowledge on microscopy techniques and scalp analysis methods',
      relatedEvent: 'Interactive Hair Analysis Techniques Workshop',
      questions: 15,
      duration: '20 minutes',
      difficulty: 'Intermediate',
      rating: 4.7,
      completions: 89
    },
    {
      title: 'Future Hair Restoration Technologies',
      description: 'Quiz covering robotic transplants, stem cell therapy, and AI diagnostics',
      relatedEvent: 'Future of Hair Restoration: 2025 Innovations Seminar',
      questions: 20,
      duration: '25 minutes',
      difficulty: 'Advanced',
      rating: 4.9,
      completions: 156
    },
    {
      title: 'Hormonal Hair Loss Mechanisms',
      description: 'Comprehensive quiz on hormonal pathways and treatment protocols',
      relatedEvent: 'Hormonal Hair Loss: Latest Research Findings Seminar',
      questions: 18,
      duration: '22 minutes',
      difficulty: 'Advanced',
      rating: 4.8,
      completions: 203
    },
    {
      title: 'Dermatoscopy Essentials',
      description: 'Practice identifying hair disorders through dermatoscopic images',
      relatedEvent: 'Advanced Dermatoscopy for Hair Disorders Workshop',
      questions: 12,
      duration: '15 minutes',
      difficulty: 'Beginner',
      rating: 4.6,
      completions: 67
    },
    {
      title: 'Alopecia Areata Treatment Update',
      description: 'Quiz on new treatments including JAK inhibitors and immunotherapy',
      relatedEvent: 'Alopecia Areata: New Treatment Approaches Seminar',
      questions: 16,
      duration: '18 minutes',
      difficulty: 'Intermediate',
      rating: 4.7,
      completions: 124
    },
    {
      title: 'Hair Transplant Planning Basics',
      description: 'Test your understanding of surgical planning and graft calculations',
      relatedEvent: 'Hands-on Hair Transplant Planning Workshop',
      questions: 14,
      duration: '20 minutes',
      difficulty: 'Intermediate',
      rating: 4.5,
      completions: 98
    }
  ];

  const topicColors = [
    'bg-pink-100 text-pink-700',
    'bg-peach-100 text-orange-700',
    'bg-purple-100 text-purple-700',
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700'
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const renderOverview = () => (
    <>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-peach-600 bg-clip-text text-transparent mb-6">
          HairCoaction Events
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Join our comprehensive platform dedicated to hair health, dermatology, and trichology. 
          Explore workshops, seminars, and interactive learning opportunities designed by experts.
        </p>
      </div>

      {/* Event Categories */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {eventCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <button
              key={index}
              onClick={() => setActiveTab(category.tab)}
              className="group block transform hover:scale-105 transition-all duration-300 w-full text-left"
            >
              <div className={`bg-gradient-to-br ${category.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl border border-white/50`}>
                <div className={`bg-gradient-to-r ${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {category.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-6 flex items-center text-pink-600 font-semibold group-hover:text-pink-700">
                  <span>Explore {category.title}</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Why Choose HairCoaction Events */}
      <div className="bg-white rounded-3xl shadow-xl p-12 border border-pink-100">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-600 to-peach-600 bg-clip-text text-transparent mb-12">
          Why Choose HairCoaction Events?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-pink-100 to-peach-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-10 w-10 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  const renderWorkshops = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-peach-600 bg-clip-text text-transparent mb-4">
          Upcoming Workshops
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Join our interactive online sessions led by expert dermatologists and trichologists
        </p>
      </div>

      {workshops.map((workshop, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {workshop.title}
                </h3>
                
                <div className="mb-4">
                  <p className="text-lg font-semibold text-pink-700">
                    {workshop.speaker}
                  </p>
                  <p className="text-gray-600">{workshop.speakerTitle}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-pink-500" />
                    <span>{workshop.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-pink-500" />
                    <span>{workshop.time}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    <span className="font-semibold">{workshop.rating}/5.0</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-pink-500" />
                    <span>{workshop.participants} registered</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {workshop.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="bg-gradient-to-r from-pink-100 to-peach-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:ml-8 lg:flex-shrink-0">
                <button className="w-full lg:w-auto bg-gradient-to-r from-pink-500 to-peach-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-peach-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
                  Reserve Your Spot
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSeminars = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-peach-600 bg-clip-text text-transparent mb-4">
          Featured Upcoming Seminars
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Virtual events discussing the latest research and trends in hair health and trichology
        </p>
      </div>

      {seminars.map((seminar, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {seminar.title}
                </h3>
                
                <div className="mb-4">
                  <p className="text-lg font-semibold text-pink-700">
                    {seminar.speaker}
                  </p>
                  <p className="text-gray-600">{seminar.credentials}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-pink-500" />
                    <span>{seminar.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-pink-500" />
                    <span>{seminar.time}</span>
                  </div>
                  <div className="flex items-center">
                    <UserCheck className="h-5 w-5 mr-2 text-green-500" />
                    <span>{seminar.registeredUsers} registered</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    <span className="font-semibold">{seminar.rating}/5.0</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {seminar.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className={`${topicColors[topicIndex % topicColors.length]} px-3 py-2 rounded-full text-sm font-medium`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:ml-8 lg:flex-shrink-0">
                <button className="w-full lg:w-auto bg-gradient-to-r from-pink-500 to-peach-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-peach-600 transform hover:scale-105 transition-all duration-200 shadow-lg mb-2">
                  Reserve Your Spot
                </button>
                <p className="text-sm text-gray-600 text-center lg:text-left">
                  Free for registered users
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderQuizzes = () => (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-peach-600 bg-clip-text text-transparent mb-4">
          Knowledge Quizzes
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Recap and reinforce your learning from our seminars and workshops with interactive quizzes
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {quizzes.map((quiz, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-r from-pink-100 to-peach-100 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-pink-600" />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {quiz.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {quiz.description}
              </p>

              <div className="bg-pink-50 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-pink-600 mr-2" />
                  <span className="text-sm text-pink-700 font-medium">Related Event:</span>
                </div>
                <p className="text-sm text-pink-600 mt-1">{quiz.relatedEvent}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="font-medium">{quiz.questions}</span>
                  <span className="ml-1">questions</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-pink-500" />
                  <span>{quiz.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  <span>{quiz.rating}/5.0</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-pink-500" />
                  <span>{quiz.completions} completed</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-pink-500 to-peach-500 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-peach-600 transform hover:scale-105 transition-all duration-200 shadow-md">
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-2 border border-pink-100">
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'workshops', label: 'Workshops' },
              { id: 'seminars', label: 'Seminars' },
              { id: 'quizzes', label: 'Quizzes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-peach-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'workshops' && renderWorkshops()}
      {activeTab === 'seminars' && renderSeminars()}
      {activeTab === 'quizzes' && renderQuizzes()}
    </div>
  );
};

export default EventsPage;
import React, { useState } from 'react'
import { FileText, TrendingUp, Users, Calendar, DollarSign, Clock, Download, Eye, Filter, Search } from 'lucide-react'
import HomeHeader from '../../components/HomeHeader'

const Reports = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('date')

    const reportCategories = [
        { id: 'all', name: 'All Reports', icon: FileText },
        { id: 'financial', name: 'Financial', icon: DollarSign },
        { id: 'patient', name: 'Patient', icon: Users },
        { id: 'operational', name: 'Operational', icon: Clock },
        { id: 'clinical', name: 'Clinical', icon: TrendingUp }
    ]

    const reports = [
        {
            id: 1,
            title: 'Monthly Revenue Report',
            description: 'Comprehensive revenue analysis with breakdown by treatment types',
            category: 'financial',
            lastGenerated: '2024-06-28',
            generatedBy: 'System',
            size: '2.4 MB',
            format: 'PDF',
            status: 'Ready',
            popularity: 95,
            schedule: 'Monthly'
        },
        {
            id: 2,
            title: 'Patient Demographics Analysis',
            description: 'Statistical breakdown of patient age groups, locations, and visit patterns',
            category: 'patient',
            lastGenerated: '2024-06-27',
            generatedBy: 'Dr. Smith',
            size: '1.8 MB',
            format: 'Excel',
            status: 'Ready',
            popularity: 87,
            schedule: 'Weekly'
        },
        {
            id: 3,
            title: 'Treatment Success Rates',
            description: 'Analysis of treatment outcomes and success rates across different procedures',
            category: 'clinical',
            lastGenerated: '2024-06-26',
            generatedBy: 'Dr. Johnson',
            size: '3.2 MB',
            format: 'PDF',
            status: 'Generating',
            popularity: 92,
            schedule: 'Quarterly'
        },
        {
            id: 4,
            title: 'Appointment Efficiency Report',
            description: 'Operational metrics including wait times, no-shows, and schedule optimization',
            category: 'operational',
            lastGenerated: '2024-06-25',
            generatedBy: 'System',
            size: '1.1 MB',
            format: 'CSV',
            status: 'Ready',
            popularity: 78,
            schedule: 'Daily'
        },
        {
            id: 5,
            title: 'Insurance Claims Summary',
            description: 'Detailed analysis of insurance claims, approvals, and reimbursements',
            category: 'financial',
            lastGenerated: '2024-06-24',
            generatedBy: 'Admin',
            size: '2.7 MB',
            format: 'PDF',
            status: 'Ready',
            popularity: 85,
            schedule: 'Monthly'
        },
        {
            id: 6,
            title: 'Patient Satisfaction Survey',
            description: 'Compiled results from patient feedback and satisfaction surveys',
            category: 'patient',
            lastGenerated: '2024-06-23',
            generatedBy: 'Dr. Chen',
            size: '1.5 MB',
            format: 'Excel',
            status: 'Ready',
            popularity: 89,
            schedule: 'Monthly'
        },
        {
            id: 7,
            title: 'Equipment Utilization Report',
            description: 'Analysis of dental equipment usage patterns and maintenance schedules',
            category: 'operational',
            lastGenerated: '2024-06-22',
            generatedBy: 'System',
            size: '900 KB',
            format: 'PDF',
            status: 'Ready',
            popularity: 65,
            schedule: 'Weekly'
        },
        {
            id: 8,
            title: 'Clinical Outcomes Dashboard',
            description: 'Comprehensive overview of treatment outcomes and patient health metrics',
            category: 'clinical',
            lastGenerated: '2024-06-21',
            generatedBy: 'Dr. Wilson',
            size: '4.1 MB',
            format: 'PDF',
            status: 'Ready',
            popularity: 94,
            schedule: 'Monthly'
        }
    ]

    const filteredReports = reports.filter(report => {
        const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory
        const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            report.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const sortedReports = [...filteredReports].sort((a, b) => {
        switch (sortBy) {
            case 'date':
                return new Date(b.lastGenerated) - new Date(a.lastGenerated)
            case 'popularity':
                return b.popularity - a.popularity
            case 'title':
                return a.title.localeCompare(b.title)
            default:
                return 0
        }
    })

    const getStatusColor = (status) => {
        switch (status) {
            case 'Ready':
                return 'bg-green-100 text-green-800'
            case 'Generating':
                return 'bg-yellow-100 text-yellow-800'
            case 'Error':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getCategoryColor = (category) => {
        switch (category) {
            case 'financial':
                return 'bg-blue-100 text-blue-800'
            case 'patient':
                return 'bg-green-100 text-green-800'
            case 'operational':
                return 'bg-purple-100 text-purple-800'
            case 'clinical':
                return 'bg-orange-100 text-orange-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <HomeHeader role="analyst" />
            <div className="max-w-7xl mx-auto pt-5">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports Dashboard</h1>
                    <p className="text-gray-600">Generate, view, and manage dental practice reports and analytics</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-full mr-4">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">24</p>
                                <p className="text-sm text-gray-600">Total Reports</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-full mr-4">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">18</p>
                                <p className="text-sm text-gray-600">Ready Reports</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-full mr-4">
                                <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">3</p>
                                <p className="text-sm text-gray-600">Generating</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-full mr-4">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">12</p>
                                <p className="text-sm text-gray-600">Scheduled</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {reportCategories.map((category) => {
                                const IconComponent = category.icon
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                            selectedCategory === category.id
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <IconComponent className="w-4 h-4 mr-2" />
                                        {category.name}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Search and Sort */}
                        <div className="flex gap-4">
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search reports..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="popularity">Sort by Popularity</option>
                                <option value="title">Sort by Title</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Reports Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sortedReports.map((report) => (
                        <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{report.description}</p>
                                    
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                                            {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                                            {report.status}
                                        </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div>
                                            <p><strong>Last Generated:</strong> {report.lastGenerated}</p>
                                            <p><strong>Generated By:</strong> {report.generatedBy}</p>
                                        </div>
                                        <div>
                                            <p><strong>Size:</strong> {report.size}</p>
                                            <p><strong>Format:</strong> {report.format}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center mb-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{width: `${report.popularity}%`}}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500">{report.popularity}%</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{report.schedule}</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-4 border-t">
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                    </button>
                                    <button 
                                        className="flex items-center px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                        disabled={report.status === 'Generating'}
                                    >
                                        <Download className="w-4 h-4 mr-1" />
                                        Download
                                    </button>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                                    Generate New
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {sortedReports.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Reports
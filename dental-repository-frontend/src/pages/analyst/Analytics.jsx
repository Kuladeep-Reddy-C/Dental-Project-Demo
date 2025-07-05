import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import HomeHeader from '../../components/HomeHeader'

const Analytics = () => {
    // Hardcoded data for demonstrations
    const monthlyPatients = [
        { month: 'Jan', patients: 245, revenue: 48500 },
        { month: 'Feb', patients: 278, revenue: 52300 },
        { month: 'Mar', patients: 295, revenue: 58200 },
        { month: 'Apr', patients: 312, revenue: 61800 },
        { month: 'May', patients: 289, revenue: 57400 },
        { month: 'Jun', patients: 334, revenue: 66700 }
    ]

    const treatmentTypes = [
        { name: 'Cleanings', count: 450, color: '#3B82F6' },
        { name: 'Fillings', count: 238, color: '#10B981' },
        { name: 'Extractions', count: 89, color: '#F59E0B' },
        { name: 'Root Canals', count: 45, color: '#EF4444' },
        { name: 'Crowns', count: 67, color: '#8B5CF6' },
        { name: 'Orthodontics', count: 123, color: '#EC4899' }
    ]

    const patientAgeGroups = [
        { age: '0-12', count: 156 },
        { age: '13-17', count: 89 },
        { age: '18-35', count: 342 },
        { age: '36-55', count: 298 },
        { age: '56+', count: 187 }
    ]

    const keyMetrics = [
        { label: 'Total Patients', value: '1,247', change: '+12.5%', trend: 'up' },
        { label: 'Monthly Revenue', value: '$66,700', change: '+8.3%', trend: 'up' },
        { label: 'Avg. Visit Duration', value: '45 min', change: '-3.2%', trend: 'down' },
        { label: 'Patient Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up' }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <HomeHeader role="analyst" />
            <div className="max-w-7xl mx-auto pt-5">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
                <p className="text-gray-600 mb-8">Monitor dental practice performance and patient statistics</p>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {keyMetrics.map((metric, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                                </div>
                                <div className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {metric.change}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Monthly Patients Chart */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Patient Visits</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyPatients}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="patients" fill="#3B82F6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Revenue Trend */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Trend</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyPatients}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Second Row Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Treatment Types Pie Chart */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Treatment Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={treatmentTypes}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {treatmentTypes.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Patient Age Groups */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Age Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={patientAgeGroups}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="age" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8B5CF6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Smith</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Routine Cleaning</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-06-28</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sarah Johnson</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Filling</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-06-27</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            In Progress
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mike Davis</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Root Canal</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-06-26</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lisa Chen</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Orthodontic Adjustment</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-06-25</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            Scheduled
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics
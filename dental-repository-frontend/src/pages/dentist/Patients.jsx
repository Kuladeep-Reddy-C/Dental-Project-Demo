import React, { useState } from 'react'
import { Calendar, Clock, User, Phone, MapPin, Plus, Search, Filter, CheckCircle, XCircle, AlertCircle, Edit, Trash2, FileText, Stethoscope } from 'lucide-react'
import HomeHeader from '../../components/HomeHeader'

const Appointments = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [viewMode, setViewMode] = useState('day') // day, week, month
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [showNewAppointment, setShowNewAppointment] = useState(false)

    // Sample appointment data
    const appointments = [
        {
            id: 1,
            patientName: 'Sarah Johnson',
            patientId: 'P001',
            phone: '+1 (555) 123-4567',
            email: 'sarah.johnson@email.com',
            date: '2024-07-05',
            time: '09:00',
            duration: 60,
            treatment: 'Routine Cleaning',
            status: 'confirmed',
            notes: 'Patient prefers morning appointments. Last cleaning 6 months ago.',
            isNewPatient: false,
            insuranceProvider: 'Delta Dental'
        },
        {
            id: 2,
            patientName: 'Michael Chen',
            patientId: 'P002',
            phone: '+1 (555) 987-6543',
            email: 'michael.chen@email.com',
            date: '2024-07-05',
            time: '10:30',
            duration: 90,
            treatment: 'Root Canal Treatment',
            status: 'in-progress',
            notes: 'Second session. Patient experiencing mild discomfort.',
            isNewPatient: false,
            insuranceProvider: 'Anthem Blue Cross'
        },
        {
            id: 3,
            patientName: 'Emma Wilson',
            patientId: 'P003',
            phone: '+1 (555) 456-7890',
            email: 'emma.wilson@email.com',
            date: '2024-07-05',
            time: '14:00',
            duration: 45,
            treatment: 'Consultation',
            status: 'pending',
            notes: 'New patient consultation. Referred by Dr. Smith.',
            isNewPatient: true,
            insuranceProvider: 'Aetna'
        },
        {
            id: 4,
            patientName: 'David Rodriguez',
            patientId: 'P004',
            phone: '+1 (555) 234-5678',
            email: 'david.rodriguez@email.com',
            date: '2024-07-05',
            time: '15:30',
            duration: 120,
            treatment: 'Crown Placement',
            status: 'confirmed',
            notes: 'Final crown placement. Patient has been waiting 2 weeks.',
            isNewPatient: false,
            insuranceProvider: 'Cigna'
        },
        {
            id: 5,
            patientName: 'Lisa Thompson',
            patientId: 'P005',
            phone: '+1 (555) 345-6789',
            email: 'lisa.thompson@email.com',
            date: '2024-07-05',
            time: '16:45',
            duration: 30,
            treatment: 'Follow-up',
            status: 'cancelled',
            notes: 'Patient cancelled due to family emergency. Needs to reschedule.',
            isNewPatient: false,
            insuranceProvider: 'MetLife'
        }
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'in-progress':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200'
            case 'completed':
                return 'bg-gray-100 text-gray-800 border-gray-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed':
                return <CheckCircle className="w-4 h-4" />
            case 'pending':
                return <AlertCircle className="w-4 h-4" />
            case 'in-progress':
                return <Clock className="w-4 h-4" />
            case 'cancelled':
                return <XCircle className="w-4 h-4" />
            case 'completed':
                return <CheckCircle className="w-4 h-4" />
            default:
                return <AlertCircle className="w-4 h-4" />
        }
    }

    const filteredAppointments = appointments.filter(appointment => {
        const matchesDate = appointment.date === selectedDate
        const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            appointment.treatment.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter
        return matchesDate && matchesSearch && matchesStatus
    })

    const timeSlots = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30'
    ]

    const todayStats = {
        total: appointments.filter(a => a.date === selectedDate).length,
        confirmed: appointments.filter(a => a.date === selectedDate && a.status === 'confirmed').length,
        pending: appointments.filter(a => a.date === selectedDate && a.status === 'pending').length,
        cancelled: appointments.filter(a => a.date === selectedDate && a.status === 'cancelled').length
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <HomeHeader role="dentist" />
            <div className="max-w-7xl mx-auto pt-5">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointments Dashboard</h1>
                        <p className="text-gray-600">Manage your dental appointments and patient schedules</p>
                    </div>
                    <button
                        onClick={() => setShowNewAppointment(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mt-4 lg:mt-0"
                    >
                        <Plus className="w-5 h-5" />
                        New Appointment
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-full mr-4">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{todayStats.total}</p>
                                <p className="text-sm text-gray-600">Total Today</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-full mr-4">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{todayStats.confirmed}</p>
                                <p className="text-sm text-gray-600">Confirmed</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-full mr-4">
                                <AlertCircle className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{todayStats.pending}</p>
                                <p className="text-sm text-gray-600">Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-red-100 rounded-full mr-4">
                                <XCircle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{todayStats.cancelled}</p>
                                <p className="text-sm text-gray-600">Cancelled</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Controls */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search patients or treatments..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
                            />
                        </div>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </h2>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                        {filteredAppointments.length === 0 ? (
                            <div className="p-12 text-center">
                                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                                <p className="text-gray-600">No appointments match your current filters for this date.</p>
                            </div>
                        ) : (
                            filteredAppointments.map((appointment) => (
                                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-5 h-5 text-gray-400" />
                                                <span className="font-medium text-lg text-gray-900">
                                                    {appointment.time}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({appointment.duration} min)
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                                                {getStatusIcon(appointment.status)}
                                                <span className="ml-1 capitalize">{appointment.status.replace('-', ' ')}</span>
                                            </span>
                                            {appointment.isNewPatient && (
                                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                                                    New Patient
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                                        <div className="lg:col-span-2">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <User className="w-5 h-5 text-gray-400" />
                                                <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                                                <span className="text-sm text-gray-500">({appointment.patientId})</span>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                                                <div>
                                                    <div className="flex items-center mb-1">
                                                        <Phone className="w-4 h-4 mr-2" />
                                                        {appointment.phone}
                                                    </div>
                                                    <div className="flex items-center mb-1">
                                                        <Stethoscope className="w-4 h-4 mr-2" />
                                                        {appointment.treatment}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center mb-1">
                                                        <FileText className="w-4 h-4 mr-2" />
                                                        {appointment.insuranceProvider}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {appointment.notes && (
                                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-sm text-gray-700">
                                                        <strong>Notes:</strong> {appointment.notes}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex lg:flex-col lg:items-end lg:justify-start flex-row items-center justify-end space-x-2 lg:space-x-0 lg:space-y-2">
                                            <button className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                                <Edit className="w-4 h-4 mr-1" />
                                                Edit
                                            </button>
                                            <button className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Cancel
                                            </button>
                                            <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                                                <FileText className="w-4 h-4 mr-1" />
                                                Records
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointments
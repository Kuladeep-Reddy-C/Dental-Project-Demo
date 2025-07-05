import React, { useState } from 'react'
import HomeHeader from '../../components/HomeHeader'

const Appointments = () => {
    const [appointments] = useState([
        {
            id: 1,
            patientName: "Sarah Johnson",
            date: "2024-07-08",
            time: "09:00 AM",
            procedure: "Routine Cleaning",
            status: "confirmed",
            phone: "(555) 123-4567",
            notes: "Patient prefers morning appointments"
        },
        {
            id: 2,
            patientName: "Michael Chen",
            date: "2024-07-08",
            time: "10:30 AM",
            procedure: "Cavity Filling",
            status: "confirmed",
            phone: "(555) 987-6543",
            notes: "Upper left molar"
        },
        {
            id: 3,
            patientName: "Emma Rodriguez",
            date: "2024-07-08",
            time: "02:00 PM",
            procedure: "Root Canal Consultation",
            status: "pending",
            phone: "(555) 456-7890",
            notes: "Experiencing severe pain"
        },
        {
            id: 4,
            patientName: "David Wilson",
            date: "2024-07-09",
            time: "09:30 AM",
            procedure: "Crown Placement",
            status: "confirmed",
            phone: "(555) 234-5678",
            notes: "Second appointment for crown"
        },
        {
            id: 5,
            patientName: "Lisa Thompson",
            date: "2024-07-09",
            time: "11:00 AM",
            procedure: "Teeth Whitening",
            status: "confirmed",
            phone: "(555) 345-6789",
            notes: "Cosmetic procedure"
        },
        {
            id: 6,
            patientName: "Robert Garcia",
            date: "2024-07-09",
            time: "03:30 PM",
            procedure: "Extraction",
            status: "cancelled",
            phone: "(555) 567-8901",
            notes: "Wisdom tooth removal - rescheduled"
        },
        {
            id: 7,
            patientName: "Jennifer Lee",
            date: "2024-07-10",
            time: "08:30 AM",
            procedure: "Orthodontic Consultation",
            status: "confirmed",
            phone: "(555) 678-9012",
            notes: "Braces evaluation for teenager"
        },
        {
            id: 8,
            patientName: "Thomas Anderson",
            date: "2024-07-10",
            time: "01:00 PM",
            procedure: "Implant Surgery",
            status: "confirmed",
            phone: "(555) 789-0123",
            notes: "Pre-surgery instructions given"
        }
    ])

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800'
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const todaysAppointments = appointments.filter(apt => apt.date === "2024-07-08")
    const upcomingAppointments = appointments.filter(apt => apt.date > "2024-07-08")

    return (
        <div className="min-h-screen bg-gray-50">
            <HomeHeader role="dentist" />
            <div className="max-w-7xl mx-auto p-5">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Dentist Appointments Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Manage your dental practice appointments - Dentist Access Only
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                                <p className="text-2xl font-semibold text-gray-900">{todaysAppointments.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {appointments.filter(apt => apt.status === 'confirmed').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {appointments.filter(apt => apt.status === 'pending').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {appointments.filter(apt => apt.status === 'cancelled').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Today's Appointments */}
                <div className="bg-white rounded-lg shadow mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Today's Appointments</h2>
                        <p className="text-sm text-gray-600">Monday, July 8, 2024</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {todaysAppointments.map((appointment) => (
                            <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold text-sm">
                                                    {appointment.patientName.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{appointment.patientName}</p>
                                            <p className="text-sm text-gray-600">{appointment.procedure}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                                            <p className="text-sm text-gray-600">{appointment.phone}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </div>
                                {appointment.notes && (
                                    <div className="mt-2 ml-14">
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Notes:</span> {appointment.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                        <p className="text-sm text-gray-600">Next few days</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {upcomingAppointments.map((appointment) => (
                            <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <span className="text-gray-600 font-semibold text-sm">
                                                    {appointment.patientName.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{appointment.patientName}</p>
                                            <p className="text-sm text-gray-600">{appointment.procedure}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">
                                                {new Date(appointment.date).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })} - {appointment.time}
                                            </p>
                                            <p className="text-sm text-gray-600">{appointment.phone}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </div>
                                {appointment.notes && (
                                    <div className="mt-2 ml-14">
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Notes:</span> {appointment.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointments
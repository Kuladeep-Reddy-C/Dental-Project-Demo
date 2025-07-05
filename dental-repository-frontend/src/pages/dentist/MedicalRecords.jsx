import React, { useState } from 'react'
import HomeHeader from '../../components/HomeHeader'

const MedicalRecords = () => {
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const [patients] = useState([
        {
            id: 1,
            name: "Sarah Johnson",
            dateOfBirth: "1985-03-15",
            gender: "Female",
            phone: "(555) 123-4567",
            email: "sarah.johnson@email.com",
            address: "123 Main St, Cityville, CA 90210",
            emergencyContact: "John Johnson - (555) 123-4568",
            medicalHistory: {
                allergies: ["Penicillin", "Latex"],
                medications: ["Lisinopril 10mg", "Vitamin D3"],
                conditions: ["Hypertension", "Diabetes Type 2"],
                lastVisit: "2024-06-15"
            },
            dentalHistory: [
                {
                    date: "2024-06-15",
                    procedure: "Routine Cleaning",
                    dentist: "Dr. Smith",
                    notes: "Good oral hygiene, minor plaque buildup",
                    cost: "$120"
                },
                {
                    date: "2024-03-10",
                    procedure: "Cavity Filling",
                    dentist: "Dr. Smith",
                    notes: "Composite filling on tooth #18",
                    cost: "$185"
                },
                {
                    date: "2023-12-05",
                    procedure: "Routine Cleaning",
                    dentist: "Dr. Smith",
                    notes: "Recommended electric toothbrush",
                    cost: "$120"
                }
            ],
            xrays: [
                {
                    date: "2024-06-15",
                    type: "Bitewing",
                    findings: "No cavities detected"
                },
                {
                    date: "2024-03-10",
                    type: "Periapical",
                    findings: "Cavity on tooth #18 - treated"
                }
            ]
        },
        {
            id: 2,
            name: "Michael Chen",
            dateOfBirth: "1992-08-22",
            gender: "Male",
            phone: "(555) 987-6543",
            email: "michael.chen@email.com",
            address: "456 Oak Ave, Townsburg, CA 90211",
            emergencyContact: "Lisa Chen - (555) 987-6544",
            medicalHistory: {
                allergies: ["None known"],
                medications: ["Multivitamin"],
                conditions: ["None"],
                lastVisit: "2024-07-01"
            },
            dentalHistory: [
                {
                    date: "2024-07-01",
                    procedure: "Cavity Filling",
                    dentist: "Dr. Johnson",
                    notes: "Large cavity on upper left molar, composite filling",
                    cost: "$225"
                },
                {
                    date: "2024-01-15",
                    procedure: "Routine Cleaning",
                    dentist: "Dr. Johnson",
                    notes: "Excellent oral hygiene",
                    cost: "$120"
                }
            ],
            xrays: [
                {
                    date: "2024-07-01",
                    type: "Bitewing",
                    findings: "Cavity on tooth #14 - treated"
                }
            ]
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            dateOfBirth: "1978-11-30",
            gender: "Female",
            phone: "(555) 456-7890",
            email: "emma.rodriguez@email.com",
            address: "789 Pine Rd, Villagetown, CA 90212",
            emergencyContact: "Carlos Rodriguez - (555) 456-7891",
            medicalHistory: {
                allergies: ["Sulfa drugs"],
                medications: ["Birth control", "Ibuprofen as needed"],
                conditions: ["Migraine headaches"],
                lastVisit: "2024-05-20"
            },
            dentalHistory: [
                {
                    date: "2024-05-20",
                    procedure: "Root Canal Consultation",
                    dentist: "Dr. Smith",
                    notes: "Severe pain in tooth #19, scheduled for root canal",
                    cost: "$85"
                },
                {
                    date: "2024-02-10",
                    procedure: "Routine Cleaning",
                    dentist: "Dr. Smith",
                    notes: "Sensitivity reported, recommended sensitive toothpaste",
                    cost: "$120"
                }
            ],
            xrays: [
                {
                    date: "2024-05-20",
                    type: "Periapical",
                    findings: "Root infection in tooth #19"
                }
            ]
        },
        {
            id: 4,
            name: "David Wilson",
            dateOfBirth: "1965-07-12",
            gender: "Male",
            phone: "(555) 234-5678",
            email: "david.wilson@email.com",
            address: "321 Elm St, Hamletville, CA 90213",
            emergencyContact: "Mary Wilson - (555) 234-5679",
            medicalHistory: {
                allergies: ["Codeine"],
                medications: ["Metformin", "Atorvastatin"],
                conditions: ["Diabetes Type 2", "High Cholesterol"],
                lastVisit: "2024-06-28"
            },
            dentalHistory: [
                {
                    date: "2024-06-28",
                    procedure: "Crown Placement",
                    dentist: "Dr. Johnson",
                    notes: "Porcelain crown placed on tooth #30",
                    cost: "$850"
                },
                {
                    date: "2024-06-14",
                    procedure: "Crown Preparation",
                    dentist: "Dr. Johnson",
                    notes: "Tooth prepared for crown, temporary crown placed",
                    cost: "$650"
                }
            ],
            xrays: [
                {
                    date: "2024-06-14",
                    type: "Periapical",
                    findings: "Tooth #30 requires crown due to large filling"
                }
            ]
        }
    ])

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
    )

    const calculateAge = (dateOfBirth) => {
        const today = new Date()
        const birth = new Date(dateOfBirth)
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        return age
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <HomeHeader role="dentist" />
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Medical Records Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Secure patient medical records - Dentist Access Only
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Patient List */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Patients</h2>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search patients..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {filteredPatients.map((patient) => (
                                    <div
                                        key={patient.id}
                                        className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                                            selectedPatient?.id === patient.id ? 'bg-blue-50 border-blue-200' : ''
                                        }`}
                                        onClick={() => setSelectedPatient(patient)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-semibold text-sm">
                                                        {patient.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {patient.name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {patient.phone}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Patient Details */}
                    <div className="lg:col-span-2">
                        {selectedPatient ? (
                            <div className="space-y-6">
                                {/* Patient Info */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Name</p>
                                            <p className="text-lg font-semibold text-gray-900">{selectedPatient.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Age</p>
                                            <p className="text-lg text-gray-900">{calculateAge(selectedPatient.dateOfBirth)} years old</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Date of Birth</p>
                                            <p className="text-lg text-gray-900">{new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Gender</p>
                                            <p className="text-lg text-gray-900">{selectedPatient.gender}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Phone</p>
                                            <p className="text-lg text-gray-900">{selectedPatient.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Email</p>
                                            <p className="text-lg text-gray-900">{selectedPatient.email}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-sm font-medium text-gray-600">Address</p>
                                            <p className="text-lg text-gray-900">{selectedPatient.address}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-sm font-medium text-gray-600">Emergency Contact</p>
                                            <p className="text-lg text-gray-900">{selectedPatient.emergencyContact}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Medical History */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Medical History</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 mb-2">Allergies</p>
                                            <div className="space-y-1">
                                                {selectedPatient.medicalHistory.allergies.map((allergy, index) => (
                                                    <span key={index} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-2">
                                                        {allergy}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 mb-2">Current Medications</p>
                                            <div className="space-y-1">
                                                {selectedPatient.medicalHistory.medications.map((medication, index) => (
                                                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                                                        {medication}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 mb-2">Medical Conditions</p>
                                            <div className="space-y-1">
                                                {selectedPatient.medicalHistory.conditions.map((condition, index) => (
                                                    <span key={index} className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mr-2">
                                                        {condition}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Last Visit</p>
                                            <p className="text-lg text-gray-900">{new Date(selectedPatient.medicalHistory.lastVisit).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Dental History */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Dental History</h2>
                                    <div className="space-y-4">
                                        {selectedPatient.dentalHistory.map((treatment, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{treatment.procedure}</p>
                                                        <p className="text-sm text-gray-600">{treatment.dentist}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-gray-900">{new Date(treatment.date).toLocaleDateString()}</p>
                                                        <p className="text-sm text-green-600">{treatment.cost}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-700">{treatment.notes}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* X-rays */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">X-ray Records</h2>
                                    <div className="space-y-4">
                                        {selectedPatient.xrays.map((xray, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{xray.type} X-ray</p>
                                                        <p className="text-sm text-gray-700 mt-1">{xray.findings}</p>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{new Date(xray.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-12 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Patient</h3>
                                <p className="text-gray-600">Choose a patient from the list to view their medical records</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicalRecords
import React, { useState } from 'react'
import { Download, FileText, Database, Users, Calendar, Filter, Check } from 'lucide-react'
import HomeHeader from '../../components/HomeHeader'

const DataExport = () => {
    const [selectedExportType, setSelectedExportType] = useState('')
    const [dateRange, setDateRange] = useState({ start: '', end: '' })
    const [filters, setFilters] = useState({
        includePatientInfo: true,
        includeTreatments: true,
        includeFinancials: false,
        includeAppointments: true
    })
    const [exportFormat, setExportFormat] = useState('csv')
    const [isExporting, setIsExporting] = useState(false)

    const exportTypes = [
        {
            id: 'patients',
            title: 'Patient Records',
            description: 'Export comprehensive patient information including demographics and medical history',
            icon: Users,
            estimatedSize: '2.4 MB',
            recordCount: '1,247 records'
        },
        {
            id: 'treatments',
            title: 'Treatment Data',
            description: 'Export all treatment records, procedures, and associated costs',
            icon: FileText,
            estimatedSize: '1.8 MB',
            recordCount: '3,421 records'
        },
        {
            id: 'appointments',
            title: 'Appointment History',
            description: 'Export appointment schedules, cancellations, and attendance records',
            icon: Calendar,
            estimatedSize: '1.2 MB',
            recordCount: '2,156 records'
        },
        {
            id: 'analytics',
            title: 'Analytics Report',
            description: 'Export aggregated analytics data and performance metrics',
            icon: Database,
            estimatedSize: '856 KB',
            recordCount: 'Summary data'
        }
    ]

    const handleExport = async () => {
        if (!selectedExportType) return

        setIsExporting(true)
        
        // Simulate export process
        setTimeout(() => {
            // In a real application, this would trigger the actual export
            const filename = `${selectedExportType}_export_${new Date().toISOString().split('T')[0]}.${exportFormat}`
            
            // Create a mock download
            const element = document.createElement('a')
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Mock ${selectedExportType} data export`))
            element.setAttribute('download', filename)
            element.style.display = 'none'
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
            
            setIsExporting(false)
        }, 2000)
    }

    const quickExports = [
        { name: 'Today\'s Appointments', type: 'appointments', format: 'csv' },
        { name: 'This Week\'s Patients', type: 'patients', format: 'excel' },
        { name: 'Monthly Revenue Report', type: 'analytics', format: 'pdf' },
        { name: 'Treatment Summary', type: 'treatments', format: 'csv' }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <HomeHeader role="analyst" />
            <div className="max-w-7xl mx-auto pt-5">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Export Dashboard</h1>
                    <p className="text-gray-600">Export dental records, patient statistics, and analytics data</p>
                </div>

                {/* Quick Export Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Exports</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickExports.map((item, index) => (
                            <button
                                key={index}
                                className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
                                onClick={() => {
                                    setSelectedExportType(item.type)
                                    setExportFormat(item.format)
                                    handleExport()
                                }}
                            >
                                <div className="flex items-center mb-2">
                                    <Download className="w-4 h-4 text-blue-600 mr-2" />
                                    <span className="font-medium text-gray-800">{item.name}</span>
                                </div>
                                <span className="text-sm text-gray-500 uppercase">{item.format}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Export Configuration */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Export Type Selection */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Export Type</h2>
                            <div className="space-y-4">
                                {exportTypes.map((type) => {
                                    const IconComponent = type.icon
                                    return (
                                        <div
                                            key={type.id}
                                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                                selectedExportType === type.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            onClick={() => setSelectedExportType(type.id)}
                                        >
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 mr-4">
                                                    <div className={`p-2 rounded-lg ${
                                                        selectedExportType === type.id ? 'bg-blue-100' : 'bg-gray-100'
                                                    }`}>
                                                        <IconComponent className={`w-6 h-6 ${
                                                            selectedExportType === type.id ? 'text-blue-600' : 'text-gray-600'
                                                        }`} />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-800">{type.title}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                                                    <div className="flex items-center mt-2 text-sm text-gray-500">
                                                        <span className="mr-4">{type.recordCount}</span>
                                                        <span>Est. size: {type.estimatedSize}</span>
                                                    </div>
                                                </div>
                                                {selectedExportType === type.id && (
                                                    <Check className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Date Range and Filters */}
                        {selectedExportType && (
                            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Configuration</h3>
                                
                                {/* Date Range */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                                            <input
                                                type="date"
                                                value={dateRange.start}
                                                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">End Date</label>
                                            <input
                                                type="date"
                                                value={dateRange.end}
                                                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Data Filters */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        <Filter className="w-4 h-4 inline mr-2" />
                                        Include Data Types
                                    </label>
                                    <div className="space-y-2">
                                        {Object.entries(filters).map(([key, value]) => (
                                            <label key={key} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={value}
                                                    onChange={(e) => setFilters({...filters, [key]: e.target.checked})}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">
                                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Export Format */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                                    <select
                                        value={exportFormat}
                                        onChange={(e) => setExportFormat(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="csv">CSV (Comma Separated Values)</option>
                                        <option value="excel">Excel (.xlsx)</option>
                                        <option value="pdf">PDF Report</option>
                                        <option value="json">JSON Data</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Export Summary and Actions */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Summary</h3>
                            
                            {selectedExportType ? (
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Export Type:</span>
                                        <span className="font-medium text-gray-800">
                                            {exportTypes.find(t => t.id === selectedExportType)?.title}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Format:</span>
                                        <span className="font-medium text-gray-800 uppercase">{exportFormat}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Date Range:</span>
                                        <span className="font-medium text-gray-800">
                                            {dateRange.start && dateRange.end ? 
                                                `${dateRange.start} to ${dateRange.end}` : 
                                                'All dates'
                                            }
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Est. Size:</span>
                                        <span className="font-medium text-gray-800">
                                            {exportTypes.find(t => t.id === selectedExportType)?.estimatedSize}
                                        </span>
                                    </div>
                                    
                                    <div className="pt-4 border-t">
                                        <button
                                            onClick={handleExport}
                                            disabled={isExporting}
                                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        >
                                            {isExporting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Exporting...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Export Data
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    <Database className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                    <p>Select an export type to get started</p>
                                </div>
                            )}
                        </div>

                        {/* Recent Exports */}
                        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Exports</h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Patient Records', date: '2024-06-28', size: '2.1 MB' },
                                    { name: 'Treatment Data', date: '2024-06-25', size: '1.8 MB' },
                                    { name: 'Analytics Report', date: '2024-06-22', size: '856 KB' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.date}</p>
                                        </div>
                                        <span className="text-xs text-gray-500">{item.size}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataExport
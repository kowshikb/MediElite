import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import reportsData from '../data/reports.json';

const DocumentTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredReports, setFilteredReports] = useState(reportsData);

    useEffect(() => {
        const results = reportsData.filter(report =>
            report.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredReports(results);
    }, [searchTerm]);

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Title</th>
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.map((report) => (
                        <tr key={report.id}>
                            <td className="border border-gray-300 p-2">{report.title}</td>
                            <td className="border border-gray-300 p-2">{report.date}</td>
                            <td className="border border-gray-300 p-2">{report.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentTable;
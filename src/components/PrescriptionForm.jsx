import React, { useState } from 'react';

const PrescriptionForm = () => {
    const [patientName, setPatientName] = useState('');
    const [medication, setMedication] = useState('');
    const [dosage, setDosage] = useState('');
    const [instructions, setInstructions] = useState('');
    const [prescriptions, setPrescriptions] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPrescription = {
            patientName,
            medication,
            dosage,
            instructions,
        };
        setPrescriptions([...prescriptions, newPrescription]);
        clearForm();
    };

    const clearForm = () => {
        setPatientName('');
        setMedication('');
        setDosage('');
        setInstructions('');
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Prescription Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Patient Name</label>
                    <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Medication</label>
                    <input
                        type="text"
                        value={medication}
                        onChange={(e) => setMedication(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Dosage</label>
                    <input
                        type="text"
                        value={dosage}
                        onChange={(e) => setDosage(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Instructions</label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Save Prescription
                </button>
            </form>
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Saved Prescriptions</h3>
                <ul className="mt-2 space-y-2">
                    {prescriptions.map((prescription, index) => (
                        <li key={index} className="border border-gray-300 p-2 rounded-md">
                            <p><strong>Patient:</strong> {prescription.patientName}</p>
                            <p><strong>Medication:</strong> {prescription.medication}</p>
                            <p><strong>Dosage:</strong> {prescription.dosage}</p>
                            <p><strong>Instructions:</strong> {prescription.instructions}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PrescriptionForm;
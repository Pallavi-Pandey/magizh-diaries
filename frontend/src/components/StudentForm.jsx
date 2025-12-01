import { useState } from 'react';

export default function StudentForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        class_name: initialData?.class_name || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Class</label>
                <input
                    type="text"
                    name="class_name"
                    className="form-input"
                    value={formData.class_name}
                    onChange={handleChange}
                    placeholder="e.g., 10, 12, Grade 5"
                    required
                />
            </div>

            <div className="flex gap-3 justify-between">
                <button type="button" className="btn btn-outline" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    {initialData ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    );
}

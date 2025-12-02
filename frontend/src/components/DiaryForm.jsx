import { useState } from 'react';

export default function DiaryForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        entry_date: initialData?.entry_date || new Date().toISOString().split('T')[0],
        homework: initialData?.homework || '',
        classwork: initialData?.classwork || '',
        attendance: initialData?.attendance || 'Present',
        remarks: initialData?.remarks || '',
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
                <label className="form-label">Date</label>
                <input
                    type="date"
                    name="entry_date"
                    className="form-input"
                    value={formData.entry_date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Homework</label>
                <textarea
                    name="homework"
                    className="form-textarea"
                    value={formData.homework}
                    onChange={handleChange}
                    placeholder="Math: Chapter 5, Science: Lab report"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Classwork</label>
                <textarea
                    name="classwork"
                    className="form-textarea"
                    value={formData.classwork}
                    onChange={handleChange}
                    placeholder="Completed exercises 1-10"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Attendance</label>
                <select
                    name="attendance"
                    className="form-select"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Half Day">Half Day</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Remarks</label>
                <textarea
                    name="remarks"
                    className="form-textarea"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Good participation"
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

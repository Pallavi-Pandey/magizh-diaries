import { useState, useEffect } from 'react';
import { studentsAPI, diaryAPI } from '../services/api';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import StudentForm from '../components/StudentForm';
import DiaryForm from '../components/DiaryForm';

export default function AdminDashboard() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [diaryEntries, setDiaryEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Modal states
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [showDiaryModal, setShowDiaryModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        loadStudents();
    }, []);

    useEffect(() => {
        if (selectedStudent) {
            loadDiaryEntries(selectedStudent.id);
        }
    }, [selectedStudent]);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const response = await studentsAPI.getAll();
            setStudents(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load students: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadDiaryEntries = async (studentId) => {
        try {
            const response = await diaryAPI.getAll(studentId);
            setDiaryEntries(response.data);
        } catch (err) {
            setError('Failed to load diary entries: ' + err.message);
        }
    };

    const handleStudentSubmit = async (data) => {
        try {
            if (editingItem) {
                await studentsAPI.update(editingItem.id, data);
                setSuccess('Student updated successfully!');
            } else {
                await studentsAPI.create(data);
                setSuccess('Student created successfully!');
            }
            loadStudents();
            setShowStudentModal(false);
            setEditingItem(null);
        } catch (err) {
            setError('Failed to save student: ' + err.message);
        }
    };

    const handleDiarySubmit = async (data) => {
        try {
            const diaryData = { ...data, student_id: selectedStudent.id };
            if (editingItem) {
                await diaryAPI.update(editingItem.id, diaryData);
                setSuccess('Diary entry updated successfully!');
            } else {
                await diaryAPI.create(diaryData);
                setSuccess('Diary entry created successfully!');
            }
            loadDiaryEntries(selectedStudent.id);
            setShowDiaryModal(false);
            setEditingItem(null);
        } catch (err) {
            setError('Failed to save diary entry: ' + err.message);
        }
    };

    const handleDeleteStudent = async (id) => {
        if (!confirm('Are you sure you want to delete this student? This will also delete all their diary entries.')) return;

        try {
            await studentsAPI.delete(id);
            setSuccess('Student deleted successfully!');
            loadStudents();
            if (selectedStudent?.id === id) {
                setSelectedStudent(null);
                setDiaryEntries([]);
            }
        } catch (err) {
            setError('Failed to delete student: ' + err.message);
        }
    };

    const handleDeleteDiary = async (id) => {
        if (!confirm('Are you sure you want to delete this diary entry?')) return;

        try {
            await diaryAPI.delete(id);
            setSuccess('Diary entry deleted successfully!');
            loadDiaryEntries(selectedStudent.id);
        } catch (err) {
            setError('Failed to delete diary entry: ' + err.message);
        }
    };

    const copyShareLink = (shareKey, type) => {
        const url = `${window.location.origin}/share/${type}/${shareKey}`;
        navigator.clipboard.writeText(url);
        setSuccess('Share link copied to clipboard!');
    };

    if (loading) return <Loading />;

    return (
        <div className="container">
            <Alert type="error" message={error} onClose={() => setError(null)} />
            <Alert type="success" message={success} onClose={() => setSuccess(null)} />

            <div className="grid grid-cols-2 gap-4">
                {/* Students List */}
                <div className="card">
                    <div className="card-header">
                        <div className="flex justify-between items-center">
                            <h2 className="card-title">Students</h2>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setEditingItem(null);
                                    setShowStudentModal(true);
                                }}
                            >
                                + Add Student
                            </button>
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Class</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr
                                        key={student.id}
                                        onClick={() => setSelectedStudent(student)}
                                        style={{ cursor: 'pointer', background: selectedStudent?.id === student.id ? 'var(--bg-tertiary)' : 'transparent' }}
                                    >
                                        <td>{student.name}</td>
                                        <td>{student.class_name}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    className="btn btn-outline"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingItem(student);
                                                        setShowStudentModal(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteStudent(student.id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Diary Entries */}
                <div className="card">
                    <div className="card-header">
                        <div className="flex justify-between items-center">
                            <h2 className="card-title">Diary Entries</h2>
                            {selectedStudent && (
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setEditingItem(null);
                                        setShowDiaryModal(true);
                                    }}
                                >
                                    + Add Entry
                                </button>
                            )}
                        </div>
                    </div>

                    {!selectedStudent ? (
                        <p className="text-muted text-center">Select a student to view diary entries</p>
                    ) : diaryEntries.length === 0 ? (
                        <p className="text-muted text-center">No diary entries yet</p>
                    ) : (
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Attendance</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diaryEntries.map((entry) => (
                                        <tr key={entry.id}>
                                            <td>{new Date(entry.entry_date).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`badge ${entry.attendance === 'Present' ? 'badge-success' : 'badge-error'}`}>
                                                    {entry.attendance}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="btn btn-outline"
                                                        onClick={() => {
                                                            setEditingItem(entry);
                                                            setShowDiaryModal(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => copyShareLink(entry.share_key, 'diary')}
                                                    >
                                                        Share
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDeleteDiary(entry.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>


            </div>

            {/* Modals */}
            <Modal
                isOpen={showStudentModal}
                onClose={() => {
                    setShowStudentModal(false);
                    setEditingItem(null);
                }}
                title={editingItem ? 'Edit Student' : 'Add Student'}
            >
                <StudentForm
                    initialData={editingItem}
                    onSubmit={handleStudentSubmit}
                    onCancel={() => {
                        setShowStudentModal(false);
                        setEditingItem(null);
                    }}
                />
            </Modal>

            <Modal
                isOpen={showDiaryModal}
                onClose={() => {
                    setShowDiaryModal(false);
                    setEditingItem(null);
                }}
                title={editingItem ? 'Edit Diary Entry' : 'Add Diary Entry'}
            >
                <DiaryForm
                    initialData={editingItem}
                    onSubmit={handleDiarySubmit}
                    onCancel={() => {
                        setShowDiaryModal(false);
                        setEditingItem(null);
                    }}
                />
            </Modal>
        </div>
    );
}

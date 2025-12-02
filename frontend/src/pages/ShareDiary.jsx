import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { diaryAPI } from '../services/api';
import Loading from '../components/Loading';
import Alert from '../components/Alert';

export default function ShareDiary() {
    const { shareKey } = useParams();
    const [diary, setDiary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDiary();
    }, [shareKey]);

    const loadDiary = async () => {
        try {
            setLoading(true);
            const response = await diaryAPI.getByShareKey(shareKey);
            setDiary(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load diary entry. Invalid or expired share link.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    if (error) return (
        <div className="container">
            <Alert type="error" message={error} />
        </div>
    );

    return (
        <div className="container">
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="card-header">
                    <h1 className="card-title">📖 Daily Diary</h1>
                    <p className="text-muted">Student: {diary.student?.name}</p>
                </div>

                <div className="grid gap-4">
                    <div>
                        <h3 className="text-primary mb-2">📅 Date</h3>
                        <p>{new Date(diary.entry_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    </div>

                    <div>
                        <h3 className="text-primary mb-2">✅ Attendance</h3>
                        <span className={`badge ${diary.attendance === 'Present' ? 'badge-success' : 'badge-error'}`}>
                            {diary.attendance}
                        </span>
                    </div>

                    {diary.homework && (
                        <div>
                            <h3 className="text-primary mb-2">📚 Homework</h3>
                            <p>{diary.homework}</p>
                        </div>
                    )}

                    {diary.classwork && (
                        <div>
                            <h3 className="text-primary mb-2">📝 Classwork</h3>
                            <p>{diary.classwork}</p>
                        </div>
                    )}

                    {diary.remarks && (
                        <div>
                            <h3 className="text-primary mb-2">💬 Teacher's Remarks</h3>
                            <div className="alert alert-info">
                                {diary.remarks}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-center text-muted">
                    <p>Created on {new Date(diary.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
}

export default function Alert({ type = 'info', message, onClose }) {
    if (!message) return null;

    return (
        <div className={`alert alert-${type}`}>
            <div className="flex justify-between items-center">
                <span>{message}</span>
                {onClose && (
                    <button onClick={onClose} className="modal-close">
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}

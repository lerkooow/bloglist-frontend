const Notification = ({ message }) => {
    return message ? (
        <div className={`message ${message.type}`}>{message.text}</div>
    ) : null;
};

export default Notification;
import { notification } from 'antd';

const defaultMessageDuration = {
    info: 7,
    success: 3,
    warning: 10,
    error: 12,
};

class Message {
    static sendSuccess = (message, duration = defaultMessageDuration.success) => {
        notification.success({
            message: message,
            duration: duration,
        });
    };

    static sendInfo = (message, duration = defaultMessageDuration.info) => {
        notification.info({
            message: message,
            duration: duration,
        });
    };

    static sendWarning = (message, duration = defaultMessageDuration.warning) => {
        notification.warning({
            message: message,
            duration: duration,
        });
    };

    static sendError = (message, duration = defaultMessageDuration.error) => {
        notification.error({
            message: message,
            duration: duration,
        });
    };
}

export default Message;

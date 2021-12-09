import { store } from 'react-notifications-component';

export const type = {
  succsess: 'success',
  danger: 'danger',
  info: 'info',
  default: 'default',
  warning: 'warning'
}

export const position = {
  topLeft : 'top-left',
  topRight: 'top-right',
  topCenter: 'top-center',
  center: 'center',
  bottomLeft: 'bottomLeft',
  bottomRight: 'bottom-right',
  bottomCenter: 'bottom-center'
}

export const showNotification = (title, msg, type, duration) => {
    store.addNotification({
        title: title,
        message: msg,
        type: type,
        isMobile: true,
        break: '768',
        className: 'notification',
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: duration,
          onScreen: true
        }
    });
}
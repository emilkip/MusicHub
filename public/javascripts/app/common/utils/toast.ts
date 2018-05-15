
import { toast, Slide } from 'react-toastify';

const defaultConfig = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    transition: Slide,
    hideProgressBar: true
};

function configure(custom: any): any {
    let config = Object.assign({}, defaultConfig);
    if (custom) {
        return Object.assign(config, custom);
    }
    return config;
}


export default {
    info(message: string, customConfig?: any) {
        let config = configure(customConfig);
        toast.warn(message, config);
    },

    warn(message: string, customConfig?: any) {
        let config = configure(customConfig);
        toast.warn(message, config);
    },

    error(message: string, customConfig?: any) {
        let config = configure(customConfig);
        toast.error(message, config);
    },

    success(message: string, customConfig?: any) {
        let config = configure(customConfig);
        toast.success(message, config);
    },

    customTemplate(template: JSX.Element, customConfig: any) {
        let config = configure(customConfig);
        return toast(template, config);
    }
};

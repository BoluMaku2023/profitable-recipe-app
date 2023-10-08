import AuthHelperMethods from './AuthHelperMethods';

const Auth = new AuthHelperMethods();

const Axios = Auth.axios;

export const postRequest = async(url, payload = {}) => {
    const data = await Axios(url, payload, "post")
        .then(resp => resp.data)
        .catch(err => {
            return {err}
        })

        return data;
}

export const putRequest = async(url, payload = {}) => {
    const data = await Axios(url, payload, "put")
        .then(resp => resp.data)
        .catch(err => {
            return {err}
        })

        return data;
}

export const getRequest = async(url) => {
    const data = await Axios(url, {}, "get")
        .then(resp => resp.data)
        .catch(err => {
            return {err}
        })

        return data;
}

export const deleteRequest = async(url, payload = {}) => {
    const data = await Axios(url, payload, "delete")
        .then(resp => resp.data)
        .catch(err => {
            return {err}
        })

        return data;
}
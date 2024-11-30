const BASE_URL = '/api';

const url = "https://mindfull-hn00qamwk-geofrey-s-projects.vercel.app"

export const api = {
    async request(url, method = 'GET', data = null) {
        const options = {
            method,
            headers: {
                'content-type':'application/json',
            },
        };

        if(data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${BASE_URL}${url}`, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error (errorData.message || 'An error occured');
        }

        return await response.json();
    },

    get(url) {
        return this.request(url);
    },

    post(url,data) {
        return this.request(url, 'POST', data);
    },

    put(url) {
        return this.request(url, 'PUT', data);
    },

    delete(url) {
        return this.request(url, 'DELETE');
    },
};
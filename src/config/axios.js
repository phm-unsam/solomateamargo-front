export default function apiCall(method, url, data){
    return fetch(url, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    }).then(response => response.json())
}
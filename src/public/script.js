
const host = 'http://localhost:3000';
const codeEl = document.getElementById('code');
const getBtnEl = document.getElementById('get');
const postBtnEl = document.getElementById('post');
const putBtnEl = document.getElementById('put');
const deleteBtnEl = document.getElementById('delete');

function makeRequest(path, method, body) {
    const options = { method };
    if (method !== 'GET' && body) {
        options.body = JSON.stringify(body);
        options.headers = {
            'Content-Type': 'application/json'
        }
    }
    fetch(host + path, options)
        .then((data) => data.json())
        .then((data) => {
            codeEl.innerText = JSON.stringify(data, null, 2);
            codeEl.style.color = 'green';
        })
        .catch((error) => {
            const data = { status: 'CORS error', message: error.message };
            codeEl.innerText = JSON.stringify(data, null, 2);
            codeEl.style.color = 'red';
        });
}
const isSameOrigin = window.location.href.startsWith(host);

document.title = isSameOrigin ? 'No CORS required' : 'CORS required';
codeEl.innerText = JSON.stringify({ message: 'Welcome!' }, null, 2);
getBtnEl.addEventListener('click', () => {
    makeRequest('/get', 'GET');
});
postBtnEl.addEventListener('click', () => {
    const body = { data: { message: 'clicked POST' } };
    makeRequest('/post', 'POST', body);
});
putBtnEl.addEventListener('click', () => {
    const body = { data: { message: 'clicked PUT' } };
    makeRequest('/put', 'PUT', body);
});
deleteBtnEl.addEventListener('click', () => {
    makeRequest('/delete', 'DELETE');
});

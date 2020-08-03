
const postRequest = (url, data) => {
    return fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .catch((error) => console.log(error));
}

const getRequest = (url) => {
  return fetch(url)
    // .then((resp) => resp.json())
    .catch((error) => console.log(error));
};

export {getRequest, postRequest}

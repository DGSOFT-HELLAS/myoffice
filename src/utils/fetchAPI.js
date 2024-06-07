export const fetchAPI = async (url, raw) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: 'follow',
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => console.log('error', error));
};

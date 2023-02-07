export const fetchUser = async (url, raw) => {
  console.log('Fetch User')
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: 'follow'
  };


  let result = await fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => console.log('error', error));

  return result;
}
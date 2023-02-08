export const fetchAPI = async (url, raw) => {
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
      // console.log('\n')
      // console.log('\n')
      // console.log('\n')
      // console.log('---------------------------------------------------------------------------------------------------------------------------')
      // console.log('---------------------------------------------------------------------------------------------------------------------------')
      // console.log('--------------------------------------------------- DATA RESULT FETCH  ----------------------------------------------------')
      // console.log(result)
      // console.log('---------------------------------------------------------------------------------------------------------------------------')
      // console.log('---------------------------------------------------------------------------------------------------------------------------')
      // console.log('---------------------------------------------------------------------------------------------------------------------------')
      // console.log('\n')
      // console.log('\n')
      // console.log('\n')
      return result;
    })
    .catch(error => console.log('error', error));

  return result;
}
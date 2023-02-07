export const isExpired = (data) => {

 if(data["Ημ/νία"]) {
  let now = new Date().toLocaleDateString();
  // console.log('NOW = ' + now)

  let receivedDate = data["Ημ/νία"] 

  
  if (receivedDate < now) {
    return false;
  }
  if (receivedDate > now ) {
    return true;
  }
  if(receivedDate == now) {
    console.log('yes')
  }

 } 


}
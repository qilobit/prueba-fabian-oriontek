module.exports = {
  toast,
  confirm,
  message
}


function toast(title, type){
  type = type || 'success';
  title = title || 'no title';

  window.Swal
  .mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  })
  .fire({
    type: type,
    title: title
  });  
}
function confirm(message){
  return new Promise((resolve, reject) => {
    window.Swal
    .fire({
      title: 'Are you sure?',
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '<i class="fa fa-close"></i> No',
      confirmButtonText: '<i class="fa fa-check"></i> Yes',
      backdrop: false,
      reverseButtons: true
    })
    .then(result => resolve(result.value))
    .catch(e => reject(e));
  });
}
function message(title, message, type){
  return window.Swal
  .fire({
    title: title,
    text: message,
    type: type || 'success',
    confirmButtonText: 'Ok',
  });
}
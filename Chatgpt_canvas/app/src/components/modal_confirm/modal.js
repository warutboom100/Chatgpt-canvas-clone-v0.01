
import Swal from 'sweetalert2'
import { login_Auth } from '../../config/api_backend';

export const login_confirm = (username, password,setCookie) =>{
  Swal.fire({
    title: "Are you sure?",
    
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#dc3545",
    confirmButtonColor: "#28a745",
    confirmButtonText: "Yes, Login"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await login_Auth(username,password,setCookie);
        if(response.status===200){
          return;
        }
        else{
          const text =response.response.data.detail;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: text,
          });
        }
      }
    });
  
  
}
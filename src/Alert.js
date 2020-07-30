import Swal from "sweetalert2";

const Alert = async () => {
   return await Swal.fire({
        title: "Input Your Name",
        input: "text",
        inputPlaceholder: "Enter your name",
    })
}

export default Alert
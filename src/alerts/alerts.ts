import Swal from "sweetalert2";

export const showBasicAlert = (title: string, text: string) => {
    return (
        Swal.fire({
            title: title,
            text: text,
            icon: "success"
          })
    )
}
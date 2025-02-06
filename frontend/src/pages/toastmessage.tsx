import { toast } from "react-toastify";


export default function ToastMessage(message: string,type: string) {
    if (type === "error") {
        console.error(message);
        toast .error(message, {
            position: "bottom-right"
        });
    } else if (type === "success") {
        console.log(message);
        toast.success(message, {
            position: "bottom-right"
        });
    } else {
        console.log(message);
        toast.warning(message, {
            position: "bottom-right"
        });
    }
    

}
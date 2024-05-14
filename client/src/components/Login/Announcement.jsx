import toast, { Toaster } from "react-hot-toast";

const Announcement = ({title}) => {
    toast(title, {
        duration: 3000,
        position: "top-center",
        className: "",
        icon: "😍",
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    })
    return (
        <Toaster />
    )
}

export default Announcement;
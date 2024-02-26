import { openUploadWidget } from "../../utils/CloudinaryService";
import toast from "react-hot-toast";

const CloudinaryUpload = ({ setSong }) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dtbydmj92",
                uploadPreset: "Shashant",
                sources: ["local"],
            },
            function (error, result) {
                console.log(result)
                if (!error && result.event === "success") {
                    setSong(prevData => ({ ...prevData, song: result.info.secure_url }));
                    toast.success("Song selected successfully!"); 
                    toast.success("Ready to upload")
                } else {
                    if (error) {
                        toast.error("Error in song upload")
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button
            className="p-3 text-xl px-4 bg-white text-black rounded-md"
            onClick={uploadImageWidget}
        >
            Select Track
        </button>
    );
};

export default CloudinaryUpload;

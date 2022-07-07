import * as Yup from "yup";

export const createProjectValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Temple name is required"),
    templeNameTamil: Yup.string()
        .required("கோவில் பெயர் தேவை"),
    inchargeName: Yup.string()
        .required("Incharge name is required!"),
    templeInchargeNameTamil: Yup.string()
        .required("கோவில் பொறுப்பாளர் பெயர் தேவை"),
    inchargeMobileNumber: Yup.string()
        .required("Mobile number is required")
        .min(8, "Mobile number should be valid")
        .max(15, "Mobile number should be valid"),
    location: Yup.string()
        .required("Location name is required!"),
    locationNameTamil: Yup.string()
        .required("இடம் பெயர் தேவை"),
})
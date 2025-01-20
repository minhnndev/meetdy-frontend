const translation = {
    password: "Password",
    passwordConfirm: "Password confirm",
    currentPassword: "Current password",
    newPassword: "New password",
    newPasswordConfirm: "New password confirm",
    name: "Name",
    terms: "I agree to the terms and conditions",
    dob: "Date of birth",
    gender: "Gender",
    placeholder: {
        username: "Enter your email or phone number",
        password: "Enter your password",
        passwordConfirm: "Enter your password confirm",
        name: "Enter your name, ex: John Doe",
        dropzone: "Drag and drop or select file",
        coverImage: "Select cover image",
        dob: "Select date of birth",
        contact: "Enter your phone number or email",
        groupName: "Enter group name",
        search: "Search",
    },
    description: {
        verify: "Verify OTP to complete registration",
    },
    error: {
        username: {
            required: "Username is required",
            invalid: "Username is invalid",
        },
        password: {
            required: "Password is required",
            invalid: "Password must be between 8-50 characters",
        },
        passwordConfirm: {
            required: "Password confirm is required",
            mismatch: "Password confirm does not match",
        },
        name: {
            required: "Name is required",
            invalid: "Name must be less than 50 characters",
        },
        pin: {
            invalid: "PIN must be 6 characters",
        },
        dob: {
            invalid: "Date of birth is invalid",
            cannotBeInTheFuture: "Date of birth cannot be in the future.",
        },
        gender: {
            required: "Gender is required",
        },
    },
};

export default translation;

const validationRules = {
    firstName: {
        required: {value:true,message: "First name is required"},
        minLength: {value: 2,message: "First name must have at least 2 characters"}
    },
    lastName: {
        required: {value:true,message: "Last name is required"},
        minLength: {value: 2,message: "Last name must have at least 2 characters"}
    },
    email: {
        required: {value:true,message: "Email is required"},
        pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,message: "Enter a valid email address"}
    },
    password: {
        required: {value:true,message: "Password is required"},
        minLength: {value: 8,message: "Password must have at least 8 characters"},
        validate: (value) => {
            if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
            if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
            if (!/[0-9]/.test(value)) return "Password must contain at least one number";
            return true;
        }
    },
    confirmPassword: {
        required: {value: true,message:"Please confirm your password"}
    },
    selectItem: {
        required: {value: true,message: "The field is required"}
    }
}

export const Input = ({label,inputType,placeholder,validation,registerFor,errors,passwordValue}) => {
    const error = errors?.[registerFor];
    
    return(
        <>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-ink mb-1">{label}</label>
                <input 
                    type={inputType} 
                    placeholder={placeholder} 
                    className={`border-2 p-2 rounded-md transition-colors ${
                        error 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-border focus:border-green focus:outline-none'
                    }`}
                    {...(validation && registerFor ? validation(registerFor, validationRules[registerFor]) : {})} 
                />
                {error && (
                    <span className="text-red-500 text-xs mt-1 font-medium">
                        {error.message}
                    </span>
                )}
            </div>
        </>
    )
}
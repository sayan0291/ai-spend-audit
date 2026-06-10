import { Input } from "../Form/FormInputSelect"
import { Icon } from "../components/common/Icon"
import { Bot, LogIn } from "lucide-react"
import { Button } from "../components/common/Button"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { handleRegister,userProfile } from "../lib/supabse"
import { useUser } from "../context/UserContext"

export const Register = () => {
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(null);

    const navigate = useNavigate();

    const { login } = useUser();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({ mode: "onBlur" })

    const passwordValue = watch("password");
    
    const onSubmit = async (data) => {
        try {
            setSubmitError(null);
            setSubmitSuccess(null);

            if (data.password !== data.confirmPassword) {
            setSubmitError("Passwords do not match");
            return;
            }

            const user = await handleRegister(data);
            const profile = await userProfile(user.id);
            await login(user, profile);

            setSubmitSuccess("Account created successfully");

            navigate("/main/dashboard");

        } catch (error) {
            setSubmitError(
            error?.message || "Failed to create account"
            );
        }
    };

    return(
        <div className="w-screen h-screen bg-surface flex flex-row">
            {/* Left Section - Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-light to-[#C7D8FC] flex-jc-ic relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-40 h-40 bg-green rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-violet rounded-full blur-3xl"></div>
                </div>
                <img 
                    src="/public/Register.jpeg" 
                    alt="Register illustration" 
                    className="w-3/4 h-3/4 object-cover rounded-3xl shadow-lg relative z-10"
                />
            </div>

            {/* Right Section - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-16 overflow-y-auto">
                <div className="w-full max-w-md py-10">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="logo gap-3 mb-6">
                            <div className="bg-green rounded-full p-3">
                                <Icon varient="solid">
                                    <Bot size={28} strokeWidth={2} className="text-surface" />
                                </Icon>
                            </div>
                            <div>
                                <h1 className="text-3xl font-semibold text-ink">SpendLens</h1>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-ink mb-2">Create your account</h2>
                            <p className="text-ink-3 text-sm">Join to track your spending</p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {submitError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md">
                            <p className="text-red-600 text-sm font-medium">{submitError}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {submitSuccess && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-300 rounded-md">
                            <p className="text-green-600 text-sm font-medium">{submitSuccess}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Input 
                                    label="First Name" 
                                    inputType="text" 
                                    placeholder="John"
                                    validation={register}
                                    registerFor="firstName"
                                    errors={errors}
                                />
                            </div>
                            <div>
                                <Input 
                                    label="Last Name" 
                                    inputType="text" 
                                    placeholder="Doe"
                                    validation={register}
                                    registerFor="lastName"
                                    errors={errors}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <Input 
                                label="Email Address" 
                                inputType="email" 
                                placeholder="you@example.com"
                                validation={register}
                                registerFor="email"
                                errors={errors}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Input 
                                label="Password" 
                                inputType="password" 
                                placeholder="Create a strong password"
                                validation={register}
                                registerFor="password"
                                errors={errors}
                            />
                            <p className="text-xs text-ink-3 mt-1">At least 8 characters with uppercase, lowercase, and numbers</p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <Input 
                                label="Confirm Password" 
                                inputType="password" 
                                placeholder="Confirm your password"
                                validation={register}
                                registerFor="confirmPassword"
                                errors={errors}
                            />
                        </div>

                        {/* Submit Button */}
                        <Button varient="submitBtn" disabled={isSubmitting}>
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-ink-3 mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-green hover:text-green-dark font-semibold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
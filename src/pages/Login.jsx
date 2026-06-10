import { Input } from "../Form/FormInputSelect"
import { Icon } from "../components/common/Icon"
import { Bot } from "lucide-react"
import { Button } from "../components/common/Button"
import { Link,useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { handleLogin,userProfile } from "../lib/supabse";
import { useUser } from "../context/UserContext";

export const Login = () => {
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();
    const { login } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ mode: "onBlur" })

    const onSubmit = async (data) => {
        try {
            setSubmitError(null);

            const user = await handleLogin(data);
            const profile = await userProfile(user.id);
            await login(user, profile);

            navigate("/main/dashboard");

        } catch (error) {
            setSubmitError(
            error?.message ||
            "Failed to sign in. Please try again."
            );
        }
    };

    return(
        <div className="w-screen h-screen bg-surface flex flex-row">
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-light to-[#C7D8FC] flex-jc-ic relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-40 h-40 bg-green rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-violet rounded-full blur-3xl"></div>
                </div>
                <img 
                    src="/public/Login.jpeg" 
                    alt="Login illustration" 
                    className="w-3/4 h-3/4 object-cover rounded-3xl shadow-lg relative z-10"
                />
            </div>

            {/* Right Section - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-16">
                <div className="w-full max-w-md">
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
                                <p className="text-sm text-ink-3 font-body">spending insights</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-ink mb-2">Welcome back</h2>
                            <p className="text-ink-3 text-sm">Sign in to your account to continue</p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {submitError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md">
                            <p className="text-red-600 text-sm font-medium">{submitError}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                        <div>
                            <Input 
                                label="Password" 
                                inputType="password" 
                                placeholder="Enter your password"
                                validation={register}
                                registerFor="password"
                                errors={errors}
                            />
                        </div>

                        <Button varient="submitBtn" disabled={isSubmitting}>
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-ink-3 mt-8">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-green hover:text-green-dark font-semibold">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
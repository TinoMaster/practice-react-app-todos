import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUsers } from "../../../hooks/useUsers";
import { getGreaterUserId } from "../../../utils/globals.utils";
import type { CreateUserData, User } from "../../../types/user";
import { createUserSchema } from "../../../types/user";

interface UserFormProps {
    initialData?: User;
    onSubmit: (data: CreateUserData) => void;
    isSubmitting: boolean;
    submitButtonText?: string;
}

export const UserForm = ({ initialData, onSubmit, isSubmitting, submitButtonText = "Save" }: UserFormProps) => {
    const users = useUsers().data;
    const greaterUserId = getGreaterUserId(users ?? []);
    const {
        register, //Funzione per registrare i campi del form
        handleSubmit, //Funzione per gestire l' invio
        formState: { errors } //Oggetto con gli errori di validazione  
    } = useForm<CreateUserData>({ //questo form gestisce i dati di tipo "CreateUserData"
        resolver: zodResolver(createUserSchema), //usa lo schema zod per la validazione
        defaultValues: initialData
            ? {
                name: initialData.name,
                username: initialData.username,
                email: initialData.email,
                phone: initialData.phone,
                website: initialData.website,
                id: initialData.id
            }
            : {
                name: "",
                username: "",
                email: "",
                phone: "",
                website: "",
                id: (Number(greaterUserId) + 1)
            }
    });

    const handleFormSubmit = async (data: CreateUserData) => {
        const dataToSubmit = {
            ...data,
            id: (Number(greaterUserId) + 1)
        };
        onSubmit(dataToSubmit);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                    Name
                </label>
                <div id="name" className="mt-1">
                    <input
                        type="text"
                        {...register("name")}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Name"
                        autoFocus
                    />
                    <div className="mt-2 text-sm text-red-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        {errors.name?.message}
                    </div>
                </div>
                {errors.name && (
                    <div className="mt-2 text-sm text-red-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        {errors.name.message}
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                    Username
                </label>
                <div id="username" className="mt-1">
                    <input
                        type="text"
                        {...register("username")}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <div className="mt-2 text-sm text-red-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        {errors.username?.message}
                    </div>
                </div>
                {errors.username && (
                    <div className="mt-2 text-sm text-red-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        {errors.username.message}
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                    Email
                </label>
                <div id="email" className="mt-1">
                    <input
                        type="email"
                        {...register("email")}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <div className="mt-2 text-sm text-red-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        {errors.email?.message}
                    </div>
                </div>
                {errors.email && (
                    <div className="mt-2 text-sm text-red-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        {errors.email.message}
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">
                    Phone
                </label>
                <div id="phone" className="mt-1">
                    <input
                        type="tel"
                        {...register("phone")}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                {errors.phone && (
                    <div className="mt-2 text-sm text-red-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        {errors.phone.message}
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-200 mb-2">
                    Website
                </label>
                <div id="website" className="mt-1">
                    <input
                        type="text"
                        {...register("website")}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Website"
                    />
                </div>
            </div>

            {/* Address Section */}
            <div className="border-t border-gray-600 pt-6">
                <h3 className="text-lg font-medium text-gray-200 mb-4">Address</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="address.street" className="block text-sm font-medium text-gray-200 mb-2">
                            Street
                        </label>
                        <input
                            type="text"
                            {...register("address.street")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Street"
                        />
                    </div>

                    <div>
                        <label htmlFor="address.suite" className="block text-sm font-medium text-gray-200 mb-2">
                            Suite
                        </label>
                        <input
                            type="text"
                            {...register("address.suite")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Suite"
                        />
                    </div>

                    <div>
                        <label htmlFor="address.city" className="block text-sm font-medium text-gray-200 mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            {...register("address.city")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="City"
                        />
                    </div>

                    <div>
                        <label htmlFor="address.zipcode" className="block text-sm font-medium text-gray-200 mb-2">
                            Zipcode
                        </label>
                        <input
                            type="text"
                            {...register("address.zipcode")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Zipcode"
                        />
                    </div>
                </div>
            </div>

            {/* Company Section */}
            <div className="border-t border-gray-600 pt-6">
                <h3 className="text-lg font-medium text-gray-200 mb-4">Company</h3>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="company.name" className="block text-sm font-medium text-gray-200 mb-2">
                            Company Name
                        </label>
                        <input
                            type="text"
                            {...register("company.name")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Company Name"
                        />
                    </div>

                    <div>
                        <label htmlFor="company.catchPhrase" className="block text-sm font-medium text-gray-200 mb-2">
                            Catch Phrase
                        </label>
                        <input
                            type="text"
                            {...register("company.catchPhrase")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Catch Phrase"
                        />
                    </div>

                    <div>
                        <label htmlFor="company.bs" className="block text-sm font-medium text-gray-200 mb-2">
                            Business Strategy
                        </label>
                        <input
                            type="text"
                            {...register("company.bs")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Business Strategy"
                        />
                    </div>
                </div>
            </div>
            
            <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-gray-200 text-sm rounded-lg transition-all flex items-center space-x-1"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Cancel</span>
            </button>

            <button type="submit" disabled={isSubmitting} className={`px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-md flex items-center space-x-2 transition-all transform hover:scale-105 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}>
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{submitButtonText}</span>
                    </>
                )}
            </button>
        </form>
    )
}
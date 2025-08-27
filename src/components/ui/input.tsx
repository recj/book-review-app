import React from "react";
import { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    className = "",
    id,
    ...props
}) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="block mb-1 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                id={inputId}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2
          ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"}
          ${className}`}
                {...props}
            />

            {error ? (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            ) : helperText ? (
                <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            ) : null}
        </div>
    );
};

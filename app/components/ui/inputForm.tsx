import * as React from "react"

import { cn } from "@/lib/utils"
import { useField } from "remix-validated-form";
import { Input } from "./input";
import clsx from "clsx";

export interface InputFormProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
    ({ name, defaultValue, ...props }, ref) => {
        const { error, getInputProps } = useField(name);

        return (
            <>
                <Input {...getInputProps({ ref, ...props })}
                    defaultValue={defaultValue}
                    className={clsx({
                        "border-red-500": error,
                    }
                    )} />
                {error && <div className="text-red-500 mt-1">{error}</div>}
            </>
        )
    }
)
InputForm.displayName = "InputForm"

export { InputForm }

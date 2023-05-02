import { CreditCard, LogOut, PlusCircle, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Form, useNavigate, useSubmit } from "@remix-run/react"

export function UserNav({
    user
}: {
    user: {
        avatar?: string
        email: string
        name?: string
    }
}) {
    const label = user.name || user.email
    const submit = useSubmit()
    const navigate = useNavigate()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    {typeof user.avatar === "string" &&
                        user.avatar.startsWith("linear-gradient") ? (
                        <div
                            className="h-8 w-8 rounded-full aspect-square text-white flex items-center justify-center"
                            style={{
                                background: user.avatar,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <span>
                                {label.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    ) : (
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={label} />
                            <AvatarFallback>
                                {label.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/app/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        navigate("/app/teams/new");
                    }}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>New Team</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    submit(null, {
                        method: "POST",
                        action: "/action/logout",
                    })
                }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
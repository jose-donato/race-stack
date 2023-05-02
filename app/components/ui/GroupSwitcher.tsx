import { Check, ChevronsUpDown, PlusCircle, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentPropsWithoutRef, useState } from "react";
import { useNavigate } from "@remix-run/react";

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  user: {
    avatar?: string;
    email: string;
    name?: string;
  };
  teams: {
    name: string;
    avatar?: string;
  }[];
}

export default function TeamSwitcher({
  className,
  user,
  teams,
}: TeamSwitcherProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState({
    label: user.name ? user.name : user.email,
    value: user.email,
    avatar: user.avatar,
  });

  const groups = [
    {
      label: "Personal Account",
      teams: [
        {
          label: user.name ? user.name : user.email,
          value: user.email,
          avatar: user.avatar,
        },
      ],
    },
    {
      label: "Teams",
      teams: teams.map((team) => ({
        label: team.name,
        value: team.name,
        avatar: team.avatar,
      })),
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("w-[200px] justify-between", className)}
        >
          {typeof selectedTeam.avatar === "string" &&
            selectedTeam.avatar.startsWith("linear-gradient") ? (
            <div
              className="mr-2 h-5 w-5 rounded-full aspect-square text-white"
              style={{
                background: selectedTeam.avatar,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {selectedTeam.label.charAt(0).toUpperCase()}
            </div>
          ) : (
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={selectedTeam.avatar} alt={selectedTeam.label} />
              <AvatarFallback>
                {selectedTeam.label.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <span className="max-w-[120px] truncate">{selectedTeam.label}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search team..." />
            <CommandEmpty>No team found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.teams.map((team) => (
                  <CommandItem
                    key={team.value}
                    onSelect={() => {
                      setSelectedTeam(team);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    {typeof team.avatar === "string" &&
                      team.avatar.startsWith("linear-gradient") ? (
                      <div
                        className="mr-2 h-5 w-5 rounded-full text-center aspect-square text-white"
                        style={{
                          background: team.avatar,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {team.label.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage src={team.avatar} alt={team.label} />
                        <AvatarFallback>
                          {team.label.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    {team.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTeam.value === team.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  navigate("/app/teams/new");
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Team
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

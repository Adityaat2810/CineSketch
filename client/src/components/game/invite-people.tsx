import { Copy, User } from "lucide-react";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


interface invitePeopeProps{
    roomId:string
}

export const InvitePeople = ({
    roomId
}:invitePeopeProps) => {
    
    const inviteCode = roomId; // Replace this with your fixed invite code
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    };

    return (
        <div className="px-3">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger dir="left">
                        <Popover>
                            <PopoverTrigger>
                                <User className="h-6 w-6 text-black dark:text-white" />
                            </PopoverTrigger>
                            <PopoverContent className="items-center">

                                <div className="text-xl mt-3">
                                    <p>Copy invite code</p>
                                </div>
                                <div className="flex items-center mt-10">
                                    <Input value={inviteCode} readOnly className="mr-2" />
                                    
                                    {!copied?
                                    <Button onClick={handleCopy} className="p-2 ml-5">
                                        <Copy className="h-4 w-4" />
                                    </Button> :
                                     <span className="ml-5 text-green-500">Copied!</span>
                                     }
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p className="text-black bg-zinc-100 dark:bg-black dark:text-white">
                            Invite people to room
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

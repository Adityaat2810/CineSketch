import { useEffect, useState } from "react";
import { session } from "@/lib/types";
import { Button } from "../ui/button";

interface sessionPlayProps {
    session: session;
    currentUserId: string;
}

export const SessionPlay = ({
    session,
    currentUserId
}: sessionPlayProps) => {
    
    const [isDrawer, setIsDrawer] = useState(false);

    useEffect(() => {
        const drawerId = session?.drawerId;
        if (drawerId === currentUserId) {
            setIsDrawer(true);
            console.log('is drawer', isDrawer);
        }
    }, [session, currentUserId]);

    return (
        <div className="mt-10">
            {isDrawer && (
                <div>
                    You are the drawer for this round
                    <Button>Start drawing </Button>
                </div>

               
            )}
            {!isDrawer && (
                <div>
                    You will guess
                </div>
            )}
        </div>
    );
}

"use client";

import { useModal } from "@/components/providers/ModalProvider";
import { Button } from "@/components/ui/button";

export function AuditCTA({ className, children }: { className?: string, children: React.ReactNode }) {
    const { openAuditModal } = useModal();
    return (
        <Button onClick={openAuditModal} className={className}>
            {children}
        </Button>
    );
}

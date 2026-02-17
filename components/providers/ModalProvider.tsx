"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import dynamic from "next/dynamic";

// Lazy load AuditModal - only loaded when user opens it
const AuditModal = dynamic(() => import("@/components/AuditModal").then(mod => ({ default: mod.AuditModal })), {
    ssr: false,
    loading: () => null, // No loading state needed since modal has its own animation
});

interface ModalContextType {
    openAuditModal: () => void;
    closeAuditModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

    const openAuditModal = () => setIsAuditModalOpen(true);
    const closeAuditModal = () => setIsAuditModalOpen(false);

    return (
        <ModalContext.Provider value={{ openAuditModal, closeAuditModal }}>
            {children}
            <AuditModal isOpen={isAuditModalOpen} onClose={closeAuditModal} />
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}

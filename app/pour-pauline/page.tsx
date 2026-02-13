import { Metadata } from "next";
import ValentineClient from "./ValentineClient";

export const metadata: Metadata = {
    title: "Pour Pauline ❤️",
    description: "Un message spécial pour toi",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ValentinePage() {
    return <ValentineClient />;
}

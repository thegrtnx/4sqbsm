"use client";

import { ReactNode } from "react";
import { cn } from "./utils";
import { HeroUIProvider } from "@heroui/react";
import { Footer, Header } from "@/components/reusables";
import { GeneralSans_Meduim } from "./font";

export function MaxWidthWrapper({ className, children }: { className?: string; children: ReactNode }) {
	return (
		<main className={cn("", GeneralSans_Meduim.className, className)}>
			<Header />
			<HeroUIProvider>{children}</HeroUIProvider>
			<Footer />
		</main>
	);
}

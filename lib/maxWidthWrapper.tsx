"use client";

import { ReactNode } from "react";
import { cn } from "./utils";
import { HeroUIProvider } from "@heroui/react";
import { Footer, Header } from "@/components/reusables";

export function MaxWidthWrapper({ className, children }: { className?: string; children: ReactNode }) {
	return (
		<main className={cn("", className)}>
			<Header />
			<HeroUIProvider>{children}</HeroUIProvider>
			<Footer />
		</main>
	);
}

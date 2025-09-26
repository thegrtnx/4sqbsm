"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Download, HomeIcon, MessageCircleQuestionMark, PencilIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Separator } from "@/components/ui/separator";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
	navbar: [
		{ href: "#", icon: HomeIcon, label: "Home" },
		{ href: "#", icon: Download, label: "Download Report" },
		{ href: "#", icon: BookOpen, label: "Read Report Online" },
		{ href: "#", icon: MessageCircleQuestionMark, label: "Ask Questions" },
	],
};

export function Header() {
	return (
		<div className="flex fixed w-full top-0 items-center justify-between px-32 z-50">
			<div>
				<Image
					src="/images/logo.webp"
					alt="Logo"
					width={30}
					height={30}
				/>
			</div>
			<div>
				<TooltipProvider>
					<Dock direction="middle">
						<Separator
							orientation="vertical"
							className="h-full"
						/>
						{DATA.navbar.map((item) => (
							<DockIcon key={item.label}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Link
											href={item.href}
											aria-label={item.label}
											className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-white size-12 rounded-full")}>
											<item.icon className="size-5" />
										</Link>
									</TooltipTrigger>
									<TooltipContent>
										<p>{item.label}</p>
									</TooltipContent>
								</Tooltip>
							</DockIcon>
						))}
						<Separator
							orientation="vertical"
							className="h-full"
						/>
					</Dock>
				</TooltipProvider>
			</div>
			<div>
				<Image
					src="/images/70.png"
					alt="Logo"
					width={50}
					height={50}
				/>
			</div>
		</div>
	);
}

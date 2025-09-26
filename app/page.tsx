"use client";

import { showToast } from "@/lib";
import { AlexCurve } from "@/lib/font";
import { cn } from "@/lib/utils";
import { Button, ModalHeader, Modal, ModalContent, useDisclosure } from "@heroui/react";
import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

const FILE_PATH = "/files/2020_Financial_Report.pdf";
const FILE_NAME = "2020_Financial_Report.pdf";
const SPINNER_DURATION_MS = 3000;

const Page = () => {
	const [size, setSize] = useState({ width: 0, height: 0 });
	const [isDownloading, setIsDownloading] = useState(false);
	const timeoutRef = useRef<number | null>(null);
	const abortControllerRef = useRef<AbortController | null>(null);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();

	useEffect(() => {
		const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
		updateSize();
		window.addEventListener("resize", updateSize);
		return () => {
			window.removeEventListener("resize", updateSize);
			// cleanup if still waiting
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, []);

	const handleDownload = async () => {
		setIsDownloading(true);

		showToast({
			type: "info",
			message: "Downloading report...",
		});

		// create abort controller so we can cancel fetch on unmount if needed
		const ac = new AbortController();
		abortControllerRef.current = ac;

		try {
			// Try fetching the file and forcing a download via blob
			const res = await fetch(FILE_PATH, { signal: ac.signal });

			if (!res.ok) {
				throw new Error(`Download failed: ${res.status} ${res.statusText}`);
			}

			const blob = await res.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = FILE_NAME;
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);

			// Ensure spinner stops after SPINNER_DURATION_MS and show success toast
			timeoutRef.current = window.setTimeout(() => {
				setIsDownloading(false);
				showToast({
					type: "success",
					message: "Report downloaded successfully",
				});
				timeoutRef.current = null;
			}, SPINNER_DURATION_MS);
		} catch (err) {
			// If user aborted or fetch failed, stop spinner and show error
			setIsDownloading(false);
			if ((err as any).name === "AbortError") {
				showToast({ type: "info", message: "Download canceled" });
			} else {
				showToast({
					type: "error",
					message: "Failed to download report. Please try again.",
				});
				// Optionally log the error
				// console.error(err);
			}
		} finally {
			// clear abort controller reference
			abortControllerRef.current = null;
		}
	};

	return (
		<div className="relative h-screen w-screen">
			{/* Background Image */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: "url('/images/mobile.jpeg')" }}
			/>

			{/* Dark overlay */}
			<div className="absolute inset-0 bg-black/85" />

			{/* Main content */}
			<div className="relative flex h-full items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<h1 className={cn(AlexCurve.className, "md:text-8xl text-5xl md:w-[70%] w-full m-auto text-center font-bold text-white")}>Foursquare @70 Business Submit</h1>

					<div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-7 mt-5 w-full">
						<div className="flex flex-row w-full md:w-auto gap-4 md:gap-7 justify-center">
							<Button
								onPress={handleDownload}
								isLoading={isDownloading}
								className="bg-white text-black">
								Download Report
							</Button>
							<Button
								onPress={onOpen}
								className="bg-white text-black">
								Read Report Online
							</Button>
						</div>
						<div className="flex w-full md:w-auto justify-center mt-4 md:mt-0">
							<Button
								onPress={onOpen2}
								className="bg-white text-black">
								Ask Questions
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Continuous confetti */}
			<Confetti
				width={size.width}
				height={size.height}
				recycle
			/>

			{/* Modal with embedded PDF */}
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				size="5xl"
				scrollBehavior="inside"
				backdrop="blur"
				isKeyboardDismissDisabled={true}
				isDismissable={false}>
				<ModalContent className="flex flex-col gap-4 p-0">
					<ModalHeader>
						<div className="flex items-center justify-between w-full">
							<h1 className="text-lg font-medium">Read Report Online</h1>
							<div className="flex items-center gap-2">
								{/* Close button uses onOpenChange to toggle */}
								<Button
									onPress={() => onOpenChange()}
									className="bg-white text-black">
									Close
								</Button>
							</div>
						</div>
					</ModalHeader>

					{/* PDF viewer area */}
					<div className="w-full h-[80vh]">
						{/* iframe will display the PDF inline if the browser supports it.
							Provide a fallback link in case inline display is blocked. */}
						<iframe
							title="2020 Financial Report"
							src={FILE_PATH}
							className="w-full h-full border-0">
							{/* Fallback content */}
							<div className="p-4 text-center">
								<p>Your browser does not support inline PDFs. </p>
								<a
									href={FILE_PATH}
									download={FILE_NAME}
									className="underline">
									Download the report
								</a>
							</div>
						</iframe>
					</div>
				</ModalContent>
			</Modal>

			<Modal
				isOpen={isOpen2}
				onOpenChange={onOpenChange2}
				size="5xl"
				scrollBehavior="inside"
				backdrop="blur"
				isKeyboardDismissDisabled={true}
				isDismissable={false}>
				<ModalContent className="flex flex-col gap-4 p-0">
					<ModalHeader>
						<div className="flex items-center justify-between w-full">
							<h1 className="text-lg font-medium">Ask Questions</h1>
						</div>
					</ModalHeader>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Page;

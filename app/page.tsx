"use client";
import { showToast } from "@/lib";
import { AlexCurve } from "@/lib/font";
import { cn } from "@/lib/utils";
import { Button } from "@heroui/react";
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
					<h1 className={cn(AlexCurve.className, "text-8xl w-[70%] m-auto text-center font-bold text-white")}>Foursquare @70 Business Submit</h1>

					<div className="flex flex-row items-center justify-center gap-7 mt-5">
						<Button
							onPress={handleDownload}
							isLoading={isDownloading}
							className="bg-white text-black">
							Download Report
						</Button>

						<Button className="bg-white text-black">Read Report Online</Button>
						<Button className="bg-white text-black">Ask Questions</Button>
					</div>
				</div>
			</div>

			{/* Continuous confetti */}
			<Confetti
				width={size.width}
				height={size.height}
				recycle
			/>
		</div>
	);
};

export default Page;

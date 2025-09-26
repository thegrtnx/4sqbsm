"use client";
import { AlexCurve } from "@/lib/font";
import { cn } from "@/lib/utils";
import { Button } from "@heroui/react";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const Page = () => {
	//const [showConfetti, setShowConfetti] = useState(false);
	const [size, setSize] = useState({ width: 0, height: 0 });

	// useEffect(() => {
	// 	// Safe to access window here
	// 	const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });

	// 	updateSize(); // set initial size
	// 	window.addEventListener("resize", updateSize);

	// 	// Confetti every 5s
	// 	const interval = setInterval(() => {
	// 		setShowConfetti(true);
	// 		setTimeout(() => setShowConfetti(false), 5000);
	// 	}, 5000);

	// 	return () => {
	// 		window.removeEventListener("resize", updateSize);
	// 		clearInterval(interval);
	// 	};
	// }, []);

	useEffect(() => {
		// Update confetti to fill the window
		const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });

		updateSize(); // set initial size
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	return (
		<div className="relative h-screen w-screen">
			{/* Background Image */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: "url('/images/mobile.jpeg')" }}
			/>

			{/* Overlay */}
			<div className="absolute inset-0 bg-black/85" />

			{/* Content */}
			<div className="relative flex h-full items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<div>
						<h1 className={cn(AlexCurve.className, "text-8xl w-[70%] m-auto text-center font-bold text-white")}> Foursquare @70 Business Submit</h1>
					</div>

					<div className="flex flex-row items-center justify-center gap-7 mt-5">
						<Button className="bg-white text-black">Download Report</Button>
						<Button className="bg-white text-black">Read Report Online</Button>
						<Button className="bg-white text-black">Ask Questions</Button>
					</div>
				</div>
			</div>

			{/* Continuous confetti */}
			<Confetti
				width={size.width}
				height={size.height}
				recycle={true}
			/>

			{/* Confetti overlay */}
			{/* {showConfetti && (
				<Confetti
					width={size.width}
					height={size.height}
				/>
			)} */}
		</div>
	);
};

export default Page;

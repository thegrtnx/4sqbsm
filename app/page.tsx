import React from "react";

const Page = () => {
	return (
		<div className="relative h-screen w-screen">
			{/* Background Image */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: "url('/your-background.jpg')" }}
			/>

			{/* Overlay */}
			<div className="absolute inset-0 bg-black/50" />

			{/* Content */}
			<div className="relative flex h-full items-center justify-center">
				<h1 className="text-4xl font-bold text-white">Foursquare Business Submit</h1>
			</div>
		</div>
	);
};

export default Page;

import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<div className="flex bottom-5 w-full fixed bg-transparent px-20 justify-between">
			<div>
				<small className="text-white">&copy; Foursquare Gospel Church in Nigeria 2025.</small>
			</div>
			<div>
				<small className="text-white">
					Developed by <Link href="https://github.com/thegrtnx">Abolade Greatness</Link>
				</small>
			</div>
		</div>
	);
};

export default Footer;

import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<div className="flex bottom-5 w-full fixed bg-transparent px-20 justify-between">
			<div>
				<small>&copy; Foursquare Gospel Church in Nigeria 2025. All rights reserved.</small>
			</div>
			<div>
				<small>
					Developed by <Link href="https://github.com/thegrtnx">Abolade Greatness</Link>
				</small>
			</div>
		</div>
	);
};

export default Footer;

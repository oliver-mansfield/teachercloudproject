"use client";

import Image from "next/image";
import Navigation from "./Navigation";
import {BarChartIcon, HomeIcon, MenuIcon, XIcon} from "lucide-react";
import {useState} from "react";

const navigationItems = [
	{
		label: "Your Feed",
		href: "/",
		icon: <HomeIcon className="w-4 h-4" />,
	},
	{
		label: "Charts",
		href: "/charts",
		icon: <BarChartIcon className="w-4 h-4" />,
	},
];

export default function Menu() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				className="md:hidden fixed top-4 right-4 z-50 p-2 bg-Panelwhite rounded-full border border-uiPrimary"
				aria-label={
					isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
				}
			>
				{isMobileMenuOpen ? (
					<XIcon className="w-6 h-6 text-uiPrimary" />
				) : (
					<MenuIcon className="w-6 h-6 text-uiPrimary" />
				)}
			</button>

			{isMobileMenuOpen && (
				<div
					className="md:hidden fixed inset-0 bg-black opacity-50 z-40"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}

			<aside
				className={`fixed md:static inset-y-0 left-0 w-64 p-4 border-r border-grayLightest bg-Panelwhite z-40 transform transition-transform duration-300 ease-in-out bg-panelWhite ${
					isMobileMenuOpen
						? "translate-x-0"
						: "-translate-x-full md:translate-x-0"
				}`}
			>
				<div className="flex items-center justify-center">
					<Image
						src="/evidence_logo.svg"
						alt="Evidence for Learning"
						width={70}
						height={70}
					/>
				</div>

				<nav className="mt-8 flex flex-col gap-4">
					<Navigation navigationItems={navigationItems} />
				</nav>
			</aside>
		</>
	);
}

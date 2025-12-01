"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

interface NavigationItem {
	label: string;
	href: string;
	icon: React.ReactNode;
}

export default function Navigation({
	navigationItems,
}: {
	navigationItems: NavigationItem[];
}) {
	const pathname = usePathname();

	return (
		<nav className="flex flex-col gap-2">
			{navigationItems.map((item) => (
				<Link
					key={item.href}
					href={item.href}
					className={`flex items-center gap-2 rounded-lg p-4 hover:bg-brandLighter transition-all duration-100 ${
						pathname === item.href ? "bg-brandLight" : null
					}`}
				>
					{item.icon}
					<span>{item.label}</span>
				</Link>
			))}
		</nav>
	);
}

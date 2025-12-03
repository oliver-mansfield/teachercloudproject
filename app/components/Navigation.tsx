"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {AccessibilityIcon} from "lucide-react";
import {useAccessibilityMode} from "@/app/utilities/providers/AccessibilityModeProvider";

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
	const {isAccessibilityMode, toggleAccessibilityMode} = useAccessibilityMode();

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
			<button
				onClick={toggleAccessibilityMode}
				className={`flex items-center gap-2 rounded-lg p-4 hover:bg-brandLighter transition-all duration-100 ${
					isAccessibilityMode ? "bg-brandLight" : null
				}`}
				aria-label="Toggle accessibility mode"
				aria-pressed={isAccessibilityMode}
			>
				<AccessibilityIcon className="w-4 h-4" />
				<span>Accessibility Mode</span>
			</button>
		</nav>
	);
}

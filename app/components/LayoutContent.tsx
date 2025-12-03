"use client";

import {useAccessibilityMode} from "@/app/utilities/providers/AccessibilityModeProvider";
import Menu from "./Menu";

export function LayoutContent({
	children,
	interVariable,
}: {
	children: React.ReactNode;
	interVariable: string;
}) {
	const {isAccessibilityMode} = useAccessibilityMode();

	return (
		<html lang="en" className={isAccessibilityMode ? "accessibility-mode" : ""}>
			<body className={`${interVariable} antialiased`}>
				<div className="sm:flex">
					<Menu />
					<main className="flex-1 bg-panel1">{children}</main>
				</div>
			</body>
		</html>
	);
}


"use client";

import {ReactNode} from "react";
import {QueryProvider} from "./QueryProvider";
import {AccessibilityModeProvider} from "./AccessibilityModeProvider";

export function AppProvider({children}: {children: ReactNode}) {
	return (
		<QueryProvider>
			<AccessibilityModeProvider>{children}</AccessibilityModeProvider>
		</QueryProvider>
	);
}

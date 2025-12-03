"use client";

import {createContext, useContext, useState, ReactNode} from "react";

interface AccessibilityModeContextType {
	isAccessibilityMode: boolean;
	toggleAccessibilityMode: () => void;
}

const AccessibilityModeContext = createContext<
	AccessibilityModeContextType | undefined
>(undefined);

export function AccessibilityModeProvider({children}: {children: ReactNode}) {
	const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);

	const toggleAccessibilityMode = () => {
		setIsAccessibilityMode((prev) => !prev);
	};

	return (
		<AccessibilityModeContext.Provider
			value={{isAccessibilityMode, toggleAccessibilityMode}}
		>
			{children}
		</AccessibilityModeContext.Provider>
	);
}

export function useAccessibilityMode() {
	const context = useContext(AccessibilityModeContext);
	if (context === undefined) {
		throw new Error(
			"useAccessibilityMode must be used within an AccessibilityModeProvider"
		);
	}
	return context;
}

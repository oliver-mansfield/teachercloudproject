import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AppProvider} from "./utilities/providers/AppProvider";
import {LayoutContent} from "./components/LayoutContent";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "TeacherCloud",
	description: "TeacherCloud",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AppProvider>
			<LayoutContent interVariable={inter.variable}>{children}</LayoutContent>
		</AppProvider>
	);
}

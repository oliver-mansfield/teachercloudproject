import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {QueryProvider} from "./utilities/QueryProvider";
import Menu from "./components/Menu";

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
		<html lang="en">
			<body className={`${inter.variable} antialiased`}>
				<QueryProvider>
					<div className="sm:flex">
						<Menu />
						<main className="flex-1 bg-panel1">{children}</main>
					</div>
				</QueryProvider>
			</body>
		</html>
	);
}

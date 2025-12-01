import Image from "next/image";
import Navigation from "./Navigation";
import {BarChartIcon, HomeIcon} from "lucide-react";

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

export default function Sidebar() {
	return (
		<aside className="w-64  p-4 border-r border-grayLightest">
			<Image
				src="/evidence_logo.svg"
				alt="TeacherCloud"
				width={70}
				height={70}
			/>

			<nav className="mt-8 flex flex-col gap-4">
				<Navigation navigationItems={navigationItems} />
			</nav>
		</aside>
	);
}

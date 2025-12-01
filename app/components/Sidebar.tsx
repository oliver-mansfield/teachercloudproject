import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
	return (
		<aside className="w-64 bg-panel2 p-4">
			<Image
				src="/evidence_logo.svg"
				alt="TeacherCloud"
				width={70}
				height={70}
			/>
			<h1 className="text-2xl font-bold flex items-center gap-2">
				TeacherCloud
			</h1>
			<nav className="mt-8 p-4">
				<ul>
					<li>
						<Link href="/">Your Feed</Link>
					</li>
					<li>
						<Link href="/charts">Charts</Link>
					</li>
				</ul>
			</nav>
		</aside>
	);
}

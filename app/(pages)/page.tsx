import MediaFeed from "@/app/components/MediaFeed/MediaFeed";

export default function Home() {
	return (
		<>
			<div className="border-b border-grayLightest mb-16 bg-white">
				<h1 className="text-2xl p-6 sm:p-8">Your Feed</h1>
			</div>
			<MediaFeed />
		</>
	);
}

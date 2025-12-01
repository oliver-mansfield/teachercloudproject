import MediaFeed from "@/app/components/MediaFeed";

export default function Home() {
	return (
		<>
			<div className="border-b border-grayLightest mb-16 bg-white">
				<h1 className="text-2xl pt-8 pb-8 px-8">Your Feed</h1>
			</div>
			<MediaFeed />
		</>
	);
}

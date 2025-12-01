export default function FeedItemSkeleton() {
	return (
		<div className="max-w-[600px] w-full rounded-lg bg-white border border-grayLightest animate-pulse">
			<div className="p-4 flex items-center gap-4">
				<div className="w-8 h-8 rounded-full bg-grayLightest" />
				<div className="h-5 w-32 bg-grayLightest rounded" />
			</div>

			<div className="w-full h-96 bg-grayLightest" />

			<div className="flex items-end justify-end gap-8 p-4">
				<div className="h-4 w-16 bg-grayLightest rounded" />
				<div className="h-4 w-16 bg-grayLightest rounded" />
			</div>
		</div>
	);
}

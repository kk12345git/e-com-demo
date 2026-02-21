export default function SkeletonLoader() {
    return (
        <div className="aesthetic-card animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-square mb-6 bg-slate-800/50 rounded-2xl"></div>

            {/* Content skeleton */}
            <div className="space-y-3">
                <div className="h-3 bg-slate-800/50 rounded-full w-1/3"></div>
                <div className="h-5 bg-slate-800/50 rounded-full w-3/4"></div>
                <div className="flex items-center gap-3">
                    <div className="h-7 bg-slate-800/50 rounded-full w-20"></div>
                    <div className="h-4 bg-slate-800/50 rounded-full w-16"></div>
                </div>
            </div>
        </div>
    )
}

import { useId } from "react";

import { cn } from "@/lib/utils";

interface GridPatternProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	width?: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	height?: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	x?: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	y?: any;
	squares?: Array<[x: number, y: number]>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	strokeDasharray?: any;
	className?: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any;
}

export function GridPattern({
	width = 40,
	height = 40,
	x = -1,
	y = -1,
	strokeDasharray = 0,
	squares,
	className,
	...props
}: GridPatternProps) {
	const id = useId();

	return (
		<svg
			aria-hidden="true"
			className={cn(
				"pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
				className,
			)}
			{...props}
		>
			<defs>
				<pattern
					id={id}
					width={width}
					height={height}
					patternUnits="userSpaceOnUse"
					x={x}
					y={y}
				>
					<path
						d={`M.5 ${height}V.5H${width}`}
						fill="none"
						strokeDasharray={strokeDasharray}
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
			{squares && (
				// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y]) => (
						<rect
							strokeWidth="0"
							key={`${x}-${y}`}
							width={width - 1}
							height={height - 1}
							x={x * width + 1}
							y={y * height + 1}
						/>
					))}
				</svg>
			)}
		</svg>
	);
}

export default GridPattern;

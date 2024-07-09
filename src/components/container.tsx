import { cn } from "@/lib/utils";
import type React from "react";

interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {}

const Container = (props: ContainerProps) => {
	const { children, className, ...restProps } = props;

	return (
		<div className={cn("container px-5 2xl:px-0", className)} {...restProps}>
			{children}
		</div>
	);
};

export default Container;

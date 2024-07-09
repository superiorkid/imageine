import { cn } from "@/lib/utils";
import type React from "react";

interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {}

const Container = (props: ContainerProps) => {
	const { children, className, ...restProps } = props;

	return (
		<div className={cn("container", className)} {...restProps}>
			{children}
		</div>
	);
};

export default Container;

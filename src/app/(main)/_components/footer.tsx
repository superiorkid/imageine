import Container from "@/components/container";

const Footer = () => {
	return (
		<Container className="flex justify-between items-center">
			<div>
				<p className="text-sm text-muted-foreground">
					Built by <span className="font-semibold">Moh. Ilhamuddin</span>
				</p>
			</div>
			<div>{/* source code */}</div>
		</Container>
	);
};

export default Footer;

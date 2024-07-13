import ky from "ky";
import { getPlaiceholder } from "plaiceholder";

export default async function getBase64(src: string) {
	const buffer = await ky
		.get(src)
		.then(async (res) => Buffer.from(await res.arrayBuffer()));
	const { base64 } = await getPlaiceholder(buffer);
	return base64;
}

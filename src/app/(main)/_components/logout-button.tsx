import { Button } from "@/components/ui/button";
import { logoutAction } from "../_actions/logout-action";

const LogoutButton = () => {
	return (
		<form action={logoutAction}>
			<Button variant="destructive" type="submit">
				Log out
			</Button>
		</form>
	);
};

export default LogoutButton;

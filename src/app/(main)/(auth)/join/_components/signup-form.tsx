"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SignUp, signUpSchema } from "@/lib/validation/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signupAction } from "../_actions/signup-action";

const SignUpForm = () => {
	const router = useRouter();
	const form = useForm<SignUp>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			username: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: signupAction,
		onError: (error) => {
			toast.error(error.message || "Failed to register account");
		},
		onSuccess: (data) => {
			toast.success("Register successfully. now you can login");
			router.push("/sign-in");
		},
	});

	const onSubmit = (values: SignUp) => {
		const { email, username, password } = values;

		const formData = new FormData();
		formData.append("email", email);
		formData.append("username", username);
		formData.append("password", password);

		mutate(formData);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Email" {...field} />
							</FormControl>
							<FormMessage className="text-xs" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Username" {...field} />
							</FormControl>
							<FormMessage className="text-xs" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input type="password" placeholder="*********" {...field} />
							</FormControl>
							<FormMessage className="text-xs" />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Sign up
				</Button>
			</form>
		</Form>
	);
};

export default SignUpForm;

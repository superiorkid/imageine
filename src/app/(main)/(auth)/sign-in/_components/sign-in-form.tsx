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
import { type SignIn, signInSchema } from "@/lib/validation/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginAction } from "../_actions/signin-action";

function SignInForm() {
	const router = useRouter();
	const form = useForm<SignIn>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: loginAction,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data, variables, context) => {
			toast.success("login successfully");
			router.refresh();
		},
	});

	const onSubmit = (values: SignIn) => {
		const { email, password } = values;

		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);

		mutate(formData);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					disabled={isPending}
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
					name="password"
					disabled={isPending}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input type="password" placeholder="*********" {...field} />
							</FormControl>
							<FormMessage className="text-xs" />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={isPending}>
					{isPending ? "Signing in..." : "Sign in"}
				</Button>
			</form>
		</Form>
	);
}

export default SignInForm;

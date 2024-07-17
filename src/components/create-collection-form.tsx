"use client";

import { createCollection } from "@/actions/collection-action";
import queryClient from "@/lib/query-client";
import {
	type CreateCollectionSchema,
	createCollectionSchema,
} from "@/lib/validation/create-collection-schema";
import { useSession } from "@/providers/session-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { DispatchWithoutAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface CreateCollectionFormProps {
	dropdownToggle: DispatchWithoutAction;
}

const CreateCollectionForm = ({
	dropdownToggle,
}: CreateCollectionFormProps) => {
	const { user } = useSession();

	const { mutate, isPending } = useMutation({
		mutationFn: createCollection,
		onError(error, variables, context) {
			toast.error(error.message);
		},
		onSuccess(data, variables, context) {
			toast.success(data.message);
			dropdownToggle();
			queryClient.invalidateQueries({
				queryKey: ["collections", user?.username],
			});
		},
	});

	const form = useForm<CreateCollectionSchema>({
		resolver: zodResolver(createCollectionSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const onSubmit = (values: CreateCollectionSchema) => {
		const formData = new FormData();
		formData.append("name", values.name);
		formData.append("description", values.description as string);

		mutate(formData);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					disabled={isPending}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="⭐ name this collection" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					disabled={isPending}
					render={({
						field: { value, onChange, onBlur, name, ref, disabled },
					}) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder="Write a description"
									value={value as string}
									onChange={onChange}
									onBlur={onBlur}
									name={name}
									ref={ref}
									disabled={disabled}
									className="resize-none"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={isPending}>
					{isPending ? "Creating..." : "Create"}
				</Button>
			</form>
		</Form>
	);
};

export default CreateCollectionForm;

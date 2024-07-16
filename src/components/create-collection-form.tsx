"use client";

import {
	type CreateCollectionSchema,
	createCollectionSchema,
} from "@/lib/validation/create-collection-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const CreateCollectionForm = () => {
	const form = useForm<CreateCollectionSchema>({
		resolver: zodResolver(createCollectionSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const onSubmit = (values: CreateCollectionSchema) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
				<FormField
					control={form.control}
					name="name"
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

				<Button type="submit" className="w-full">
					Create
				</Button>
			</form>
		</Form>
	);
};

export default CreateCollectionForm;

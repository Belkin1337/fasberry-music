import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { zodSignUpSchema } from "@/components/forms/auth/components/sign-up";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useState } from "react";

const supabase = createClient();

export function useSignUp() {
	const [error, setError] = useState<string>('')
	const { closeDialog } = useDialog();
	const { refresh } = useRouter()
	const { toast } = useToast();

	const signUpMutation = useMutation({
		mutationFn: async ({
			values
		}: {
			values: zodSignUpSchema
		}) => {
			const { data, error } = await supabase.auth.signUp({
				email: values.email,
				password: values.password,
				options: {
					data: {
						full_name: values.full_name
					},
				},
			});

			if (error) return error;

			if (data && !error) return data;
		},
		onSuccess: async (data) => {
			if (data) {
				if ('user' in data) {
					closeDialog();
					refresh();
				} else {
					setError(data.toString());
				}
			}
		},
		onError: (error: Error) => {
			throw error;
		}
	})

	return { signUpMutation, error }
}
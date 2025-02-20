"use client"

import { SignInForm } from "./sign-in-form"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { SignUpForm } from "./sign-up-form"
import { ReactElement, useCallback } from "react"
import { Typography } from "@/ui/typography"
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import Image from "next/image";
import { UserEntity } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query"

export const AuthForm = () => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	if (!user) return null;
	
	const { openDialog } = useDialog()

	const handleDialogForm = (element: ReactElement) => {
		if (!user) openDialog({ dialogChildren: element })
	}

	return (
		<div className="flex flex-col gap-y-12 p-8 w-[500px] h-fit bg-neutral-900 rounded-xl">
			<div className="flex items-center justify-center gap-x-1 w-full">
				<Image
					src="/favicon.ico"
					width={60}
					height={60}
					alt="Smotify"
					title="Smotify"
				/>
				<Typography font="bold" className="text-3xl">Smotify</Typography>
			</div>
			<div className="flex flex-col items-center justify-center gap-x-1 w-full">
				<Typography font="bold" className="text-2xl">
					Millions of songs
				</Typography>
				<Typography font="bold" className="text-2xl">
					Free on Smotify
				</Typography>
			</div>
			<div className="flex items-center justify-center gap-x-2">
				<Typography
					onClick={() => handleDialogForm(<SignUpForm/>)}
					font="semibold"
					text_color="gray"
					className="cursor-pointer"
				>
					New to Spotify?
				</Typography>
				<Typography
					onClick={() => handleDialogForm(<SignInForm/>)}
					font="semibold"
					className="cursor-pointer"
				>
					Sign in
				</Typography>
			</div>
		</div>
	)
}
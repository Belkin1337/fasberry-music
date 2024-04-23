import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { redirect } from "next/navigation";
import { HydrationBoundary } from "@tanstack/react-query";
import { Wrapper } from "@/ui/wrapper";
import { Typography } from "@/ui/typography";
import { CreateAlbumForm } from "@/components/forms/album/components/create-album";

export default async function ForAuthorsCreateAlbumPage() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: {
			user
		}, error
	} = await supabase.auth.getUser()

	if (error || !user) {
		redirect('/home')
	}

	return (
		<HydrationBoundary>
			<Wrapper variant="page">
				<div className="flex flex-col gap-y-8 p-4">
					<div className="flex flex-col gap-y-2">
						<Typography
							text_color="white"
							variant="page_title"
						>
							Cоздание альбома
						</Typography>
						<ul role="list" className="marker:text-red-500 list-disc pl-5 space-y-3 text-slate-400">
							<li>
								<Typography variant="subtitle">
									Треки не должны нарушать АП
								</Typography>
							</li>
							<li>
								<Typography variant="subtitle">
									Это тестовая площадка, поэтому загруженный трек может быть удален в любое время без предупреждения
								</Typography>
							</li>
						</ul>
					</div>
					<CreateAlbumForm/>
				</div>
			</Wrapper>
		</HydrationBoundary>
	)
}
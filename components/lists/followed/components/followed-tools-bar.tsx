import React from "react"
import { SongPlayButton } from "@/components/song/child/song-play-button/components/song-play-button"
import { FollowedTracksSearch } from "./followed-tracks-search"
import { SongEntity } from "@/types/song"
import { SongShuffleButton } from "@/components/song/child/song-shuffle-button/components/song-shuffle-button"
import { FollowedTracksSort } from "@/components/lists/followed/components/followed-tracks-sort";

export const PlaylistToolsBar = ({
	song,
	song_list
}: {
	song: SongEntity,
	song_list: SongEntity[]
}) => {
	return (
		<div className="flex items-center justify-between p-6 w-full">
			<div className="flex gap-x-8 items-center">
				<SongPlayButton
					song={song}
					song_list={song_list}
					variant="single_page"
				/>
				<div className="flex items-center gap-x-6">
					<SongShuffleButton/>
				</div>
			</div>
			<div className="flex items-center gap-x-4">
				<FollowedTracksSearch/>
				<FollowedTracksSort/>
			</div>
		</div>
	)
}
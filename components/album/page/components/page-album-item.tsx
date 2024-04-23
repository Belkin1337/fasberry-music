"use client"

import { ColoredBackground } from "@/ui/colored-background";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { AlbumImageItem } from "@/components/album/child/album-image/components/album-image-item";
import { SongListTableHead } from "@/ui/song-list-table-head";
import { SongItem } from "@/components/song/song-item/song-item";
import { useAlbumQuery } from "@/lib/query/album/album-query";
import { useAlbumSongsQuery } from "@/lib/query/album/album-songs-query";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { PageAlbumMore } from "@/components/album/page/components/page-album-more";
import { AlbumToolsBar } from "@/components/album/child/album-tools-bar/album-tools-bar";
import { useAlbumArtistsQuery } from "@/lib/query/album/album-artists-query";
import { EntityType } from "@/ui/entity-type";
import { AlbumTitle } from "@/components/album/child/album-title/components/album-title";
import { AlbumArtist } from "@/components/album/child/album-artist/components/album-artist";
import { Timestamp } from "@/ui/timestamp";

export const PageAlbumItem = ({
	albumId
}: {
	albumId: string
}) => {
	const { data: album, isError } = useAlbumQuery(albumId)
	const { data: songs, isLoading, isError: songError } = useAlbumSongsQuery(albumId);
	const { data: image } = useLoadImage(album?.image_url || nullAvatarImage);
	const { data: artists } = useAlbumArtistsQuery(album?.id!);

	if (!album || isError || songError || !songs) return;

	return (
		<>
			<ColoredBackground imageUrl={image?.url || nullAvatarImage} />
			<div className="flex flex-col relative">
				<div className="z-20 p-6 flex gap-x-6 justify-start h-full items-end">
					<AlbumImageItem album={album}/>
					<div className="flex flex-col gap-y-2 self-end">
						<EntityType type="album"/>
						<AlbumTitle variant="page" album={album}/>
						<div className="flex items-center gap-x-2">
							<AlbumArtist album={album} variant="page"/>
							<Timestamp date={album.created_at!}/>
						</div>
					</div>
				</div>
				<div className="flex flex-col bg-black/20 backdrop-filter backdrop-blur-md">
					<AlbumToolsBar album={album}/>
					<SongListTableHead/>
					<div className="p-6">
						{songs?.map((song,
							idx) => (
							<SongItem
								type="page"
								isLoading={isLoading}
								key={song.id}
								song={song}
								song_list={{
									id: String(idx + 1),
									data: songs
								}}
							/>
						))}
					</div>
					{artists && (
						<PageAlbumMore artist={artists[0]} albumId={albumId}/>
					)}
				</div>
			</div>
		</>
	)
};
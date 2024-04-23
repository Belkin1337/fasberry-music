import { PreviewArtistCard } from "@/components/preview/artist/artist-card"
import { PreviewCard } from "@/ui/preview-card"
import { PreviewArtistType } from "@/types/preview";

export const ArtistFormPreview = ({
  preview
}: {
  preview: PreviewArtistType
}) => {
  return (
    <PreviewCard>
      <PreviewArtistCard preview={preview} />
    </PreviewCard>
  )
}
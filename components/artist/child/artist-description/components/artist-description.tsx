import { Typography } from "@/ui/typography"
import {
  artistDescriptionVariants,
  IArtistDescription
} from "@/components/artist/child/artist-description/types/artist-description-types";

export const ArtistDescription = ({
  artist,
  variant,
  className,
  ...props
}: IArtistDescription) => {

  if (!artist.description) return;

  return (
    <Typography className={artistDescriptionVariants(({ variant, className }))} {...props}>
      {variant === 'widget' && artist?.description?.length > 146
        ? artist?.description?.slice(0, 146) + '...'
        : artist?.description}
    </Typography>
  )
}
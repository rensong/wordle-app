import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

type Props = {
  stat: number,
  caption: string,
}

export default function StatsRecord({
  stat,
  caption,
}: Props) {
  return (
    <Box>
      <Typography variant="h3" className="stats_number">
        {stat}
      </Typography>
      <Typography variant="caption" className="stats_caption">
        {caption}
      </Typography>
    </Box>
  );
}

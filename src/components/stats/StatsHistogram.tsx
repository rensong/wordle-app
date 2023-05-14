import { Grid } from "@mui/material";
import StatsBar from './StatsBar';

type Props = {
  distribution: number[],
}

export default function StatsHistogram({
  distribution,
}: Props) {
  const maxTries = Math.max(...distribution);
  return (
    <Grid container spacing={1}>
      {distribution.map((num, i) => (
        <StatsBar
          tryCount={i + 1}
          total={num}
          percentage={maxTries > 0 ? num / maxTries : 0}
        />
      ))}
    </Grid>
  );
}

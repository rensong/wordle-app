import { Box, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';

type Props = {
  tryCount: number,
  total: number,
  percentage: number,
}

const Bar = styled(Box)<{ percentage: number }>`
   background: #787c7e;
   width: ${p => Math.max(6, p.percentage) + "%"};
`;


export default function StatsBar({
  tryCount,
  total,
  percentage
}: Props) {
  return (
    <>
      <Grid item xs={1}>
        <Box className="statsTryCount">{tryCount}</Box>
      </Grid>
      <Grid item xs={11}>
        <Bar percentage={percentage * 100}>
          <Box className="statsTotal">
            {total}
          </Box>
        </Bar>
      </Grid>
    </>
  );
}

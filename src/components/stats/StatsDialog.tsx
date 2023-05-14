import {
  Alert,
  AlertTitle,
  CircularProgress,
  Typography,
  Divider,
  DialogContent,
  Stack,
  Box,
  Dialog,
} from "@mui/material";
import StatsRecord from './StatsRecord';
import StatsHistogram from './StatsHistogram';
import {StatsData} from '../../lib/statsHelper';

type Props = {
  user?: any,
  stats?: StatsData | null,
  open: boolean,
  onClose: Function,
}

export default function StatsDialog({
  user,
  stats,
  open,
  onClose,
}: Props) {
  let dialogContent;
  if (!user) {
    dialogContent = (
      <Alert severity="error">
        <AlertTitle>Login to access stats</AlertTitle>
      </Alert>
    );
  } else if (!stats) {
    dialogContent = (
      <CircularProgress color="secondary" />
    );
  } else {
    let percentage = 0;
    if (stats.gamesPlayed > 0) {
      percentage = Math.round(stats.gamesWon / stats.gamesPlayed * 100);
    }
    dialogContent = (
      <>
        <Box>
          <Typography variant="button" className="statsTitle">
            Statistics
          </Typography>
        </Box>
        <Stack direction="row" spacing={3}>
          <StatsRecord stat={stats.gamesPlayed} caption="played" />
          <StatsRecord stat={percentage} caption="% win" />
          <StatsRecord stat={stats.currentStreak} caption="current streak" />
          <StatsRecord stat={stats.maxStreak} caption="max streak" />
        </Stack>
        <Divider sx={{my: 2}} />
        <Box>
          <Typography variant="button" className="statsTitle">
            Guess Distribution
          </Typography>
          <StatsHistogram
            distribution={stats.distribution}
          />
        </Box>
      </>
    );
  }
  return (
    <Dialog onClose={e => onClose()} open={open}>
      <DialogContent className="statsDialog" >
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
}

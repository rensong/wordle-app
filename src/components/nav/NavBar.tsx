import {useState} from 'react';
import { AppBar, Toolbar, Typography } from "@mui/material";
import {theme} from '../../constants/colors';
import { ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Person2Icon from '@mui/icons-material/Person2';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import StatsDialog from '../stats/StatsDialog';
import {StatsData} from '../../lib/statsHelper';


type Props = {
  user?: any,
  stats?: StatsData | null,
  onSignOutClick: Function,
  onSignInClick: Function,
};

export default function NavBar({
  user,
  stats,
  onSignOutClick,
  onSignInClick,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openStatsDialog, setOpenStatsDialog] = useState(false);
  const openMenu = Boolean(anchorEl);
  const accountMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const accountMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar className="navbar" color="primary" position="absolute">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Wordle Clone
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="stats"
            onClick={accountMenuClick}
            sx={{ mr: 2 }}>
            <Person2Icon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="stats"
            onClick={() => setOpenStatsDialog(true)}
            sx={{ mr: 2 }}>
            <LeaderboardIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={accountMenuClose}
        onClick={accountMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        { !user &&
          <MenuItem onClick={e => onSignInClick()}>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        }
        { user &&
          <MenuItem onClick={e => onSignOutClick()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        }
      </Menu>
      <StatsDialog
        user={user}
        stats={stats}
        open={openStatsDialog}
        onClose={() => setOpenStatsDialog(false)}
      />
    </ThemeProvider>
  );
}

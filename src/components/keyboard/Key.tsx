import { Grid, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import {Colors} from '../../constants/colors';


const Item = styled(Box)<{ status: string }>`
   background-color: ${p => (p.status === 'unused' ? Colors.keyGrey
    : (p.status === 'not_in_word' ? Colors.darkGrey
    : (p.status === 'in_word' ? Colors.yellow : Colors.green
   )))};
   color: ${p => (p.status === 'unused' ? "#000" : "#fff")};
   width: 100%;
   margin-top: 8px;
   box-sizing: border-box;
   text-align: center;
   border-radius: 3px;
   cursor: pointer;
`;

type Props = {
  value: string,
  status: string,
  onKeyPress: Function,
}

export default function Key({
  value,
  onKeyPress,
  status,
}: Props) {
  return (
    <Grid item xs onClick={() => onKeyPress(value)}>
      <Item className="keyboard-key" status={status}>
        {value === "BACKSPACE" ? "←" : value}
      </Item>
    </Grid>
  );
}

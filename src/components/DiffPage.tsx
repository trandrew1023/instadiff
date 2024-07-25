import React, { useState } from 'react';
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextareaAutosize,
  Typography,
} from '@mui/material';

const DiffPage: React.FC = () => {
  const [leftInput, setLeftInput] = useState('');
  const [rightInput, setRightInput] = useState('');
  const [leftList, setLeftList] = useState<string[]>([]);
  const [rightList, setRightList] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  function extractUsernames(inputText: string): string[] {
    const lines = inputText.split(/\r?\n/);
    const usernames: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('profile picture')) {
        usernames.push(lines[i + 1]);
      }
    }

    return usernames;
  }

  const handleProcessClick = () => {
    const followersList = extractUsernames(leftInput);
    const followingList = extractUsernames(rightInput);
    setLeftList(followersList);
    setRightList(followingList);
    setFollowers(
      followersList.filter((item) => followingList.indexOf(item) < 0)
    );
    setFollowing(
      followingList.filter((item) => followersList.indexOf(item) < 0)
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          1. Go to your Instagram profile and open your followers.
        </Typography>
        <Typography>2. Scroll and load all of your followers.</Typography>
        <Typography>
          3. Select all your followers (CTRL/CMD + a on the ENTIRE page) and
          copy (CTRL/CMD + c) everything.
        </Typography>
        <Typography>
          4. Paste everything (CTRL/CMD + v) into the `Followers` box.
        </Typography>
        <Typography>5. Repeat for `Following`</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextareaAutosize
          minRows={4}
          maxRows={25}
          placeholder="Followers"
          value={leftInput}
          onChange={(e) => setLeftInput(e.target.value)}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextareaAutosize
          minRows={4}
          maxRows={25}
          placeholder="Following"
          value={rightInput}
          onChange={(e) => setRightInput(e.target.value)}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProcessClick}
        >
          Submit
        </Button>
      </Grid>
      <Grid item xs={6}>
        <List>
          {leftList.length - 1}
          {followers.map((item) => (
            <ListItem key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={6}>
        <List>
          {rightList.length - 1}
          {following.map((item) => (
            <ListItem key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default DiffPage;

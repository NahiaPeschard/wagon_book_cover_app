import { Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Button, Snackbar } from '@mui/material';
import { useState } from 'react';
import MuiAlert from '@mui/material/Alert';

type ReportDialogProps = {
  open: boolean,
  handleClose: () => void,
  handleReportSubmit: (feedback: string, category: string) => void,
};

const ReportDialog = ({ open, handleClose, handleReportSubmit }: ReportDialogProps) => {
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // state for Snackbar

  const handleReport = () => {
    handleReportSubmit(feedback, category);
    setFeedback("");
    setCategory("");
    setOpenSnackbar(true); // open Snackbar when report is submitted
    handleClose(); // Close the dialog after feedback is submitted
  };

  // Close Snackbar
  const handleCloseSnackbar = (event: React.SyntheticEvent<any, Event> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent style={{ width: 300, minHeight: 100 }}>
          <Select
            value={category}
            displayEmpty
            fullWidth
            onChange={(event) => setCategory(event.target.value)}
            size="small"
          >
            <MenuItem value="" disabled>
              Please choose the right category
            </MenuItem>
            {Object.entries(category_dict).map(([key, value]) => (
              <MenuItem key={key} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleReport}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity="success" elevation={6} variant="filled">
          Feedback submitted successfully
        </MuiAlert>
      </Snackbar>
    </div>
  );
};


export default ReportDialog;

const category_dict = { 0: 'Arts & Photography',
1: 'Biographies & Memoirs',
2: 'Business & Money',
3: 'Calendars',
4: "Children's Books",
5: 'Comics & Graphic Novels',
6: 'Computers & Technology',
7: 'Cookbooks, Food & Wine',
8: 'Crafts, Hobbies & Home',
9: 'Christian Books & Bibles',
10: 'Engineering & Transportation',
11: 'Health, Fitness & Dieting',
12: 'History',
13: 'Humor & Entertainment',
14: 'Law',
15: 'Literature & Fiction',
16: 'Medical Books',
17: 'Mystery, Thriller & Suspense',
18: 'Parenting & Relationships',
19: 'Politics & Social Sciences',
20: 'Reference',
21: 'Religion & Spirituality',
22: 'Romance',
23: 'Science & Math',
24: 'Science Fiction & Fantasy',
25: 'Self-Help',
26: 'Sports & Outdoors',
27: 'Teen & Young Adult',
28: 'Test Preparation',
29: 'Travel',
30: 'None'}

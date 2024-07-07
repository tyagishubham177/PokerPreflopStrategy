import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const IncorrectAnswers = ({ wrongChoices }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Incorrect Answers:
      </Typography>
      <List>
        {wrongChoices.map((choice, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={`Hand Notation: ${choice.handNotation}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      Position: {choice.position}
                    </Typography>
                    {` — Situation: ${choice.situation}`}
                    <br />
                    <Typography component="span" variant="body2" color="error">
                      Your choice: {choice.yourChoice}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="success.main">
                      Correct choice: {choice.correctDecision}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < wrongChoices.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default IncorrectAnswers;

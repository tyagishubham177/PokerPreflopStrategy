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
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{
                        fontFamily: "Tahoma",
                      }}
                    >
                      {(() => {
                        const parts = choice.position.split(" - ");
                        return (
                          <>
                            Situation: {parts[0]}
                            <br />
                            Hero: {parts[1]}
                            <br />
                            Villain: {parts[2]}
                          </>
                        );
                      })()}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="error"
                      sx={{
                        fontFamily: "Gadget",
                        fontStyle: "italic",
                      }}
                    >
                      Your choice: {choice.yourChoice}
                    </Typography>

                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="success.main"
                      sx={{
                        fontFamily: "Comic Sans MS, cursive, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
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

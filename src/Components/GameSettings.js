import React from "react";
import { useTranslation } from "react-i18next";
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FONT_OPTIONS } from "../Constants/FontOptions";

const GameSettings = ({
  username,
  handleUsernameChange,
  difficulty,
  handleDifficultyChange,
  language,
  handleLanguageChange,
  fontFamily,
  handleFontChange,
  themeName,
  handleThemeChange,
  setIsInputFocused,
}) => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ mb: 2, overflow: "hidden" }}>
      {" "}
      {/* Removed p: 2 */}
      <Accordion
        defaultExpanded={true}
        elevation={0}
        sx={{
          "&.MuiAccordion-root:before": { display: "none" },
          width: "100%",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="game-settings-content"
          id="game-settings-header"
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            {t("gameSettings")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ p: 2, display: "flex", flexDirection: "column" }}
        >
          {" "}
          {/* Added padding back & flex column for spacing */}
          <TextField
            fullWidth
            label={t("username")}
            value={username}
            onChange={handleUsernameChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            select
            fullWidth
            label={t("gameDifficulty")}
            value={difficulty}
            onChange={(event) => handleDifficultyChange(event.target.value)}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="Easy">{t("easy")}</MenuItem>
            <MenuItem value="Medium">{t("medium")}</MenuItem>
            <MenuItem value="Hard">{t("hard")}</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            label={t("language")}
            value={language}
            onChange={(event) => handleLanguageChange(event.target.value)}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="en">{t("english")}</MenuItem>
            <MenuItem value="hi">{t("hindi")}</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            label={t("fontStyle")}
            value={fontFamily}
            onChange={(event) => handleFontChange(event.target.value)}
            margin="normal"
            variant="outlined"
          >
            {FONT_OPTIONS.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label={t("colorTheme")}
            value={themeName}
            onChange={(event) => handleThemeChange(event.target.value)}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="forest">{t("forestTheme")}</MenuItem>
            <MenuItem value="ocean">{t("oceanTheme")}</MenuItem>
            <MenuItem value="sunset">{t("sunsetTheme")}</MenuItem>
            <MenuItem value="grape">{t("grapeTheme")}</MenuItem>
            <MenuItem value="blackWhite">{t("blackWhiteTheme")}</MenuItem>
          </TextField>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default GameSettings;

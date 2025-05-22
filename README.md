# 🃏 Poker Preflop Strategy Game

Welcome to the **Poker Preflop Strategy Game**! This is a fun and interactive game where you can test and improve your poker preflop decision-making skills based on different hands and positions. 🎲

👉 **Get ready to sharpen your skills and make the best moves at the table!** 💪

💡🔗 [Based on this strategy](https://poker-coaching.s3.amazonaws.com/tools/preflop-charts/full-preflop-charts.pdf) 📄🌐

[🎮 Play the Poker Decision Game](https://poker-preflop-strategy.vercel.app/) 🚀

## 📋 Features

- **Dynamic Hand Dealing**: Randomly dealt poker hands.
- **Position-Based Strategy**: Make decisions based on your position at the table.
- **Scoring System**: Earn points for correct decisions and track your high score via localStorage.
- **Streak Bonuses**: Get extra points for consecutive correct decisions.
- **Customizable Strategies**: Edit and save your own poker strategies via the settings panel.
- **Error Handling**: Robust error management with fallback UIs.
- **Game Over and Restart**: Keep playing and improving!
- **Review Incorrect Answers**: Carousel to review mistakes after game over.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/poker-decision-game.git
    ```
    (Replace `your-username` with the actual repository path if different)
2. **Navigate to the project directory**:
    ```bash
    cd poker-decision-game
    ```
3. **Install the dependencies**:
    ```bash
    npm install
    ```

### Running the Game

To start the game, run:
```bash
npm start
```
This will launch the game in your default web browser. 🌐

## 🛠 Project Structure

The project is organized into several directories within `src/`:

-   **`src/Assets`**: Contains static assets like images (logo, wallpaper).
-   **`src/Components`**: Includes all React components used to build the user interface. This includes game display elements, dialogs, buttons, and layout components.
-   **`src/Constants`**: Holds constant values used throughout the application, such as card weights, game labels, initial strategy data, and game constants.
-   **`src/Hooks`**: Contains custom React hooks that encapsulate business logic and state management.
    -   `useGameState.js`: Manages the core game state (score, lives, hand, etc.) and localStorage interactions for high scores.
    -   `useGameLogic.js`: Handles the internal game mechanics like hand generation, determining correct decisions, and strategy lookups.
    -   `UsePokerGame.js`: The main hook that orchestrates `useGameState` and `useGameLogic` to provide overall game functionality to the UI.
-   **`src/Styles`**: Contains global CSS files and styles for specific components.
-   **`src/Utils`**: Includes utility functions that can be reused across different parts of the application, like hand representation logic.
-   **Root `src` files**:
    -   `App.js`: The main application component that sets up the overall structure.
    -   `index.js`: The entry point of the React application.
    -   `reportWebVitals.js`, `setupTests.js`: Standard Create React App files for performance monitoring and testing.

This structure separates concerns, making the codebase more modular and maintainable.

## 🃏 Gameplay

-   **Deal New Hand**: A new hand is automatically dealt at the start of the game and after each player decision.
-   **Make a Decision**: Based on your hand and the current game situation (your position, villain's position), choose an action like `Raise`, `Call`, or `Fold`.
-   **Score Points**: Correct decisions earn points. Consecutive correct answers (streaks) provide score bonuses.
-   **Lives**: Players start with a set number of lives. An incorrect decision results in the loss of a life.
-   **Game Over**: The game ends when all lives are lost. Your final score and high score are displayed. You can then review your incorrect answers.
-   **Restart**: After a game ends, you can restart to play again and try to beat your high score.

## 📝 Customizing Strategies

The game allows for strategy customization:
- Access the **Settings** panel (usually via a settings icon).
- Navigate to the strategy customization section.
- Use the **StrategyEditor** to visually select which hands to play for different positions (e.g., UTG, MP, SB).
- Save your custom strategy. This strategy will be stored in `localStorage` and used for future game sessions until reset.
- You can reset the strategy back to the game's default at any time.

## 🧬 File Descriptions

Below is a table describing each file within the `src` directory:

| File Path                                      | Description                                                                                                |
| :--------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `src/App.css`                                  | Main CSS file for the `App` component, providing global styles.                                            |
| `src/App.js`                                   | The root React component that renders the main application layout and `PokerGame`.                           |
| `src/App.test.js`                              | Basic tests for the `App` component.                                                                       |
| `src/Assets/pokerlogo512.png`                | Logo image for the poker game.                                                                             |
| `src/Assets/wallpaper.png`                   | Background wallpaper image for the game.                                                                   |
| `src/Components/CardDisplay.js`                | React component for rendering individual playing cards and a player's hand.                                |
| `src/Components/CarouselButtons.js`            | Components for custom next/previous arrow buttons in the carousel.                                         |
| `src/Components/CarouselComponent.js`          | React component that displays incorrect answers in a swipeable carousel.                                   |
| `src/Components/DecisionButtons.js`            | React component for displaying and handling player action buttons (e.g., Fold, Call, Raise).               |
| `src/Components/ErrorBoundary.js`              | A generic React component to catch JavaScript errors in its children and display a fallback UI.            |
| `src/Components/FlipCard.js`                   | Component for a card that can be flipped, used in the incorrect answers review.                            |
| `src/Components/FlipCardBack.js`               | Component representing the back face of a flip card, showing correct/incorrect choices.                    |
| `src/Components/FlipCardFront.js`              | Component representing the front face of a flip card, showing the hand and situation.                      |
| `src/Components/GameDisplay.js`                | Component that encapsulates the main game interface (header, game tab, rules dialog).                      |
| `src/Components/GameHeader.js`                 | Component for the header section of the game UI, showing logo and title.                                   |
| `src/Components/GameOver.js`                   | React component displayed when the game ends, showing score and restart button.                            |
| `src/Components/HandCell.js`                   | Component for rendering a single cell in the `StrategyEditor` grid.                                        |
| `src/Components/HandDealer.js`                 | React component responsible for animating and displaying the dealt hand using `CardDisplay`.                 |
| `src/Components/IncorrectAnswers.js`           | Component that displays a summary of incorrect answers, often using the `CarouselComponent`.               |
| `src/Components/PokerGame.js`                  | The main container component for the poker game, managing overall game flow and UI structure.              |
| `src/Components/PokerGameTab.js`               | Component that displays the core game information: score, hand, situation, player actions, lives, streak.  |
| `src/Components/RulesDialog.js`                | A dialog component that displays the rules and information about the game.                                 |
| `src/Components/SettingsDialog.js`             | (Potentially deprecated or refactored) A dialog for game settings, now likely part of `SettingsPanel`.     |
| `src/Components/SettingsPanel.js`              | A swipeable drawer component that hosts the `SettingsTab` for game settings.                               |
| `src/Components/SettingsTab.js`                | Component containing various game settings, including sound, username, difficulty, and strategy customization. |
| `src/Components/SettingsTab.test.js`           | Unit tests for the `SettingsTab` component, focusing on localStorage and strategy interactions.            |
| `src/Components/StrategyCustomizationModal.js` | A modal dialog component that allows users to customize their poker strategy using the `StrategyEditor`.   |
| `src/Components/StrategyCustomizationModal.test.js` | Unit tests for the `StrategyCustomizationModal` component.                                               |
| `src/Components/StrategyEditor.js`             | A component that provides a grid interface for selecting poker hands to define a strategy.                 |
| `src/Components/StrategyEditor.test.js`        | Unit tests for the `StrategyEditor` component.                                                             |
| `src/Components/StyledLink.js`                 | A styled link component, possibly for external links or specific UI needs.                                 |
| `src/Constants/CardWeights.js`                 | Defines weights for card ranks, used for weighted random hand generation.                                  |
| `src/Constants/GameConstants.js`               | Contains general game constants like suits.                                                                |
| `src/Constants/GameLabels.js`                  | Defines labels for game situations and positions (e.g., UTG, MP, RFI).                                     |
| `src/Constants/InitialStrategy.js`             | Contains the default initial poker strategy data used by the game.                                         |
| `src/Constants/Todo.js`                        | A file likely containing a list of TODO items or future development notes.                               |
| `src/Hooks/UsePokerGame.js`                    | Custom React hook that orchestrates game logic (`useGameLogic`) and state (`useGameState`).                |
| `src/Hooks/useGameLogic.js`                    | Custom React hook encapsulating core game logic (hand generation, decision validation, etc.).              |
| `src/Hooks/useGameState.js`                    | Custom React hook for managing the game's state (score, lives, hand, etc.) and localStorage.             |
| `src/Styles/carouselStyles.css`                | CSS styles specifically for the carousel component.                                                        |
| `src/Styles/styles.css`                        | Global CSS styles for the application.                                                                     |
| `src/Utils/handUtils.js`                       | Utility functions related to poker hands, such as generating hand string representations (e.g., "AKs").  |
| `src/index.css`                                | Global CSS file, often used for base styling or CSS resets, applied at the application entry point.      |
| `src/index.js`                                 | The main entry point for the React application, responsible for rendering the root `App` component.        |
| `src/logo.svg`                                 | The React logo SVG file, often included with Create React App.                                             |
| `src/reportWebVitals.js`                       | Script for measuring and reporting web vitals (performance metrics).                                       |
| `src/setupTests.js`                            | Configuration file for setting up the testing environment (e.g., Jest).                                  |

## 🤝 Contributing

Feel free to fork this project, submit issues, and make pull requests. Contributions are always welcome! 🎉

## 📜 License

This project is licensed under the MIT License. 📄

---

Enjoy the game and improve your poker skills! Good luck! 🍀

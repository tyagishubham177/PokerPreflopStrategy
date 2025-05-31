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

See [Detailed File Descriptions](StructureReadMe.md) for more information.

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

## 🤝 Contributing

Feel free to fork this project, submit issues, and make pull requests. Contributions are always welcome! 🎉

## 📜 License

This project is licensed under the MIT License. 📄

---

Enjoy the game and improve your poker skills! Good luck! 🍀

import React, { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	Typography,
	Button,
	LinearProgress,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
} from "@mui/material";
import {
	Info,
	EmojiEvents,
	LocalFireDepartment,
	Settings,
} from "@mui/icons-material";

const initialPokerStrategy = {
	"RaiseFirstIn(RFI)": {
		UTG: {
			"Raise for Value": [
				"AA",
				"KK",
				"QQ",
				"JJ",
				"TT",
				"99",
				"88",
				"77",
				"AKs",
				"AQs",
				"AJs",
				"ATs",
				"A5s",
				"A4s",
				"KQs",
				"KJs",
				"QJs",
				"JTs",
			],
			"Raise as a Bluff": [],
			Limp: [],
		},
		// ... (other positions)
	},
	// ... (other situations)
};

const positions = [
	{ name: "UTG", description: "Under the Gun: First to act" },
	{ name: "UTG+1", description: "Under the Gun +1: Second to act" },
	{ name: "UTG+2", description: "Under the Gun +2: Third to act" },
	{ name: "LJ", description: "Lojack: 2 seats right of the button" },
	{ name: "HJ", description: "Hijack: 1 seat right of the button" },
	{ name: "CO", description: "Cutoff: Directly right of the button" },
	{ name: "BTN", description: "Button: Dealer position" },
	{ name: "SB", description: "Small Blind: Left of the button" },
	{ name: "BB", description: "Big Blind: Left of the small blind" },
];

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

const PokerGame = () => {
	const [hand, setHand] = useState([]);
	const [position, setPosition] = useState("");
	const [lives, setLives] = useState(3);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [streak, setStreak] = useState(0);
	const [wrongChoices, setWrongChoices] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [showRules, setShowRules] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [pokerStrategy, setPokerStrategy] = useState(initialPokerStrategy);
	const [editedStrategy, setEditedStrategy] = useState(
		JSON.stringify(initialPokerStrategy, null, 2)
	);
	const [situation, setSituation] = useState("");

	useEffect(() => {
		dealNewHand();
	}, []);

	const dealNewHand = () => {
		const newHand = [];
		while (newHand.length < 2) {
			const card = `${ranks[Math.floor(Math.random() * ranks.length)]}${
				suits[Math.floor(Math.random() * suits.length)]
			}`;
			if (!newHand.includes(card)) {
				newHand.push(card);
			}
		}
		setHand(newHand);
		const newPosition =
			positions[Math.floor(Math.random() * positions.length)].name;
		setPosition(newPosition);

		const situations = Object.keys(pokerStrategy);
		const randomSituation =
			situations[Math.floor(Math.random() * situations.length)];
		setSituation(randomSituation);
	};

	const makeDecision = (decision) => {
		const handNotation = `${hand[0][0]}${hand[1][0]}${
			hand[0][1] === hand[1][1] ? "s" : "o"
		}`;
		const correctDecision = getCorrectDecision(handNotation);

		if (decision === correctDecision) {
			const points = 10 * (1 + streak * 0.1);
			setScore((prevScore) => prevScore + points);
			setStreak((prevStreak) => prevStreak + 1);
			setHighScore((prevHighScore) =>
				Math.max(prevHighScore, score + points)
			);
		} else {
			setLives((prevLives) => prevLives - 1);
			setStreak(0);
			setWrongChoices((prevWrongChoices) => [
				...prevWrongChoices,
				{ hand, position, correctDecision },
			]);
		}

		if (lives > 1) {
			dealNewHand();
		} else {
			setGameOver(true);
		}
	};

	const getCorrectDecision = (handNotation) => {
		const situationData = pokerStrategy[situation][position];
		if (!situationData) return "fold";

		if (
			situationData["Raise for Value"]?.includes(handNotation) ||
			situationData["3-bet for Value"]?.includes(handNotation)
		) {
			return "raise";
		} else if (situationData["Call"]?.includes(handNotation)) {
			return "call";
		} else {
			return "fold";
		}
	};

	const restartGame = () => {
		setLives(3);
		setScore(0);
		setStreak(0);
		setWrongChoices([]);
		setGameOver(false);
		dealNewHand();
	};

	const renderCard = (card) => {
		const [rank, suit] = card.split("");
		const color = suit === "♥" || suit === "♦" ? "red" : "black";
		return (
			<Typography
				variant="h4"
				component="span"
				style={{
					color,
					border: "2px solid #ccc",
					borderRadius: "8px",
					padding: "8px",
					backgroundColor: "white",
					display: "inline-block",
					margin: "4px",
				}}
			>
				{rank}
				{suit}
			</Typography>
		);
	};

	const handleStrategyChange = (e) => {
		setEditedStrategy(e.target.value);
	};

	const saveStrategy = () => {
		try {
			const newStrategy = JSON.parse(editedStrategy);
			setPokerStrategy(newStrategy);
			setShowSettings(false);
		} catch (error) {
			alert("Invalid JSON. Please check your input.");
		}
	};

	return (
		<Card style={{ maxWidth: 400, margin: "auto", marginTop: 20 }}>
			<CardHeader title="Poker Decision Game" />
			<CardContent>
				{!gameOver ? (
					<>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: 16,
							}}
						>
							<Typography>Score: {score}</Typography>
							<Typography>High Score: {highScore}</Typography>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								marginBottom: 16,
							}}
						>
							{hand.map((card, index) => (
								<span
									key={index}
									style={{
										transform: "scale(1.1)",
										transition: "transform 0.3s",
									}}
								>
									{renderCard(card)}
								</span>
							))}
						</div>
						<Typography align="center" style={{ marginBottom: 16 }}>
							Position: {position}
							<br />
							Situation: {situation}
							<br />
							<Info
								fontSize="small"
								style={{ cursor: "pointer" }}
								onClick={() => setShowRules(true)}
							/>
						</Typography>
						<Typography align="center" style={{ marginBottom: 16 }}>
							What's your decision?
						</Typography>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								gap: 8,
								marginBottom: 16,
							}}
						>
							<Button
								variant="contained"
								onClick={() => makeDecision("raise")}
							>
								Raise
							</Button>
							<Button
								variant="contained"
								onClick={() => makeDecision("call")}
							>
								Call
							</Button>
							<Button
								variant="contained"
								onClick={() => makeDecision("fold")}
							>
								Fold
							</Button>
						</div>
						<div style={{ marginBottom: 16 }}>
							<Typography>Lives: {lives}</Typography>
							<LinearProgress
								variant="determinate"
								value={(lives / 3) * 100}
							/>
						</div>
						<Typography align="center">
							Streak: {streak}{" "}
							<LocalFireDepartment fontSize="small" />
							{streak > 0 && (
								<span> (+{streak * 10}% bonus)</span>
							)}
						</Typography>
					</>
				) : (
					<div style={{ textAlign: "center" }}>
						<Typography variant="h5" style={{ marginBottom: 16 }}>
							Game Over
						</Typography>
						<EmojiEvents
							style={{
								fontSize: 64,
								color: "#FFD700",
								marginBottom: 16,
							}}
						/>
						<Typography style={{ marginBottom: 8 }}>
							Final Score: {score}
						</Typography>
						<Typography style={{ marginBottom: 16 }}>
							High Score: {highScore}
						</Typography>
						<Button variant="contained" onClick={restartGame}>
							Play Again
						</Button>
					</div>
				)}
				<Dialog open={showRules} onClose={() => setShowRules(false)}>
					<DialogTitle>Game Rules</DialogTitle>
					<DialogContent>
						<Typography>
							Make the correct decision based on your hand and
							position. Raise for strong hands, call for medium
							strength, and fold weak hands. Consecutive correct
							decisions increase your score multiplier!
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setShowRules(false)}>
							Close
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					open={showSettings}
					onClose={() => setShowSettings(false)}
				>
					<DialogTitle>Edit Poker Strategy</DialogTitle>
					<DialogContent>
						<TextField
							multiline
							fullWidth
							rows={10}
							value={editedStrategy}
							onChange={handleStrategyChange}
							variant="outlined"
							margin="normal"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={saveStrategy}>Save Changes</Button>
						<Button onClick={() => setShowSettings(false)}>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
				<Button
					startIcon={<Settings />}
					style={{ marginTop: 16 }}
					onClick={() => setShowSettings(true)}
				>
					Settings
				</Button>
			</CardContent>
		</Card>
	);
};

export default PokerGame;

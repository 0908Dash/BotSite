const { MessageEmbed, SlashCommandBuilder } = require('discord.js');

const ticTacToeGame = new SlashCommandBuilder()
.setName('tic-tac-toe')
.setDescription('send a challenge invite to another player')
.addUserOption((option) =>
option
.setName('opponet')
.setDescription('the user you want to play against')
.setRequired(true))

async function handleTicTacToeGame(interaction) {
  const opponent = interaction.options.getUser('opponent');

  if (!opponent) {
    return interaction.reply('Please specify an opponent.');
  }

  const player1 = interaction.user;
  const player2 = opponent;
  let currentPlayer = player1;
  let gameOver = false;
  let board = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ];

  const boardToString = () => {
    let rows = board.map(row => row.join(' | ')).join('\n---------\n');
    return '```' + rows + '```';
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const isWinner = (player) => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
    return false;
  };

  const isTie = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '-') return false;
      }
    }
    return true;
  };

  const gameOverMessage = (winner) => {
    let message = '';
    if (winner) {
      message = `Congratulations ${winner}! You are the winner!`;
    } else {
      message = 'Tie game!';
    }
    message += '\n' + boardToString();
    return message;
  };

  let message = `Game started! It's ${player1} vs ${player2}.\n${boardToString()}`;
  await interaction.reply(message);

  while (!gameOver) {
    const filter = (m) => m.author.id === currentPlayer.id;
    const playerMessage = await interaction.channel.awaitMessages({
      filter,
      max: 1,
      time: 30000,
    });

    if (!playerMessage.size) {
      message = `Game ended! ${currentPlayer} took too long to respond.\n${boardToString()}`;
      await interaction.reply(message);
      break;
    }

    const input = playerMessage.first().content;
    const [row, col] = input.split(' ');

    if (isNaN(row) || isNaN(col)) {
      message = 'Invalid input. Please enter the row and column separated by a space.';
      await interaction.reply(message);
      continue;
    }

    const rowIndex = parseInt(row) - 1;
    const colIndex = parseInt(col) - 1;

    if (rowIndex < 0 || rowIndex > 2 || colIndex < 0 || colIndex > 2) {
      message = 'Invalid input. Please enter a valid row and column (1-3).';
      await interaction.reply(message);
      continue;
    }

    if (board[rowIndex][colIndex] !== '-') {
      message = 'That cell is already taken. Please select another one.';
      await interaction.reply(message);
      continue;
    }

    board[rowIndex][colIndex] = currentPlayer === player1 ? 'X' : 'O';
    message = `${currentPlayer} played: ${input}\n${boardToString()}`;

    if (isWinner(currentPlayer === player1 ? 'X' : 'O')) {
      message += gameOverMessage(currentPlayer);
      await interaction.reply(message);
      gameOver = true;
      break;
    }

    if (isTie()) {
      message += gameOverMessage();
      await interaction.reply(message);
      gameOver = true;
      break;
    }

    switchPlayer();
    message += `It's ${currentPlayer}'s turn.`;
    await interaction.reply(message);
  }
}

module.expoorts = {
  data: ticTacToeGame,
  execute: handleTicTacToeGame
}

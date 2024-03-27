const TicTacToeFactory = (function() {

    const gameBoard = (() => {
        const buildGB = (()=>{
            container = document.querySelector('#board_container');
            for (let i = 0; i < 9; i++){
                const div = document.createElement('div');
                div.setAttribute('class','tile');
                div.setAttribute('id', `T_${i}`);
                div.innerHTML = '';
                container.appendChild(div);
            }
        })();

        const gb = [];
        for (let i = 0; i < 9; i++) {
            let tile = {tile: i, owner: ''};
            gb.push(tile);
        }
        return gb
    })();

    const players = ((name, score) => {
        let p = {name, score};
        return p
    })('X', [0,0,0]);

    const gameLogic = (tile) => {
        const selectTile = ((tile) => {
            if (gameBoard[tile].owner === ''){
                gameBoard[tile].owner = `${players.name}`;
            } else {
                return false
            }
        })(tile);
        
        if (selectTile === false) {
            return 
        }

        const setPlayer = (() => {
            if (players.name === 'X'){
                players.name = 'O';
            } else {
                players.name = 'X';
            }
        })();
            
        const gameState = (() => {
            let gs = [];
            for (const tile of gameBoard) {
                gs.push(tile.owner);
            }
                return gs
        })();

        const checkWin = (() => {
            const winCons = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
            for (con of winCons){
                let result = `${gameState[con[0]]}${gameState[con[1]]}${gameState[con[2]]}`;
                if (result === 'XXX'){
                    return 'X'
                } else if (result === 'OOO'){
                    return 'O'
                } else if (gameState.indexOf('') === -1) {
                    return 'T'
                } 
            }
        })();

        const updateScore = (() => {
            if (checkWin === 'X') {
                players.score[0] ++
                return "WINNER: X's"
            } else if (checkWin === 'O'){
                players.score[1] ++
                
                return "WINNER: O's"
            } else if (checkWin === 'T'){
                players.score[2] ++
                return "WINNER: Draw"
            }
            return
        })();
                        
        const clearGameBoard = (() => {
            if (typeof updateScore === 'string'){
                for (const tile of gameBoard) {
                    tile.owner = '';
                } return
            } 
        })();

        const winner = updateScore;
        const score = players.score;
        const currentPlayer = players.name;

        return {
            score,
            winner,
            gameState,
            currentPlayer
        }
    };
    
    const resetGame = () => {
        const resetBoard = (() => {
            let rb = []
            for (const tile of gameBoard) {
                tile.owner = '';
                rb.push(tile.owner);
            }
            return rb
        })();

        const resetScore = (() => {
            players.score = [0,0,0];
            return players.score
        })();

        return{
            resetScore,
            resetBoard
        }
    };

    return {
        startRound(tile) {
            let roundData = gameLogic(tile);
            return roundData
        },

        reset() {
            resetGame();
        }
    };
})();

const DisplayFactory = (function() {
    
    const selectTileListerner = (()=> {
        for (let i = 0; i < 9; i++){
            const tile = document.querySelector(`#T_${i}`);
            const gamelog = document.querySelector('#game_log>div');

            tile.addEventListener('click', (e) => {
                const round = TicTacToeFactory.startRound(e.target.id.slice(2));
                if (round === undefined){
                    const div = document.createElement('div');
                    div.innerHTML = ' > ERROR: Please pick an open tile.';
                    gamelog.insertBefore(div, gamelog.firstChild);
                    return

                } else {
                    tile.innerHTML = `${round.gameState[e.target.id.slice(2)]}`;

                    const clearBoard = (() => {
                        if (typeof round.winner === 'string') {
                            let tiles = document.querySelectorAll('.tile');
                            tiles.forEach((tile) => {
                                tile.innerHTML = '';
                            })
                            const div = document.createElement('div');
                            div.innerHTML = ` >  ${round.winner}`;
                            gamelog.insertBefore(div, gamelog.firstChild);
                        }
                    })();                    

                    const updateScore = (() => {
                        let i = 0;
                        for (const score of round.score){
                            let scoreBoard = document.querySelector(`#s_${i}`);
                            scoreBoard.innerHTML = `${score}`;
                            i++
                        }
                    })();

                    const updatePlayer = (() => {
                        const turnDisplay = document.querySelector('#turn_display>span:last-child');
                        turnDisplay.innerHTML = `${round.currentPlayer}'s`;
                    })();
                }
            }
        )}

    })();


    const resetListerner = (() => {
        const reset = document.querySelector('#reset');
        reset.addEventListener('click', () => {
            
            TicTacToeFactory.reset();
            
            const resetTiles = (() => {
                tiles = document.querySelectorAll('.tile');
                tiles.forEach((tile) => {
                    tile.innerHTML = '';
                })
            })();

            const resetScore = (() => {
                for (let i = 0; i < 3; i++){
                    let scoreBoard = document.querySelector(`#s_${i}`);
                    scoreBoard.innerHTML = '0';
                }
            })();

            const updateLog = (() => {
                const gamelog = document.querySelector('#game_log>div');
                const div =  document.createElement('div');
                div.innerHTML = ' > RESET: Game reset'
                gamelog.insertBefore(div, gamelog.firstChild);
            })();
        });
    })();

})();
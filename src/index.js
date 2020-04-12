// Components
import './components/in-game-ui-top';
import './components/in-game-ui-bottom';
import './components/in-game-map-ui';

import { GameManager } from './game/game-manager';

const gameManager = new GameManager();

gameManager.initGame();

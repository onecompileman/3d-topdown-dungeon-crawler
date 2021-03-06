// Components
import './components/in-game-ui-top';
import './components/in-game-ui-bottom';
import './components/in-game-map-ui';
import './components/main-menu';
import './components/loading-screen';
import './components/about-screen';
import './components/load-game';
import './components/pause';
import './components/level-select';
import './components/floor-cleared';
import './components/are-you-sure';

import { GameManager } from './game/game-manager';

const gameManager = new GameManager();

gameManager.initGame();

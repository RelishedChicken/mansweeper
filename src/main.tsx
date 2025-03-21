import './style.css';
import { getGrid } from './grid.tsx';
import { spawnItems } from './items.tsx';
import $ from 'jquery';

const width = 5;
const numOfBombs = 5;

//Setup the game grid
$("#grid").append(getGrid(width));

//Spawn player and mines
spawnItems(width, numOfBombs);

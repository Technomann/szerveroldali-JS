import { Application } from './runtime.js';
const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('./spline/scene.spline');
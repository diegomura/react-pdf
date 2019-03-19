import isWasmSupported from './is-wasm-supported';

const importYogaDom = () => import('./node_modules/yoga-dom');
const importYogaLayoutPrebuilt = () => import('./node_modules/yoga-layout-prebuilt');

export default () => isWasmSupported ? importYogaDom() : importYogaLayoutPrebuilt();

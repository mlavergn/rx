import { Map } from './map';
import { Nested } from './nested';
import { Loop } from './loop';
import { Transform } from './transform';
import { Buffer } from './buffer';

/**
 * Main class to load the demo classes
 */
class Main {
    public run() {
        // Map.demo();
        // Nested.demo();
        // Loop.demo();
        // Transform.demo();
        Buffer.demo();
    }
}

const main = new Main();
main.run();

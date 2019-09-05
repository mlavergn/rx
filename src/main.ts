import { Map } from './map';
import { Nested } from './nested';
import { Rotation } from './rotation';
import { Transform } from './transform';

/**
 * Main class to load the demo classes
 */
class Main {
    public run() {
        // Map.demo();
        // Nested.demo();
        // Rotation.demo();
        Transform.demo();
    }
}

const main = new Main();
main.run();

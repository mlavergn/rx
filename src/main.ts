import { Demo } from './demo';

/**
 * Main class to load the demo classes
 */
class Main {
    public run() {
        Demo.demo();
    }
}

const main = new Main();
main.run();

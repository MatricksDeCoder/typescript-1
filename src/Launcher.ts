import { Server } from './Server/Server'

class Launcher {

    private name: string
    private server: Server
    static count: number = 0

    constructor() {
        this.name = `Launcher-${++Launcher.count}`
        this.server = new Server()
    }

    public launchApp() {
        console.log(`launching app ${this.name}`)
        this.server.createServer()
    }
}

const newLauncher = new Launcher()
newLauncher.launchApp()

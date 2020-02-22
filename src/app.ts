import * as express from "express";
import * as cors from "cors";

import accessEnv from "config/accessEnv";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
  }

  public listen(): void {
    const PORT = +accessEnv("PORT", 7000);
    this.app.listen(PORT, () => {
      console.info(`🚀 Server listening on port:${PORT}`);
    });
  }

  private initializeMiddleware(): void {
    // CORS configuration
    this.app.use(
      cors({
        credentials: true,
      }),
    );
  }
}

export default App;

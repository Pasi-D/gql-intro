import * as express from "express";
import * as cors from "cors";
import { ApolloServer } from "apollo-server-express";

import accessEnv from "config/accessEnv";

class App {
  public app: express.Application;
  public apolloServer: ApolloServer;

  constructor(apolloServer: ApolloServer) {
    this.app = express();
    this.apolloServer = apolloServer;
    this.initializeMiddleware();
  }

  public listen(): void {
    const PORT = +accessEnv("PORT", 7000);
    this.app.listen(PORT, () => {
      console.info(`🚀 Graphql playground ready on http://localhost:${PORT}${this.apolloServer.graphqlPath}`);
    });
  }

  private initializeMiddleware(): void {
    // CORS configuration
    this.app.use(
      cors({
        credentials: true,
      }),
    );

    this.apolloServer.applyMiddleware({ app: this.app });
  }
}

export default App;

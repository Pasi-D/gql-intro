import * as express from "express";
import { createServer, Server } from "http";
import * as cors from "cors";
import { ApolloServer } from "apollo-server-express";

import accessEnv from "config/accessEnv";

class App {
  public app: express.Application;
  public apolloServer: ApolloServer;
  public httpServer: Server;

  constructor(apolloServer: ApolloServer) {
    this.app = express();
    this.apolloServer = apolloServer;
    this.initializeMiddleware();
    this.initializeListener();
  }

  public listen(): void {
    const PORT = +accessEnv("PORT", 7000);
    this.httpServer.listen(PORT, () => {
      console.info(`🚀 Graphql playground ready on http://localhost:${PORT}${this.apolloServer.graphqlPath}`);
      console.info(`💢 Subscriptions ready at ws://localhost:${PORT}${this.apolloServer.subscriptionsPath}`);
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

  private initializeListener(): void {
    this.httpServer = createServer(this.app);
    this.apolloServer.installSubscriptionHandlers(this.httpServer);
  }
}

export default App;

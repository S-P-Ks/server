import { Plugin } from '@nestjs/apollo';
import {
    ApolloServerPlugin,
    GraphQLRequestListener,
    GraphQLRequestContext,
} from 'apollo-server-plugin-base';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
    async requestDidStart(requestContext: GraphQLRequestContext): Promise<GraphQLRequestListener> {
        console.log('Request started');
        console.log("Query ⤵️")
        console.log(requestContext.request.query)

        return {
            async willSendResponse(context) {
                console.log("Response ⤵️")
                console.log(context.response.data);
            },
        };
    }
}
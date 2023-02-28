import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";

const definationFactory = new GraphQLDefinitionsFactory().generate({
    typePaths: ["./**/*.graphql"],
    path: join(process.cwd(), "src/graphql.ts"),
    outputAs: "class",
    emitTypenameField: true
})
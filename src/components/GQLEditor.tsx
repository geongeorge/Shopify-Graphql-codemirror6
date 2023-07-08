import ReactCodeMirror from "@uiw/react-codemirror";
import { graphql } from "cm6-graphql";
import { githubLight } from "@uiw/codemirror-theme-github";
import { useEffect, useState } from "react";
import { GraphQLSchema, IntrospectionQuery, buildClientSchema } from "graphql";

// https://discuss.codemirror.net/t/highlighting-that-seems-ignored-in-cm6/4320/21
// Dont have @codemirror/basic-setup installed. read last comment in above link

const GQLEditor = () => {
  const [value, setValue] = useState("");
  const [schema, setSchema] = useState<GraphQLSchema | undefined>();

  useEffect(() => {
    // You need the json schema for this
    void fetch("/schema.json")
      .then((res) => res.text())
      .then((schema) => {
        try {
          const queryRaw = JSON.parse(schema) as IntrospectionQuery;
          const schemaBuilt = buildClientSchema(queryRaw);
          console.log("built", schemaBuilt);
          setSchema(schemaBuilt);
        } catch (e) {
          console.error("Cannot build query", e);
        }
      });
  }, []);

  return (
    <div className="w-full">
      {/* Waiting for schema... */}
      {schema && (
        <ReactCodeMirror
          value={value}
          height="600px"
          width="100%"
          theme={githubLight}
          onChange={setValue}
          basicSetup={{
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: false,
            syntaxHighlighting: true,
            autocompletion: true,
            bracketMatching: true,
            closeBrackets: true,
            history: true,
          }}
          extensions={[graphql(schema)]}
        />
      )}
    </div>
  );
};

export default GQLEditor;

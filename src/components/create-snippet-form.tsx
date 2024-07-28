"use client";

import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "../actions";

export const CreateSnippetForm = () => {
  const [code, setCode] = useState("// Write your code here...");

  const handleEditorChange = (value: string = ""): void => {
    setCode(value);
  };

  const createSnippetAction = actions.createSnippet.bind(null, code);

  return (
    <form className="flex flex-col gap-12" action={createSnippetAction}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <label htmlFor="title" className="text-white">
            Title
          </label>
          <input type="text" id="title" name="title" />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="content" className="text-white">
            Content
          </label>
          <div id="content">
            <Editor
              height="40vh"
              theme="vs-dark"
              defaultLanguage="javascript"
              defaultValue={code}
              value={code}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              onChange={handleEditorChange}
              loading={<p className="text-white">Loading...</p>}
            />
          </div>
        </div>
      </div>

      <button type="submit" className="text-white text-xl bold">
        Save
      </button>
    </form>
  );
};

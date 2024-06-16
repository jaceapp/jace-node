import {$getRoot, $getSelection} from 'lexical';
import React, {useEffect} from 'react';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import DefaultTheme from './themes/DefaultTheme';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS, TEXT_FORMAT_TRANSFORMERS, $convertToMarkdownString} from "@lexical/markdown";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { useConfigStore } from "@Stores/configStore";
import { MessageTypeEnum } from "@Enums/MessageTypeEnum";
import axios from "axios";
import {KEY_ENTER_COMMAND, COMMAND_PRIORITY_LOW} from 'lexical';

function onError(error) {
  console.error(error);
}

function SendKeyPlugin(props: any) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const unregister = editor.registerCommand(
            KEY_ENTER_COMMAND,
            (event: KeyboardEvent) => {
                let message = $convertToMarkdownString(TEXT_FORMAT_TRANSFORMERS);
                if (event.key === "Enter") {
                    // Clear message box
                    editor.update(() => {
                        $getRoot().clear();
                    });
                    axios
                        .post(props.routes.yaceChatSendmessage, { message: message })
                        .then((response) => {
                            if (response.data.type === MessageTypeEnum.COMMAND) {
                                // addMessage({
                                //     type: "information",
                                //     text: response.data.message,
                                // });
                            }
                        });
                }
                return false;
            },
            COMMAND_PRIORITY_LOW
        );

        // Return the cleanup function
        return () => {
            unregister();
        };
    }, [editor, props]); // Add necessary dependencies

    return null; // This component doesn't render anything
}

export function Editor() {
    const routes = useConfigStore((state) => state.routes);
  const initialConfig = {
    namespace: 'editor',
    theme: DefaultTheme,
    onError,
    nodes: [
        HeadingNode,
        // QuoteNode,
        // CodeNode,
        // ListItemNode,
        // ListNode,
        LinkNode,
    ],
  };

  return (
    <div className="relative">
        <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
            contentEditable={<ContentEditable className={"jace-rounded outline-none jace-min-h-[60px] jace-resize-none p-4 jace-w-full jace-border-none jace-bg-inputBackground jace-text-white jace-placeholder-placeholderInput"}/>}
            placeholder={<div></div>}
            ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <SendKeyPlugin routes={routes} />
        <MarkdownShortcutPlugin transformers={TEXT_FORMAT_TRANSFORMERS} />
        </LexicalComposer>
    </div>
  );
}

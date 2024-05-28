import { useCurrentEditor } from "@tiptap/react";
import {
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  FaList,
  FaListOl,
  FaQuoteLeft,
  FaStrikethrough,
} from "react-icons/fa6";




export default function MenuBar() {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }

  return (
    <div className="mb-3">
      <Bold editor={editor}>
        <FaBold />
      </Bold>
      <Italic editor={editor}>
        <FaItalic />
      </Italic>
      <Strike editor={editor}>
        <FaStrikethrough />
      </Strike>
      <Heading editor={editor}>
        <FaHeading />
      </Heading>
      <BulletList editor={editor}>
        <FaList />
      </BulletList>
      <OrderList editor={editor}>
        <FaListOl />
      </OrderList>
      <CodeBlock editor={editor}>
        <FaCode />
      </CodeBlock>
      <BlockQuote editor={editor}>
        <FaQuoteLeft />
      </BlockQuote>
    
    </div>
  );
}

function Bold({ editor, children }) {
  function handleOnClick() {
    editor.chain().focus().toggleBold().run();
  }
  return (
    <button
      onClick={handleOnClick}
      disabled={!editor.can().chain().focus().toggleBold().run()}
      className={
        "btn-editor bg-transparent border-0 " +
        (editor.isActive("bold") ? "is-active" : "")
      }
    >
      {children}
    </button>
  );
}
function Italic({ editor, children }) {
  function handleOnClick() {
    editor.chain().focus().toggleItalic().run();
  }
  return (
    <button
      onClick={handleOnClick}
      disabled={!editor.can().chain().focus().toggleItalic().run()}
      className={
        "btn-editor bg-transparent border-0 " +
        (editor.isActive("italic") ? "is-active" : "")
      }
    >
      {children}
    </button>
  );
}
function Strike({ editor, children }) {
  function handleOnClick() {
    editor.chain().focus().toggleStrike().run();
  }
  return (
    <button
      onClick={handleOnClick}
      disabled={!editor.can().chain().focus().toggleStrike().run()}
      className={
        "btn-editor bg-transparent border-0 " +
        (editor.isActive("strike") ? "is-active" : "")
      }
    >
      {children}
    </button>
  );
}
function Heading({ editor, children }) {
  function handleOnClick() {
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  }
  return (
    <button
      onClick={handleOnClick}
      className={
        "btn-editor bg-transparent border-0 " +
        (editor.isActive("heading", { level: 3 }) ? "is-active" : "")
      }
    >
      {children}
    </button>
  );
}
function BulletList({ editor, children }) {
  function handleOnClick() {
    editor.chain().focus().toggleBulletList().run();
  }
  return (
    <button
      onClick={handleOnClick}
      className={
        "btn-editor bg-transparent border-0 " +
        (editor.isActive("bulletList") ? "is-active" : "")
      }
    >
      {children}
    </button>
  );
}
function OrderList({ editor, children }) {
  function handleOnClick() {
    editor.chain().focus().toggleOrderedList().run();
  }
  return (
    <button
      onClick={handleOnClick}
      className={
        "btn-editor bg-transparent border-0 " +
        (editor.isActive("orderedList") ? "is-active" : "")
      }
    >
      {children}
    </button>
  );
}
function CodeBlock({ editor, children }) {
  function handleOnClick() {
    editor.chain().focus().toggleCodeBlock().run();
  }
  return (
    <button
      onClick={handleOnClick}
      className={
        "btn-editor bg-transparent border-0 " +
        (editor.isActive("codeBlock") ? "is-active" : "")
      }
    >
      {children}
    </button>
  );
}
function BlockQuote({ editor, children }) {
  function handleOnClick() {
    editor.chain().focus().toggleBlockquote().run();
  }
  return (
    <button
      onClick={handleOnClick}
      className={
        "btn-editor bg-transparent border-0 " +
        (editor.isActive("blockQuote") ? "is-active" : "")
      }
    >
      {children}
    </button>
  );
}
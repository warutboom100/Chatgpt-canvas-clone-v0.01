import React, { useState } from "react";
import { Editor, EditorState, ContentState, RichUtils, getVisibleSelectionRect, convertToRaw,convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css"; // นำเข้า CSS ของ Draft.js
import "./Main.css";
import { getImageUrl, canvas } from "../../utils";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { markdownToDraft } from 'markdown-draft-js';

pdfMake.vfs = {
  ...pdfMake.vfs,
};

pdfMake.fonts = {
  THSarabunNew: {
    normal: "https://isuchart.github.io/font/THSarabunNew.ttf",
    bold: "https://isuchart.github.io/font/THSarabunNewBold.ttf",
    italics: "https://isuchart.github.io/font/THSarabunNewItalic.ttf",
    bolditalics: "https://isuchart.github.io/font/THSarabunNewBoldItalic.ttf",
  },
};

const Main = () => {
  const rawContent = markdownToDraft(canvas); // แปลง Markdown เป็น Raw Draft.js ContentState
  const contentState = convertFromRaw(rawContent); // แปลง Raw ContentState เป็น ContentState
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(contentState)
  );

  
  const styleMap = {
    BOLD: {
      fontWeight: "bold",
    },
    ITALIC: {
      fontStyle: "italic",
    },
    UNDERLINE: {
      textDecoration: "underline",
    },
    HEADING_1: {
      fontSize: "2.25rem",
      fontWeight: "700",
    },
    HEADING_2: {
      fontSize: "1.5em",
      fontWeight: "600",
    },
    HEADING_0: {
      fontSize: "16px",
      fontWeight: "500",
    },
  };
  const [toolbarPosition, setToolbarPosition] = useState(null);

  // ฟังก์ชันสำหรับจัดการเมื่อมีการแก้ไขข้อความ
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    updateToolbarPosition(newEditorState);
  };

  // ฟังก์ชันสำหรับบันทึกข้อความเป็น JSON
  const saveContent = () => {
    const content = editorState.getCurrentContent();
    const raw = convertToRaw(content);
    console.log("Saved Content (Raw JSON):", JSON.stringify(raw));
  };

  const toggleStyle = (style) => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  if (style === "H1") {
    // เปลี่ยนข้อความที่เลือกเป็น Header 1
    setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
  } else if (style === "H2") {
    // เปลี่ยนข้อความที่เลือกเป็น Header 2
    setEditorState(RichUtils.toggleBlockType(editorState, "header-two"));
  }else if (style === "P") {
    // เปลี่ยนข้อความที่เลือกเป็น Header 2
    setEditorState(RichUtils.toggleBlockType(editorState, "unstyled"));
  } else if (style === "BOLD") {
    // เพิ่ม/ลบ Bold ให้ข้อความที่เลือก
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  } else if (style === "ITALIC") {
    // เพิ่ม/ลบ Italic ให้ข้อความที่เลือก
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  } else if (style === "UNDERLINE") {
    // เพิ่ม/ลบ Underline ให้ข้อความที่เลือก
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  }
};


  const updateToolbarPosition = (editorState) => {
    const selectionState = editorState.getSelection();
    if (!selectionState.isCollapsed()) {
      const selectionRect = getVisibleSelectionRect(window);
      if (selectionRect) {
        setToolbarPosition({
          top: selectionRect.top - 40, // วาง Toolbar เหนือ Selection
          left: selectionRect.left,
        });
      }
    } else {
      setToolbarPosition(null);
    }
  };
  const applyFontSize = (size) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, `HEADING_${size}`));
  };

  // ฟังก์ชันสำหรับส่งออก PDF
 const exportToPDF = () => {
  const content = editorState.getCurrentContent();
  const rawContent = convertToRaw(content);

  const documentDefinition = {
    content: [],
    defaultStyle: {
      font: "THSarabunNew",
      fontSize: 14,
    },
  };

  rawContent.blocks.forEach((block) => {
    const blockText = block.text;
    const ranges = block.inlineStyleRanges;

    const styledText = [];
    let currentOffset = 0;

    while (currentOffset < blockText.length) {
      let appliedStyles = {};
      const applicableRanges = ranges.filter(
        (range) =>
          range.offset <= currentOffset &&
          currentOffset < range.offset + range.length
      );

      // รวมทุกสไตล์ที่มีผลกับตำแหน่งปัจจุบัน
      applicableRanges.forEach((range) => {
        range.style.split(" ").forEach((style) => {
          if (style === "BOLD") appliedStyles.bold = true;
          if (style === "ITALIC") appliedStyles.italics = true;
          if (style === "UNDERLINE") appliedStyles.decoration = "underline";
        });
      });

      // หา offset ของตำแหน่งถัดไปที่สไตล์เปลี่ยน
      const nextStyleChange = ranges
        .map((range) => range.offset + range.length)
        .filter((offset) => offset > currentOffset)
        .sort((a, b) => a - b)[0];

      const nextOffset = nextStyleChange || blockText.length;

      // สร้างข้อความพร้อมสไตล์
      styledText.push({
        text: blockText.slice(currentOffset, nextOffset),
        ...appliedStyles,
      });

      currentOffset = nextOffset;
    }

    // กำหนดฟอร์แมตสำหรับบล็อก
    let blockStyle = {};
    if (block.type === "header-one") {
      blockStyle = { fontSize: 24, bold: true };
    } else if (block.type === "header-two") {
      blockStyle = { fontSize: 18, bold: true };
    } else {
      blockStyle = { fontSize: 14 }; // Default body text size
    }

    documentDefinition.content.push({
      text: styledText,
      ...blockStyle,
    });
  });

  // สร้างและบันทึก PDF
  pdfMake.createPdf(documentDefinition).download("editor-content.pdf");
};



const getCurrentBlockType = () => {
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());
    // console.log(block._map._root.entries[2][1]);
    console.log(block.getType())
    return block.getType();
  };








  return (
    <>
      <div className="main">
        {/* Header Section */}
        <div className="header p-3">
          <div className="action">
            {/* <img src={getImageUrl("icons/sidebar.png")} alt="logo" />
            <img src={getImageUrl("icons/compose.png")} alt="compose" /> */}
          </div>
        </div>

        {toolbarPosition && (
          <div
            className="floating-toolbar"
            style={{
              top: toolbarPosition.top,
              left: toolbarPosition.left,
              position: "absolute",
            }}
          >
            <button
              onClick={() => toggleStyle("BOLD")}
              className={editorState.getCurrentInlineStyle().has("BOLD") ? "active" : ""}
            >
              <b>B</b>
            </button>
            <button
              onClick={() => toggleStyle("ITALIC")}
              className={editorState.getCurrentInlineStyle().has("ITALIC") ? "active" : ""}
            >
              <i>I</i>
            </button>
            <button
              onClick={() => toggleStyle("UNDERLINE")}
              className={editorState.getCurrentInlineStyle().has("UNDERLINE") ? "active" : ""}
            >
              <span style={{ textDecoration: "underline" }}>Aa</span>
            </button>
            <button className={getCurrentBlockType("header-one")==="header-one" ? "active" : ""} onClick={() => toggleStyle("H1")}>Heading 1</button>
            <button className={getCurrentBlockType("header-two")==="header-two" ? "active" : ""} onClick={() => toggleStyle("H2")}>Heading 2</button>
            <button className={getCurrentBlockType("unstyled")==="unstyled" ? "active" : ""} onClick={() => toggleStyle("P")}>Body</button>
            
          </div>
        )}

        {/* Content Section */}
        <div className="content">
          <div className="scroll-container">
            <div className="content-wrapper">
              <Editor
                editorState={editorState}
                onChange={handleEditorChange}
                placeholder="พิมพ์ข้อความที่นี่..."
                customStyleMap={styleMap}
              />
            </div>
          </div>
        </div>

        {/* Export PDF Button */}
        <div className="toolbar">
          <button onClick={exportToPDF}>Export to PDF</button>
        </div>
      </div>
    </>
  );
};

export default Main;

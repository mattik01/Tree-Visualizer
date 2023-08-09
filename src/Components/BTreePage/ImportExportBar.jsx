import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Warning from "../Warning";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BorderColor } from "@mui/icons-material";

const ImportExportBar = ({
  formData,
  onInputChange,
  onButtonClick,
  setAllowDrag,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleSnackbarClose = () => {
    setIsCopied(false);
  };

  return (
    <div>
      {/* BUTTON ROW SECTION */}
      <div className="button-row">
        <button type="button" onClick={() => onButtonClick("reset")}>
          reset
        </button>
        <button
          type="button"
          onClick={() => onButtonClick("import")}
          style={{
            backgroundColor:
              formData.importExportDisplay == "import" &&
              formData.importExportTextAreaValue != ""
                ? "#8CC63E"
                : "white",
          }}
        >
          import
        </button>
        <button type="button" onClick={() => onButtonClick("export")}>
          export
        </button>
      </div>
      {formData.importWarning && (
        <Warning
          message={formData.importWarning}
          severity={"error"}
          onClose={() => onButtonClick("closeImportWarning")}
        />
      )}

      {/* IMPORT TEXT AREA*/}
      {formData.importExportDisplay == "import" && (
        <div className="multiline">
          <div className="multiline-bar">
            <div>import:</div> {/* Import label */}
            <button
              className="close-button"
              onClick={() => onButtonClick("closeImportExportArea")}
            >
              &times;
            </button>
          </div>
          <textarea
            onMouseEnter={() => setAllowDrag(false)}
            onMouseLeave={() => setAllowDrag(true)}
            className="multiline-textbox"
            id="importExportTextAreaValue"
            name="importExportTextAreaValue"
            value={formData.importExportTextAreaValue}
            onChange={onInputChange}
            placeholder="Paste tree data here"
            rows={6} // Set the initial number of rows
          />
        </div>
      )}

      {/* Export TEXT AREA*/}
      {formData.importExportDisplay == "export" && (
        <div className="multiline">
          <div className="multiline-bar">
            <div>export:</div> {/* Export label */}
            <CopyToClipboard
              text={formData.importExportTextAreaValue}
              onCopy={() => setIsCopied(true)}
            >
              <button type="button">copy</button>
            </CopyToClipboard>
            <Snackbar
              open={isCopied}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
            >
              <MuiAlert severity="info" onClose={handleSnackbarClose}>
                copied to clipboard!
              </MuiAlert>
            </Snackbar>
            <button
              className="close-button"
              onClick={() => onButtonClick("closeImportExportArea")}
            >
              &times;
            </button>
          </div>
          <textarea
            onMouseEnter={() => setAllowDrag(false)}
            onMouseLeave={() => setAllowDrag(true)}
            className="multiline-textbox"
            id="importExportTextAreaValue"
            name="importExportTextAreaValue"
            value={formData.importExportTextAreaValue}
            onChange={onInputChange}
            readOnly
            rows={6} // Set the initial number of rows
          />
        </div>
      )}
    </div>
  );
};

export default ImportExportBar;

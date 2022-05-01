import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { propTypes } from "react-bootstrap/esm/Image";

export default function CropDialog({ open, onClose, children, onSave, disabled }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="crop-dialog-title">File Crop Preview</DialogTitle>
      <DialogContent >{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>

        <Button onClick={onSave} disabled={disabled} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
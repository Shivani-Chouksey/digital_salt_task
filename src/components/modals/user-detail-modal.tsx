import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { ContactFormData } from "../../utils/interfaces/contact-form-interface";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  user: ContactFormData; // Adjust to match user shape
}

const UserDetailModal: React.FC<ModalProps> = ({ user, open, onClose }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Name : {user.userName}
          </Typography>
          <p>
            <span>Email : </span>
            {user.email} 
          </p>
          <p>
            <span>Gender : </span>
            {user.gender}
          </p>
          <p>
            <span>Address : </span>
            {user.address}
          </p>
          <p>
            <span>Contact Number : </span>
            {user.contactNumber}
          </p>
        </Box>
      </Modal>
    </div>
  );
};

export default UserDetailModal;

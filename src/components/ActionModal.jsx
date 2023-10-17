import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Box,
  Button,
} from "@chakra-ui/react";

const ActionModal = ({
  alertTitle,
  alertDialogue,
  modalActionBtnTitle,
  handleModalAction,
  isOpen,
  onClose,
}) => {
  const cancelRef = React.useRef();

  return (
    <Box>
      <AlertDialog
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
              {alertTitle}
            </AlertDialogHeader>
            <AlertDialogBody>{alertDialogue}</AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleModalAction} ml={3}>
                {modalActionBtnTitle}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ActionModal;

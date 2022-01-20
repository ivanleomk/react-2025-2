import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton
} from '@chakra-ui/core';
import { deleteFeedback } from '@/lib/db';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

const RemoveButton = ({ uid }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth();
  const cancelRef = React.useRef();
  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    console.log('Goodbye....');
    deleteFeedback(uid);
    mutate(
      ['/api/feedback', user.token],
      async (data) => {
        console.log(data);

        return { feedback: data.feedback.filter((item) => item.id != uid) };
      },
      false
    );
    onClose();
  };
  return (
    <>
      <IconButton
        aria-label="Delete Feedback"
        icon="delete"
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RemoveButton;

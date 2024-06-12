import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function NewEvent() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
  });
  const navigate = useNavigate();

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        <div className="form-actions">
          {isPending && "Submitting..."}
          {!isPending && (
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Create
              </button>
            </>
          )}
        </div>
        {isError && <ErrorBlock title="Error while saving an event" message={error.message} />}
      </EventForm>
    </Modal>
  );
}

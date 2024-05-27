import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { EventModel } from "~~/models/event.model";
import { useGlobalState } from "~~/services/store/store";

export const CreateEvent: React.FC = () => {
  const createEvent = useGlobalState(state => state.addEvent);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [availableTickets, setAvailableTickets] = useState<number | "">("");

  const handleCreateEvent = () => {
    if (title && description && availableTickets !== "") {
      try {
        // TODO: Connect to blockchain to create Event, if successful allow do local logic.
        const newEvent: EventModel = {
          id: uuidv4(),
          title,
          description,
          imageUrl: "https://source.unsplash.com/random/400x400",
          availableTickets: Number(availableTickets),
        };
        createEvent(newEvent);
        setShowModal(false); // Close the modal after creating the event
        setTitle("");
        setDescription("");
        setAvailableTickets("");
      } catch {}
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Create Event
      </button>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold mb-4">Create New Event</h2>
            <form>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Available Items</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={availableTickets}
                  onChange={e => setAvailableTickets(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
            </form>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCreateEvent}>
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

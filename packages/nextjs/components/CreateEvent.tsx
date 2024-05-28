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
    <div className="">
      <button className="btn bg-secondary" onClick={() => setShowModal(true)}>
        Create Event
      </button>

      {showModal && (
        <div className="modal modal-open">
          <div className="rounded-md min-w-[70%] bg-secondary  flex">
            <form className="py-12 px-6 min-w-[55%]">
              <h2 className="text-3xl font-bold mb-4">Create New Event</h2>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold   text-zinc-400 text-sm uppercase">Title</span>
                </label>
                <input
                  type="text"
                  className="rounded-lg min-h-8 px-4 text-sm"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold   text-zinc-400 text-sm uppercase">Description</span>
                </label>
                <textarea
                  className=" rounded-lg px-4 py-4 text-sm"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold   text-zinc-400 text-sm uppercase">Available Items</span>
                </label>
                <input
                  type="number"
                  className="rounded-lg min-h-8 text-sm px-4 "
                  value={availableTickets}
                  onChange={e => setAvailableTickets(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
              <div className="modal-action mt-12">
                <button className=" text-sm mr-4" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="text-sm  bg-accent py-2 px-4 rounded-lg  font-semibold " onClick={handleCreateEvent}>
                  Create Event
                </button>
              </div>
            </form>
            <div className="bg-zinc-100 flex-1 p-8 flex-col">
              <div className="bg-zinc-300 rounded-md min-h-[80%]">Hola</div>
              <div className="mt-8">
                <button
                  className="text-sm  bg-secondary py-2 px-4 rounded-lg  font-semibold"
                  onClick={() => alert("image generated")}
                >
                  Generate Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

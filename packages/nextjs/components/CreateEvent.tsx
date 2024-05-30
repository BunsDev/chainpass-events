/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";
import { CirclePlus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { EventModel } from "~~/models/event.model";
import { useGlobalState } from "~~/services/store/store";

export const CreateEvent: React.FC = () => {
  const createEvent = useGlobalState(state => state.addEvent);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [availableTickets, setAvailableTickets] = useState<number | "">("");

  const [result, setResult] = useState(
    "https://www.shutterstock.com/shutterstock/photos/1050259787/display_1500/stock-vector-ticket-icon-vector-line-raffle-ticket-symbol-trendy-flat-outline-ui-sign-design-thin-linear-1050259787.jpg",
  );
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = () => {
    if (title && description && availableTickets !== "") {
      try {
        // TODO: Connect to blockchain to create Event, if successful allow do local logic.
        const newEvent: EventModel = {
          id: uuidv4(),
          title,
          description,
          imageUrl:
            "https://www.shutterstock.com/shutterstock/photos/1050259787/display_1500/stock-vector-ticket-icon-vector-line-raffle-ticket-symbol-trendy-flat-outline-ui-sign-design-thin-linear-1050259787.jpg",
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

  const handleGeneration = () => {
    if (description !== "" || title !== "") {
      setResult("");
      setLoading(true);
      fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: description }),
      })
        .then(response => response.json())
        .then(data => {
          setResult(data.image);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleClose = () => {
    document.getElementById("my_modal_2").close();
    setTitle("");
    setDescription("");
    setAvailableTickets("");
    setDate("");
  };

  return (
    <div className="">
      <button className="btn btn-primary" onClick={() => document.getElementById("my_modal_2").showModal()}>
        Create Event
      </button>

      <dialog id="my_modal_2" className={"modal"}>
        <div className="modal-box backdrop-blur-xl">
          <form className="flex flex-col space-y-4">
            <div className="flex justify-center items-center">
              <CirclePlus size={24} />
              <h2 className=" text-2xl font-title font-bold m-0 p-0 ml-1">Create new event</h2>
            </div>
            <div className="flex flex-col space-y-1 ">
              <label className="text-sm text-left font-light">Title</label>
              <input
                type="text"
                className="rounded-3xl min-h-8 px-4 text-sm border border-zinc-300 bg-white bg-opacity-10 "
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex">
              <div className="flex flex-col flex-1 space-y-1 mr-4">
                <label className="text-sm text-left font-light">Available Tickets</label>
                <input
                  type="number"
                  className="rounded-3xl min-h-8 px-4 text-sm border border-zinc-300 bg-white bg-opacity-10 "
                  value={availableTickets}
                  onChange={e => setAvailableTickets(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
              <div className="flex flex-col flex-1 space-y-1">
                <label className="text-sm text-left font-light">Date</label>
                <input
                  type="date"
                  className="rounded-3xl min-h-8 px-4 text-sm border border-zinc-300 bg-white bg-opacity-10 "
                  value={date}
                  onChange={e => setDate(e.target.value as string)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 space-y-1">
              <label className="text-sm text-left font-light">Description</label>
              <textarea
                className="rounded-3xl min-h-[100px] px-4 py-2 text-sm border border-zinc-300 bg-white bg-opacity-10"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col flex-1 space-y-1">
              <label className="text-sm text-left font-light">Image</label>
              <div className="rounded-3xl border border-zinc-300 border-1 p-4 flex flex-col justify-center">
                {loading ? (
                  <div className="h-64 flex justify-center items-center">
                    <span className="loading loading-dots loading-lg"></span>
                  </div>
                ) : (
                  <>
                    <div className="rounded-md bg-zinc-300 h-64 flex justify-center align-center max-h-[170px]">
                      <img src={result} alt="Generated Image" className="w-full" />
                    </div>
                    <button
                      className="text-sm text-center mt-2 font-medium underline"
                      onClick={() => handleGeneration()}
                    >
                      Generate with IA
                    </button>
                    <p className="text-xs text-center mt-1 font-regular">
                      It will be generated based on your event description
                    </p>
                  </>
                )}
              </div>
            </div>
          </form>
          <div className="flex w-[400px] mx-auto mt-6">
            <button className="btn btn-neutral mr-1 font-normal flex-1" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn btn-primary font-normal flex-1" onClick={handleCreateEvent}>
              Create Event
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

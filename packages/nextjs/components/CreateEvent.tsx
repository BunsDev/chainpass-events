/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { EventModel } from "~~/models/event.model";
import { useGlobalState } from "~~/services/store/store";

export const CreateEvent: React.FC = () => {
  const createEvent = useGlobalState(state => state.addEvent);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [availableTickets, setAvailableTickets] = useState<number | "">("");

  const [result, setResult] = useState("https://source.unsplash.com/random/400x400");
  const [loading, setLoading] = useState(false);

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

  const handleGeneration = async () => {
    setLoading(true);
    setResult("");

    try {
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
          console.log(data);
        })
        .catch(error => {
          console.error("Error generating image:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log({ result });

  return (
    <div className="">
      <button className="btn bg-green-500 text-lg" onClick={() => setShowModal(true)}>
        <Image src={"/plus.svg"} alt="plus-image" width={"30"} height={"30"} />
        Create Event
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center">
          <div className="bg-black rounded-3xl w-full max-w-xl p-8 flex flex-col relative border border-zinc-300 border-1">
            <button className="absolute top-4 right-4 text-sm text-zinc-400" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <h2 className="text-center text-3xl font-bold mb-8 opacity-100">Create New Event</h2>
            <form className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="text-zinc-400 text-sm uppercase font-semibold mb-1">Title</label>
                <input
                  type="text"
                  className="rounded-3xl min-h-8 px-4 text-sm border border-zinc-300 focus:ring-accent focus:border-accent"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-zinc-400 text-sm uppercase font-semibold mb-1">Available Tickets</label>
                <input
                  type="number"
                  className="rounded-3xl min-h-8 px-4 text-sm border border-zinc-300 focus:ring-accent focus:border-accent"
                  value={availableTickets}
                  onChange={e => setAvailableTickets(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-zinc-400 text-sm uppercase font-semibold mb-1">Description</label>
                <textarea
                  className="rounded-3xl px-4 py-2 text-sm border border-zinc-300 focus:ring-accent focus:border-accent"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-3xl font-semibold self-center"
                onClick={handleCreateEvent}
              >
                Create Event
              </button>
            </form>
            {loading ? (
              <div className="mt-8 text-center">Loading...</div>
            ) : (
              <div className="mt-8 flex flex-col space-y-4">
                <label className="text-zinc-400 text-sm uppercase font-semibold mb-1">Image</label>
                <div className="rounded-md border border-zinc-300 border-1 p-4 flex flex-col justify-center">
                  <div className="rounded-md bg-zinc-300 h-64 flex justify-center align-center">
                    {result.length ? (
                      <img src={result} alt="Generated Image" className="w-full" />
                    ) : (
                      <Image src={"/upload-image.svg"} alt="plus-image" width={"60"} height={"60"} />
                    )}
                  </div>
                  <button
                    className="bg-secondary text-white py-2 px-4 rounded-3xl font-semibold w-1/3 self-center mt-4"
                    onClick={() => handleGeneration()}
                  >
                    Generate with IA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

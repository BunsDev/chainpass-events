/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CirclePlus } from "lucide-react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [availableTickets, setAvailableTickets] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [timestamp, setTimestamp] = useState<number>(0);
  const modalRef = useRef<HTMLDialogElement>(null);

  const [result, setResult] = useState("https://source.unsplash.com/random/400x400");
  const [loading, setLoading] = useState(false);

  const { writeContractAsync: writeYourContractAsync, isSuccess } = useScaffoldWriteContract("Minter");

  const handleCreateEvent = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (title && description && availableTickets !== "" && timestamp != 0) {
      setLoading(true);
      try {
        // TO DO: pass to createEvent a tokenUri and imageUrl
        await writeYourContractAsync({
          functionName: "createEvent",
          args: [title, BigInt(timestamp), BigInt(availableTickets), description, "tokenUri", "imageUrl"],
        });
      } catch {
        notification.error("Something went bad!");
      } finally {
        if (isSuccess) {
          notification.success("Event Created!");
          setTitle("");
          setDescription("");
          setAvailableTickets("");
          setDate("");
          setTimestamp(0);
        }
        handleCancel();
      }
    }
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    const dateTimestamp = Date.parse(selectedDate);
    setTimestamp(dateTimestamp);
  };

  const handleCancel = () => {
    setLoading(false);
    modalRef.current?.close();
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
      <button className="btn btn-primary" onClick={() => modalRef.current?.showModal()}>
        Create Event
      </button>

      {/*         <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center">
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
        </div>  */}
      <dialog id="my_modal_2" className={"modal"} ref={modalRef}>
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
                  onChange={handleChangeDate}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 space-y-1">
              <label className="text-sm text-left font-light">Description</label>
              <textarea
                className="rounded-3xl min-h-[100px] px-4 text-sm border border-zinc-300 bg-white bg-opacity-10"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>
            {loading ? (
              <div className="mt-8 text-center">Loading...</div>
            ) : (
              <div className="flex flex-col flex-1 space-y-1">
                <label className="text-sm text-left font-light">Image</label>
                <div className="rounded-3xl border border-zinc-300 border-1 p-4 flex flex-col justify-center">
                  <div className="rounded-md bg-zinc-300 h-64 flex justify-center align-center max-h-[170px]">
                    {result.length ? (
                      <img src={result} alt="Generated Image" className="w-full" />
                    ) : (
                      <Image src={"/upload-image.svg"} alt="plus-image" width={"60"} height={"60"} />
                    )}
                  </div>
                  <button
                    className="text-sm text-center mt-2 font-medium underline"
                    /*          onClick={() => handleGeneration()} */
                  >
                    Generate with IA
                  </button>
                  <p className="text-xs text-center mt-1 font-regular">
                    It will be generated based on your event description
                  </p>
                </div>
              </div>
            )}
            <div>
              {loading ? (
                <div className="flex w-[400px] mx-auto mt-6">
                  {" "}
                  <button className="btn btn-neutral mr-1 font-normal flex-1 ">
                    <span className="loading loading-spinner"></span>
                  </button>
                  <button className="btn btn-primary font-normal flex-1">
                    <span className="loading loading-spinner"></span>
                  </button>{" "}
                </div>
              ) : (
                <div className="flex w-[400px] mx-auto mt-6">
                  {" "}
                  <button className="btn btn-neutral mr-1 font-normal flex-1 " onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="btn btn-primary font-normal flex-1" onClick={e => handleCreateEvent(e)}>
                    Create Event
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

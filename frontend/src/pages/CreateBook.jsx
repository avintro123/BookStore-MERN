import React, { useState } from "react";
import BackBtn from "../components/BackBtn";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("An error happened. Please check", {
          variant: "error",
        });
        alert("An error happened. Please check");
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackBtn />
      <h1 className="text-3xl my-4 bg-red-300 w-fit rounded-xl p-2 border-4 border-black font-semibold mb-4">
        Create Book
      </h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-4 border-violet-400 rounded-xl w-[600px] p-4 mx-auto ">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 borer-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-700 font-medium">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 borer-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-700 font-medium">
            Publish Year
          </label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 borer-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-300 m-8 rounded-xl border-2 border-amber-700"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  );
}

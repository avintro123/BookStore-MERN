import React, { useState } from "react";
import BackBtn from "../components/BackBtn";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("An error happened. Please check", {
          variant: "error",
        });
        // alert("An error happened. Please check");
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackBtn />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <div className="my-4">
          <h3 className="text-xl">
            Are you sure you want to delete this book?
          </h3>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-xl mr-4 mt-6"
            onClick={handleDeleteBook}
          >
            Yes
          </button>
          <button
            className="bg-sky-400 text-white px-4 py-2 rounded-xl mt-6"
            onClick={() => navigate("/")}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Slider from "../Components/Slider";
import Loading from "../Components/Loading";
import RatingStars from "../Components/RatingStars";
import moment from "moment";
import url from "../Constants";

export default function WorkerDetails() {
  const { workerId } = useParams();
  const [workerData, setWorkerData] = useState({});
  console.log("Worker Data", workerData);
  const fetchWorker = async () => {
    const { data } = await Axios.get(`${url}/worker/getWorkers/${workerId}`);
    setWorkerData(data);
  };
  useEffect(() => {
    fetchWorker();
  }, []);
  return workerData.user ? (
    <div className="p-8 lg:p-12">
      <div className="grid grid-cols-2 gap-12  items-center">
        <Slider images={workerData.images} />
        <div className="">
          <div className="flex items-center space-x-1 md:-mt-8">
            <img
              className="h-12 w-12 rounded-full"
              src={workerData.user.profileImage}
            />
            <p className="text-3xl font-light">{workerData.user.name}</p>
          </div>
          <p className="font-semibold my-4">{`Rs: ${workerData.price}/hour`}</p>
          <div className="flex items-center space-x-2">
            <RatingStars rating={workerData.rating} />
            <span className="text-sm text-gray-400">({workerData.rating})</span>
          </div>
          <p className="text-medium italic my-4">{workerData.description}</p>
          <p className="text-lg font-semibold mt-4">Categories: </p>
          <div className="flex flex-wrap space-x-4 my-2">
            {workerData.category.map(item => (
              <p className="shadow-md font-medium border border-gray-200 py-2 px-4 cursor-pointer rounded-lg">
                {item}
              </p>
            ))}
          </div>
          <div className="flex items-center space-x-6 my-8">
            <div className="bg-violet-500 text-white p-2 px-4 rounded-md font-semibold">
              Hire Now
            </div>
            <div className="bg-violet-500 text-white p-2 px-4 rounded-md font-semibold">
              Chat
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8 my-8">
        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col text-center">
          <p className="text-2xl font-medium">Total Projects</p>
          <p className="text-xl ">0</p>
        </div>
        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col text-center">
          <p className="text-2xl font-medium">Completed Projects</p>
          <p className="text-xl ">{workerData.projectsCompleted}</p>
        </div>
        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col text-center">
          <p className="text-2xl font-medium">Cancel Projects</p>
          <p className="text-xl ">{workerData.projectCancelled}</p>
        </div>
        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col text-center">
          <p className="text-2xl font-medium">Joined</p>
          <p className="text-xl ">{moment(workerData.createdAt).fromNow()}</p>
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold my-4 mt-12">Feedbacks</p>
        <div className="py-2 pl-8">
          {workerData.feedback.map(item => (
            <div className="flex items-center space-x-2 mb-4">
              <img
                className="w-10 h-10 rounded-full"
                src={item.user.profileImage}
              />
              <p>{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

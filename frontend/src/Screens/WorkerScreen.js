import Axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  WORKER_FETCH_FAILURE,
  WORKER_FETCH_REQUEST,
  WORKER_FETCH_SUCCESS,
} from "../Redux/Constants";
import Loading from "../Components/Loading";
import ErrorBox from "../Components/ErrorBox";
import WorkerCard from "../Components/WorkerCard";
import Select from "react-select";
import { FiFilter } from "react-icons/fi";
import Filter from "../Components/Filter";
import WorkerFilter from "../Components/WorkerFilter";
import url from "../Constants";

function WorkerScreen({ worker, fetchWorkers, filterWorkers }) {
  const data = [
    { value: "Plumber", label: "Plumber" },
    { value: "Electrician", label: "Electrician" },
    { value: "Carpenter", label: "Carpenter" },
  ];

  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState("");
  const [value, setValue] = useState({ min: 1, max: 5000 });

  useEffect(() => {
    fetchWorkers();
  }, []);

  const onCategoryChange = e => {
    const newCategories = e.map(item => item.value);
    setCategories(newCategories);
    const filterData = { ...value, categories: newCategories, city };
    filterWorkers(filterData);
  };

  console.log(categories);

  const customStyles = {
    container: provided => ({
      ...provided,
      flex: 1,
    }),
    control: provided => ({
      ...provided,
      padding: "6px",
    }),
  };

  console.log("Worker", worker);
  if (worker.error) {
    <ErrorBox variant="fail" message={worker.error} />;
  } else if (worker.loading) {
    <Loading />;
  } else {
    return (
      <div className="p-8 min-h-[calc(100vh-100px)]">
        <div className="flex space-x-8 mb-8">
          <Select
            styles={customStyles}
            name="Choose Worker Category"
            options={data}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Please Select the categories"
            onChange={onCategoryChange}
            isMulti={true}
          />
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="flex cursor-pointer space-x-2 items-center border-2 border-gray-400 p-[6px] px-3 rounded-md"
          >
            <p className="text-xl font-medium text-gray-600">Filter</p>
            <FiFilter size={24} />
          </div>
        </div>
        <WorkerFilter
          categories={categories}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          city={city}
          setCity={setCity}
          value={value}
          setValue={setValue}
        />
        {worker.data.length > 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-8 ">
            {worker?.data?.map(item => (
              <WorkerCard worker={item} />
            ))}
          </div>
        ) : (
          <div className="flex -mt-12 h-full items-center justify-center">
            <p className="text-red-400 text-xl font-semibold">
              No Worker Present
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    worker: state.worker,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWorkers: async () => {
      console.log("Running");
      dispatch({ type: WORKER_FETCH_REQUEST });
      try {
        const { data } = await Axios.get(`${url}/worker/getWorkers`);
        console.log("Workers Data --", data);
        dispatch({ type: WORKER_FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: WORKER_FETCH_FAILURE, payload: err.message });
      }
    },
    filterWorkers: async filterData => {
      try {
        const { data } = await Axios.post(
          `${url}/worker/filterWorkers`,
          filterData
        );
        console.log("Workers Data --", data);
        dispatch({ type: WORKER_FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: WORKER_FETCH_FAILURE, payload: err.message });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkerScreen);

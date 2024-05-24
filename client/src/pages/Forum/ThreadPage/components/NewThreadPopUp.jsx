import axios, { formToJSON } from "axios";
import FormData from "form-data";
import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { RiCloseLargeLine } from "react-icons/ri";
import Slider from "react-slick";
import DropZoneFile from "./DropZoneFile";
import PopupEditor from "./PopupEditor/PopupEditor";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
export default function NewThreadPopUp({ isOpen, setIsOpen }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState([]);
  const [addedTopics, setAddedTopics] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [defaultTopics, setDefaultTopics] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const errorTexts = [
    "atleast 5 and maxium 20 characters",
    "title is already existed!",
  ];

  const prop = {};

  const navigate = useNavigate();

	useEffect(() => {
		axios.get("/api/v1/topics").then((res) => {
			const topics = res.data.map((topic) => {
				return topic.title;
			});
			setDefaultTopics([...topics]);
		});
	}, []);

	useEffect(() => {
		const chooseTopic = document.querySelector("#choose-topic-warning");
		if (addedTopics.length > 0) {
			chooseTopic.classList.add("d-none");
		}
	}, [addedTopics]);

  async function handleData() {
    try {
      //clear text, clear file, clear input
      const threadTitleInput = document.querySelector(".thread-title");
      const chooseTopic = document.querySelector("#choose-topic-warning");
      if (addedTopics.length === 0) {
        chooseTopic.classList.remove("d-none");
      } else if (
        threadTitleInput.value.length >= 5 &&
        threadTitleInput.value.length <= 50
      ) {
        setFile(null);
        setIsNext(false);
        setIsOpen(false);
        setAddedTopics([]);
        setDescription([]);

        const formData = new FormData();
        formData.append("title", threadTitleInput.value);
        if (file) {
          formData.append("uploadFile", file[0]);
        } else {
          formData.append("uploadFile", null);
        }
        formData.append("content", JSON.stringify(description));
        for (let i = 0; i < addedTopics.length; ++i) {
          formData.append("topics[]", addedTopics[i]);
        }

        const res = await axios.post(
          "/api/v1/threads",
          formData,
          {
            headers: {
            //   Authorization: `Bearer ${
            //     JSON.parse(localStorage.getItem("user")).token
            //   }`,
            },
          }
        );
        navigate(`/forum/threads/${res.data}`);
      }
    } catch (e) {
      console.error(e.message);
    }
  }

	var settings = {
		dots: false,
		infinite: false,
		speed: 200,
		touchMove: false,
		accessibility: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: (
			<NextArrow
				inputTitleLength={inputTitle.length}
				handleData={handleData}
				isNext={isNext}
				setIsNext={setIsNext}
				isDisable={isDisable}
			/>
		),
		prevArrow: <PrevArrow isNext={isNext} setIsNext={setIsNext} />,
	};

  {
    /*-----------------------------------------------------------MAIN---------------------------------------------------------*/
  }
  if (!isOpen) return null;
  return ReactDom.createPortal(
    <section tabIndex="0" className="modal-wrapper">
      <section
        id="post-modal"
        className="bg-primary-green-900 w-75 p-2 d-flex flex-column align-items-end position-relative"
      >

          {/*-----------Close Button ----------------------------*/}
        <button
          className="bg-transparent border-0 text-white position-absolute z-3"
          style={{right:"10px", top:"10px"}}
          onClick={() => {
            setFile(null);
            setIsNext(false);
            setIsOpen(false);
            setAddedTopics([]);
            setDescription([]);
            setIsDisable(true);
          }}
        >
          <RiCloseLargeLine />
        </button>
        <Slider tabIndex="0" className="w-100" {...settings}>

          <FirstSlide
            file={file}
            setFile={setFile}
            setDescription={setDescription}
            setIsDisable={setIsDisable}
            inputTitle={inputTitle}
            setInputTitle={setInputTitle}
            errorTexts={errorTexts}
            isOpen={isOpen}
          />
          <SecondSlide
            addedTopics={addedTopics}
            setAddedTopics={setAddedTopics}
            defaultTopics={defaultTopics}
          />
        </Slider>
      </section>
    </section>,
    document.querySelector("body")
  );
}
function FirstSlide({
  file,
  setFile,
  setDescription,
  setIsDisable,
  inputTitle,
  setInputTitle,
  errorTexts,
  isOpen,
}) {
  async function displayError(setIsDisable) {
    try {
      const inputThreadTitle = document.querySelector("#inputThreadTitle");
      if (inputTitle.length < 5 || inputTitle.length > 20) {
        inputThreadTitle.classList.remove("d-none");
        inputThreadTitle.innerHTML = errorTexts[0];
        setIsDisable(true);
      } else {
        await axios
          .post(
            "/api/v1/threads/validation",
            { title: inputTitle },
            {
              headers: {
                // Authorization: `Bearer ${
                //   JSON.parse(localStorage.getItem("user")).token
                // }`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
          });
        setIsDisable(false);
      }
    } catch (error) {
      if (error.response.status === 403) {
        const inputThreadTitle = document.querySelector("#inputThreadTitle");
        inputThreadTitle.classList.remove("d-none");
        inputThreadTitle.innerHTML = errorTexts[1];
        setIsDisable(true);
      }
      console.error(error.status);
    }
  }

  function removeError() {
    const inputThreadTitle = document.querySelector("#inputThreadTitle");
    inputThreadTitle.classList.add("d-none");
  }

  return (
    <div tabIndex="0">
      {/*---------------- Create Thread header----------------------*/}
      <div className="w-100 d-flex justify-content-between">
        <h2 className="text-white">Create Thread</h2>
      </div>
      {/*---------------- Upload File ---------------------------------------------*/}
      <DropZoneFile setFile={setFile} file={file} isReset={!isOpen} />
      {/*---------------- Thread Input TItle ---------------------------------------------*/}
      <div className="w-100 d-flex mt-3 position-relative">
        <label className="text-white d-flex align-items-center me-1 ">
          <h4>
            Title<span className="text-danger">*</span>
          </h4>
        </label>
        <input
          className="thread-title w-100 rounded-3 bg-transparent  py-2 text-white border-solid border border-white shadow-none"
          type="text"
          name="title"
          minLength={5}
          maxLength={20}
          aria-label="input thread title"
          onFocus={removeError}
          onChange={(e) => {
            setInputTitle(e.target.value);
          }}
          onBlur={() => {
            displayError(setIsDisable);
          }}
        />
        <div
          className="text-white position-absolute"
          style={{ right: "10px", top: "10px" }}
        >
          {inputTitle.length}/20
        </div>
      </div>
      {/*------------------Errow Dispaly, don't display by default--------------*/}
      <p
        className="w-100 text-end text-danger d-none"
        id="inputThreadTitle"
      ></p>
      ``
      <PopupEditor
        componentType="post"
        setDescription={setDescription}
        isReset={!isOpen}
      />
    </div>
  );
}

function SecondSlide({
  addedTopics,
  setAddedTopics,
  defaultTopics,
}) {
  return (
    <div>
      <div className="w-100 d-flex justify-content-between">
        <h2 className="text-white">Add topic</h2>
      </div>
      <p className="text-secondary">
        Add atleast 1 and maximum 3 topics to help people find your thread
      </p>
      <div
        className="border-bottom border-secondary"
        style={{ height: "100px" }}
      >
        <div className="text-danger d-none" id="choose-topic-warning">
          * Add atleast 1 topic
        </div>
        <div className="w-100  d-flex flex-wrap gap-1 gap-col-1">
          {/*Added topics*/}
          {addedTopics.map((addedTopic) => {
            return (
              <RemovedButton
                topicName={addedTopic}
                addedTopics={addedTopics}
                setAddedTopics={setAddedTopics}
              />
            );
          })}
        </div>
      </div>

      <div className="w-100 mt-3 d-flex gap-1 flex-wrap">
        {/*Default topics*/}
        {defaultTopics.map((defaultTopic) => {
          return (
            <AddedButton
              topicName={defaultTopic}
              addedTopics={addedTopics}
              setAddedTopics={setAddedTopics}
            />
          );
        })}
      </div>
    </div>
  );
}

function AddedButton({ topicName, addedTopics, setAddedTopics }) {
	function handleAddBtn(topic) {
		setAddedTopics([...addedTopics, topic]);
	}
	function handleRemoveBtn(topic) {
		const copyTopics = [...addedTopics];
		copyTopics.splice([...copyTopics].indexOf(topic), 1);
		setAddedTopics([...copyTopics]);
	}
	return (
		<button
			className="m-1 py-1 px-2 btn border border-none text-white d-flex align-items-center  gap-2"
			style={{ borderRadius: "30px" }}
			onClick={
				addedTopics.includes(topicName)
					? () => {
							handleRemoveBtn(topicName);
						}
					: () => {
							handleAddBtn(topicName);
						}
			}
			value={topicName}
		>
			<p className="m-0">{topicName}</p>
			{addedTopics.includes(topicName) ? <p className="m-0">-</p> : null}
		</button>
	);
}

function RemovedButton({ topicName, addedTopics, setAddedTopics }) {
	function handleRemoveBtn(topic) {
		const copyTopics = [...addedTopics];
		console.log("copy topic in remove button:" + copyTopics);
		copyTopics.splice([...copyTopics].indexOf(topic), 1);
		setAddedTopics([...copyTopics]);
	}
	return (
		<button
			className="m-1 py-1 px-2 btn btn-primary-green-300 text-dark border border-none d-flex align-items-center  gap-2"
			style={{ borderRadius: "30px" }}
			onClick={() => {
				handleRemoveBtn(topicName);
			}}
			value={topicName}
		>
			<p className="m-0">{topicName}</p>
			<p className="m-0">-</p>
		</button>
	);
}
function NextArrow(props) {
	const { onClick, isNext, setIsNext, handleData, isDisable } = props;
	return (
		<div onClick={onClick}>
			<button
				disabled={isDisable}
				className="m-1 py-1 px-4 btn btn-primary-yellow-600 text-primary-green-900 border-none position-absolute"
				style={{ bottom: "-50px", left: "100px" }}
				onClick={
					isNext
						? handleData
						: () => {
								setIsNext(true);
							}
				}
			>
				{isNext ? "Submit" : "Next"}
			</button>
		</div>
	);
}

function PrevArrow(props) {
	const { onClick, isNext, setIsNext } = props;
	return (
		<div onClick={onClick}>
			<button
				disabled={!isNext}
				className="m-1 py-1 px-4 btn btn-primary-yellow-600 text-primary-green-900 text-dark  border-none position-absolute"
				style={{ bottom: "-50px", left: "0" }}
				onClick={() => {
					setIsNext(false);
				}}
			>
				Left
			</button>
		</div>
	);
}

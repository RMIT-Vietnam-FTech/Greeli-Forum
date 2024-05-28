import axios, { formToJSON } from "axios";
import FormData from "form-data";
import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { RiCloseLargeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import DropZoneFile from "./DropZoneFile";
import PopupEditor from "./PopupEditor/PopupEditor";
axios.defaults.withCredentials = true;
import { IoEllipseSharp } from "react-icons/io5";

export default function NewThreadPopUp({ isOpen, setIsOpen, belongToThread }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState([]);
  const [plainTextDescription, setPlainTextDescription] = useState();
  const [addedTopics, setAddedTopics] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [defaultTopics, setDefaultTopics] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const errorTexts = [
    "atleast 5 and maxium 50 characters",
    "title is already existed!",
  ];
  const errorTopic = ["* Add at least 1 topic", "Add maximum 3 topics only"];
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/topics").then((res) => {
      const topics = res.data.map((topic) => {
        return {
          title: topic.title,
          _id: topic._id,
        };
      });
      setDefaultTopics([...topics]);
    });
  }, []);

  useEffect(() => {
    const chooseTopic = document.querySelector("#choose-topic-warning");
    if (addedTopics.length > 0) {
      chooseTopic.classList.add("d-none");
    }
    console.log(`check addded Topic: ${JSON.stringify(addedTopics)}`);
  }, [addedTopics]);

  async function handleData() {
    try {
      //clear text, clear file, clear input
      const threadTitleInput = document.querySelector(".thread-title");
      const chooseTopic = document.querySelector("#choose-topic-warning");
      if (addedTopics.length <= 0) {
        chooseTopic.classList.remove("d-none");
        chooseTopic.innerText = errorTopic[0];
      } else if (addedTopics.length > 3) {
        chooseTopic.classList.remove("d-none");
        chooseTopic.innerText = errorTopic[1];
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
        formData.append("plainTextContent", plainTextDescription);
        formData.append("belongToThread", belongToThread);
        for (let i = 0; i < addedTopics.length; ++i) {
          formData.append("belongToTopics[]", addedTopics[i]._id);
        }
        for (let [key, value] of formData) {
          console.log(`${key}: ${value}`)
        }
        
        const res = await axios.post(
          "http://localhost:3001/api/v1/posts",
          formData,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        );
        navigate(`/forum/communities/${belongToThread}/posts/${res.data}`);
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
        style={{ backgroundColor: "white" }}
        id="post-modal"
        className="shadow-lg p-3 d-flex flex-column  align-items-end "
      >
        {/*-----------Close Button ----------------------------*/}
        <button
          className="bg-transparent border-0 text-dark position-absolute z-3"
          style={{}}
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
            setPlainTextDescription={setPlainTextDescription}
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
  setPlainTextDescription,
  setIsDisable,
  inputTitle,
  setInputTitle,
  errorTexts,
  isOpen,
}) {
  async function displayError(setIsDisable) {
    try {
      const inputThreadTitle = document.querySelector("#inputThreadTitle");
      if (inputTitle.length < 5 || inputTitle.length > 50) {
        inputThreadTitle.classList.remove("d-none");
        inputThreadTitle.innerHTML = errorTexts[0];
        setIsDisable(true);
      } else {
        setIsDisable(false);
      }
    } catch (error) {
      console.error(error.status);
    }
  }

	function removeError() {
		const inputThreadTitle = document.querySelector("#inputThreadTitle");
		inputThreadTitle.classList.add("d-none");
	}

  return (
    <div style={{height:"550px"}} className=" overflow-scroll-y" tabIndex="0">
      {/*---------------- Create Thread header----------------------*/}
      <div className="w-100 d-flex justify-content-between">
        <h2 className="text-dark">Create Thread</h2>
      </div>
      {/*---------------- Upload File ---------------------------------------------*/}
      <div style={{height:"300px"}}>
      <DropZoneFile setFile={setFile} file={file} isReset={!isOpen} />
      </div>
      {/*---------------- Thread Input TItle ---------------------------------------------*/}
      <div className="w-100 d-flex mt-3 position-relative">
        <label className="text-dark d-flex align-items-center me-1 ">
          <h4>
            Title<span className="text-danger">*</span>
          </h4>
        </label>
        <input
          className="thread-title w-100 rounded-3 bg-transparent  py-2 text-dark border-solid border border-dark shadow-none"
          type="text"
          name="title"
          minLength={5}
          maxLength={50}
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
          className="text-dark position-absolute"
          style={{ right: "10px", top: "10px" }}
        >
          {inputTitle.length}/50
        </div>
      </div>
      {/*------------------Errow Dispaly, don't display by default--------------*/}
      <p
        className="w-100 text-end text-danger d-none"
        id="inputThreadTitle"
      ></p>
      <PopupEditor
        componentType="post"
        setDescription={setDescription}
        setPlainTextDescription={setPlainTextDescription}
        isReset={!isOpen}
      />
    </div>
  );
}

function SecondSlide({ addedTopics, setAddedTopics, defaultTopics }) {
  return (
    <div >
      <div className="w-100 d-flex justify-content-between">
        <h2 className="text-dark ">Add topic</h2>
      </div>
      <p className="text-secondary">
        Add atleast 1 and maximum 3 topics to help people find your thread
      </p>
      <div
        className="border-bottom border-secondary"
        style={{ height: "100px" }}
      >
        <div className="text-danger d-none" id="choose-topic-warning"></div>
        <div className="w-100  d-flex flex-wrap gap-1 gap-col-1">
          {/*Added topics*/}
          {addedTopics.map((addedTopic) => {
            return (
              <RemovedButton
                topicName={addedTopic.title}
                topicId={addedTopic._id}
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
              topicName={defaultTopic.title}
              topicId={defaultTopic._id}
              addedTopics={addedTopics}
              setAddedTopics={setAddedTopics}
            />
          );
        })}
      </div>
    </div>
  );
}

function AddedButton({ topicName, topicId, addedTopics, setAddedTopics }) {
  function handleAddBtn(topicObject) {
    const topicIndex = addedTopics.findIndex((topic) => topic.title === topicName);
    if (topicIndex < 0) {
      setAddedTopics([...addedTopics, topicObject]);
    }
  }
  function handleRemoveBtn(topicName) {
    const copyTopics = [...addedTopics];
    copyTopics.splice(
      [...copyTopics].findIndex((topic) => topic.title === topicName),
      1
    );
    setAddedTopics([...copyTopics]);
  }
  return (
    <button
      className="m-1 py-1 px-2 btn border border-primary-green-900 text-primary-green-900 d-flex align-items-center  gap-2"
      style={{ borderRadius: "20px" }}
      onClick={
        addedTopics.includes(topicName)
          ? () => {
              handleRemoveBtn(topicName);
            }
          : () => {
              handleAddBtn({ title: topicName, _id: topicId });
            }
      }
    >
      <p className="m-0">{topicName}</p>
      {!addedTopics.findIndex((topic) => topic.title === topicName) ? (
        <p className="m-0">-</p>
      ) : null}
    </button>
  );
}

function RemovedButton({ topicName, topicId, addedTopics, setAddedTopics }) {
  function handleRemoveBtn(topicName) {
    const copyTopics = [...addedTopics];
    copyTopics.splice(
      [...copyTopics].findIndex((topic) => topic.title === topicName),
      1
    );
    setAddedTopics([...copyTopics]);
  }
  return (
    <button
      className="m-1 py-1 px-2 btn btn-primary-green-300 text-dark border border-none d-flex align-items-center  gap-2"
      style={{ borderRadius: "30px" }}
      onClick={() => {
        handleRemoveBtn(topicName);
      }}
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

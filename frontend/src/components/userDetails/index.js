import { useEffect, useState } from "react";
import Bio from "./Bio";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import EditDetails from "./EditDetails";

export default function UserDetails({ detailss, visitor, setOthername }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [details, setDetails] = useState();
  const [visible, setVisible] = useState(false);

  // populates details and infos whenever detailss change
  useEffect(() => {
    setDetails(detailss);
    setInfos(detailss);
  }, [detailss]);
  // all fields are blanck by default
  const initial = {
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    instagram: details?.instagram ? details.instagram : "",
  };
  const [infos, setInfos] = useState(initial);
  const [showBio, setShowBio] = useState(false);
  // max length of Bio is 200 characters
  const [max, setMax] = useState(infos?.bio ? 200 - infos?.bio.length : 200);
  // update and store details in the backend
  const updateDetails = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        {
          infos,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
      setOthername(data.otherName);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  // fetches input and shown number of characters remaining for bio
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(200 - e.target.value.length);
  };

  return (
    <div className="user_card">
      <div className="user_card_header">Profile</div>
      {details?.bio && !showBio && (
        <div className="details_column">
          {/* display user bio */}
          <span>{details?.bio}</span>
          {/* if not a visitor, show edit bio button */}
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {/* if the user is not a visitor and there is no bio, add bio button is displayed */}
      {!details?.bio && !showBio && !visitor && (
        <button
          className="gray_btn hover1 btn_width"
          onClick={() => setShowBio(true)}
        >
          Add Bio
        </button>
      )}
      {/* add bio input field */}
      {showBio && (
        <Bio
          infos={infos}
          max={max}
          handleChange={handleChange}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
          placeholder="Add Bio"
          name="bio"
        />
      )}
      {/* displaying all available details */}
      {details?.job && details?.workplace ? (
        <div className="edit_info">
          <img src="../../../icons/job.png" alt="" />
          works as {details?.job} at <b>{details?.workplace}</b>
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="edit_info">
          <img src="../../../icons/job.png" alt="" />
          works as {details?.job}
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className="edit_info">
            <img src="../../../icons/job.png" alt="" />
            works at {details?.workplace}
          </div>
        )
      )}
      {details?.college && (
        <div className="edit_info">
          <img src="../../../icons/studies.png" alt="" />
          studied at {details?.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="edit_info">
          <img src="../../../icons/studies.png" alt="" />
          studied at {details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="edit_info">
          <img src="../../../icons/home.png" alt="" />
          Lives in {details?.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className="edit_info">
          <img src="../../../icons/home.png" alt="" />
          From {details?.hometown}
        </div>
      )}
      {details?.hometown && (
        <div className="edit_info">
          <img src="../../../icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${details?.instagram}`}
            target="_blank"
          >
            {details?.instagram}
          </a>
        </div>
      )}
      {/* edit button, if the user is not a visitor */}
      {!visitor && (
        <button
          className="gray_btn hover1 btn_width"
          onClick={() => setVisible(true)}
        >
          Edit Details
        </button>
      )}
      {/* edit/add details popup */}
      {visible && !visitor && (
        <EditDetails
          details={details}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          setVisible={setVisible}
        />
      )}
    </div>
  );
}

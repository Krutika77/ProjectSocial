import { useRef } from "react";
import Detail from "./Detail";
import useOnCLickOutside from "../../helpers/clickOutside";
export default function EditDetails({
  details,
  handleChange,
  updateDetails,
  infos,
  setVisible,
}) {
  const detailsRef = useRef(null);
  // hides the edit details popup when clicked outside
  useOnCLickOutside(detailsRef, () => setVisible(false));
  return (
    // hides the edit details popup when clicked outside
    <div className="blur">
      <div className="post_box infos_box" ref={detailsRef}>
        <div className="post_box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className="edit_details_wrap scrollbar">
          <div className="edit_details_column">
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>
          <div className="edit_details_header">Other Name</div>
          <Detail
            value={details?.otherName}
            img="studies"
            placeholder="Add other name"
            name="otherName"
            text="other Name"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className="edit_details_header">Work</div>
          <Detail
            value={details?.job}
            img="job"
            placeholder="Add job title"
            name="job"
            text="a job"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <Detail
            value={details?.workplace}
            img="job"
            placeholder="Add a workplace"
            name="workplace"
            text="workplace"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className="edit_details_header">Education</div>
          <Detail
            value={details?.highSchool}
            img="studies"
            placeholder="Add a high school"
            name="highSchool"
            text="a high school"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <Detail
            value={details?.college}
            img="studies"
            placeholder="Add a college"
            name="college"
            text="college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className="edit_details_header">Current City</div>
          <Detail
            value={details?.currentCity}
            img="home"
            placeholder="Add a current city"
            name="currentCity"
            text="a current city"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className="edit_details_header">Hometown</div>
          <Detail
            value={details?.hometown}
            img="home"
            placeholder="Add hometown"
            name="hometown"
            text="hometown"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className="edit_details_header">Instagram</div>
          <Detail
            value={details?.instagram}
            img="home"
            placeholder="Add instagram"
            name="instagram"
            text="instagram"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
        </div>
      </div>
    </div>
  );
}

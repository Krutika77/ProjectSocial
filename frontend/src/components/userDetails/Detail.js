import { useState } from "react";
import Bio from "./Bio";

export default function Detail({
  img,
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  text,
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="add_detail " onClick={() => setShow(true)}>
        {value ? (
          // if the field had a previous value, edit info
          <div className="edit_info ">
            <img src={`../../../icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          // else add info
          <>
            <i className="rounded_plus_icon"></i>
            <span className="underline">Add {text}</span>
          </>
        )}
      </div>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          detail
          setShow={setShow}
        />
      )}
    </div>
  );
}

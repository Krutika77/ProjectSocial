export default function Bio({
  infos,
  handleChange,
  max,
  setShowBio,
  updateDetails,
  placeholder,
  name,
  detail,
  setShow,
}) {
  return (
    <div className="edit_bio_wrapper">
      {/* input bio field */}
      <textarea
        placeholder={placeholder}
        name={name}
        value={infos?.[name]}
        maxLength={detail ? 25 : 100}
        className="textarea_green form_input_details"
        onChange={handleChange}
      ></textarea>
      {/* remaining characters out of the 200 characters limit */}
      {!detail && <div className="char_left">{max} characters remaining</div>}
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon"></i>Public
        </div>
        <div className="flex">
          <button
            className="gray_btn"
            onClick={() => (!detail ? setShowBio(false) : setShow(false))}
          >
            Cancel
          </button>
          {/* saves and updates the bio */}
          <button
            className="green_btn"
            onClick={() => {
              updateDetails();
              setShow(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

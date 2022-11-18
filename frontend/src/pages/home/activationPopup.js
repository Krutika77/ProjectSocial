import PropagateLoader from "react-spinners/PropagateLoader";
export default function ActivationPopup({ type, header, text, loading }) {
  return (
    // popup text to show weather account was successfully activated or not
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${
            type === "success" ? "success_text" : "error_text"
          }`}
        >
          {header}
        </div>
        <div className="popup_message">{text}</div>
        <PropagateLoader color="#51ae84" size={20} loading={loading} />
      </div>
    </div>
  );
}

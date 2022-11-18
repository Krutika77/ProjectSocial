export default function Support({ setVisible }) {
  return (
    // help, report and feedback
    // all three options open the cliend side email application where user can send an email to Social's admin
    <div className="menu_wrap">
      <div className="menu_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Help & Support
      </div>
      <div>
        <a href="mailto:socialwelfare.seva@gmail.com">
          <div className="settings_menu_options hover3">
            <div className="small_circle">
              <i className="help_center_icon"></i>
            </div>
            <span>Need Help?</span>
          </div>
        </a>
      </div>
      <div>
        <a href="mailto:socialwelfare.seva@gmail.com">
          <div className="settings_menu_options hover3">
            <div className="small_circle">
              <i className="email_icon"></i>
            </div>
            <span>Feedback</span>
          </div>
        </a>
      </div>
      <div>
        <a href="mailto:socialwelfare.seva@gmail.com">
          <div className="settings_menu_options hover3">
            <div className="small_circle">
              <i className="info_filled_icon"></i>
            </div>
            <span>Report an Issue</span>
          </div>
        </a>
      </div>
    </div>
  );
}

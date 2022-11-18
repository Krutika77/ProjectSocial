export default function InfoMenuItem({ name, description, icon, to }) {
  return (
    // extracting list details from data/infoMenu.js and passing onto header/InfoMenu for mapping
    <div>
      <a href={to} target="_blank">
        <div className="info_menu_item hover1">
          <img src={`../../left/${icon}.png`} alt="" />
          <div className="info_menu_col">
            <span>{name}</span>
            <span>{description}</span>
          </div>
        </div>
      </a>
    </div>
  );
}

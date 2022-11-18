import { Link } from "react-router-dom";
import { menu } from "../../data/infoMenu";
import InfoMenuItem from "./InfoMenuItem";

export default function InfoMenu() {
  return (
    <div className="info_menu">
      <div className="info_menu_header">Menu</div>
      <div className="info_menu_wrap scrollbar">
        <div>
          <div className="info_menu_group">
            <div className="info_menu_group_header">Social</div>
            {/* find friends links to the friends page */}
            <Link to="/friends" className="left_link hover1">
              <img src={`../../left/friends.png`} alt="" />
              <span>Find Friends</span>
            </Link>
          </div>
          {/* maping list through InfoMenuItem */}
          <div className="info_menu_group">
            {/* Social Pay */}
            <div className="info_menu_group_header">Support Us</div>
            {menu.slice(0, 1).map((item, i) => (
              <InfoMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                to={item.to}
                key={i}
              />
            ))}
          </div>
          <div className="info_menu_group">
            {/* Saved posts */}
            <div className="info_menu_group_header">Personal</div>
            {menu.slice(1, 2).map((item, i) => (
              <InfoMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                to={item.to}
                key={i}
              />
            ))}
          </div>
          <div className="info_menu_group">
            {/* climate change, animal welfate, covid-19 info, community help and fundraisers */}
            <div className="info_menu_group_header">Community Resources</div>
            {menu.slice(2, 7).map((item, i) => (
              <InfoMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                to={item.to}
                key={i}
              />
            ))}
          </div>
          <div className="info_menu_group">
            {/* Weather */}
            <div className="info_menu_group_header">Around You</div>
            {menu.slice(7, 8).map((item, i) => (
              <InfoMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                to={item.to}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

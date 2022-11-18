export default function LeftList({ to, img, text }) {
  return (
    // renders list fetched from data/home
    <div>
      <a href={to} target="_blank">
        <div className="home_left_list hover1">
          <img src={`../../../left/${img}.png`} alt="" />
          <span>{text}</span>
        </div>
      </a>
    </div>
  );
}

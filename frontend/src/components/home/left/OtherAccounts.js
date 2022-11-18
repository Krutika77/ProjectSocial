export default function OtherAccounts({ link, img, name }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="accounts_item">
      <img src={img} alt="" />
      <span>{name}</span>
    </a>
  );
}

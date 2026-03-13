function Card(props)
{
  return (
    <div className="card">
        <div className="card-front"> ?</div>
      <div className="card-back">{props.card}</div>
    </div>
  );
}

export default Card;
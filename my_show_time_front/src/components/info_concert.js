import Content from "./home_content";

const Card = () => {
    <Content />
    return (
    <div>
      <h1>List of concerts :</h1>
      <div>
        {
        dataConcerts &&
        dataConcerts.map((item, i) => (
          <a key={ item._id }>
            <Link
              href={{
                pathname: '/unit_concert',
                query: { id: item._id },
              }}
            >
              <h2 className = "home-link">{ item.name } &rarr;</h2>
            </Link>
            <h3>{item.artist_name}</h3>
            <img src={item.concert_img} width={250} height={200}/>
            <p>Location: {item.location}</p>
            <h3>Price: {item.price}€</h3>
          </a>
        ))
        }
     </div>
    </div>
    );
};


export default Card;

import "./Home.css";

const categories = [
  {
    title: "Men's Wear",
    subtitle: "Jackets, hoodies & sweaters",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Women's Wear",
    subtitle: "Coats, cardigans & knitwear",
    image:
      "https://images.unsplash.com/photo-1548624149-f3221cdb98db?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Winter Shoes",
    subtitle: "Boots for every adventure",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Accessories",
    subtitle: "Scarves, gloves & more",
    image:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=85",
  },
];

const products = [
  {
    name: "Classic Winter Jacket",
    category: "Men's Collection",
    price: "Rs. 4,500",
    image:
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Cozy Winter Outfit",
    category: "Women's Collection",
    price: "Rs. 3,800",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Everyday Sneakers",
    category: "Winter Footwear",
    price: "Rs. 3,200",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  },
];

function Home() {
  return (
    <main className="winter-store">
      <section className="winter-hero">
        <div className="hero-content">
          <span className="hero-label">
            ✳ WINTER COLLECTION 2026
          </span>

          <h1>
            Stay Warm,
            <br />
            <span>Look Amazing.</span>
          </h1>

          <p>
            Discover winter clothes and shoes made for
            comfort, warmth and effortless style.
          </p>

          <div className="hero-buttons">
            <a className="shop-button" href="#products">
              Shop Now <span>↗</span>
            </a>

            <a className="outline-button" href="#categories">
              Explore Collection
            </a>
          </div>

          <div className="hero-benefits">
            <div>
              <span>♧</span>
              <p>
                <strong>Quality First</strong>
                <small>Everyday comfort</small>
              </p>
            </div>

            <div>
              <span>◇</span>
              <p>
                <strong>Secure Shopping</strong>
                <small>Shop with confidence</small>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section" id="categories">
        <div className="section-heading">
          <span>FIND YOUR STYLE</span>
          <h2>Shop by Category</h2>
          <p>Your winter essentials, all in one place.</p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <a
              href="#products"
              className="category-card"
              key={category.title}
            >
              <img src={category.image} alt={category.title} />
              <div className="category-overlay">
                <h3>{category.title}</h3>
                <p>{category.subtitle}</p>
                <span>Explore Collection ↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading">
          <span>MADE FOR THE SEASON</span>
          <h2>Winter Essentials</h2>
          <p>Explore our featured winter styles.</p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <a href="#contact" className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="product-tag">WINTER PICK</span>
              </a>

              <div className="product-info">
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <strong>{product.price}</strong>
                <a href="#contact" className="product-link">
                  Enquire Now ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="demo-note">
          Sample products and prices — replace with your actual
          inventory.
        </p>
      </section>

      <section className="winter-cta" id="contact">
        <span>THE WINTER EDIT</span>
        <h2>Make this winter your season.</h2>
        <p>
          Find your favourite styles and contact us to place
          your order.
        </p>
        <a
          href="mailto:hello@maison.example?subject=Winter%20Collection%20Enquiry"
          className="shop-button"
        >
          Contact Us ↗
        </a>
      </section>

      <footer className="winter-footer">
        <a href="#" className="footer-logo">
          MAISON<span>.</span>
        </a>
        <p>Winter essentials. Timeless style.</p>
        <small>© 2026 MAISON. All rights reserved.</small>
      </footer>
    </main>
  );
}

export default Home;

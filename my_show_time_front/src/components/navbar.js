import Link from 'next/link';

const Navbar = () => {
  return (
      <div>
        <header>
        <nav class="navbar background">
             <ul class="nav-list">
                 <div class="logo">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/128px-Disque_Vinyl.svg.png" className="home-logo" alt="logo" />
                 </div>
                 <li><Link href="/">Home</Link></li>
                 <li><a href="#courses">Sign Up</a></li>
                <li><a href="#tutorials">Login</a></li>
                <li><Link href="/about">About Us</Link></li>
             </ul>
             <div class="rightNav">
                 <input type="text" name="search" id="search" />
                 <button class="btn btn-sm">Search</button>
             </div>
         </nav>
        </header>
      </div>
  );
};

export default Navbar;
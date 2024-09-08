export default function Header() {
  return (
    <header className="row m-0 py-3 px-3 px-md-5 flex-wrap flex-md-nowrap justify-content-between align-items-center d-md-flex sticky-top">
      <div className="col-6 col-md-4 d-flex justify-content-start align-items-center logo">
        <h3>ESSUS ABC</h3>
      </div>

      <div className="col-12 col-md-4 d-flex justify-content-center align-items-center rounded search-box order-3 order-md-2 mt-3 mt-md-0">
        <form>
          <input type="text" name="search" placeholder="Search" />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <ul className="col-6 col-md-4 d-flex justify-content-end align-items-center m-0 gap-3 order-2 order-md-3">
        <li>
          <a href="#post" className="btn btn-sm btnNav">
            Post ad
          </a>
        </li>
        <li>
          <a href="#login" className="btn btn-sm btnNav">
            login
          </a>
        </li>
      </ul>
    </header>
  );
}

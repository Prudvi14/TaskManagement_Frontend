import { Link } from "react-router";

const Navbar = ({ currUser }) => {
    return (
        <div>
            <span>Hello {currUser.fullName}</span>
            <button>Logout</button>
            <Link to="/tasks">Tasks</Link>
        </div>
    );
};

export default Navbar;

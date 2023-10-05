import "./styles.css";
import Image from "../../assets/loading.gif";

const Loading = () => {
    return (
        <div className="loading">
            <img src={Image} alt="Loading..." />
        </div>
    );
};

export default Loading;

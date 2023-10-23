import Skeleton from "react-loading-skeleton";

const CardSkeleton = ({ cards }) => {
    return Array(cards)
        .fill(0)
        .map((_, i) => (
            <div className="card-skeleton" key={i}>
                <div className="left-col">
                    <Skeleton />
                </div>
                <div className="right-col">
                    <Skeleton count={6} style={{ marginBottom: "1rem" }} />
                </div>
            </div>
        ));
};

export default CardSkeleton;

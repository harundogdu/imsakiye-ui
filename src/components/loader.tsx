import React, {CSSProperties} from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface LoaderProps {
    children: React.ReactNode;
    loading: boolean;
}

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
const Loader = ({children, loading}: LoaderProps) => {
    if (loading)
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
            }}>
                <BeatLoader cssOverride={override} color={"#fff"} loading={loading} size={15}/>
            </div>
        );
    return <>{children}</>;
};

export default Loader;
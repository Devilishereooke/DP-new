import React from "react";

const HomeMain = () => {
  return (
        <section className="main-container">
            <div className="welcome">
                Welcome ,
            </div>
            <div className="question">
                Did you get your Gluco-sensed today ?
            </div>
            <div className="latest--container">
                <div className="latest--title">
                    Latest Record
                </div>
                <div className="latest--reading--box">
                    <span className="num--reading">{45}</span>
                    <span className="reading--unit">mg/dl</span>
                </div>
            </div>
            <div className="history--graph--container">
                <div className="graph--title">
                    BGL Statistics
                </div>
                <div className="graph">
                    <h3>Graph</h3>
                </div>
            </div>
        </section>
    )
};

export default HomeMain;

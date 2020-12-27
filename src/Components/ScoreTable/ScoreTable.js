import React from "react";
const ScoreTable = (props) => {
    return (
        <div className="tbl__row">
            <div className="tbl__cell name">
                <span>{props.name}</span>
            </div>
            <div className="tbl__cell pos">
                <span>{props.pos}</span>
            </div>
            <div className="tbl__cell min">
                <span>{props.min}</span>
            </div>
            <div className="tbl__cell pts">
                <span>{props.pts}</span>
            </div>
            <div className="tbl__cell reb">
                <span>{props.reb}</span>
            </div>
            <div className="tbl__cell ast">
                <span>{props.ast}</span>
            </div>
            <div className="tbl__cell stl">
                <span>{props.stl}</span>
            </div>
            <div className="tbl__cell blk">
                <span>{props.blk}</span>
            </div>
            <div className="tbl__cell fgm">
                <span>{props.fgm}</span>
            </div>
            <div className="tbl__cell fga">
                <span>{props.fga}</span>
            </div>
            <div className="tbl__cell fgperct">
                <span>{props.fgperct}</span>
            </div>
            <div className="tbl__cell threepm">
                <span>{props.threepm}</span>
            </div>
            <div className="tbl__cell threepa">
                <span>{props.threepa}</span>
            </div>
            <div className="tbl__cell threepperct">
                <span>{props.threepperct}</span>
            </div>
            <div className="tbl__cell ftm">
                <span>{props.ftm}</span>
            </div>
            <div className="tbl__cell fta">
                <span>{props.fta}</span>
            </div>
            <div className="tbl__cell ftperct">
                <span>{props.ftperct}</span>
            </div>
            <div className="tbl__cell off">
                <span>{props.off}</span>
            </div>
            <div className="tbl__cell deff">
                <span>{props.deff}</span>
            </div>
            <div className="tbl__cell turnOver">
                <span>{props.turnOver}</span>
            </div>
            <div className="tbl__cell pf">
                <span>{props.pf}</span>
            </div>
        </div>
    )
}
export default ScoreTable;
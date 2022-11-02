import React from 'react';

const PagingNavigation = (props) => {
    return (
        <div className="d-flex justify-between w-100 mt-2">
            { 
                <div 
                    className={`btn ${props.hasPrev ? "" : "disabled"}`} 
                    onClick={props.hasPrev ? props.prevPage : null}
                >
                    Prethodna strana
                </div>
            }

            { 
                <div 
                    className={`btn ml-auto ${props.hasNext ? "" : "disabled"}`} 
                    onClick={props.hasNext ? props.nextPage : null}
                >
                    Slijedeća strana
                </div>
            }
        </div>
    );
}

export default PagingNavigation;
